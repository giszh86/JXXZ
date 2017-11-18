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
		var item = self.item;
		getDetail(item.pviguid);
		
		//获得详情
		function getDetail(pviguid) {
			var url = app.webApi + 'api/Approval/GetBanjieList?pviguid=' + pviguid;
			console.log(url);
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