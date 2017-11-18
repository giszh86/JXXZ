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
			openView: function(item) {
				//详情页面
				var url = '../ssjg/smajDetail.html';
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
	
	var _str = ''
	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取15条

	function pullupRefresh() {
		var that = this;
		var user = app.getUserInfo();
		var param = mui.param({
			name: _str,
			start: _start,
			limit: _limit,
			userid: user.ID,
			status: 2
		});
		var url = app.webApi + 'api/phone/GetAlreadyCitizenServicesList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
//				console.log(JSON.stringify(data));
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					item.imgSrc = app.getImagePath(item.photo1, '../../image/nophoto.png');
					//					console.log(item.imgSrc);
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
			_str = document.getElementById("searchText").value;
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