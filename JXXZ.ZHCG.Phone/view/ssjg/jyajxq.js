require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
	}
});

require(['mui','app','Vue'], function(mui, app,Vue) {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		console.log(JSON.stringify(self))
		var item = self.model;
		console.log(item)
		//获得详情
		getDetail(item);
		var vm = new Vue({
			el: '.mui-content',
			data: {
				model: {},
				items:[],
				ready:'flase'
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
				openTheInstrument:function(){
					var that=event;
					var url = that.target.getAttribute('name')
					if(url==undefined){
						mui.alert('文书下载失败，请重新下载')
						return
					}
					url=app.webApi+"GetPDFFile.ashx?PathClass=LegalCasePath&DocPath="+url;
					console.log(url)
					plus.nativeUI.showWaiting('下载中...');
					var task = plus.downloader.createDownload(url, {
						filename: "_downloads/",		//保存路径
						timeout:120,
						retryInterval:1,
						retry:3
					}, function(down, status) {
						if(status == 200) {
							//下载成功
							//打开文件
							plus.runtime.openFile(down.filename, {}, function(err) {
								//失败回调
								alert('文件打开错误!');
							});
							
						} else {
							//其他,下载没成功
							alert('下载失败!');
						}
						plus.nativeUI.closeWaiting();
					});
					task.start();
				}
			}
		})
		//详情
		function getDetail(item) {
			var url = app.webApi + 'api/SimpleCase/GetSimpleCaseModel?simpleid=' + item.id;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					console.log(data);
					var that = vm;
					for(var name in data) {
						if( that.model[name] && data[name] === null) { //如果原始data有值,data中为null 则不修改
							continue;
						}
						Vue.set(that.model, name, data[name]);
					}
					vm.ready='true'
//					data.xyAddress = '';
//					if(data.x84){
//						data.xyAddress = data.x84 + ',' + data.y84;
//					}
//					app.setFormByData(data);
//					app.putImageList('.addphoto',data.casewtfilelist);
					//alert(JSON.stringify(data));
				},
				error: function(x, t, e) {
					//app.errorMessage();
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		getRelatedDocuments(self.model.id);

		function getRelatedDocuments(caseid) {
			var url = app.webApi + 'api/DucumentTemplet/GetWFSASListAPI?caseid=' + caseid +'&tablename=case_simplecases';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//使用template.js来写的简易的模板js 模板在html页面当中
					vm.items=data
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		
	});
})