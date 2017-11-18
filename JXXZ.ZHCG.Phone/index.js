require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'position': 'position',
		'common': 'common'
	}
});

require(['mui', 'app', 'position', 'common'], function(mui, app, pos) {
	//mui初始化
	mui.init();
    //TODO:subpages子页面 subpage_style子页面样式 imgList图片路径
	var subpages = ['home.html', 'fastReport.html', 'page3.html', 'view/setting/setting.html'];
	var subpage_style = {
		top: '0px',
		bottom: '51px'
	};
	var imgList = ['image/index/shouye', 'image/index/ducha', 'image/index/tongxunlu', 'image/index/wo'];

	var aniShow = {};//TODO:是什么?
	var isUpdate = [];//TODO:是什么?
	var aList = document.querySelectorAll('.mui-bar-tab .mui-tab-item');
	for(var i = 0; i < aList.length; i++) {
		if(i >= subpages.length) return;
		aList[i].setAttribute('href', subpages[i]);//给所有的.mui-tab-item 添加href属性值为对于的子页面
	}

	//创建子页面，首个选项卡页面显示，其它均隐藏；
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		for(var i = 0; i < 4; i++) {
			var temp = {};
			var subpage = subpages[i];
			var temp = {};
			var sub = plus.webview.create(subpage, subpage, subpage_style);
			//			var sub = mui.preload({
			//				url: subpage,
			//				id: subpage,
			//				styles: subpage_style
			//			});
			if(i > 0) {
				//sub.hide();
				plus.webview.hide(sub);
			} else {
				temp[subpages[i]] = "true";
				mui.extend(aniShow, temp);
			}
			isUpdate[i] = false;
			self.append(sub);
		}

		//当前激活选项
		var activeTab = subpages[0];
		var title = document.getElementById("title");
		//选项卡点击事件
		mui('.mui-bar-tab').on('tap', 'a', function(e) {
			var targetTab = this.getAttribute('href');
			if(targetTab == activeTab) {
				return;
			}

			//隐藏当前;
			plus.webview.hide(activeTab);

			//显示目标选项卡
			//若为iOS平台或非首次显示，则直接显示
			if(mui.os.ios || aniShow[targetTab]) {
				plus.webview.show(targetTab);
			} else {
				//否则，使用fade-in动画，且保存变量
				var temp = {};
				temp[targetTab] = "true";
				mui.extend(aniShow, temp);
				plus.webview.show(targetTab, "fade-in", 300);
			}

			//更改当前活跃的选项卡
			activeTab = targetTab;
			var sub = plus.webview.getWebviewById(activeTab);
			//			console.log('show:' + activeTab);
			mui.fire(sub, 'show');

			updateAcitveImage(); //更新图片
		});

		function updateImagePath(data) {
			var arr = data.Report; //第2个页面
			if(arr && arr.length > 0) {
				var path = arr[0].icon;
				if(path) imgList[1] = path; //修改路径
			}
			arr = data.Page3;
			if(arr && arr.length > 0) {
				var path = arr[0].icon;
				if(path) imgList[2] = path;
			}
			updateAcitveImage(); //更新图片
		}

		function updateAcitveImage() {
			var doms = document.querySelectorAll("a.mui-tab-item");
			for(var i = 0; i < doms.length; i++) {
				if(i >= imgList.length) break;
				var a = doms[i];
				var imgPath = imgList[i];
				//if(a.classList.contains('mui-active')){		//包含
				//	imgPath += 1;
				//}
				if(activeTab == subpages[i]) {
					imgPath += 1;
				}
				imgPath += '.png';
				var img = a.querySelector('img');
				if(img && img.src != imgPath) {
					img.src = imgPath;
				}
			}
		}

		//等待首页加载完毕加载菜单.
		window.addEventListener('updateMenu', function(e) {

			var page = e.detail.page;
			console.log('页面' + page + '已经加载完毕');
			isUpdate[page] = true;
			if(page == 0) {
				var self = plus.webview.currentWebview();
				plus.webview.show(self);
			}
		});

		getMenu(); //更新权限.

		//获取菜单权限
		function getMenu() {
			var user = app.getUserInfo();
			var url = app.webApi + 'api/Menu/GetMenuByPhone?userID=' + user.ID;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//首页菜单权限.
					//console.log(JSON.stringify(data));

					updateImagePath(data); //更新图片

					updatePage(0, {
						menus: data.Menu,
						ToDo: data.ToDo
					});

					detailPage2(data.Report); //页面2的权限

					detailPage3(data.Page3); //第3页权限

				},
				error: function(x, t, e) {
					mui.toast('网络错误');
					plus.nativeUI.closeWaiting();
					mui.later(function() {
						fireApp('exit');
					}, 1000);
				}
			});
		}

		//更新第2个页面的信息权限.
		function detailPage2(data) {
			if(!data || data.length == 0) {
				mui.toast('权限配置有问题,请配置页码2的权限');
				return;
			} else {
				var obj = data[0]; //取第一个,只有一个权限.
				document.getElementById("tab2").innerText = obj.Name;
				updatePage(1, {
					data: obj
				});

			}
		}

		function detailPage3(data) {
			if(!data || data.length == 0) {
				mui.toast('权限配置有问题,请配置页面3的权限');
				return;
			} else {
				var obj = data[0];
				document.getElementById("tab3").innerText = obj.Name;
				updatePage(2, {
					data: obj
				});
			}
		}

		//传送给子页面数据.
		function updatePage(num, data) {
			if(isUpdate[num]) {
				var sub = plus.webview.getWebviewById(subpages[num]);
				mui.fire(sub, 'updateMenu', data);

			} else {
				window.setTimeout(function() {
					updatePage(num, data);
				}, 30);

			}
		}

		function fireApp(str) {
			var appid = plus.runtime.appid;
			var self = plus.webview.getWebviewById(appid);
			mui.fire(self, str);
		}

		//定位监听	
		function WatchLoaction(delay) {
			var _z = 0;
			plus.geolocation.watchPosition(function(position) {
				_z = 0;
				var codns = position.coords;

				//var point = new plus.maps.Point(codns.longitude,codns.latitude);

				var gcj02 = pos.transpose(position, 'gcj02');

				app.setItem('xgcj', gcj02.longitude);
				app.setItem('ygcj', gcj02.latitude);
				//存储现在坐标为84的坐标
				var wgs84 = pos.transpose(position, 'wgs84');
				position.coords.latitude = wgs84.latitude;
				position.coords.longitude = wgs84.longitude;
				position.coordsType = "wgs84";
				if(!position.addresses) position.addresses = '';
				//改为84坐标
				//				var gps = pos.gcj02ToWgs84(codns.latitude, codns.longitude);
				//					codns.latitude = gps.latitude;
				//					codns.longitude = gps.longitude;
				//					position.coordsType = 'wgs84';
				//保存
				app.setObject('position', position);
				window.localStorage.setItem('position_addresses', position.addresses); //地址信息
				window.localStorage.setItem('latitude', codns.latitude); //纬度
				window.localStorage.setItem('longitude', codns.longitude); //经度
				if(position.coords.altitude != 0) {
					uploadPosition(position);
					//console.log('success:' + new Date().Format('hh:mm:ss'));
				} else {
					//console.log('err:' + new Date().Format('hh:mm:ss'));
				}

			}, function(e) {
				_z++;
				//console.log(e.message);
				if(_z >= 3) {
					//_z = 0;
					mui.toast('获取位置信息失败');
					console.log(e.message);
				}

			}, {
				timeout: 10000,
				maximumAge: delay,
				provider: 'system',
				coordsType: 'wgs84',
				geocode: true
			});
		}

		function uploadPosition(position) {
			var user = app.getUserInfo();
			var codns = position.coords;
			var data = {
				userid: user.ID, //用户名
				x84: codns.longitude,
				y84: codns.latitude,
				speed: codns.speed,
				address: position.addresses,
				imeicode: plus.device.imei //设备号
			};
			var url = app.webApi + 'api/Positioning/UserHistoryPositions';
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					//console.log(JSON.stringify(position));

				},
				error: function(x, t, e) {
					//console.log(x);
					//console.log('上报定位失败');
				}
			});

		}

		WatchLoaction(10000);

		window.setTimeout(function() {
			updateVersion();
		}, 7000);

		//更新.
		function updateVersion() {
			var url = app.webApi + 'api/phone/GetVersion';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					var version = app.getItem('version');
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
					}
				},
				error: function(x, t, e) {
					console.log(x);
				}
			});
		}

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

		//首页返回键处理
		//处理逻辑：2秒内，连续两次按返回键，则退出应用；
		var first = null;
		//		var oldBack = mui.back;
		mui.back = function() {
			if(!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 2000);
			} else {
				if(new Date().getTime() - first < 2000) {
					//					app.setUserInfo({});
					//					oldBack();
					//var appid = plus.runtime.appid;
					//var self = plus.webview.getWebviewById(appid);
					//mui.fire(self, 'exit');

					//plus.runtime.quit();		//退出应用
					var main = plus.android.runtimeMainActivity();
					main.moveTaskToBack(false);
					
				}
			}
		};
	});

});