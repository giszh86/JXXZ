require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app'
	}
});

require(['mui', 'app'], function(mui, app) {
	mui.init();

	var _height = document.body.scrollHeight;
	document.querySelector('html').style.height = (_height - 0) + 'px';
	//内网
	app.setItem('Map-Ip', '172.16.65.133:8085');
	//app.setItem('Map-Ip','');

	//登录
	function userLogin(flg) {
		var user = document.getElementById("user").value;
		var pwd = document.getElementById("password").value;

		//		if(user == '') user = 'yaolan';
		//		if(!pwd) pwd = '123456';
		if(user == '') {
			mui.toast('请填写用户名称');
			return;
		}
		if(pwd == '') {
			mui.toast('请填写密码');
			return;
		}
		if(flg) {
			plus.nativeUI.showWaiting('登录中...', {
				back: 'none'
			});
		}
		var param = mui.param({
			loginname: user,
			loginpwd: pwd
		});
		var url = app.webApi + 'api/User/LoginApi?rnd=' + Math.random(); // + param;
		console.log(url);
		mui.ajax({
			url: url,
			type: 'post',
			data: {
				loginname: user,
				loginpwd: pwd
			},
			dataType: 'json',
			timeout: 30000,
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data == null) {
					mui.toast('账号或密码错误');
					plus.nativeUI.closeWaiting();
					return;
				}
				//TODO:是判断登陆角色
				var parentid = data.parentid;
				if(parentid == 2) {
					data.TeamID = data.UnitID;
				} else {
					data.TeamID = parentid;
				}

				data.LoginName = user;
				data.LoginPwd = pwd;
				//TODO:设置用户信息 然后保存到localStorage中
				app.setUserInfo(data);
				mui.openWindow({
					id: 'index.html',
					url: 'index.html',
					show: {
						autoShow: false
					},
					waiting: {
						autoShow: false
					}
				});


			},
			error: function(x, t, e) {
				//alert('登录失败');
				console.log(x);

				app.errorMessage(x, t, e, '登录失败');
				plus.nativeUI.closeWaiting();

			}
		});

	}
	//判断是否存在用户信息  存在的话就自动登录
	function flagUser() {
		var user = app.getUserInfo()
		//		console.log(JSON.stringify(app.getUserInfo()));

		if(user._status && user.LoginName && user.LoginPwd) {
			document.getElementById("user").value = user.LoginName;
			document.getElementById("password").value = user.LoginPwd;
			userLogin(true)
		}
	}

	//登录按钮 TODO:登陆调用userLogin(ture) 参数使用ture是为什么
	document.getElementById("loginbtn").addEventListener('tap', function() {
		userLogin(true);
	}, false);

	window.addEventListener('isLoader', function() {
		console.log('登录页:子页面加载结束');
		
		mui.openWindow({
			id: 'index.html',
			url: 'index.html'
		});
		setTimeout(function(){
			plus.nativeUI.closeWaiting();
		},500);
		
	});

	mui.plusReady(function() {
		//apk应用信息获取
		plus.runtime.getProperty(plus.runtime.appid, function(info) {
			var version = info.version;
			app.setItem('version', version);
			flagUser()
		});
	});

	//退出登录
	window.addEventListener('exit', function() {
		var selfs = plus.webview.all();
		var appid = plus.runtime.appid;
		var _self = plus.webview.currentWebview();
		_self.show();
		for(var i = 0; i < selfs.length; i++) {
			var self = selfs[i];
			if(self.id != appid) {
				self.close();
			}
		}
		app.setUserInfo("");
	});
});