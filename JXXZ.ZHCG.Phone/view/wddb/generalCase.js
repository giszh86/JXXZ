require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require(['imm', 'mui','app', 'Vue'], function(_, mui, app, Vue) {
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
		var url = app.webApi + 'api/phone/GetCaseList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
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