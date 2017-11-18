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
				model: {

				},
				dispatchteamlist: []
			},
			methods: {
				showMap: function() {
					var option = {
						title: '选择坐标',
						mapOption: {
							center: {

							}
						}
					}
					if(this.innerText) {
						var gps = this.innerText.split(",")
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
				}
			}
		});
		
		var self = plus.webview.currentWebview();
		var item = self.item;
		getFlowDetail(item.pviguid);
		
		//获得详情
		function getFlowDetail(pviguid) {
			var user = app.getUserInfo();
			var param = mui.param({
				pviguid: pviguid,
				userid: user.ID
			});
			var url = app.webApi + 'api/Approval/GetFlowDetail?' + param;
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
					vm.dispatchteamlist=data.dispatchteamlist;
				},
				error: function(x, t, e) {
					console.log(x);
				},complete: function(){
					window.setTimeout(function() {
						for(var i = 0; i < vm.dispatchteamlist.length; i++) {
							var dispatchteam=vm.dispatchteamlist[i];
							if(dispatchteam.nqstatus==1){
								for(var j = 0; j < dispatchteam.memberlist.length; j++) {
									var member=dispatchteam.memberlist[j];
									if(member.filelist){
										var selector='#dycl'+member.dyid+' .addphoto';
										app.putImageList(selector, member.filelist, 'AdminApprovalOrignalPath', function(img) {
											imageViewer.openImage(img);
										});
									}
								}
							}
						}
					}, 500);
				}
			});
		}
	});
})