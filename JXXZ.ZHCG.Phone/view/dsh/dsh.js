require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui', 'app'], function(_, mui, app) {
	mui.init({
		beforeback: function() {
			var self = plus.webview.currentWebview().opener();
			mui.fire(self, 'reload');

		}
	});

	mui.plusReady(function() {

	});

	mui.ready(function() {
		updateCount();
	});
	//更新事件数量.
	function updateCount() {
		var user = app.getUserInfo();
		var url = app.webApi + 'api/CitizenEvent/Quantity?userid=' + user.ID;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				for(var n in data) {
					var dom = document.getElementById(n);
					if(dom) {
						app.setValue(dom, data[n]);
					}
				}
			},
			error: function() {
				var doms = document.querySelectorAll(".count");
				for(var i = 0; i < doms.length; i++) {
					var dom = doms[i];
					app.setValue(dom, 0);
				}
			}
		});

	}
});