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
		
		var oMap = new OpenlayerMap({
			containerId: 'map',
			zoom: 9
		});

	});

});