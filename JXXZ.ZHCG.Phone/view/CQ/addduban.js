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
		
	});
	
})