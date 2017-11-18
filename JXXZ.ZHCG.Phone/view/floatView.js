require.config({
	baseUrl: '../js',
	paths: {
		'mui': 'mui.min',
		'imm': 'immersed',
		'app': 'app',
		'template': 'template',
		'com': 'common'
	}
})

require(['mui', 'app'], function(mui, app) {
	var user = null;
	var point = null;
	window.addEventListener("mapclick", function(e) {
		//document.getElementById("point").innerHTML = e.detail.point;
		point = e.detail.point;
		console.log(JSON.stringify(point));
	});

	window.addEventListener('markerclick', function(e) {
		var marker = e.detail.marker;
		document.getElementById("phone").innerText = marker.phone;
		document.getElementById("name").innerText = marker.name;
		document.getElementById("unitName").innerText = marker.unitName;
	});
	mui.plusReady(function() {
		//		document.getElementById('daohangtest').addEventListener('tap', function() {
		//			if(!user) return;
		//			//导航测试
		//			var pos = app.getObject('_position');
		//			var start_point = new plus.maps.Point(pos.coords.longitude,pos.coords.latitude);	//自己坐标
		//			var end_point = new plus.maps.Point(point.longitude,point.latitude);
		//			
		//			plus.maps.openSysMap(end_point,'文三路',start_point);
		//			
		//		});
		//		

		document.getElementById("callphone").addEventListener('tap', function() {
			var phone = document.getElementById("phone").innerText;
			if(phone) {
				plus.device.dial(phone, true);
			}
		});

	});
});