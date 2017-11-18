require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'pic': 'mui.picker.all',
		'common': 'common',
		'DataGet': 'DataGet',
		'img': 'getBase64Image',
		'zoom': 'mui.zoom',
		'imageViewer': 'mui.previewimage'
	}
});

require(['mui', 'app', 'Vue', 'pic', 'common', 'DataGet', 'img', 'zoom', 'imageViewer'], function(mui, app, Vue, pic, common, dataGet, img, zoom, imageViewer) {
	mui.init({});

	mui.plusReady(function() {

		var vm = new Vue({
			el: '.mui-content',
			data: {
				model: {},
				zdnqpq: {},
				units: [],
				checkedUnits: [],
				sendmembers: []
			},
			methods: {
				showMap: function() {
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
					if(vm.model.address) {
						var gps = vm.model.address.split(",")
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
				liClick:function(unit){
					unit.checked = !unit.checked;
					vm.checkedUnits.splice(0);
					for (var i = 0; i < vm.units.length; i++) {
						if(vm.units[i].checked==true) vm.checkedUnits.push(vm.units[i]);
					}
				},
				teamMenbersSubmit: function() {
					var user = app.getUserInfo();
					var content = document.getElementById("teamMenberContent").value;
					var _phone='';
					var _hidedealusername='';
					var _isSendMsg=0;
					if(document.getElementById("checkboxID").checked) {
						 _isSendMsg=1
					} else {
						_isSendMsg=0
					}
					if(vm.checkedUnits.length == 0) {
						alert("请选择班组")
						return
					}else {
						for (var i = 0; i < vm.checkedUnits.length; i++) {
							_phone+=vm.checkedUnits[i].phone+',';
							_hidedealusername+=vm.checkedUnits[i].ID+',';
						}
						_phone=_phone.substring(0,_phone.length-1);
						_hidedealusername=_hidedealusername.substring(0,_hidedealusername.length-1);
					}
					if(content == "") {
						alert("请输入派遣意见")
						return
					}
					var param = {
						createuserid: user.ID,
						pviguid: item.pviguid,
						advice: content,
						wfdid: vm.model.wfdid,
						nextwfdid: vm.model.nextid,
						projectname: item.projectname,
						applyername: item.applyername,
						isSendMsg: _isSendMsg,
						phone: _phone,
						hidedealusername: _hidedealusername
					}
					var url = app.webApi + 'api/Approval/SmassignTeamber';
					plus.nativeUI.showWaiting('提交中...');
					mui.ajax({
						url: url,
						type: 'post',
						data: param,
						success: function(data) {
							if(data.success) {
								alert("提交成功")
								var father = plus.webview.currentWebview().opener().opener();
								mui.fire(father, 'refresh');
								mui.back()
							} else {
								alert("提交失败")
							}
						},
						error: function(x, t, e) {
							console.log(x);
						},
						complete: function() {
							plus.nativeUI.closeWaiting();
						}
					});
				},
				supervisionSubmit: function() {
					var user = app.getUserInfo();
					var content = document.getElementById("supervisionContent").value;
					if(content == "") {
						alert("请输入处理内容")
						return
					}
					var param = {
						createuserid: user.ID,
						pviguid: item.pviguid,
						advice: content,
						wfdid: vm.model.wfdid,
						nextwfdid: vm.model.nextid,
						geography: vm.model.address,
						nextuserid: vm.model.archivedealid,
						base64: app.getImageList(1, 3),
					}
					var url = app.webApi + 'api/Approval/SmmemberDeal';
					plus.nativeUI.showWaiting('提交中...');
					mui.ajax({
						url: url,
						type: 'post',
						data: param,
						success: function(data) {
							if(data.success) {
								alert("提交成功")
								var father = plus.webview.currentWebview().opener().opener();
								mui.fire(father, 'refresh');
								mui.back()
							} else {
								alert("提交失败")
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
			}
		});
		
		var self = plus.webview.currentWebview();
		var item = self.item;
		getDetail(item.pviguid);
		
		//获得详情
		function getDetail(pviguid) {
			var user = app.getUserInfo();
			var param = mui.param({
				pviguid: pviguid,
				userid: user.ID
			});
			var url = app.webApi + 'api/Approval/GetOnDealDetail?' + param;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					for(var name in data) {
						var value = data[name];
						if(value == null) value = '';
						Vue.set(vm.model, name, value);
					}
					vm.model.starttime=vm.model.starttime.substring(0,10);
					vm.model.endtime=vm.model.endtime.substring(0,10);
					app.putImageList('#xzxkk .addphoto', data.filelist, 'AdminApprovalOrignalPath', function(img) {
						imageViewer.openImage(img);
					});
					if(data.currentstage==1){
						getUnits(user.UnitID);
					}
					vm.model.address = app.getItem('longitude') + ',' + app.getItem('latitude');
					if(data.currentstage==2){
						document.getElementById("duiyuanchuli").style.display="block";
						//初始化照片选择
						img.initPhoto('.navigateright', function(img) {
							imageViewer.openImageOnly(img);
						});
						var _zdnqpq=data.dispatchteamlist[0];
						for(var name in _zdnqpq) {
							var value = _zdnqpq[name];
							if(value == null) value = '';
							Vue.set(vm.zdnqpq, name, value);
						}
						vm.sendmembers=vm.zdnqpq.sendmember;
					}
				},
				error: function(x, t, e) {
					console.log(x);
				}
			});
		}
		
		//获取中队下班组
		function getUnits(unitID){
			var url = app.webApi + 'api/Approval/GetUnitsChild?unitid=' + unitID;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var item = data[i];
						item.DisplayName=item.DisplayName.replace('组长','');
						item.checked=false;
						vm.units.push(item);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				}
			})
		}

		window.addEventListener('clickMarker', function(e) {
			var marker = e.detail.marker;
			console.log(JSON.stringify(marker));
			vm.model.address = marker.longitude + ',' + marker.latitude
		});
	});
})