require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		"ImagesBase": "getBase64Image",
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'ImagesBase','imageViewer','zoom'], function( mui, app, ImagesBase,imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		//初始化照片选择
		//		InitPhoto('.navigateright');
		var self = plus.webview.currentWebview();
		var _item = self.item;

		getModel(_item.id);

		document.getElementById('mapaddress').addEventListener('tap', function() {
			
			var option = {
				title: '地图查看',
				mapOption: {
					center: {
						visible: true
					}
				}
			};
			var geo = document.getElementById("geography").value;
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
		});

		//获取详情
		function getModel(id) {
			var url = app.webApi + 'api/phone/GetMQSBDetail?id=' + id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					
					app.setFormByData(data);
					var _longitude = data.longitude;
					var _latitude = data.latitude;

					app.putImageList('.navigateright img', data.imageList,'ThreeBagsOrignalPath', function(img) {
						imageViewer.openImage(img);
					}); 
					//console.log("longitude:"+_longitude+";latitude:"+_latitude+";imageList:"+JSON.stringify(_imageList));
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