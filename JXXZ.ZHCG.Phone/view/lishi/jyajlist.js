require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app', 'Vue'], function(mui, app, Vue) {
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
			openDetail: function(item) {
				//打开详情页面
				//TODO
				var url = '../ssjg/jyajxq.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						model: item
					}
				});
			}
		}
	});

	var _str = '';
	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取10条

	function pullupRefresh() {
		var user = app.getUserInfo();
		var param = mui.param({
			userid: user.ID,
			name: _str,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetAllEasyCaseList?' + param;
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

		//查询
		window.addEventListener('search', function() {
			_str = document.getElementById("search").value;
			vm.items.splice(0);
			_start = 0;
			_totalCount = 0;
			mui('#pullrefresh').pullRefresh().refresh(true);
			mui('#pullrefresh').pullRefresh().pullupLoading();

		});
	});
})