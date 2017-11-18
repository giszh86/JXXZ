require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require([ 'mui', 'app', 'Vue'], function( mui, app, Vue) {
	mui.init({});
	
	var vm = new Vue({
		el: '.mui-content',
		data: {
			model: []
		},
		methods:{
			submit:function(){
//				var user = app.getUserInfo();
				var that=this;
//				console.log(this.model)
				var data=this.model;
				data.userid=app.getUserInfo().ID;
				data.remark=document.getElementById("remark").value;
				
				console.log(data)
				var url = app.webApi + 'api/PatrolLog/AddPatrolLogs';
				console.log(url);
				plus.nativeUI.showWaiting('请稍候...');
				mui.ajax({
					url: url,
					type: 'post',
					data: data,
					success: function(data) {
						mui.alert('上报成功');
						mui.back();
					},
					error: function(x, t, e) {
						console.log(x);
						app.errorMessage(x, t, e);
	
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					}
				});
			}
		}
	});
	
	mui.plusReady(function() {
		
		var _userid=app.getUserInfo().ID;
		var url = app.webApi + 'api/phone/GetReportPatrol?userid=' + _userid;
		console.log(url);
		plus.nativeUI.showWaiting('加载中...');
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(data.date){
					data.day=data.date.substring(0,10);
				}
				vm.model=data;
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
			}
		});
	});
})