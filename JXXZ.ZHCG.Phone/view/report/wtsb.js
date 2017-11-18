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

require(['mui', 'app', 'dataGet', 'pic', 'img', 'common', 'imageViewer', 'zoom'], function(
	mui, app, dataGet, pic, img, _, imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		//给处理期限(天)添加正则表达式只能输入数字
		document.getElementById("duetime").addEventListener('keyup',function(event){
			event.currentTarget.value=event.currentTarget.value.replace(/[^0-9-]+/,'');
		})
		//给维修经费(元)添加正则表达式只能输入数字
		document.getElementById("outlay").addEventListener('keyup',function(event){
			event.currentTarget.value=event.currentTarget.value.replace(/[^0-9-]+/,'');
		})
		//养护类型绑定
		dataGet.chooseArray('api/Dictionary/GetZdList?zd_type=type_yhrw_yhlx', {},
			function(model) {
				model.text = model.zd_name;
				model.value = model.zd_id;
				return model;
			},
			function(data) {
				document.getElementById("yhrw_yhlx").addEventListener('tap', function() {
					dataGet.choosePick(data, {
						text: '#yhtypename',
						value: '#yhtype'
					});
				});
			}
		);

		//问题大类下拉框
		dataGet.chooseArray('api/Dictionary/GetZdList?zd_type=type_yhrw_wtdl', {},
			function(model) {
				model.text = model.zd_name;
				model.value = model.zd_id;
				return model;
			},
			function(data) {
				var smallType = [];
				document.getElementById('wtdllist').addEventListener('tap', function() {
					var oldValue = document.getElementById("wtbigclass").value;
					dataGet.choosePick(data, {
						text: '#wtbigclassname',
						value: '#wtbigclass'
					}, function(items) {
						if(items.length == 0) return;
						if(oldValue != items[0].value) {
							smallType.splice(0);
							dataGet.chooseArray('api/Dictionary/GetZdChildList?zd_type=type_yhrw_wtdl&zd_id=' + items[0].value, {},
								undefined,
								function(data) {
									for(var i = 0; i < data.length; i++) {
										var small = data[i];
										small.text = small.zd_name;
										small.value = small.zd_id;
										smallType.push(small);
									}
								});
							document.getElementById("wtsmallclassname").value = '';
							document.getElementById("wtsmallclass").value = '';
						}
					});
				});

				//问题小类
				document.getElementById("wtlxlist").addEventListener('tap', function() {
					var value = document.getElementById("wtbigclass").value;
					if(!value) {
						mui.toast('请选择问题大类!');
						return;
					}
					dataGet.choosePick(smallType, {
						text: '#wtsmallclassname',
						value: '#wtsmallclass'
					});
				});
			}
		);

		//养护对象下拉框
		dataGet.chooseArray('api/Dictionary/GetZdList?zd_type=type_yhrw_yhdx', {},
			function(model) {
				model.text = model.zd_name;
				model.value = model.zd_id;
				return model;
			},
			function(data) {
				document.getElementById('yhobjectlist').addEventListener('tap', function() {
					dataGet.choosePick(data, {
						text: '#yhobjectname',
						value: '#yhobject'
					});
				})
			}
		);

		//养护合同
		dataGet.chooseArray('api/Contract/GetHTSourceList', {},
			function(model) {
				model.value = model.ID;
				model.text = model.Name;
				return model;
			},
			function(data) {
				document.getElementById("yhcontractlist").addEventListener('tap', function() {
					dataGet.choosePick(data, {
						text: '#yhcontractname',
						value: '#yhcontract'
					});
				});
			}
		);

		//养护公司
		dataGet.chooseArray('api/Company/GetDWSourceList', {},
			function(model) {
				model.value = model.ID;
				model.text = model.Name;
				return model;
			},
			function(data) {
				document.getElementById('yhcompanylist').addEventListener('tap', function() {
					dataGet.choosePick(data, {
						text: '#yhcompanyname',
						value: '#yhcompany'
					});

				});
			}
		);

		//问题来源
		dataGet.chooseArray('api/Dictionary/GetZdList?zd_type=type_yhrw_wtly', {},
			function(model) {
				model.value = model.zd_id;
				model.text = model.zd_name;
				return model;
			},
			function(data) {
				document.getElementById("wtsourcelist").addEventListener('tap', function() {
					dataGet.choosePick(data, {
						text: '#wtsourcename',
						value: '#wtsource'
					});
				});
			}
		);

		//地图选点
		document.getElementById("choosemap").addEventListener('tap', function() {
			var gro = document.getElementById("geography84").value;
			var op = {
				title: '选择地点',
				mapOption: {
					center: {

					}
				},
				clickMarker: {
					visible: true
				}
			};
			if(gro != '') {
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
			document.getElementById("geography84").value = str;
		});

		img.initPhoto('.addphoto img', function(img) {
			imageViewer.openImageOnly(img);
		});

		//刷新页面地址
		reload();

		function reload() {
			var address = app.getAddress();
			document.getElementById("wtaddress").value = address;
			var pos = app.getGeography();
			document.getElementById("geography84").value = pos;
		}

		window.addEventListener('show', function() {
			reload();
		});

		//提交
		document.getElementById("submit").addEventListener('tap', function() {
			var data = app.getDataByContent();
			var user = app.getUserInfo();
			mui.extend(data, {
				foundtime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
				fileename: user.DisplayName,
				wtnature: '',
				points: '',
				debit: '',
				//sendusername: user.DisplayName,
				sendopinion: '',
				createuserid: user.ID
			});
			data.uploadpanelValue = app.getImageList(1, 3);
			if(data._err.length > 0) {
				mui.toast(data._err[0].message);
				return;
			}
			var url = app.webApi + 'api/YhTask/AddYhTaskApi';
			console.log(url);
			plus.nativeUI.showWaiting('提交中...');
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					if(data.resCode == 1) {
						alert(data.msg);
						var self = plus.webview.currentWebview();
						self.reload();
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

		});

	});
})