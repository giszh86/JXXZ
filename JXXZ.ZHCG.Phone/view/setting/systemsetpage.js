require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui', 'app'], function(_, mui, app) {

	mui.init({});
	var version = app.getItem("version");
	document.getElementById("version").innerText = version;

	mui.plusReady(function() {
		//版本更新
		document.getElementById("update").addEventListener('tap', function() {
			var url = app.webApi + 'api/phone/GetVersion';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					console.log(JSON.stringify(data));
					if(compareVersion(version, data.version)) {
						plus.ui.confirm(data.note, function(i) {
							if(i.index == 0) {
								plus.nativeUI.showWaiting('安装包下载中,请稍后...');
								var dtask = plus.downloader.createDownload(data.url, {}, function(d, status) {
									plus.nativeUI.closeWaiting();
									if(status == 200) {
										plus.runtime.install(d.filename, {
											//force: true
										}, function() {

											mui.alert("更新成功,将重启", function() {
												plus.runtime.restart();
											});

										}, function(e) {
											//mui.alert(e.message);
											alert('安装失败!');
										});
									} else {
										mui.alert("下载更新文件失败: " + status);
									}

								});
								dtask.start();

							}

						}, data.title, ['立即更新', '取          消']);
					} else {
						alert('当前版本已是最新版本');
					}
				},
				error: function(x, t, e) {
					console.log(x);
				}
			});
		});

		document.getElementById("tuichu").addEventListener('tap', function() {
			if(window.confirm("确定退出?")) {
				var appid = plus.runtime.appid;
				var self = plus.webview.getWebviewById(appid);
				mui.fire(self, 'exit');
			}
		});

		/**
		 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
		 * @param {String} ov
		 * @param {String} nv
		 * @return {Boolean}
		 */
		function compareVersion(ov, nv) {
			if(!ov || !nv || ov == "" || nv == "") {
				return false;
			}
			var b = false,
				ova = ov.split(".", 4),
				nva = nv.split(".", 4);
			for(var i = 0; i < ova.length && i < nva.length; i++) {
				var so = ova[i],
					no = parseInt(so),
					sn = nva[i],
					nn = parseInt(sn);
				if(nn > no || sn.length > so.length) {
					return true;
				} else if(nn < no) {
					return false;
				}
			}
			if(nva.length > ova.length && 0 == nv.indexOf(ov)) {
				return true;
			}
		}
	});
})