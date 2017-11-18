require.config({
	baseUrl: '../js',
	paths: {
		'mui': 'mui.min',
		'imm': 'immersed',
		'template': 'template',
		'app': 'app',
		'position': 'position'
	}
});

require(['mui', 'app', 'position'], function(mui, app, position) {
	mui.plusReady(function() {
		//地图全屏(注意:不能使用绝对定位去全屏,和immersed.js中设置头部有冲突)
		var _head = document.querySelector('header');
		var _height = document.body.scrollHeight - _head.offsetHeight;
		var _width = document.body.scrollWidth;
		var _map = document.getElementById("map");
		_map.style.height = _height + 'px';
		_map.style.width = _width + 'px';

		var self = plus.webview.currentWebview();
		var father = self.opener();
		var childrenView = null;
		var op = mui.extend(true, {
			title: '地图浏览',
			mapOption: { //地图设置
				zoom: 13,
				center: {
					latitude: 0,
					longitude: 0,
					title: null,
					icon: 'image/map/map_gr.png',
					visible: false
				}
			},
			polygon: []

		}, self.option || {});
		document.querySelector('.mui-title').innerText = op.title;
		var pos = app.getObject('position'); //位置对象	//84
		var gps = position.wgs84ToGcj02(pos.coords.latitude, pos.coords.longitude);
		var user = app.getUserInfo(); //人员对象
		var mapOption = op.mapOption;
		if(mapOption.center.latitude == 0 || mapOption.center.longitude == 0) {
			mapOption.center.latitude = gps.latitude;
			mapOption.center.longitude = gps.longitude;
		} else {
			var cgps = position.wgs84ToGcj02(mapOption.center.latitude, mapOption.center.longitude);
			mapOption.center.latitude = cgps.latitude;
			mapOption.center.longitude = cgps.longitude;
		}

		var mapCenter = new plus.maps.Point(mapOption.center.longitude, mapOption.center.latitude);
		var map = new plus.maps.Map('map', {
			zoom: mapOption.zoom,
			center: mapCenter
		});
		
		detailPolygon(op.polygon);

		function detailPolygon(ar) {
			for(var i = 0; i < ar.length; i++) {
				var polygonTemp = ar[i];
				var temp = polygonTemp.split(';');
				var arr = [];
				for(var z = 0; z < temp.length; z++) {
					var str = temp[z];
					var tt = str.split(',');
					var tempArr = [parseFloat(tt[0]), parseFloat(tt[1])];
					arr.push(tempArr);
				}
				addPolygon(arr);
			}
		}

		function addPolygon(points) {
			var arrPoint = [];
			for(var i = 0; i < points.length; i++) {
				var temp = points[i];
				var point = new plus.maps.Point(temp[0], temp[1]);
				arrPoint.push(point);
			}
			var polygonObj = new plus.maps.Polygon(arrPoint);
			polygonObj.setStrokeColor('#8080c0');
			polygonObj.setStrokeOpacity(0.1);
			polygonObj.setFillColor('#8080c0');
			polygonObj.setFillOpacity(0.5);
			map.addOverlay(polygonObj);
		}

		function addPoints() {
			if(!map || points.length == 0) {
				mui.later(function() {
					addPoints();
				}, 1000);

			}
			if(polygonObj) {
				map.removeOverlay(polygonObj);
			}
			polygonObj = new plus.maps.Polygon(points);
			polygonObj.setStrokeColor('#8080c0');
			polygonObj.setStrokeOpacity(0.1);
			polygonObj.setFillColor('#8080c0');
			polygonObj.setFillOpacity(0.5);
			map.addOverlay(polygonObj);
		}

	});
});