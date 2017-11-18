require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['mui', 'app'], function(mui, app) {
	mui.init({});
	mui.plusReady(function() {
		document.getElementById("approval").addEventListener("tap", function() {
			openHtml('xingzhengshenpilist.html')
		})

		function openHtml(url) {
			mui.openWindow({
				url: url,
				id: url,
				show: {
					autoShow: false
				}
			});
		}
	});
})