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
				personName: '', //人员名称
				personId: '', //人员id
				extensioTtime: '',
				agree: 'yes',
				userModerName: '',
				name:'',//处理人
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
				list: {

				},
				extension: 0,
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
				//流程流转.
				submitEvent: function(nextId, event, msg, before) {

					var data = app.getDataByContent();
					var user = app.getUserInfo();
					mui.extend(data, {
						processuserid: user.ID,
						nextwfdid: nextId,
						wfcreateuserid: user.ID,
//						nextwfuserids: 0,
					});
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
		  },
		});
		
		Vue.nextTick(function(){
			img.initPhoto('.detail3');	
		});
		

		getDetail(_model.citizenid);
		bindArr();

        //获取处理人
        function GetDealPeople(data){
        	var that = vm;
        	var url=app.webApi+'api/CitizenEvent/GetQuickReportUsers?wfsid='+data;
        	mui.ajax({
        		url:url,
        		success:function(data){
        			for(var name in data){
        				Vue.set(that.model, name, data[name]);
        			}
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
                    
					clImage(data.attachment); //处理图片
					clValue(data); //处理其他数据
                    GetDealPeople(data.wfsid);
					var that = vm;
					for(var name in data) {
						if(that.model[name] && data[name] === null) { //如果原始data有值,data中为null 则不修改
							continue;
						}
						Vue.set(that.model, name, data[name]);
						Vue.set(that.model, name + 'Id', data[name]);
					}
					var nextProcessingID = that.model.wfdid;
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

		//图片处理
		function clImage(list) {
			var that = vm;
			for(var i = 0; i < list.length; i++) {
				var img = list[i];
				img.FILEPATH = app.imageApi + 'GetPictureFile.ashx?PathClass=CitizenServiceOriginalPath&PicPath=' + img.OriginalPath;
				console.log(img.FILEPATH);
				if(img.WFDID == '2017021410240010') { //wfdid等于2017021410240010是处理前,否则都是处理后.
					that.beforeImage.push(img);
				} else {
					that.endImage.push(img);
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