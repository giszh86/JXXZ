require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		"ImagesBase": "getBase64Image",
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'common': 'common',
		'position': 'position',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'ImagesBase', 'dataGet', 'pic', 'common', 'position', 'imageViewer', 'zoom'], function(
	mui, app, ImagesBase, dataGet, pic, common, position, imageViewer) {
	mui.init({});
	mui.plusReady(function() {
		//初始化照片选择
		ImagesBase.initPhoto('.navigateright', function(img) {
			imageViewer.openImageOnly(img);
		});
		
		//给证件号添加正则表达式只能输入数字
//		document.getElementById("card").addEventListener('keyup',function(event){
//			event.currentTarget.value=event.currentTarget.value.replace(/[^0-9-]+/,'');
//		})
		//审批类型
		dataGet.getZdList('type_splx', function(data) {
			document.getElementById("splxlist").addEventListener('tap', function(event) {
				dataGet.choosePick(data, {
					text: '#splxtext',
					value: '#splx'
				}, function(items) {});
			});
		});

		//证件类型
		dataGet.getZdList('type_xzxk_zjlx', function(data) {
			document.getElementById('cardtypelist').addEventListener('tap', function() {
				dataGet.choosePick(data, {
					text: '#cardtypename',
					value: '#cardtype'
				}, function(items) {});
			})
		});

		//起始时间
		document.getElementById('processtime_start').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd hh:mm');
			dataGet.chooseDate({
				value: strDate
			}, function(items) {
				if(!items.value) return;
				that.value = items.value;
			});
		});

		//结束时间
		document.getElementById('processtime_end').addEventListener('tap', function() {
			var that = this;
			var strDate = that.value;
			if(strDate == '') strDate = new Date().Format('yyyy-MM-dd hh:mm');
			dataGet.chooseDate({
				value: strDate
			}, function(items) {
				if(!items.value) return;
				that.value = items.value;
			});
		});
		
		//初始化地址
		var _point = app.getGeography();
		console.log(_point);
		document.getElementById("geography").value = _point;

		//地图选点
		document.getElementById('choosemap').addEventListener('tap', function() {
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
			//console.log(JSON.stringify(marker));
			var str = marker.longitude + ',' + marker.latitude;
			document.getElementById("geography").value = str;
		});

		//提交
		document.getElementById("submit").addEventListener('tap', function(event) {
			var data = app.getDataByContent();
			var user = app.getUserInfo();
			if(data._err.length > 0) {
				mui.toast(data._err[0].message);
				return false;
			}
			if(!/^[A-Za-z0-9]+$/.test(data.card)){
				mui.toast('证件号内含有特殊字符');
				return;
			}
			if(!/^[0-9]*$/.test(data.contactphone)){
				mui.toast('联系电话格式不正确');
				return;
			}
			var startTime=new Date(document.getElementById('processtime_start').value);
			var endTime=new Date(document.getElementById('processtime_end').value);
			if(startTime>endTime){
				mui.toast('起始时间不得晚于结束时间');
				return false;
			}
			var base64 = app.getImageList(1, 3);
			data.Base64 = base64;
			mui.extend(data, {
				createuserid: user.ID,
				createtime: new Date().Format('yyyy-MM-dd hh:mm:ss')
			});

			var url = app.webApi + 'api/License/SmAddApproveInf';
			plus.nativeUI.showWaiting('提交中...');
			mui.ajax({
				url: url,
				data: data,
				type: 'post',
				success: function(data) {
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

		});

	});
});

//data: {
//              xksx: '许可事项 ',
//              splx: '1',                //   审批类型
//              b_address: 16514568,        
//              sxmx: '事项描述',
//              card: 213,
//              sqr: '张三',         //申请人
//              cardtype: '1',  //证件类型
//              card:'545454',    //证件号
//              contactphone: '2220',
//              s_address:'嘉兴市秀洲区',   //地址s  
//              processtime_start: '17年03月02日',
//              processtime_end: '17年03月08日',
//              processcontent: '同意',  //处理描述 
//              processaddress: '120.11860936160566,30.293781188355318',  //处理地点 
//              geography: '120.11860936160566,30.293781188355318',
//              
//              base64: base,
//          },