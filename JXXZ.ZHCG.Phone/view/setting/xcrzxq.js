require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require([ 'mui', 'app', 'Vue'], function( mui, app, Vue) {
	mui.init({});
	
	var vm = new Vue({
		el: '.mui-content',
		data: {
			model: []
		}
	});
	
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var _id=self.item.id;
		var url = app.webApi + 'api/phone/GetReportDetail?id=' + _id;
		console.log(url);
		plus.nativeUI.showWaiting('加载中...');
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(data.date){
					data.day=data.date.substring(0,10);
				}
				vm.model=data;
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
			}
		});
	});
})