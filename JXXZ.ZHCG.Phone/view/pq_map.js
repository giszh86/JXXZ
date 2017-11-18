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
				zoom: 16,
				center: {
					latitude: 0,
					longitude: 0,
					title: null,
					icon: '../image/map/map_gr.png',
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
				visible: true,
				data: []
			},
			myLocation: { //我的坐标
				visible: true
			},
			floatView: { //底部浮动
				visible: true, //是否显示
				url: 'floatView.html', //底部页面
				opacity: 0.7, //透明度
				bottom: 10, //底部页面距离底部
				height: 50, //底部页面高度
				width: 0.8, //宽度
				extras: {}
			}
		}, self.option || {});
		document.querySelector('.mui-title').innerText = op.title;
		var pos = app.getObject('position'); //位置对象	//84
		//var gps = position.wgs84ToBd09(pos.coords.latitude, pos.coords.longitude);

		var gps = position.transpose(pos, 'bd09ll');

		var user = app.getUserInfo(); //人员对象
		var mapOption = op.mapOption;
		if(mapOption.center.latitude == 0 || mapOption.center.longitude == 0) {
			mapOption.center.latitude = gps.latitude;
			mapOption.center.longitude = gps.longitude;
		} else {
			//var cgps = position.wgs84ToBd09(mapOption.center.latitude, mapOption.center.longitude);
			var cgps = position.transBd09ll('wgs84', mapOption.center.latitude, mapOption.center.longitude);

			mapOption.center.latitude = cgps.latitude;
			mapOption.center.longitude = cgps.longitude;
		}

		var mapCenter = new plus.maps.Point(mapOption.center.longitude, mapOption.center.latitude);
		var map = new plus.maps.Map('map', {
			zoom: mapOption.zoom,
			center: mapCenter
		});

		if(op.floatView.visible) { //是否需要底部浮动
			var left = _width * (1 - op.floatView.width) * 0.5;
			childrenView = mui.preload({
				url: op.floatView.url,
				id: op.floatView.url,
				styles: {
					opacity: op.floatView.opacity, //透明度
					bottom: op.floatView.bottom,
					height: op.floatView.height,
					left: left,
					width: (op.floatView.width * 100) + '%'
				},
				extras: op.floatView.extras
			});
			self.append(childrenView);
			childrenView.hide();
		}

		getPeripheryPolice();

		//获取周边
		function getPeripheryPolice() {
			var wsg84 = position.transpose(pos, 'wgs84');

			var param = mui.param({
				userId: user.ID,
				latitude: wsg84.latitude,
				longitude: wsg84.longitude
			});
			var url = app.webApi + 'api/phone/GetPeripheryPolice?' + param;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						var gps_temp = position.wgs84ToBd09(temp.latitude, temp.longitude);
						temp.latitude = gps_temp.latitude;
						temp.longitude = gps_temp.longitude;
						op.marker.data.push(temp);
					}

					updateMap();
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}

		function updateMap() {

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
					title: '我的位置',
					icon: 'point.png'
				});
				AddCircleobj(op.mapOption.center.longitude, op.mapOption.center.latitude, 500)
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
							childrenView.show();
						}
					})(temp);
				}
			}

			//把火星坐标转换成84坐标
			function changePoint(marker) {
				//var gps = position.gcj02ToWgs84(marker.point.latitude, marker.point.longitude);
				//var gps = position.b
				
				var gps = position.bd09ToWgs84(marker.point.latitude, marker.point.longitude);
				
				return gps;
			}

			//添加点
			function AddMarker(option) {
				var _option = mui.extend({
					latitude: mapOption.center.latitude,
					longitude: mapOption.center.longitude,
					title: null,
					icon: '../image/map/map_gr_blue.png'
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

			function AddCircleobj(lng, lat, radius) {
				var point = new plus.maps.Point(lng, lat);
				var circle = new plus.maps.Circle(point, radius);
				circle.setFillColor('#306ae1');
				circle.setFillOpacity(0.3);
				circle.setStrokeColor('#306ae1');
				circle.setStrokeOpacity(0.1);
				map.addOverlay(circle);
			}
		}

	});
});