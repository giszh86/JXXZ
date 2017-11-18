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
		var self = plus.webview.currentWebview();
		var item = self.item;
		document.getElementById("name").value=item.name;
		document.getElementById("type").value=item.type;
		document.getElementById("time").value=item.time+' '+item.startDate+'-'+item.endDate;
		
		document.getElementById("submit").addEventListener('tap', function() {
			var allegereason = document.getElementById("allegereason").value;
			if(allegereason==""){
				alert("申诉理由不可为空")
				return
			}
//			//报警申诉
			mui.ajax({
				url: app.webApi + 'api/phone/SubmitAlarmDetailAppeals',
				data: {
					id: item.id,
					isallege: 1,
					allegereason: allegereason,
				},
				dataType: 'json',
				type: 'post',
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				success: function(data) {
//					console.log(JSON.stringify(data));
					mui.toast(data.msg);
					if(data.resCode == 1) {
						var father = plus.webview.currentWebview().opener();
						mui.fire(father,'refresh');
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