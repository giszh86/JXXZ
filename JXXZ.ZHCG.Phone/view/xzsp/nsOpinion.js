require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'template': 'template'
	}
});

require(['mui', 'app', 'template'], function(mui, app, template) {
	mui.init({});

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var item = self.item;
		var _pviguid = item.pviguid;

		pullupRefresh();

		function pullupRefresh() {
			var param = mui.param({
				pviguid: _pviguid,
				start: 0,
				limit: 1000
			});
			var url = app.webApi + 'api/Approval/GetAdviceList?' + param;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					var html = template('list-tmp', {
						list: data.Items
					});
					document.getElementById("list").innerHTML = html;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {}
			});

		}
	});
})