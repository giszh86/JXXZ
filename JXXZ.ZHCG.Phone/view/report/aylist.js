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
				var self = plus.webview.currentWebview();
				var father = self.opener();
				mui.fire(father, 'return', {
					powername: item.powername,
					powerid: item.powerid,
					flfg: item.flfg,
					clyj: item.clyj,
					wfqx: item.wfqx,
					cf: item.cf
				});
				mui.back();
			}
		}
	});

	var father;
	var _totalCount = 0;
	var _page = 1;
	var _count = 10; //每次取10条

	function pullupRefresh() {
		var str = document.getElementById("searchText").value;
		var param = mui.param({
			powername: str,
			count: _count,
			page: _page,
		});
		var url = app.webApi + 'api/CommonCase/GetInheritCaseSourceAPI?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				if(_totalCount == 0) _totalCount = data.PageCount;
				_page++;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					vm.items.push(item);
				}
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(_page >= _totalCount);
			}
		});

	}

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		father = self.opener();
		
		//监听查询.
		window.addEventListener('search', function(e) {
			var strText = document.getElementById("searchText").value;
			searchByValue(strText);
		});

		window.addEventListener('back', function() {
			var strText = document.getElementById("searchText").value;
			searchByValue(strText);
		});
	});

	//查询
	function searchByValue(str) {
		vm.items.splice(0);
		_page = 1;
		_totalCount = 0;
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}
})