require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'common': 'common',
	}
});

require(['mui','app', 'common'], function(mui, app,common)  {
	mui.init({});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var _usertaskid = self.item.id;
		document.getElementById("date").innerHTML=self.item.time+'&nbsp;&nbsp;&nbsp;&nbsp;'+self.item.weekday;
		var xcgrometry;
		var qdgrometry;
		
		var url = app.webApi + 'api/TeamDuty/GetUserTaskModel?usertaskid=' + _usertaskid;
		console.log(url);
		plus.nativeUI.showWaiting('加载中...');
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(data.taskstarttime && data.taskendtime) {
					document.getElementById("xcsj").value = data.taskstarttime.toDate().Format('hh : mm') + ' - ' + data.taskendtime.toDate().Format('hh : mm');
				}
				if(data.start_stime && data.start_etime) {
					document.getElementById("qdsj").value = data.start_stime.toDate().Format('hh : mm') + ' - ' + data.start_etime.toDate().Format('hh : mm');
				}
				if(data.end_stime && data.end_etime) {
					document.getElementById("qtsj").value = data.end_stime.toDate().Format('hh : mm') + ' - ' + data.end_etime.toDate().Format('hh : mm');
				}
				document.getElementById("rwsm").value = data.taskexplain;
				document.getElementById("patrolname").value = data.patrolname;
				document.getElementById("signinareaname").value = data.signinareaname;
				xcgrometry=data.xcgrometry;
				qdgrometry=data.qdgrometry;
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
			}
		});
		
		//巡查区域地图查看
		document.getElementById('patrolname').addEventListener('tap',function () {
		        var option = {
					title: '地图查看',
					mapOption: {
						center: {
							visible: true
						}
					}
				};
				if(xcgrometry){
					var geo=xcgrometry.split(';')[0];
				}
				if(geo){
					var point = geo.split(',');
					var lon = parseFloat(point[0]);
					var lat = parseFloat(point[1]);
					option.mapOption.center.latitude = lat;
					option.mapOption.center.longitude = lon;
				}else{
					return;
				}
				
				option.polygon = [xcgrometry];
				
				var url = '../area_map.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						option: option
					}
				});
		})
		
		//签到区域地图查看
		document.getElementById('signinareaname').addEventListener('tap',function () {
		        var option = {
					title: '地图查看',
					mapOption: {
						center: {
							visible: true
						}
					}
				};
				if(qdgrometry){
					var geo=qdgrometry.split(';')[0];
				}
				if(geo){
					var point = geo.split(',');
					var lon = parseFloat(point[0]);
					var lat = parseFloat(point[1]);
					option.mapOption.center.latitude = lat;
					option.mapOption.center.longitude = lon;
				}else{
					return;
				}
				
				option.polygon = [qdgrometry];
				
				var url = '../area_map.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						option: option
					}
				});
		})
	});
})