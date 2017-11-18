require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['imm', 'mui', 'app', 'imageViewer', 'zoom'], function(_, mui, app, imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var item = self.item;

		//获得详情
		getDetail(item);

		//详情
		function getDetail(item) {
			var url = app.webApi + 'api/YhLog/GetYhLogModel?yhlogid=' + item.id;
			console.log(url);
			plus.nativeUI.showWaiting('请稍候...');
			mui.ajax({
				url: url,
				success: function(data) {
					//					console.log(JSON.stringify(data));

					app.setFormByData(data);
					app.putImageList('.addphoto', data.filelist, 'YhLogOriginalPath', function(img) {
						imageViewer.openImage(img);
					});
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