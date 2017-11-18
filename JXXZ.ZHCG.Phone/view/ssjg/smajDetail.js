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

require(['mui', 'app', 'dataGet', 'pic', 'Vue', 'img','imageViewer','zoom'], function(
	mui, app, dataGet, pic, Vue, img,imageViewer) {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var _model = self.model;
		var wfdid = _model.wfdid;
		var vm = new Vue({
			el: '.mui-content',
			data: {
				isReady: false,
				notChooseNQ: false,
				notChooseXT: false,
				officeusername: '请选择',
				nextusername: '请选择',
				groupName: '', //班组名称
				groupId: '', //班组id
				personName: '', //人员名称
				personId: '', //人员id
				agree: 'yes',
				eventProcessingDisplay:false,
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
				sfzxzz:0
			},
			methods:{
				location:function(event){
					var option = {
						title: '地图查看',
						mapOption: {
							center: {
								visible: true
							}
						}
					};
					var geo = event.target.innerText;
					if(geo){
						var point = geo.split(',');
						var lon = parseFloat(point[0]);
						var lat = parseFloat(point[1]);
						option.mapOption.center.latitude = lat;
						option.mapOption.center.longitude = lon;
					}else{
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
				openimage:function(event){
					var img = event.currentTarget;
					imageViewer.openImage(img);
				}
				
			}
		});

		getDetail(_model.citizenid);

		//获得详情
		function getDetail(citizenid) {
			var url = app.webApi + 'api/CitizenEvent/GetCitizenServiceModel?citizenid=' + citizenid;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
//					console.log(JSON.stringify(data));
					clImage(data.attachment); //处理图片
					clValue(data); //处理其他数据
					

					var that = vm;
					for(var name in data) {
						if(that.model[name] && data[name] === null) { //如果原始data有值,data中为null 则不修改
							continue;
						}
						Vue.set(that.model, name, data[name]);
					}
					//判断环节的尾数为4569的显示事件处理
//					var eventProcessing=data.wfdid.charAt(data.wfdid.length-1);
//					if(eventProcessing=='4' || eventProcessing=='5'|| eventProcessing=='6'|| eventProcessing=='9'){
//						that.eventProcessingDisplay=true;
//					}
//					if(data.IsSend==1){
						that.eventProcessingDisplay=data.IsSend;
//					}
					
					
					that.isReady = true;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
					
				}
			});
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
				}else if(model.wfdid == '2017021410240003') { //事件处理阶段
					item.cl_content = model.content; //处理意见
					item.cl_username = model.username; //处理人.
					item.cl_dealtime=model.dealtime;//处理时间
				}else if(model.wfdid == '2017021410240004') { //中队审核
					item.zd_content = model.content; //审核意见
					item.zd_username = model.username; //审核人.
				}else if(model.wfdid == '2017021410240006') { //归档阶段
					item.sh_content = model.content; //审核意见
					item.sh_username = model.username; //审核人.

				}
			}
		}
		document.getElementById("history").addEventListener('tap',function(data){
			mui.openWindow({
				url: '../todo/history.html',
				id: '../todo/history.html',
				extras: {
					wfdid: wfdid,
					model: _model
				}
			});
		});
	});
});