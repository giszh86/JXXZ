require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['mui','app'], function(mui, app) {
	mui.init({});
	mui.plusReady(function() {
		
	});
})