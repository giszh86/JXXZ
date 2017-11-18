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
			items: [],
			fToview:true
		},
		methods: {
			openList: function(item) {
				url = 'lddbList.html';
				mui.openWindow({
					url: url,
					id: url,
					extras:{
						item:item
					}
				});
			},
			openDetail: function(item) {
				url = 'lddbDetail.html';
				mui.openWindow({
					url: url,
					id: url,
					extras:{
						item:item
					}
				});
			},
			openCaseDetail: function(item) {
				url = '../ybajxq/caseDetail.html';
//				console.log(item)
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
	var _type;
	var _text = '';

	function pullupRefresh() {
		var user = app.getUserInfo();
		//var str = document.getElementById("searchText").value;
		var param = mui.param({
			userid: user.ID,
			name: _text,
			type: _type,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetSuperviseList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
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
		var self = plus.webview.currentWebview();
		_type = self.type;
		document.getElementById("title").innerText=self.title;
		if(_type==1){
			vm.fToview=false
		}
		//监听查询.
		window.addEventListener('search', function(e) {
			searchByValue();
		});
		
		window.addEventListener('back',function(){
			searchByValue();
		});
	});
	
	//查询
	function searchByValue() {
		_text = document.getElementById("searchText").value;
		_start = 0;
		_totalCount = 0;
		vm.items.splice(0);	//清空
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}
})