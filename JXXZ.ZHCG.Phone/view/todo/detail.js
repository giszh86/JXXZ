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
	mui, app, dataGet, pic, Vue, img, imageViewer, zoom) {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var _model = self.model;

		var vm = new Vue({
			el: '.mui-content',
			data: {
				citizenid: '',
				isReady: false,
				notChooseNQ: false,
				notChooseXT: false,
				officeusername: '请选择',
				nextusername: '请选择',
				groupName: '', //班组名称
				groupId: '', //班组id
				personName: '', //人员名称
				personId: '', //人员id
				extensioTtime: '',
				agree: 'yes',
				userModerName: '',
				phone: '无号码',
				model: {
					satisfaction: "无法联系",
					satisfactionId: '无法联系',
					processmode: '教育劝导',
					processmodeId: '教育劝导',
				},
				item: {},
				beforeImage: [],
				endImage: [],
				phoneChecked:false,
				list: {

				},
				extension: 0
			},
			methods: { //方法.
				location: function(event) {
					var option = {
						title: '地图查看',
						mapOption: {
							center: {
								visible: true
							}
						}
					};
					var geo = event.target.innerText;
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
				},
				openimage: function(event) {
					var img = event.currentTarget;
					imageViewer.openImage(img);
				},
				showPicture: function(event, index) {
					var dom = event.currentTarget;
					var z = dom.getAttribute('imgindex');
					img.showPicture.call(dom, index);

				},
				pickList: function(arrayName, value, text) {
					var vm = this.model;
					dataGet.choosePick(arrayName, {
						defaultValue: vm[value]
					}, function(items) {
						if(items.length == 0) return;
						Vue.set(vm, value, items[0].value);
						Vue.set(vm, text, items[0].text);
					});
				},
				chooseNQ: function() {
					var that = this;
					if(!that.list.personnelList) return;
					dataGet.choosePick(that.list.personnelList, {
						text: '#chooseNQ',
						value: '#chooseNQID'
					}, function(items) {
						if(items.length == 0) return;
						that.model.nextuserid = items[0].value;
						getUserModel(items[0].value)
					});
				},
				chooseXT: function() {
					var that = this;
					if(!that.list.userStaffList) return;
					dataGet.choosePick(that.list.userStaffList, {
						text: "#chooseXT",
						value: '#chooseXTID'
					}, function(items) {
						if(items.length == 0) return;
						that.model.officeuserid = items[0].value;
						getUserModel(items[0].value)
					});
				},

				/**
				 * 选择
				 * @param {String} arrayName dataget中全局变量名
				 * @param {Object} value value放的位置
				 * @param {Object} text  text放的位置
				 * @param {Object} fatherValue  父节点的value放的位置
				 */
				chooseList: function(arrayName, value, text, fatherValue) {
					var vm = this;
					if(fatherValue) {
						var val = vm[fatherValue];
						if(!val) return;
					}

					dataGet.choosePick(arrayName, {
						defaultValue: vm[value]
					}, function(items) {
						if(items.length == 0) return;
						Vue.set(vm, value, items[0].value);
						Vue.set(vm, text, items[0].text);
						if(vm.personName != '') {
							console.log(items[0].value)
							getUserModel(items[0].value)
						}
					});

				},

				//流程流转.
				submitEvent: function(nextId, event, msg, before) {
					var that=this;
					var data = app.getDataByContent();
					var user = app.getUserInfo();
					var _nextwfuserids = data.nextwfuserids; //原始值.
					mui.extend(data, {
						processuserid: user.ID,
						nextwfdid: nextId,
						wfcreateuserid: user.ID,
						nextwfuserids: 0,
						isSendMsg:this.phoneChecked?'1':'0',
						limittime:this.model.limittime
						//nextwfuserids: this.model.nextuserid //下一步流程处理人
					});
					console.log(data)
					debugger
					//下一步是中队审核
					if(nextId == '2017021410240004') {
						data.nextwfuserids = this.model.nextuserid;
					}

					//下一步是指挥中心审核
					if(nextId == '2017021410240005') {
						data.nextwfuserids = this.model.officeuserid;
						//						data.nextwfuserids = 0;
					}

					//局领导审核,nextwfuserids改成0,金元要求.
					if(nextId == '2017021410240001') {
						data.nextwfuserids = 0;
					}

					//队员处理,要改成下一步流程处理人,金元要求.
					if(nextId == '2017021410240003') {
						data.nextwfuserids = _nextwfuserids;
					}

					//领导处理,要改成下一步流程处理人,金元要求.
					if(nextId == '2017021410240009') {
						data.nextwfuserids = null;
					}

					if(msg && msg.indexOf('回退') > -1) {
						data.nextwfuserids = 0;
					} else {
						data = img.createImageObject(data, 1, 3, 1, 'photo');
					}

					if(typeof(before) == 'function') {
						var flg = before(data);
						if(flg === false) return;
					}

					if(msg && msg.indexOf('回退') > -1) {
						if(!confirm('确认回退?')) {
							return;
						}
					}

					//console.log(data);
					var url = app.webApi + 'api/CitizenEvent/CizitenEventFlowLink'
					console.log(url);
					plus.nativeUI.showWaiting('提交中...');
					mui.ajax({
						url: url,
						type: 'post',
						data: data,
						success: function(data) {
							if(typeof(data) == 'string') {
								data = JSON.parse(data);
							}
							if(data.resCode == 1) {
								if(!msg) msg = data.msg;
								var f_self = self.opener();
								alert(msg);
								mui.fire(f_self, 'back');
								//mui.back();
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
				},
				submitExtension: function() {
					var data = {};
					data.day = document.getElementById("extensioTtime").value;
					data.extensioncontent = document.getElementById("extensioncontent").value;
					data.citizenid = vm.citizenid;
					console.log(JSON.stringify(data))

					var url = app.webApi + 'api/CitizenEvent/EditExtension?'
					console.log(url);
					plus.nativeUI.showWaiting('提交中...');
					mui.ajax({
						url: url,
						type: 'get',
						data: data,
						success: function(data) {
							alert('提交成功!');
							var f_self = self.opener();
							mui.fire(f_self, 'back');
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
			},
			watch: {
				groupId: function(val, oldVal) {
					if(val != oldVal) {
						this.personName = '';
						this.personId = '';
						this.userModerName = '';
						this.phone = '无号码';
						dataGet.getPersonByGroup(val, function(data) {});
					}
				},
				personId: function(val) {
					this.model.processuserid = val;
				},
				extensioTtime: function(val) {
					this.extensioTtime = this.extensioTtime.replace(/[^0-9-]+/, '');
				}
			}

		});
		
		Vue.nextTick(function(){
			img.initPhoto('.detail3');	
		});
		

		getDetail(_model.citizenid);
		bindArr();

		//根据userID获取姓名，手机号
		function getUserModel(userID) {
			var url = app.webApi + 'api/User/GetUserModel?userid=' + userID;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					if(data == null) {
						return
					} else if(data.mobile == null) {
						vm.userModerName = data.name;
						vm.phone = '无号码';
					} else {
						vm.userModerName = data.name;
						vm.phone = data.mobile;
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

		//获得详情
		function getDetail(citizenid) {
			var url = app.webApi + 'api/CitizenEvent/GetCitizenServiceModel?citizenid=' + citizenid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//8月11号要求:将内勤回退后，detail3页面中的“处理后照片”去掉
                    if(data.wfdid== '2017021410240003'){
                    	cllImage(data.attachment); //跳入detail3页面的照片处理
                    }else{
                    	clImage(data.attachment); //其他页面处理图片
                    }
					clValue(data); //处理其他数据

					var that = vm;
					for(var name in data) {
						if(that.model[name] && data[name] === null) { //如果原始data有值,data中为null 则不修改
							continue;
						}
						Vue.set(that.model, name, data[name]);
						Vue.set(that.model, name + 'Id', data[name]);
					}
					var nextProcessingID = that.model.wfdid;
					//判断是否是队员处理,并且没有审核的内勤
					if(nextProcessingID == '2017021410240003' && !that.model.nextuserid) { //队员处理环节,并且需要选择内勤
						dataGet.getUsersPersonnelList(function(data) {
							that.list.personnelList = data;
							that.nextusername = data[0].text;
							that.model.nextuserid = data[0].value;
							getUserModel(data[0].value)
						});
						that.notChooseNQ = true;
					}

					//判断是否是内勤审核,并且没有归档的指挥中心
					if(nextProcessingID == '2017021410240004' && !that.model.officeuserid) {
						dataGet.getUsersStaffList(function(data) {
							that.list.userStaffList = data;
							that.officeusername = data[0].text;
							that.model.officeuserid = data[0].value;
							getUserModel(data[0].value)
						});
						that.notChooseXT = true;
					}
					if(nextProcessingID == '2017021410240003' && that.model.nextuserid) {
						getUserModel(that.model.nextuserid)
					}
					if(nextProcessingID == '2017021410240007' || nextProcessingID == '2017021410240004' || nextProcessingID == '2017021410240008' && that.model.officeuserid) {
						getUserModel(that.model.officeuserid)
					}
					that.isReady = true;
					that.citizenid = data.citizenid;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}

		//初始化数组
		function bindArr() {
			var user = app.getUserInfo();
			var unitId = user.UnitID;
			vm.list.teamGroupList = initArray();
			dataGet.getTeamGroup(unitId, function(data) {
				vm.list.teamGroupList.splice(0);
				for(var i = 0; i < data.length; i++) {
					vm.list.teamGroupList.push(data[i]);
				}
			});
		}

		function initArray() {
			var arr = [{
				text: '加载中,请稍后...',
				value: null
			}];
			return arr;
		}

		//其他页面图片显示
		function clImage(list) {
			var that = vm;
			for(var i = 0; i < list.length; i++) {
				var img = list[i];
				img.FILEPATH = app.imageApi + 'GetPictureFile.ashx?PathClass=CitizenServiceOriginalPath&PicPath=' + img.OriginalPath;
				//				console.log(img.FILEPATH);
				if(img.WFDID == '2017021410240010') { //wfdid等于2017021410240010是处理前,否则都是处理后.
					that.beforeImage.push(img);
				} else {
					that.endImage.push(img);
				}
			}
		}
		
		//detail3页面照片显示
        function cllImage(list) {
			var that = vm;
			for(var i = 0; i < list.length; i++) {
				var img = list[i];
				img.FILEPATH = app.imageApi + 'GetPictureFile.ashx?PathClass=CitizenServiceOriginalPath&PicPath=' + img.OriginalPath;
				//				console.log(img.FILEPATH);
				if(img.WFDID == '2017021410240010') { //wfdid等于2017021410240010是处理前,否则都是处理后.
					that.beforeImage.push(img);
				}else{
//					that.endImage.push(img);    //8月11号要求：将内勤审核回退后将中队上传的处理照片清空
				}
			}
		}
        
		function clValue(data) {
			var that = vm;
			var item = that.model;
			item.pq_username = '';
			item.pq_content = ''
			for(var i = 0; i < data.workflowold.length; i++) {
				var model = data.workflowold[i];
				if(model.wfdid == '2017021410240002') { //事件派遣
					item.pq_username = model.username;
					item.pq_content = model.content;
				} else if(model.wfdid == '2017021410240003') { //事件处理阶段
					item.cl_content = model.content; //处理意见
					item.cl_username = model.username; //处理人.

				}
			}
		}

	});

});