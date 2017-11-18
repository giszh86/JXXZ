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
		},
		methods: {
			openView: function(item) {
				url = 'fltwdetail.html';
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
	var _limit = 10; //每次取10条

	function pullupRefresh() {
		var str = document.getElementById("searchText").value;
		var param = mui.param({
			filter: str,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetFLFGList?' + param;
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
		//监听查询.
		window.addEventListener('search', function(e) {
			var strText = document.getElementById("searchText").value;
			searchByValue(strText);
		});
		
		window.addEventListener('back',function(){
			var strText = document.getElementById("searchText").value;
			searchByValue(strText)
		});
	});
	
	//查询
	function searchByValue(str) {
		//alert(str);
		_start = 0;
		_totalCount = 0;
		vm.items.splice(0);	//清空
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}
})