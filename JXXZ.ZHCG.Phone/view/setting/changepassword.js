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

	mui.plusReady(function() {
		
		var userinfo = app.getUserInfo();
		var USER_ID = userinfo.ID;
		
		document.getElementById("changePwdBtn").addEventListener('tap', function() {
			var oldPwd = document.getElementById("oldpwd").value;
			var newPwd = document.getElementById("newpwd").value;
			var reNewPwd = document.getElementById("renewpwd").value;
			if(!oldPwd) {
				alert("原始密码不能为空");
				return false;
			}
			if(!newPwd) {
				alert("新密码不能为空");
				return false;
			}
			if(newPwd != reNewPwd) {
				alert("两次密码不一致");
				return false;
			}
			//更新密码
			mui.ajax({
				url: app.webApi + 'api/User/ChangePassword',
				data: {
					ID: USER_ID,
					LoginPwd: oldPwd,
					NewLoginPwd: newPwd,
				},
				dataType: 'json',
				type: 'post',
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				success: function(data) {
					console.log(JSON.stringify(data));
					if(data == 2) {
						mui.toast("原始密码填写有误");
					} else {
						mui.toast("修改成功");
						mui.back();
					}
				},
				error: function(a, b, c) {
					mui.toast("网络错误");
					console.log(a);
				},
				complate: function() {

				}
			});
		})

	});
})