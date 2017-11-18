require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
	}
});

require(['mui','app','Vue'], function( mui, app,Vue) {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
        var	citizenid=self.model.citizenid;
		var vm = new Vue({
			el: '.mui-content',
			data: {
				items:[]
			},
		})
		getDetail(citizenid)
			
		//获得详情
		function getDetail(citizenid) {
			var url = app.webApi + 'api/CitizenEvent/GetCitizenServiceModel?citizenid=' + citizenid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
//					console.log(data)
					vm.items=data.workflowold;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}

	});
})