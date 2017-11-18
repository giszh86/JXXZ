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
	mui, app, dataGet, pic, img, common, imageViewer) {
	mui.init({});
	mui.plusReady(function() {

		//养护合同
		dataGet.getYHHTList(function(data) {
			document.getElementById("yhht").addEventListener('tap', function() {
				dataGet.choosePick(data, {
					text: '#yhhtname',
					value: '#yhcontract'
				}, function(items) {});
			});
		});

		img.initPhoto('.addphoto img', function(img) {
			imageViewer.openImageOnly(img);
		});

		//巡查日期
		document.getElementById("choosedate").addEventListener('tap', function() {
			dataGet.initDate('#patroltime');
		});
		
		//提交
		document.getElementById("submit").addEventListener('tap', function() {
			var user = app.getUserInfo();
			var data = app.getDataByContent();
			var patrol_time=document.getElementById("patroltime").value;
			var create_time=new Date().Format('yyyy-MM-dd hh:mm');
			if(patrol_time>=create_time){
				mui.toast('巡查时间不得晚于当前时间');
				return
			}
			mui.extend(data, {
				createtime: create_time,
				createuserid: user.ID
			});

			data = img.createImageObject(data, 1, 3);

			if(data._err.length > 0) {
				mui.toast(data._err[0].message);
				return false;
			}
			var url = app.webApi + 'api/YhLog/AddLogApi';
			console.log(url);
			plus.nativeUI.showWaiting('提交中...');
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					//alert(JSON.stringify(data));
					if(data.resCode == 1){
						alert(data.msg);
						var self = plus.webview.currentWebview();
						self.reload();
					}else{
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

		});
		
		reload();
		
		//show刷新
		function reload() {
			document.getElementById("patroltime").value = new Date().Format('yyyy-MM-dd hh:mm');
		}

		//页面切换到本页面,更新地址.
		window.addEventListener('show', function() {
			reload();
		});

	});
})