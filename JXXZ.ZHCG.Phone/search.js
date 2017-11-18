require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app'], function(mui, app) {
	mui.plusReady(function() {
		//必传参数:title,url
		var self = plus.webview.currentWebview();
		document.querySelector('header h1').innerText = self.title;
		var url = self.url;

		//		var page = mui.preload({
		//			url: url,
		//			id: url,
		//			styles: {
		//				top: '90px',
		//				bottom: '0px'
		//			},
		//			extras: self.extras || {}
		//		});
		var page = plus.webview.create(url, url, {
			top: '103px',
			bottom: '0px'
		}, self.extras || {});

		self.append(page);

		page.show('none', 0, function() {
			self.show("slide-in-right", 300);
			plus.nativeUI.closeWaiting();
		});

		plus.key.addEventListener('searchbutton', function() {
			alert('aaa');
			var strText = document.getElementById("searchText").value;
			mui.fire(self, 'search', {
				text: strText
			});
		});

	});
});