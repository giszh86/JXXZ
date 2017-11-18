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

require(['imm', 'mui','app', 'common', 'Vue'], function(_, mui, app, common, Vue) {
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
				url = 'needshenpilist.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						item: item,
						detail: 0
					},
					show: {
						autoShow: false
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
			status: 0,
			isxzk: false,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/Approval/GetToBeApprovalList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					item.now=new Date().Format('yyyy-MM-dd hh:mm:ss');
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
		window.addEventListener('refresh', function() {
			searchByValue()
		});

		function searchByValue() {
			_start = 0;
			_totalCount = 0;
			vm.items.splice(0); //清空
			mui('#pullrefresh').pullRefresh().refresh(true);
			mui('#pullrefresh').pullRefresh().pullupLoading();
		}
	});
})