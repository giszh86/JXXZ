require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
	}
});

require([ 'mui','app','Vue'], function(mui, app,Vue) {
	mui.init({});
	mui.plusReady(function() {
		
		
		
		var vm = new Vue({
			el: '.mui-card',
			data: {
				items: []
			}
		});
		
		
		var self = plus.webview.currentWebview();
		console.log(self)
		var param = mui.param({
			zfdx_shopid:self.item.id
		});
		var url = app.webApi + 'api/LawObject/GetHawkerInf?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				vm.items=data
//				console.log(JSON.stringify(vm.items))
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
			}
		});
		
		document.getElementById("modify").addEventListener('tap',function(){
			var url = 'xtxf-modify.html';
			mui.openWindow({
				url: url,
				id: url,
				extras: {
					option: vm.items
				}
			});    
		})
		
		document.getElementById("deleteCase").addEventListener('tap',function(){
			mui.confirm( '是否删除此数据', '删除数据', 'btnValue', function(event){
				var result=event;
				//判断是否取消  取消的时候返回为1
				if(result.index==1) return;
				var data={
					zfdx_shopid:vm.items.zfdx_shopid
				}
				var url = app.webApi + 'api/LawObject/DeleteStreetShopsInfApi?zfdx_shopid='+vm.items.zfdx_shopid;
				mui.ajax({
					url: url,
					type: 'post',
					success: function(data) {
						alert(data.msg);
						var father = plus.webview.currentWebview().opener();
						mui.fire(father,'refresh');
					},
					error: function(x, t, e) {
						app.errorMessage(x, t, e);
						console.log(x);
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					}
				});
			})
			 
		})
		
		
		document.getElementById("setblacklist").addEventListener('tap',function(){
			mui.confirm( '是否将此数据设为黑名单', '设为黑名单', 'btnValue', function(event){
				var result=event;
				//判断是否取消  取消的时候返回为1
				if(result.index==1) return;
				var url = app.webApi + 'api/LawObject/AddStoreInBlackListApi?zfdx_shopid='+vm.items.zfdx_shopid;
				mui.ajax({
					url: url,
					type: 'post',
					success: function(data) {
						alert(data.msg);
						var father = plus.webview.currentWebview().opener();
						mui.fire(father,'refresh');
					},
					error: function(x, t, e) {
						app.errorMessage(x, t, e);
						console.log(x);
					},
					complete: function() {
						plus.nativeUI.closeWaiting();
					}
				});
			})
			 
		})
		
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
		
		
		window.addEventListener('refresh', function() {
			var self = plus.webview.currentWebview();
			self.reload(true);
			console.log('refresh');
		});
	});
})