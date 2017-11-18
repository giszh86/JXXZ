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
		'com': 'common',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'pic', 'img', 'dataGet', 'com', 'imageViewer', 'zoom'], function(
	mui, app, pic, img, dataGet, com, imageViewer) {
	mui.init();
	mui.plusReady(function() {
		//号牌种类选择
		dataGet.getCarList(function(data) {
			document.getElementById("carname").value = data[0].text;
			document.getElementById("carid").value = data[0].value;
			document.getElementById("carlist").addEventListener('tap', function() {
				dataGet.choosePick(data, {
					text: '#carname',
					value: '#carid'
				});
			});
		});

		function chooseWFTime() {
			var wf = document.getElementById("wflist");
			var input = wf.querySelector('input');
			input.value = new Date().Format('yyyy-MM-dd hh:mm');
			wf.addEventListener('tap', function() {
				var str = input.value;
				dataGet.chooseDate({
					value: str
				}, function(items) {
					if(!items.value) return;
					input.value = items.value;
				});
			});

		}
		chooseWFTime(); //时间选择.
		img.initPhoto('.addphoto', function(img) {
			imageViewer.openImageOnly(img);
		});

		document.getElementById('submit').addEventListener('tap', function() {
			var user = app.getUserInfo();
			var lon = document.getElementById("longitude").value;
			var lat = document.getElementById("latitude").value;
			var model = app.getDataByContent();
			model = img.createImageObject(model, 1, 3, 1, 'photo');
			if(model._err.length > 0) {
				mui.toast(model._err[0].message);
				return;
			}
			if(model.photo1==''&&model.photo2==''&&model.photo3==''){
				mui.toast("请至少上传一张处理后照片");
				return;
			}
			
			var cphm = document.getElementById("cphm").value;
			var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
			if(!express.test(cphm)){
				mui.toast('车牌号码不合规则');
				return;
			}
			var data = mui.extend(model, {
				reportuserid: user.ID,
				reporttime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
				x84: lon,
				y84: lat,
				unitid: user.TeamID
			});
			plus.nativeUI.showWaiting('请稍候...');
			var url = app.webApi + 'api/Violated/AddWtajs';
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					//alert(JSON.stringify(data));
					if(data.resCode == 1) {
						alert(data.msg);
						var self = plus.webview.currentWebview();
						reload();
					} else {
						alert('上报失败!');
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

		})

//		document.getElementById("caseaddress-update").addEventListener('tap', function() {
//			document.getElementById("caseaddress").value = app.getAddress();
//		});
		
		document.getElementById('pos').addEventListener('tap',function () {
		    var option = {
				title: '选择坐标',
				mapOption: {
					center: {

					}
				},
				clickMarker: {
					visible: true
				}
			}
			option.mapOption.center.latitude = document.getElementById("latitude").value;
			option.mapOption.center.longitude = document.getElementById("longitude").value;
			var url = '../../pq_map.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: option
				}
			});    
		})

		function reload() {
			document.getElementById("caseaddress").value = app.getAddress();
			document.getElementById("cphm").value = '浙F';
			var lat = app.getItem('latitude');
			var lon = app.getItem('longitude');
			setPositionValue(lon, lat);
			document.getElementById("wttime").value = new Date().Format('yyyy-MM-dd hh:mm');
			document.getElementById("head-img1").src='../../image/addphoto.png';
			document.getElementById("head-img2").src='../../image/addphoto.png';
			document.getElementById("head-img3").src='../../image/addphoto.png';
			document.getElementById("head-img1Name").value='';
			document.getElementById("head-img2Name").value='';
			document.getElementById("head-img3Name").value='';
		}

		function setPositionValue(lon, lat) {
			if(!lon) lon = '';
			if(!lat) lat = '';
			var str = (lon != '') ? lon + ',' + lat : '';
			var pos = document.getElementById("pos");
			document.getElementById("posaddress").value = str;
			document.getElementById("latitude").value = lat;
			document.getElementById("longitude").value = lon;
		}

		//页面切换到本页面,更新地址.
		window.addEventListener('show', function() {
			reload();
		});
		
		window.addEventListener('clickMarker', function(e) {
			var marker = e.detail.marker;
			console.log(JSON.stringify(marker));
			var lat = marker.latitude;
			var lon = marker.longitude;
			var str = lon + ',' + lat;
			document.getElementById("posaddress").value = str;
			document.getElementById("latitude").value = lat;
			document.getElementById("longitude").value = lon;
		});
	});
});