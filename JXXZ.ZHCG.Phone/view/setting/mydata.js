require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui','app'], function(_, mui, app) {

	mui.init({});

	mui.plusReady(function() {
		var user = app.getUserInfo();
		for(var name in user){
			var dom = document.getElementById(name);
			if(dom) app.setValue(dom,user[name]);
		}
		if(user.Path&&user.avatar){
			document.getElementById("image").src=app.imageApi + 'GetPictureFile.ashx?PathClass=' + user.Path + '&PicPath=' + user.avatar;
		}
	});
})