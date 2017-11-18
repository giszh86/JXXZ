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
		
		var self = plus.webview.currentWebview();
		var item=self.option;
		
		//编辑初始化的数据
		function itemsInit(){

			console.log(item);
			document.getElementById("person").value=item.person;
			document.getElementById("contactphone").value=item.contactphone; 
			document.getElementById("card").value=item.card;
			document.getElementById("hawkertype").value=item.hawkertype;
			document.getElementById("remark").value=item.remark;
			document.getElementById("areaname").value=item.sourceareaname;
			document.getElementById("sourcearea").value=item.sourcearea;
			document.getElementById("posaddress").value=item.grometry;
		}
		itemsInit()
		
		//号牌种类选择
		dataGet.getBelongsToArea(function(data) {
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
			data.zfdx_shopid=item.zfdx_shopid
			plus.nativeUI.showWaiting('请稍候...');
			var url = app.webApi + 'api/LawObject/EditxfApi';
			console.log(JSON.stringify(data));
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
		
		function reload() {
			document.getElementById("caseaddress").value = app.getAddress();
			var lat = app.getItem('latitude');
			var lon = app.getItem('longitude');
			setPositionValue(lon, lat);
			document.getElementById("wttime").value = new Date().Format('yyyy-MM-dd hh:mm');
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
})