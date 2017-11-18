function ArcgisMap(options) {
	options = options || {};
	var defaultOption = {
		containerId: 'map',
		//		wkid: 4326
		wkid: 3857
	}
	defaultOption.mapOption = extend({
		slider: false,
		logo: false,
		center: [120.756, 30.766],
		zoom: 13,
		maxZoom: 16,
		minZoom: 5
	}, options.mapOption);
	var self = this;
	//内网
	self.url = "http://10.73.1.48:9070/JXPDServerCore/rest/services/JXEMAP/MapServer";
	self.url2 = 'http://10.73.1.48:9070/JXPDServerCore/rest/services/JXEMAPAnno/MapServer';

	//外网.
	//self.url = "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer";
	self.containerId = options.containerId || defaultOption.containerId;
	self.wkid = options.wkid || defaultOption.wkid;

	var map = self.map = new esri.Map(self.containerId, defaultOption.mapOption);
	//地图图层
	self.layer = new esri.layers.ArcGISTiledMapServiceLayer(self.url);

	map.addLayer(self.layer);

	//内网
	self.bzLayer = new esri.layers.ArcGISTiledMapServiceLayer(self.url2);
	map.addLayer(self.bzLayer);

	//点图层
	self.markerLayer = new esri.layers.GraphicsLayer();

	//面图层
	self.polygonLayer = new esri.layers.GraphicsLayer();
	//线图层
	self.lineLayer = new esri.layers.GraphicsLayer();

	self.circleLayer = new esri.layers.GraphicsLayer();
	
	self.textLayer = new esri.layers.GraphicsLayer();

	self.click_fun = [];

	map.addLayer(self.lineLayer);
	map.addLayer(self.circleLayer);
	map.addLayer(self.polygonLayer);
	map.addLayer(self.markerLayer);
	map.addLayer(self.textLayer);

	//	map.on('click',function(evt){
	//		debugger;
	//	});

	map.on('click', function(evt) {

		var point = evt.mapPoint;
		//console.log(point.x + ',' + point.y);
		for(var i = 0; i < self.click_fun.length; i++) {
			var fun = self.click_fun[i];
			fun(point, evt);
		}

	});

	self.markerLayer.on('click', function(evt) {
		var obj = evt.graphic.attributes;
		if(obj && typeof obj.click === 'function') {
			obj.click(obj, evt);
		}
	});

}

var p = ArcgisMap.prototype;

p.addClick = function(fun) {
	if(typeof fun === 'function') {
		this.click_fun.push(fun);
	}
}
//加圆
p.addCircle = function(options, layer) {
	var self = this;
	if(!layer) layer = self.circleLayer;
	var op = extend({
		point: [0, 0], //圆心
		radius: 100, //半径
		stokeColor: [0, 130, 195, 0.5], //线颜色
		fullColor: [0, 130, 195, 0.5], //圆颜色
		click: undefined,
		isCenter: false
	}, options);

	var point = new esri.geometry.Point(op.point[0], op.point[1], self.map.spatialReference);
	var circle = new esri.geometry.Circle({
		center: point,
		radius: op.radius
	});

	var symbol = new esri.symbol.SimpleFillSymbol();
	symbol.setColor(op.fullColor);
	symbol.outline.setColor(op.stokeColor);

	var graphic = new esri.Graphic(circle, symbol);

	layer.add(graphic);

	if(op.isCenter) {
		self.map.centerAt(point);
	}

	return graphic;
}

//地图居中
p.centerAt = function(x, y) {
	var point = new esri.geometry.Point(parseFloat(x), parseFloat(y), self.map.spatialReference);
	this.map.centerAt(point);
}

//加点方法.
ArcgisMap.prototype.addMarker = function(options, layer) {
	var self = this;
	if(!layer) layer = self.markerLayer;
	var op = extend({
		x: 0,
		y: 0,
		imgPath: 'point.png',
		imgPathHeight: 30,
		imgPathWidth: 30,
		isCenter: false,
		click: undefined
	}, options);

	var point = new esri.geometry.Point(op.x, op.y, self.map.spatialReference);
	var picSymbol = new esri.symbol.PictureMarkerSymbol(op.imgPath, op.imgPathWidth, op.imgPathHeight);
	picSymbol.setOffset(0, op.imgPathHeight / 2);
	var picGraphic = new esri.Graphic(point, picSymbol, op);
	layer.add(picGraphic);
	if(op.isCenter) {
		self.map.centerAt(point);
	}
	return picGraphic;

};
//"esri/InfoTemplate"
ArcgisMap.prototype.addTitleMarker = function(options, layer) {
	var self = this;
	if(!layer) layer = self.markerLayer;
	var op = extend({
		x: 0,
		y: 0,
		imgPath: 'point.png',
		imgPathHeight: 30,
		imgPathWidth: 30,
		isCenter: false,
		click: undefined,
		title: ''
	}, options);

	var point = new esri.geometry.Point(op.x, op.y, self.map.spatialReference);
	var picSymbol = new esri.symbol.PictureMarkerSymbol(op.imgPath, op.imgPathWidth, op.imgPathHeight);
	picSymbol.setOffset(0, op.imgPathHeight / 2);
	var str = op.title || "";
	if(str.length > 5) str = str.substr(0, 4) + '..';
	var textSymbol = new esri.symbol.TextSymbol(str);
	textSymbol.setColor('#fff');
	textSymbol.setOffset(0, op.imgPathHeight + 20);

	var picfullGraphic = new esri.symbol.PictureMarkerSymbol('../image/map/title.png',
		80, 40);
	picfullGraphic.setOffset(0, op.imgPathHeight+20);

	var picGraphic = new esri.Graphic(point, picSymbol, op);

	var textGraphic = new esri.Graphic(point, textSymbol, op);
	
	var pictextGraphic = new esri.Graphic(point, picfullGraphic, op);

	layer.add(picGraphic);
	
	layer.add(pictextGraphic);
	self.textLayer.add(textGraphic);
	if(op.isCenter) {
		self.map.centerAt(point);
	}
	return [picGraphic, textGraphic,pictextGraphic];
}

//画线
ArcgisMap.prototype.addLine = function(lines, options, layer) {
	var self = this;
	if(!layer) layer = self.lineLayer;
	var op = extend({
		color: [255, 0, 0, 0.7],
		center: null
	}, options);
	var polyLine = new esri.geometry.Polyline(self.map.spatialReference);
	polyLine.addPath(lines);
	var lineSymbol = new esri.symbol.SimpleLineSymbol();
	lineSymbol.setColor(op.color);
	var graphic = new esri.Graphic(polyLine, lineSymbol);
	layer.add(graphic);
	if(op.center) {
		var point = new esri.geometry.Point(op.center.x, op.center.y, self.map.spatialReference);
		self.map.centerAt(point);
	}
	return graphic;
};
//画面
ArcgisMap.prototype.addPolygon = function(areas, options, layer) {
	var self = this;
	if(!layer) layer = self.polygonLayer;
	var op = extend({
		color: [0, 130, 195, 0.5], //多边形线条颜色
		fillColor: [0, 130, 195, 0.5], //填充颜色
		center: null,
		click: undefined
	}, options);
	var symbol = new esri.symbol.SimpleFillSymbol();
	symbol.setColor(op.fillColor);
	symbol.outline.setColor(op.color);

	var polygon = new esri.geometry.Polygon(self.map.spatialReference);
	areas.push(areas[0]); //画面的时候第一个点和最后一个点相同.
	polygon.addRing(areas);
	var graphic = new esri.Graphic(polygon, symbol, op);
	layer.add(graphic);
	areas.pop();
	if(op.center) {
		var point = new esri.geometry.Point(op.center.x, op.center.y, self.map.spatialReference);
		self.map.centerAt(point);
	}
	return graphic;

};

ArcgisMap.prototype.clearLine = function() {
	this.lineLayer.clear();
};

ArcgisMap.prototype.clearMarker = function() {
	this.markerLayer.clear();
	this.textLayer.clear();
};

ArcgisMap.prototype.clearPolygon = function() {
	this.polygonLayer.clear();
};

ArcgisMap.prototype.clearCircle = function() {
	this.circleLayer.clear();
};

(function(global) {
	if(typeof global.extend == 'function') return;

	var extend,
		_extend,
		_isObject;

	_isObject = function(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}
	_extend = function self(destination, source) {
		var property;
		for(property in destination) {
			if(destination.hasOwnProperty(property)) {

				// 若destination[property]和sourc[property]都是对象，则递归
				if(_isObject(destination[property]) && _isObject(source[property])) {
					self(destination[property], source[property]);
				};

				// 若sourc[property]已存在，则跳过
				if(source.hasOwnProperty(property)) {
					continue;
				} else {
					source[property] = destination[property];
				}
			}
		}
	}
	extend = function() {
		var arr = arguments,
			result = {},
			i;
		if(!arr.length) return {};
		for(i = arr.length - 1; i >= 0; i--) {
			if(_isObject(arr[i])) {
				_extend(arr[i], result);
			};
		}
		arr[0] = result;
		return result;
	}
	global.extend = extend;
})(window);