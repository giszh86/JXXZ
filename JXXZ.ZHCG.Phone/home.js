require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'imm': 'immersed',
		'position': 'position',
		'common': 'common',
		'beep': 'beepCall'
	}
});

require(['mui', 'app', 'Vue', 'imm', 'position', 'beep', 'common'], function(mui, app, Vue, imm, position, beep) {
	mui.init({});

	var slider = mui("#sliderone");
	slider.slider({
		interval: 2000
	});

	var vm = new Vue({
		el: '#vue-list',
		data: {
			menus: [],
			list: [],
			data: {
				ID: null,
				Name: null,
				ParentID: null,
				Path: null,
				Url: null,
				Comment: null,
				icon: null,
				Type: null
			}
		},
		methods: {
			openWindow: function(menu) {
				//alert(JSON.stringify(menu));
				if(menu.Path) {
					var option = {
						id: menu.Path,
						url: menu.Path,
						show: {
							autoShow: true
						},
						waiting: {
							autoShow: true
						}
					};

					if(menu.Path == 'view/qd/teamhistory.html') {
						option.show.autoShow = false;
					}
					mui.openWindow(option);

				} else {

					if(!menu.Children || menu.Children.length == 0) {
						mui.toast('请配置权限!');
						return;
					} else {
						var pages = [];
						for(var i = 0; i < menu.Children.length; i++) {
							var temp = menu.Children[i];
							var obj = {
								title: temp.Name,
								url: temp.Path,
								extras: {}
							}
							pages.push(obj);
						}
						var url = 'sliders.html';
						mui.openWindow({
							url: url,
							id: url,
							extras: {
								title: menu.Name,
								pages: pages
							},
							show: {
								autoShow: false
							}
						});
					}

				}
			},
			openEvent: function(item) {
				var url = 'view/todo/todo.html';
				//var url = 'searchEvent.html?id=1';
				//var obj = JSON.parse(this.data.Comment);
				//obj.item = item;
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						model: item
					}
				});
			},
			openCase: function(item) {
				var url = 'view/dsh/caseDetail.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						item: item
					}
				});
			},
			openMaintainList: function(item) {
				var url = 'view/yhdb/wtxq.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						item: item
					}
				});
			}
		}

	});

	var _start = 0;
	var _totalCount = 0;
	var _limit = 5;

	function pullupRefresh() {
		//console.log('下拉刷新');
		if(!vm.data.Url) {
			window.setTimeout(function() {
				pullupRefresh();
			}, 500);
			return;
		}
		var user = app.getUserInfo();
		var param = mui.param({
			filter: [],
			title: '',
			start: _start,
			limit: _limit,
			page: 1,
			userid: user.ID,
			status: 1
		});

		var url = vm.data.Url + '?';
		var that = this;

		url = app.webApi + url + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				vm.list.splice(0);
				//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				var lists = vm.list
				//_start += data.Items.length;
				//				console.log(data)
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					if(typeof(item.attachment) == 'object') {
						item.imgSrc = app.getPhotoPath(item.photo1, 'image/nophoto.png');
					}
					if(typeof item.date == 'string') {
						item.date = item.date.replace(/\s(\d{1,2}:){2}\d{1,2}/, '');
					}

					lists.push(item);
				}
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				//mui('#pullrefresh').pullRefresh().endPullToRefresh(_start >= _totalCount);
				autoHeight();
				//结束旋转特效

				setTimeout(function() {
					document.getElementById("reload").className = 'mui-icon mui-icon-loop mui-pull-left';
				}, 200);

			}
		});

	}

	//是否有周边警力的权限
	var flagPolice = false;

	function updateZBJL(flg) {
		var menu = vm.menus.find(function(model) {
			return model.Name == '周边警力';
		});
		if(menu) {
			flagPolice = true;
			var user = app.getUserInfo();
			var pos = app.getObject('position'); //位置对象	//84
			if(!(pos && pos.coords)) {
				console.log('没有定位信息');
				if(flg) {
					window.setTimeout(function() {
						updateZBJL(flg);
					}, 15000);
				}
				return;
			}
			var wsg84 = position.transpose(pos, 'wgs84');
			var param = mui.param({
				userId: user.ID,
				x84: wsg84.longitude,
				y84: wsg84.latitude,
				radius: 1,
			});
			var url = app.webApi + 'api/phone/GetPeripheryUserCount?' + param;
			//console.log(url)
			mui.ajax({
				url: url,
				type: 'get',
				success: function(data) {

					menu.count = data;

					beep.call('周边警力', data);
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(flg) {
						window.setTimeout(function() {
							updateZBJL(flg);
						}, 15000);
					}
				}
			});
		}
	}

	//更新页面.
	function reload() {
		updateCount(); //更新角标数字.
		_start = 0;
		_totalCount = 0;
		vm.list.splice(0);
		pullupRefresh();
		updateZBJL(false)
	}

	var _pushCount = 0;

	function updateCount(flg) {

		pullupRefresh(); //更新列表

		var pushCount = 0;
		var user = app.getUserInfo();
		var _z = 0;

		for(var i = 0; i < vm.menus.length; i++) {
			var menu = vm.menus[i];
			var url = menu.Url;
			var param = mui.param({
				userid: user.ID,
				type: user.Roles
			});
			if(url) {
				url = app.webApi + url + '?' + param;
								console.log(url);
				(function(m, url) {

					mui.ajax({
						url: url,
						success: function(data) {
							var sum = 0;
							if(typeof(data) == 'number') {
								sum = data;
							} else {
								for(var n in data) {
									var num = parseInt(data[n]);
									sum += num;
								}
							}
							m.count = sum;

							pushCount += sum;
						},
						error: function(x, t, e) {
							m.count = 0;
						},
						complete: function() {
							_z++;
							if(_z == vm.menus.length) {
								if(!flg) updatePush(pushCount);
							}
						}
					});

				})(menu, url);
			} else {
				_z++;
				if(_z == vm.menus.length) {
					if(!flg) updatePush(pushCount);
				}
			}

		}

		if(flg) {
			window.setTimeout(function() {
				updateCount(flg);
			}, 20000);
		}

	}

	updateCount(true);

	//更新推送
	function updatePush(count) {
		if(count > 0) { //大于推送数量
			console.log('推送消息');
			plus.push.createMessage('你有新的待办事项', '嘉兴秀洲', {
				cover: true
			});
		}
		_pushCount = count;

		//		window.setTimeout(function() {
		//			//20秒监听一次消息
		//			updateCount();
		//		}, 10000);
	}

	function autoHeight() {
		var dom = document.getElementById("scroll-list");
		if(!dom) return;
		var height = window.innerHeight;

		dom.style.height = (height - dom.offsetTop) + 'px';
	}

	mui.plusReady(function() {

		var _self = plus.webview.currentWebview().opener();
		mui.fire(_self, 'updateMenu', {
			page: 0
		}); //通知父级可以更新菜单了.

		//更新菜单.
		window.addEventListener('updateMenu', function(e) {
			var menus = e.detail.menus;
			//			alert(JSON.stringify(menus));
			//			console.log(JSON.stringify(menus));

			vm.menus.splice(0);
			for(var i = 0; i < menus.length; i++) {
				var menu = menus[i];
				menu.count = 0;
				vm.menus.push(menu);
				if(menu.Name == "周边警力") {
					flagPolice = true;
				}
			}

			//更新待办事件
			//只处理第一条
			var todo = e.detail.ToDo[0];
			if(todo) {
				for(var name in todo) {
					vm.data[name] = todo[name];
				}
			}

			reload(); //刷新页面

			fireApp('isLoader');

			updateZBJL(true); //更新周边警力数量.
		});

		//左上角更新按钮,
		document.getElementById("reload").addEventListener('tap', function() {
			reload();
			document.getElementById("reload").className = 'mui-icon mui-icon-loop mui-pull-left Rotate';
		}, false);

		window.addEventListener('reload', function() {
			console.log('重新加载首页信息.');
			reload();
		});

		function fireApp(str) {
			var appid = plus.runtime.appid;
			var self = plus.webview.getWebviewById(appid);
			mui.fire(self, str);

		}

	});

});