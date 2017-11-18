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
		var pos = app.getObject('position');
		var gps = position.transpose(pos, 'bd09ll'); //获取百度坐标
		var user = app.getUserInfo();
		var mapOption = op.mapOption;
		if(mapOption.center.latitude == 0 || mapOption.center.longitude == 0) {
			mapOption.center.latitude = gps.latitude;
			mapOption.center.longitude = gps.longitude;
		} else {
			var cgps = position.wgs84ToBd09(mapOption.center.latitude, mapOption.center.longitude);
			mapOption.center.latitude = cgps.latitude;
			mapOption.center.longitude = cgps.longitude;
		}

		var map = new BMap.Map("map");

		var centerPoint = new BMap.Point(mapOption.center.longitude, mapOption.center.latitude);
		map.centerAndZoom(centerPoint, mapOption.zoom);

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
			var param = mui.param({
				userId: user.ID,
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
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

					//updateMap();
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});

		}

		//		//添加当前位置
		var myMarker = AddMarker({
			latitude: gps.latitude,
			longitude: gps.longitude,
			icon: '../image/map/map_gr_blue.png',
			title: '我的位置'
		});

		//添加点
		function AddMarker(option) {
			var _option = mui.extend({
				latitude: mapOption.center.latitude,
				longitude: mapOption.center.longitude,
				title: null,
				icon: null
			}, option);

			var point = new BMap.Point(_option.longitude, _option.latitude);
			var markerOption = {};
			if(_option.icon) {
				markerOption.icon = new BMap.Icon(_option.icon, new BMap.Size(25, 40), {
					//anchor: new BMap.Size(0,-20),
				});
				markerOption.offset = new BMap.Size(0, -15);
			}

			var marker = new BMap.Marker(point, markerOption);

			if(_option.title) marker.setTitle(_option.title);

			map.addOverlay(marker);
			return marker;
		}

		function updateMap() {
			
		}

		//把火星坐标转换成84坐标
		function changePoint(marker) {
			var gps = position.gcj02ToWgs84(marker.point.latitude, marker.point.longitude);
			return gps;
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

	});

});