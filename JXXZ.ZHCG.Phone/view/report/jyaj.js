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

require(['mui', 'app', 'dataGet', 'pic', 'Vue', 'img', 'com', 'imageViewer', 'zoom'], function(
	mui, app, dataGet, pic, Vue, img, com, imageViewer, zoom) {
	mui.init({});
	var user = app.getUserInfo();
	var vm = new Vue({
		el: '.mui-content',
		data: {
			model: {
				createuserid: user.ID,
				persontype: 'type_zrr',
				p_sex: '男',
				jktype: '当场缴费',
				bank_name: '',
				bank_account: '',
				bank_accountname: '',
				bank_name_value: '',
				bank_account_value: '',
				bank_accountname_value: '',
				longitude: '',
				latitude: '',
				qlsx:'',
				qlsxid:'',
				flfg:'',
				clyj:'',
				wfqx:'',
				cf:''
			},
			items: {}
		},
		methods: {
			//提交方法
			submitForm: function() {
				var model = app.getDataByForm();
				var afTime=new Date(model.sitedatetime);
				var zfTime=new Date(model.zf_time);
				if(afTime>zfTime){
					mui.toast('案发时间不得晚于执法时间');
					return;
				}
				if(model.persontype=="type_zrr"){
					if(!/^[A-Za-z0-9]+$/.test(model.p_cardnum)){
						mui.toast('证件号内含有特殊字符');
						return;
					}
				}else{
					if(!/^[A-Za-z0-9]+$/.test(model.f_cardnum)){
						mui.toast('证件号内含有特殊字符');
						return;
					}
				}
				if(model.fk_money<0){
					mui.toast('罚款金额不得为负数');
					return;
				}
				mui.extend(model, {
					casecontent: '暂无案件描述',
					createuserid: user.ID
				});
				var data = img.createImageObject(model, 1, 3);
				var url = app.webApi + 'api/SimpleCase/AddSimpleCaseApi';
				if(data._err.length > 0) {
					mui.toast(data._err[0].message);
					return false;
				}
//				var imageSrc=img.createImageObject("", 1, 3, 1, 'photo');
				model.uploadpanelValue=app.getImageList(1, 3);
//				model.createuserid=user.ID;
				console.log(model)
				plus.nativeUI.showWaiting('提交中...');
				mui.ajax({
					url: url,
					type: 'post',
					data: model,
					success: function(data) {
						console.log(JSON.stringify(data));
						if(data.resCode == 1) {
							mui.alert("上报成功");
							var self = plus.webview.currentWebview();
							self.reload();

						} else {
							alert('上报失败!');
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
			//选择日期
			chooseDate: function(modelName, type) {
				var that = this;
				if(!type) type = 'datetime';
				var str = that.model[modelName];
				var pick = new mui.DtPicker({
					type: type,
					value: str
				});
				pick.show(function(items) {
					if(items.value != null) {
						Vue.set(that.model, modelName, items.value);
					}
					pick.dispose();
				});

			},
			chooseData: function(modelName, modelId) {
				var that = this;
				var data = that.items[modelId];
				if(!data || data.length == 0) return;
				dataGet.choosePick(data, {
					defaultValue: that.model[modelId] ? that.model[modelId] : ''
				}, function(items) {
					if(items.length == 0) return;
					//that.model[modelName] = items[0].text;
					//that.model[modelId] = items[0].value;
					Vue.set(that.model, modelName, items[0].text);
					Vue.set(that.model, modelId, items[0].value);
				});
			},
			chooseBank: function(bankName) {
				var that = this;
				var m = that.model;
				var data = that.items[bankName];
				if(!data) return;
				dataGet.choosePick(data, {
					defaultValue: m[bankName]
				}, function(items) {
					if(items.length == 0) return;
					if(m[bankName] != items[0].value) {
						m[bankName] = items[0].value;
						m[bankName + '_value'] = items[0].text;
						if(bankName == 'bank_name') {
							that.items['bank_account'] = items[0].children;
							Vue.set(that.model, 'bank_account', '');
							Vue.set(that.model, 'bank_account_value', '');

						} else if(bankName == 'bank_account') {
							that.items['bank_accountname'] = items[0].children;
							Vue.set(that.model, 'bank_accountname', '');
							Vue.set(that.model, 'bank_accountname_value', '');

						}
					}

				});

			},
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
				if(this.model.longitude){
					option.mapOption.center.latitude = this.model.latitude;
					option.mapOption.center.longitude = this.model.longitude;
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
			chooseqlsx: function(item) {
				var url = 'aylist.html';
				mui.openWindow({
					url: url,
					id: url,
				});

			}
		},
		computed: {
			geographical84: function() {
				if(this.model.longitude && this.model.latitude) {
					return this.model.longitude + ',' + this.model.latitude;
				} else {
					return '';
				}
			}
		}
	});

	//	function initializationImg(){
	//		var list=document.querySelectorAll(card);
	//		console.log(list)
	//	}
	//自然人证件类型
	dataGet.getTypeOfPerson(function(data) {
		vm.items["p_cardtype"] = data;
	});

	dataGet.getTypeOfUnit(function(data) {
		vm.items['f_cardtype'] = data;
	});

	//银行信息
	dataGet.getBank(function(data) {
		vm.items['bank_name'] = data;
	});

	dataGet.getCaseType(function(data) {
		vm.items['casetypeid'] = data;
	});

	mui.plusReady(function() {

		reload();

		img.initPhoto('.addphoto', function(img) {
			imageViewer.openImageOnly(img);
		});

		//刷新
		function reload() {
			Vue.set(vm.model, 'caseaddress', app.getAddress()); //更新地址
			var lon = app.getItem('longitude');
			var lat = app.getItem('latitude');
			vm.model.longitude = lon;
			vm.model.latitude = lat;
			Vue.set(vm.model, 'zfr_name', user.DisplayName);
			Vue.set(vm.model, 'zf_card', user.Code);
			Vue.set(vm.model, 'zf_address', app.getAddress());
			Vue.set(vm.model, 'zf_time', new Date().Format('yyyy-MM-dd hh:mm'));
		}

		//地址刷新
		document.getElementById("caseaddress-update").addEventListener('tap', function() {
			Vue.set(vm.model, 'caseaddress', app.getAddress()); //更新地址
		});

		//页面切换到本页面,更新地址.
		window.addEventListener('show', function() {
			reload();
		});

		window.addEventListener('clickMarker', function(e) {
			var marker = e.detail.marker;
			console.log(JSON.stringify(marker));
			vm.model.longitude = marker.longitude;
			vm.model.latitude = marker.latitude;
		});
		
		window.addEventListener('return', function(e) {
			var powername = e.detail.powername;
			var powerid = e.detail.powerid;
			var flfg = e.detail.flfg;
			var clyj = e.detail.clyj;
			var wfqx = e.detail.wfqx;
			var cf = e.detail.cf;
			vm.model.qlsx = powername;
			vm.model.qlsxid = powerid;
			vm.model.flfg = flfg;
			vm.model.clyj = clyj;
			vm.model.wfqx = wfqx;
			vm.model.cf = cf;
		});
	});
});