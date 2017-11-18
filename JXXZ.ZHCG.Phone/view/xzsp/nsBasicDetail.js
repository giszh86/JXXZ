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
				wfmodel: {

				},
				teamMenbers: {
					teamMenbersList: [],
					teamMenbersName: "请选择",
					teamMenbersID: "",
				}

			},
			methods: {
				showMap: function() {
					var option = {
						title: '地图浏览',
						mapOption: {
							center: {

							}
						},
						clickMarker: {
							visible: false
						}
					}
					if(vm.wfmodel.address) {
						var gps = vm.wfmodel.address.split(",")
						option.mapOption.center.longitude = gps[0];
						option.mapOption.center.latitude = gps[1];
					}

					var url = '../../pq_map.html';
					mui.openWindow({
						url: url,
						id: url,
						extras: {
							option: option
						}
					});
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
		getLC(item.syncrowguid);

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

		function getLC(id) {
			var user = app.getUserInfo();
			var param = mui.param({
				syncrowguid: id,
				userid: user.ID
			});
			var url = app.webApi + 'api/Approval/GetApprovalDetail?' + param;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					for(var name in data) {
						var value = data[name];
						if(value == null) value = '';
						Vue.set(vm.wfmodel, name, value);

					}
					getImage(data.wfsuid);
					vm.wfmodel.address = app.getItem('longitude') + ',' + app.getItem('latitude')
				},
				error: function(x, t, e) {
					console.log(x);
				}
			});

		}

		function getImage(wfsuid) {
			var param = mui.param({
				wfsuid: wfsuid,
				start: 0,
				limit: 3
			});
			var url = app.webApi + 'api/Approval/GetFileUpload?' + param;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					setImg('.addphoto', data, function(img) {
						imageViewer.openImage(img);
					});
				},
				error: function(x, t, e) {
					console.log(x);
				}
			})

		}
		var DATA_PREVIEW_SRC = 'data-preview-src'; //图片详情属性
		var DATA_PREVIEW_GROUP = 'data-preview-group'; //图片组
		var image_group = 0; //图片集合.
		function setImg(selectors, imgList, path, imageTap) {
			var callback = imageTap;
			if(typeof path == 'function') {
				callback = path;
				path = undefined;
			}
			var doms = document.querySelectorAll(selectors);
			image_group++;
			for(var i = 0; i < doms.length; i++) {
				var dom = doms[i];
				var img = dom.querySelector('img') || dom;
				if(i < imgList.length) {
					var imgPath = app.imageApi + 'GetPictureFile.ashx?PicPath=' + imgList[i].OriginalPath;	// imgList[i].OriginalWholePath;
					img.src = imgPath;
					img.setAttribute('data-original', imgPath)

					img.setAttribute(DATA_PREVIEW_SRC, imgPath); //原图
					img.setAttribute(DATA_PREVIEW_GROUP, image_group); //组
					//img.fsrc = obj.FilePath;
					if(typeof callback == 'function') {
						(function(img) {
							dom.addEventListener('tap', function(e) {
								callback(img, e);
							});
						})(img);
					}

				} else {}
			}
			if(i < imgList.length) {
				console.log('没有地方放图片了');
			}
		}

	});
})