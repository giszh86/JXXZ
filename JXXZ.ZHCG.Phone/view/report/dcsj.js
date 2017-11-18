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
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'dataGet', 'pic', 'Vue', 'img', 'imageViewer', 'zoom'], function(
	mui, app, dataGet, pic, Vue, img, imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		var vm = new Vue({
			el: '.mui-content',
			data: {
				sfzxzz: 0

			},
			methods: {
				//选择日期
				chooseDate: function(modelName, type) {
					var that = this;
					if(!type) type = 'datetime';
					var str = document.getElementById("foundtime").value;
					var pick = new mui.DtPicker({
						type: type,
						value: str
					});
					pick.show(function(items) {
						if(items.value != null) {
							document.getElementById("foundtime").value = items.value;
						}
						pick.dispose();
					});

				},
				sridTap: function() {
					if(!sridList) return;
					dataGet.choosePick(sridList, {
						text: '#SridText',
						value: '#srid'
					}, function(items) {});
				}

			}
		});

		//选择市民事件大小类
		dataGet.getClassType(function(data) {
			var childrenData = [];
			var oldId = document.getElementById("Bclass_ID").value;
			document.getElementById("Class_list").addEventListener('tap', function() {
				dataGet.choosePick(data, {
						text: ['#Bclass_Name'],
						value: ['#Bclass_ID']
					},
					function(items) {
						if(items.length == 0) return;
						if(oldId != items[0].value) { //大类改了
							childrenData = items[0].children;
							document.getElementById("Sclass_Name").value = '请选择';
							document.getElementById("Sclass_ID").value = '';
						}
					}
				)
			}, false)

			document.getElementById("Sclass_list").addEventListener('tap', function() {
				if(childrenData.length == 0) {
					mui.toast('请选择大类');
				} else {
					dataGet.choosePick(childrenData, {
						text: ['#Sclass_Name'],
						value: '#Sclass_ID'
					}, function(items) {
						//小类选择回调
					});
				}
			});

		});

		writeFoundtime();
		img.initPhoto('.addphoto', function(img) {
			imageViewer.openImageOnly(img);
		});

		//页面切换到本页面,更新地址.
		window.addEventListener('show', function() {
			writeFoundtime();
		});

		//上报时间
		function writeFoundtime() {
			var foundtime = document.getElementById("foundtime");
			foundtime.value = new Date().Format('yyyy-MM-dd hh:mm');
			var lon = app.getItem('longitude');
			var lat = app.getItem('latitude');
			document.getElementById("grometry").value = lon + ',' + lat;
			if(app.getItem('position_addresses') != "undefined") {
				var address = app.getItem('position_addresses');
				document.getElementById("eventaddress").value = address;
			}

		}

		//地图选点
		document.getElementById("addresschoose").addEventListener('tap', function() {
			var gro = document.getElementById("grometry").value;
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
			document.getElementById("grometry").value = str;
		});

		//提交
		document.getElementById('submit').addEventListener('tap', function() {
			var user = app.getUserInfo();
			var data = app.getDataByContent();

			mui.extend(data, {
				dutytime: new Date().Format('yyyy-MM-dd'),
				cnumber: '',
				eventid: '',
				contactaddress: '',
				limittime: data.foundtime.toDate().dateAdd('d', 1).Format('yyyy-MM-dd hh:mm:ss'),
				recorduser: user.ID,
				createtime: new Date().Format('yyyy-MM-dd'),
				createuserid: user.ID,
				sfzxzz: vm.sfzxzz,
				processingType: 2
			});

			var model = img.createImageObject(data, 1, 3, 1, 'photo');
			if(model._err.length > 0) {
				mui.toast(model._err[0].message);
				return;
			}
			var url = app.webApi + 'api/CitizenEvent/AddCitizenService';
			console.log(url);
			plus.nativeUI.showWaiting('请稍候...');
			mui.ajax({
				url: url,
				type: 'post',
				data: model,
				success: function(data) {
					//alert(JSON.stringify(data));
					if(typeof(data) == 'string') {
						var d = JSON.parse(data);
					} else {
						var d = data;
					}

					if(d.resCode == 1) {
						alert(d.msg);
						var self = plus.webview.currentWebview();
						self.reload();
					} else {
						alert('上报失败!');
					}
				},
				error: function(x, t, e) {
					console.log(x);
					app.errorMessage(x, t, e);

				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		});

	});
})