require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		"ImagesBase": "getBase64Image",
		'pic': 'mui.picker.all',
		'common': 'common',
		'position': 'position',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'ImagesBase', 'dataGet', 'pic', 'common', 'position', 'imageViewer', 'zoom'], function(
	mui, app, ImagesBase, dataGet, pic, _, position, imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		//初始化照片选择
		ImagesBase.initPhoto('.navigateright', function(img) {
			imageViewer.openImageOnly(img);
		});

		//店家类型选择
		dataGet.getZdList('type_djlx',function(data) {
			document.getElementById("storetypelist").addEventListener('tap', function() {
				dataGet.choosePick(data, {
					text: '#storename',
					value: '#storetype'
				}, function(item) {});
			});
		});
		
		//初始化地址
		var address = app.getItem('position_addresses');
		document.getElementById("address").value = address;
		var _point = app.getGeography();
		document.getElementById("geography").value = _point;
		
		//地点坐标点击
		document.getElementById("mapaddress").addEventListener('tap',function(){
			var gro = document.getElementById("geography").value;
			var op = {
				title: '选择地点',
				mapOption:{
					center:{
						
					}
				},
				clickMarker: {
					visible: true
				}
			};
			if(gro != ''){
				var point = gro.split(',');
				var lon = parseFloat(point[0]);
				var lat = parseFloat(point[1]);
				op.mapOption.center.latitude = lat;
				op.mapOption.center.longitude = lon;
			}
			var url = '../../pq_map.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: op
				}
			});
		});
		
		//监听地图点击完成事件
		window.addEventListener('clickMarker', function(e) {
			var marker = e.detail.marker;
			console.log(JSON.stringify(marker));
			var str = marker.longitude + ',' + marker.latitude;
			document.getElementById("geography").value = str;
		});
		
		document.getElementById("card").addEventListener('keyup',function(event){
			event.currentTarget.value=event.currentTarget.value.replace(/[^A-Za-z0-9]+/,'');
		})

		
		//提交
		document.getElementById('submit').addEventListener('tap', function() {
			var user = app.getUserInfo();
			var data = app.getDataByContent();
			if(data._err.length > 0) {
				mui.toast(data._err[0].message);
				return false;
			}
			var base64 = app.getImageList(1, 3);
			data.Base64 = base64;
			mui.extend(data, {
				createuserid: user.ID,
				createtime: new Date().Format('yyyy-MM-dd hh:mm:ss')
			});
			//alert(JSON.stringify(data));
			plus.nativeUI.showWaiting('提交中...');
			var url = app.webApi + 'api/ThreeBags/SmAddThreeBagsInf';
			mui.ajax({
				url: url,
				data: data,
				type: 'post',
				success: function(data) {
					//alert(JSON.stringify(data));
					if(typeof(data) == 'string') data = JSON.parse(data);
					if(data.success) {
						alert('提交成功!');
						var self = plus.webview.currentWebview().opener();
						mui.fire(self, 'back');
						mui.back();
					} else {
						alert('提交失败!');
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		})

	});
});