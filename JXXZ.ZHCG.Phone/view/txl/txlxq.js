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
		var userid=self.userid;
		//获得详情
		getDetail(userid);
		//详情
		function getDetail(userid) {
			var url = app.webApi + 'api/phone/GetphoneDetails?userid=' + userid;
			console.log(url);
			plus.nativeUI.showWaiting('请稍候...');
			mui.ajax({
				url: url,
				success: function(data) {
					app.setFormByData(data);
					if(data.url&&data.avatar){
						document.getElementById("image").src=app.imageApi + 'GetPictureFile.ashx?PathClass=' + data.url + '&PicPath=' + data.avatar;
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
		
		document.getElementById("call-mobile").addEventListener('tap', function() {
			var phone = document.getElementById("mobile").innerText;
			if(phone) {
				plus.device.dial(phone, true);
			}
		});
		
		document.getElementById("call-phone").addEventListener('tap', function() {
			var phone = document.getElementById("phone").innerText;
			if(phone) {
				plus.device.dial(phone, true);
			}
		});
		
		document.getElementById("call-shortnumber").addEventListener('tap', function() {
			var phone = document.getElementById("shortnumber").innerText;
			if(phone) {
				plus.device.dial(phone, true);
			}
		});
	});
})