require.config({
	baseUrl: 'js',
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
				zoom: 15,
				center: {
					latitude: 0,
					longitude: 0,
					title: null,
					icon: 'image/map/map_gr.png',
					visible: false
				},
				tap: function() {
					return;
				}
			},
			clickMarker: {
				visible: false, //点击后的坐标
				startShow: true //一开始是否显示
			},
			marker: { //坐标点集合.
				visible: false,
				data: [{
					latitude: 0,
					longitude: 0,
					title: null,
					icon: 'image/map/map_gr.png'
				}]
			},
			myLocation: { //我的坐标
				visible: false
			}
		}, self.option);
		document.querySelector('.mui-title').innerText = op.title;
		var pos = app.getObject('position'); //位置对象	//84
		var gps = position.wgs84ToBd09(pos.coords.latitude, pos.coords.longitude);
		var user = app.getUserInfo(); //人员对象
		var mapOption = op.mapOption;
		if(mapOption.center.latitude == 0 || mapOption.center.longitude == 0) {
			mapOption.center.latitude = gps.latitude;
			mapOption.center.longitude = gps.longitude;
		}else{
			var cgps = position.wgs84ToBd09(mapOption.center.latitude,mapOption.center.longitude);
			mapOption.center.latitude = cgps.latitude;
			mapOption.center.longitude = cgps.longitude;
		}
		var mapCenter = new plus.maps.Point(mapOption.center.longitude, mapOption.center.latitude);
		var map = new plus.maps.Map('map', {
			zoom: mapOption.zoom,
			center: mapCenter
		});
		if(op.mapOption.center.visible) {
			AddMarker(op.mapOption.center);
		}
		var clickMarker = null;
		map.onclick = function(point) {
			if(op.clickMarker.visible) {
				if(clickMarker) map.removeOverlay(clickMarker); //移出标点对象
				clickMarker = AddMarker({
					latitude: point.latitude,
					longitude: point.longitude
				});
			}

			mui.fire(father, 'mapclick', {
				point: point
			});
			if(childrenView) {
				mui.fire(childrenView, 'mapclick', {
					point: point
				});
			}
		}

		//地图点击坐标显示
		if(op.clickMarker.visible) {
			if(op.clickMarker.startShow) {
				clickMarker = AddMarker({
					latitude: mapOption.center.latitude,
					longitude: mapOption.center.longitude
				});
				//				mui.fire(father, 'clickMarker', {
				//					marker: clickMarker
				//				});
			}
			var btn = document.getElementById("clickMarker");
			btn.style.display = "";
			//完成按钮
			btn.addEventListener('tap', function() {
				var marker = changePoint(clickMarker);
				mui.fire(father, 'clickMarker', {
					marker: marker
				});
				//self.hide();
				//mui.later(function() {
				mui.back();
				//}, 500);

				//mui.back();
			}, false);
		}

		//添加当前手机位置坐标
		if(op.myLocation.visible) {
			AddMarker({
				title: '我的位置'
			});
		}

		//坐标
		if(op.marker.visible) {

			for(var i = 0; i < op.marker.data.length; i++) {
				var temp = op.marker.data[i];
				(function(temp) {
					var marker = AddMarker(temp);
					marker.onclick = function(e) {
						//var gps = changePoint(marker);
						mui.fire(father, 'markerclick', {
							marker: temp
						});
						mui.fire(childrenView, 'markerclick', {
							marker: temp
						});
					}
				})(temp);
			}
		}

		//把火星坐标转换成84坐标
		function changePoint(marker) {
			var gps = position.bd09ToWgs84(marker.point.latitude, marker.point.longitude);
			return gps;
		}

		//添加点
		function AddMarker(option) {
			var _option = mui.extend({
				latitude: mapOption.center.latitude,
				longitude: mapOption.center.longitude,
				title: null,
				icon: 'image/map/map_gr.png'
			}, option);
			var marker = new plus.maps.Marker(new plus.maps.Point(_option.longitude, _option.latitude));
			if(_option.title) {
				var _bubble = new plus.maps.Bubble(_option.title);
				marker.setBubble(_bubble);
			}
			marker.setIcon(_option.icon);
			map.addOverlay(marker);

			return marker;
		}

		var self = plus.webview.currentWebview();
		self.show();
		plus.nativeUI.closeWaiting();

	});
});