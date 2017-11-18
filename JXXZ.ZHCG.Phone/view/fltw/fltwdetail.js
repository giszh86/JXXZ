require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui','app'], function(_, mui, app) {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var _item = self.item;
		
		getModel(_item.ID);

		//获取详情
		function getModel(id) {
			var url = app.webApi + 'api/phone/GetFLFGModel?id=' + id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					app.setFormByData(data);
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
	});
})