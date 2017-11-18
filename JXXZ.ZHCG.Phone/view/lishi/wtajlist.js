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
				//详情
				var url = '../ssjg/wtajxq.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						item: item
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
		var url = app.webApi + 'api/phone/GetAllIllegalList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					item.imgSrc = app.getPhotoPath(item.imgUrl, '../../image/report/wtaj.png','WTCarOriginalPath');
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
		
		//监听查询.
		window.addEventListener('search', function(e) {
			_str = document.getElementById("search").value;
			searchByValue();
		});

		window.addEventListener('back', function() {
			searchByValue();
		});
	});
	
	//查询
	function searchByValue() {
		vm.items.splice(0);
		_start = 0;
		_totalCount = 0;
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}
})