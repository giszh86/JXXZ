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
	document.getElementById('submit').addEventListener('tap', function(event) {
				mui.alert("提交成功",mui.back());
	}, false);
})