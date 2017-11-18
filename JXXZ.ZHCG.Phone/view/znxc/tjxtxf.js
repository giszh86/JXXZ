require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'Vue': 'vue/vue.min',
		'img': 'getBase64Image',
		'com': 'common'
	}
});

require(['mui', 'app', 'pic', 'img', 'dataGet', 'com'], function(
	mui, app, pic, img, dataGet, com) {
	mui.init({});
	mui.plusReady(function() {
		document.getElementById("posaddress").value=app.getItem('longitude')+","+app.getItem('latitude')
		document.getElementById("latitude").value=app.getItem('latitude')
		document.getElementById("longitude").value=app.getItem('longitude')
			
		//号牌种类选择
		dataGet.getBelongsToArea(function(data) {
			document.getElementById("areaname").value = data[0].text;
			document.getElementById("sourcearea").value = data[0].value;
			document.getElementById("arealist").addEventListener('tap', function() {
				dataGet.choosePick(data, {
					text: '#areaname',
					value: '#sourcearea'
				});
			});
		});
		
		document.getElementById("submitit").addEventListener('tap',function(){
			var data=app.getDataByContent();
			data.createuserid=app.getUserInfo().ID;
			plus.nativeUI.showWaiting('请稍候...');
			var url = app.webApi + 'api/LawObject/AddHawkerApi';
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					alert(data.msg);
					var father = plus.webview.currentWebview().opener();
					mui.fire(father,'refresh');
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
})