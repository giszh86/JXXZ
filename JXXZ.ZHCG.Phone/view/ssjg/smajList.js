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

				var wfdid = item.wfdid;
				var url = 'smajDetail.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						wfdid: wfdid,
						model: item
					}
				});

			}

		}
	});
	var _str = '';
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
		//已经办理的列表
//		var url = app.webApi + 'api/phone/GetAlreadyCitizenServicesList?' + param;
		//全部的列表
		var url = app.webApi + 'api/phone/GetAllCitizenServicesList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				//window.setTimeout(function() {
				//alert(JSON.stringify(data));

				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					item.imgSrc = app.getImagePath(item.photo1, '../../image/nophoto.png');
					//					console.log(item.imgSrc);
					vm.items.push(item);
				}

				//}, 50);

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
			var strText = document.getElementById("searchText").value;
			_str = strText;
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