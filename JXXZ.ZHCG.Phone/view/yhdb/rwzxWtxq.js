require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'Vue': 'vue/vue.min',
		'img': 'getBase64Image',
		'common': 'common',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'img', 'Vue', 'imageViewer', 'zoom'], function(mui, app, img, Vue, imageViewer) {
	mui.init({});

	var vm = new Vue({
		el: '#menuList',
		data: {
			items: []
		}
	});

	mui.plusReady(function() {
		document.getElementById('choosemap').addEventListener('tap', function() {

			var option = {
				title: '地图查看',
				mapOption: {
					center: {
						visible: true
					}
				}
			};
			var geo = document.getElementById("geography84").innerText;
			if(geo) {
				var point = geo.split(',');
				var lon = parseFloat(point[0]);
				var lat = parseFloat(point[1]);
				option.mapOption.center.latitude = lat;
				option.mapOption.center.longitude = lon;
			} else {
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

		var self = plus.webview.currentWebview();
		var item = self.item;

		getDetail(item.id);
		getOldList(item.id);

		function getDetail(id) {
			var url = app.webApi + 'api/YhTask/GetYHTaskModel?wfsid=' + id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					app.setFormByData(data);
					putImage(data.attachment);
					//					img.initPhoto('.addimg');
				},
				error: function(x, t, e) {
					app.errorMessage(x, t, e);
					console.log(x);
				},
				complete: function() {

				}
			});
		}

		function getOldList(id) {
			var url = app.webApi + 'api/CitizenEvent/GetOldList?wfsid=' + id;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					vm.items = data;
				},
				error: function(x, t, e) {
					app.errorMessage(x, t, e);
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}

		function putImage(arr) {
			var beforeList = arr.filter(function(item) {
				if(item.WFDID == '2017040610570001') {
					return true;
				}
			});
			//			console.log(JSON.stringify(beforeList));
			app.putImageList('.image-before', beforeList, 'YhTaskOriginalPath', function(img) {
				imageViewer.openImage(img);
			});
			var afterList = arr.filter(function(item) {
				if(item.WFDID != '2017040610570001') {
					return true;
				}
			});

			app.putImageList('.addimg', afterList, 'YhTaskOriginalPath', function(img) {
				imageViewer.openImage(img);
			});

		}
	});
})