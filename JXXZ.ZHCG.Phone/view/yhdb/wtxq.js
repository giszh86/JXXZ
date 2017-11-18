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

require(['mui', 'app', 'img', 'imageViewer', 'zoom'], function(mui, app, img, imageViewer) {
	mui.init({});
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

		function getDetail(id) {
			var url = app.webApi + 'api/YhTask/GetYHTaskModel?wfsid=' + id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					console.log(data)
					if(data.clrid == null) {
						data.clrid = -1;
					} else {
						document.getElementById("huitui").style.display = '';
					}
					app.setFormByData(data);
					putImage(data.attachment);
					img.initPhoto('.addimg', function(img) {
						imageViewer.openImageOnly(img);
					});

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
			//			app.putImageList('.addphoto',data.casewtfilelist, 
			app.putImageList('.image-before', beforeList, 'YhTaskOriginalPath', function(img) {
				imageViewer.openImage(img);
			});
		}

		//提交
		document.getElementById('submit').addEventListener('tap', function() {
			submit('2017040610570004');
		});

		document.getElementById("huitui").addEventListener('tap', function() {
			submit('2017040610570002');
		});

		function submit(nextid) {
			var msg = '提交';

			var data = app.getDataByContent();
			var user = app.getUserInfo();
			mui.extend(data, {
				processuserid: user.ID,
				nextwfdid: nextid,
				wfcreateuserid: user.ID
			});
			data.uploadpanelValue = app.getImageList(4, 6);
			if(nextid == '2017040610570002') {
				//回退
				msg = '回退';
				data.nextwfuserids = 0;
			}
			var url = app.webApi + 'api/YhTask/YHTaskFlowLink';
			plus.nativeUI.showWaiting('请稍后...');
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					if(data.resCode == 1) {
						alert(msg + '成功!');
						var ss = self.opener();
						mui.fire(ss, 'back');
						mui.back();

					} else {
						alert('提交失败!');
					}
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

	});
})