require(['esri/map', "esri/layers/ArcGISTiledMapServiceLayer",
	"esri/geometry/Point", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
	"esri/symbols/PictureMarkerSymbol", "esri/geometry/Polygon", "esri/geometry/Polyline",
	"esri/graphic", "esri/layers/GraphicsLayer", "esri/SpatialReference"
], function(
	Map, ArcGISTiledMapServiceLayer, Point, SimpleFillSymbol, SimpleLineSymbol,
	PictureMarkerSymbol, Polygon, Polyline,
	Graphic, GraphicsLayer, SpatialReference) {

	mui.plusReady(function() {
		var aMap = new ArcgisMap();
		var self = plus.webview.currentWebview();
		var father = self.opener();
		console.log(self)
		var op = mui.extend(true, {
			title: '地图浏览',
			clickMarker: {
				visible: false, //点击后的坐标
				startShow: true //一开始是否显示
			},
		}, self.option);
		
		document.querySelector('.mui-title').innerText = op.title;
		var gps=self.option.mapOption.center;
		//默认显示点位信息
		pointAddMarker(gps.longitude, gps.latitude)

		var clickMarkerPoint = {};
		if(op.clickMarker.visible){
			//点击图片获取定位  
			aMap.addClick(function(point, evt) {
				aMap.markerLayer.clear();
				pointAddMarker(point.x, point.y)
				//显示“完成”按钮并且把坐标传到参数中
				var btn = document.getElementById("clickMarker");
				btn.style.display = "";
				clickMarkerPoint.longitude=point.x
				clickMarkerPoint.latitude=point.y
			});
		}
		
		
		//点击完成 返回定位参数
		document.getElementById("clickMarker").addEventListener('tap', function() {
			mui.fire(father, 'clickMarker', {
				marker: clickMarkerPoint
			});
			mui.back();
		},false)

		//添加点位方法
		function pointAddMarker(pointX, pointY) {
			var myPoint = {
				x: pointX,
				y: pointY,
				imgPath: "image/map/map_gr.png",
				imgPathHeight: 30,
				imgPathWidth: 20,
				isCenter: true,
			}
			aMap.addMarker(myPoint);
		}

	})

});