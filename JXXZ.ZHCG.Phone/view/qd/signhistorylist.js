require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui', 'app'], function(_, mui, app) {

	mui.init({});

	mui.ready(function() {
		document.getElementById("team").addEventListener('tap', function() {
			mui.openWindow({
				url: 'teamhistory.html',
				id: 'teamhistory.html',
				show: {
					autoShow: false
				}
			});
		});
	});

})