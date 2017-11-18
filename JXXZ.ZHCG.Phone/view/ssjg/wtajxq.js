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
			var url = app.webApi + 'api/Violated/GetcaseModel?wtid=' + item.id;
			console.log(url);
			plus.nativeUI.showWaiting('请稍候...');
			mui.ajax({
				url: url,
				success: function(data) {
					data.xyAddress = '';
					if(data.x84){
						data.xyAddress = data.x84 + ',' + data.y84;
					}
					app.setFormByData(data);
					app.putImageList('.addphoto',data.casewtfilelist, function(img) {
						imageViewer.openImage(img);
					}); 
					//alert(JSON.stringify(data));
					
				},
				error: function(x, t, e) {
					//app.errorMessage();
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		document.getElementById('addresschoose').addEventListener('tap',function () {
		        var option = {
						title: '地图查看',
						mapOption: {
							center: {
								visible: true
							}
						}
					};
					var geo = document.getElementById("xyAddress").innerText;
					if(geo){
						var point = geo.split(',');
						var lon = parseFloat(point[0]);
						var lat = parseFloat(point[1]);
						option.mapOption.center.latitude = lat;
						option.mapOption.center.longitude = lon;
					}else{
						return;
					}
					var url = '../../pq_map.html';
					mui.openWindow({
						url: url,
						id: url,
						extras: {
							option: option
						}
					});
		})

	});
})