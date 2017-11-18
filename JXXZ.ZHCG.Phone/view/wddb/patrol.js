require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'common': 'common',
		'Vue': 'vue/vue.min'
	}
});

require(['imm', 'mui', 'app', 'common', 'Vue'], function(_, mui, app, common, Vue) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				auto: true,
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});

	var vm = new Vue({
		el: '#menuList',
		data: {
			items: []
		},
		methods: {
			openSign: function() {
				var url = '../qd/qdindex.html';
				mui.openWindow({
					url: url,
					id: url
				});
			},
			locationPatrol:function(item){
				var option = {
					title: '地图查看',
					mapOption: {
						center: {
							visible: true
						}
					}
				};
				var value = item.patrolPoint;
				if(value){
					var geo=value.split(';')[0];
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
				
				option.polygon = [value];
				
				var url = '../area_map.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						option: option
					}
				});
			},
			locationSign:function(item){
				var option = {
					title: '地图查看',
					mapOption: {
						center: {
							visible: true
						}
					}
				};
				var value = item.signPoint;
				if(value){
					var geo=value.split(';')[0];
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
				option.polygon = [value];
				var url = '../area_map.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						option: option
					}
				});
			}
		}
	});

	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取10条

	function pullupRefresh() {
		var user = app.getUserInfo();
		var param = mui.param({
			userid: user.ID,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetPatrolList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					if(item.time) {
						item.weekday = app.getWeekday(item.time.toDate());
						item.time = item.time.toDate().Format('yyyy-MM-dd');
					}
					if(item.patrolStartTime && item.patrolEndTime) {
						item.patrolTime = item.patrolStartTime.toDate().Format('hh : mm') + ' - ' + item.patrolEndTime.toDate().Format('hh : mm');
					}
					if(item.signStartTime && item.signEndTime) {
						item.signTime = item.signStartTime.toDate().Format('hh : mm') + ' - ' + item.signEndTime.toDate().Format('hh : mm');
					}
					if(item.signOutStartTime && item.signOutEndTime) {
						item.signOutTime = item.signOutStartTime.toDate().Format('hh : mm') + ' - ' + item.signOutEndTime.toDate().Format('hh : mm');
					}
					vm.items.push(item);
				}
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(_start >= _totalCount);
			}
		});

	}

	mui.plusReady(function() {
		window.addEventListener('back', function() {
			vm.items.splice(0);
			_start = 0;
			_totalCount = 0;
			mui('#pullrefresh').pullRefresh().refresh(true);
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	});
})