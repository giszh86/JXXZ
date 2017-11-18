require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'pic': 'mui.picker.all',
		'DataGet': 'DataGet',
		'img': 'getBase64Image',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'Vue', 'pic', 'DataGet', 'img', 'zoom', 'imageViewer'], function(mui, app, Vue, pic, dataGet, img, zoom, imageViewer) {
	mui.init({});

	mui.plusReady(function() {

		var vm = new Vue({
			el: '.mui-content',
			data: {
				model: {

				},
			},
			filters: {
				tasktypeName: function(tasktype) {
					var st = '';
					switch(tasktype) {
						case 1:
							st = '即办件';
							break;
						case 2:
							st = '承诺件';
							break;
						case 3:
							st = '上报件';
							break;
						default:
							break;
					}
					return st;
				}
			}
		});

		var self = plus.webview.currentWebview();
		var item = self.item;
		
		getDetail(item.syncrowguid);

		//获得详情
		function getDetail(syncrowguid) {
			var url = app.webApi + 'api/Approval/ApprovalDetail?syncrowguid=' + syncrowguid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//					console.log(JSON.stringify(data));
					for(var name in data) {
						var value = data[name];
						if(value == null) value = '';
						Vue.set(vm.model, name, value);
					}

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