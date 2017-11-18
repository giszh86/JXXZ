require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'pic': 'mui.picker.all', //mui列表插件
		//app组建:图片处理请求,url请求按钮搜索,网络请求错误
		'app': 'app',
		'Vue': 'vue/vue.min',
		'dataGet': 'DataGet', //基础数据列表
	}
});

require(['mui', 'app', 'pic', 'Vue', 'dataGet'], function(mui, app, pic, Vue, dataGet) {
	mui.init({});
	console.log()
	mui.plusReady(function() {
		var vm = new Vue({
			el: '.mui-content',
			data: function() {
				return {
					userModerName: '',
					phone: '无号码',
				}

			}
		})
		var obj = [{
			text: '一般',
			value: 1
		}, {
			text: '紧急',
			value: 2
		}, {
			text: '特急',
			value: 3
		}]
		document.getElementById('UrgencyName').addEventListener('tap', function() {
			dataGet.choosePick(obj, {
				text: '#UrgencyName',
				value: '#level'
			}, function(items) {

			});
		})
		var self = plus.webview.currentWebview();
		console.log(JSON.stringify(self))
		getUserModel(self.item.clrid)

		function getUserModel(userID) {
			var url = app.webApi + 'api/User/GetUserModel?userid=' + userID;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					console.log(data)
					if(data == null) {
						return
					} else if(data.mobile == null) {
						vm.userModerName = data.name;
						vm.phone = '无号码';
					} else {

						vm.userModerName = data.name;
						vm.phone = data.mobile;
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
		//		setInterval(function(){
		//      for(var i = 0; i<mui("#checkboxID").length; i++){
		//          var checkbox = mui("#checkboxID")[i];
		//          if(checkbox.checked){
		//              getUserModel(userID)
		//          }else{
		//              // do something
		//          }
		//      }
		//  	},2000);
		document.getElementById('submit').addEventListener('tap', function(event) {
			getUserModel()
			var data = app.getDataByForm();
			data.caseid = self.item.caseid;

			data.phone = vm.phone;
			data.isSendMsg = ''; 
			
				if(document.getElementById("checkboxID").checked) {
					 data.isSendMsg=1
				} else {
					data.isSendMsg=0
				}
			

			data.workflowid = '';
			data.userid = self.item.clrid;
			data.createuserid = app.getUserInfo().ID;
			debugger;
			if(data._err.length > 0) {
				mui.toast(data._err[0].message);
				return false;
			}
			var url = app.webApi + 'api/Leadersupervise/AddLeadersuperviseApi';
			console.log(url);
			//显示提交中
			plus.nativeUI.showWaiting('提交中...');
			mui.ajax({
				url: url,
				data: data,
				dataType: 'json',
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success: function(data) {
					if(typeof(data) == 'object') {
						var f_self = self.opener();
						mui.fire(f_self, 'back');
						mui.alert("提交成功", mui.back());
					} else {
						alert('提交失败!');
					}
				},
				error: function(a, b, c) {
					mui.toast('网络错误');
					console.log(a);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			})
		}, false);

	});

})