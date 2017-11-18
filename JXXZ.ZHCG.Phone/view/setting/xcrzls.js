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

require(['mui','app', 'common','Vue'], function(mui, app,common, Vue) {
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
			openView: function(item) {
				url = 'xcrzxq.html';
				mui.openWindow({
					url: url,
					id: url,
					extras:{
						item:item
					}
				});
			}
		}
	});
	
	var _start = 0;
	var _totalCount = 0;
	var _limit = 15; //每次取10条

	function pullupRefresh() {
		var user = app.getUserInfo();
		var param = mui.param({
			userid: user.ID,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetPatrolsList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					if(item.date) {
						item.weekday = app.getWeekday(item.date.toDate());
						item.date = item.date.toDate().Format('yyyy-MM-dd');
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