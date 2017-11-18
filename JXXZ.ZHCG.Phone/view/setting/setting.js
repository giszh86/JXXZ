require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app'
	}
});

require(['mui', 'app'], function(mui, app) {
	mui.init();
	mui.plusReady(function() {
		document.getElementById("cqbtn").addEventListener('tap', function() {
			mui.openWindow({
				id: '../CQ/index.html',
				url: '../CQ/index.html',
				extras: {}
			})
		});

		var user = app.getUserInfo();
		for(var name in user) {
			var dom = document.getElementById(name);
			if(dom) app.setValue(dom, user[name]);
		}
		if(user.Path&&user.avatar){
			document.getElementById("image").src=app.imageApi + 'GetPictureFile.ashx?PathClass=' + user.Path + '&PicPath=' + user.avatar;
		}

		window.addEventListener('show', function() {
			//console.log('我显示');
			var user = app.getUserInfo();
			var roles = ',' + user.Roles + ',';
			if(roles.indexOf(',7,') > -1) { //一线执法队员权限
				document.getElementById("xcrz").style.display = 'block';
			} else {
				document.getElementById("xcrz").style.display = 'none';

			}

		});

//		document.getElementById("wenshu").addEventListener('tap', function() {
//			var url = this.getAttribute('url');
//			plus.nativeUI.showWaiting('下载中...');
//			var task = plus.downloader.createDownload(url, {
//				filename: "_downloads/"		//保存路径
//			}, function(down, status) {
//				if(status == 200) {
//					//下载成功
//					//打开文件
//					plus.runtime.openFile(down.filename, {}, function(err) {
//						//失败回调
//						alert('文件打开错误!');
//					});
//					
//				} else {
//					//其他,下载没成功
//					alert('下载失败!');
//				}
//				plus.nativeUI.closeWaiting();
//			});
//			task.start();
//		});

	});
});