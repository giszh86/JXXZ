require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
	}
});

require(['mui','app','Vue'], function(mui, app,Vue) {
	mui.init({});
	mui.plusReady(function() {
		var vm = new Vue({
			el: '.mui-card',
			data: {
				items: [],
			},
		});
		
		
		var self = plus.webview.currentWebview();
		var param = mui.param({
			zfdx_shopid:self.item.id
		});
		var url = app.webApi + 'api/LawObject/GetStreetShopsInf?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				vm.items=data
				if(vm.items.s_licence){
					vm.items.s_licence=vm.items.s_licence.substring(0,10);
				}
				if(vm.items.e_licence){
					vm.items.e_licence=vm.items.e_licence.substring(0,10);
				}
				if(vm.items.s_business){
					vm.items.s_business=vm.items.s_business.substring(0,10);
				}
				if(vm.items.e_business){
					vm.items.e_business=vm.items.e_business.substring(0,10);
				}
//				console.log(JSON.stringify(data))
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
			}
		});
		
		document.getElementById('mapaddress').addEventListener('tap', function() {
			var option = {
				title: '地图查看',
				mapOption: {
					center: {
						visible: true
					}
				}
			};
			var geo = document.getElementById("geography").innerText;
			console.log(geo);
			if(geo){
				var point = geo.split(',');
				var lon = parseFloat(point[0]);
				var lat = parseFloat(point[1]);
				option.mapOption.center.latitude = lat;
				option.mapOption.center.longitude = lon;
			}else{
				return;
			}
			
			var url = '../../pq_map.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: option
				}
			});
		});
	});
})