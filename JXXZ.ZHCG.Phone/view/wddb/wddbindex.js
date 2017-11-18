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
	mui.ready(function() {
		updateCount();
	});

	mui.plusReady(function() {
		
//		function autoHeight() {
//			var resolutionHeight = window.innerHeight;
//			var height = plus.screen.resolutionHeight;
//			var cHeight = plus.navigator.getStatusbarHeight();
//			//console.log('height:' + height);		592
//			//console.log("cHeight:" + cHeight);	24
//			var cDom = document.querySelector('.mui-content');
//			console.log(cDom.offsetTop);		//0
//			cDom.style.height = (resolutionHeight) + 'px';
//
//
//		}
//		autoHeight();
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