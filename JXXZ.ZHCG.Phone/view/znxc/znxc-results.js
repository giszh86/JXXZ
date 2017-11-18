require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'position': 'position'
	}
});

require(['imm', 'mui', 'app', 'Vue', 'position'], function(_, mui, app, Vue, position) {
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
				url = 'znxc-detail.html';
				if(_type == 2) url = 'xtxf-detail.html';
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

	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取10条
	var str;
	var _radius;
	var _type;

	function pullupRefresh() {
		var user = app.getUserInfo();
		str = document.getElementById("searchText").value;
		var pos = app.getObject('position');
		var wgs84 = position.transpose(pos, 'wgs84');
		var param = mui.param({
			userid: user.ID,
			//			radius: _radius,
			radius: _radius,
			type: _type,
			start: _start,
			limit: _limit,
			name: str,
			lng: wgs84.longitude,
			lat: wgs84.latitude
		});
		var url = app.webApi + 'api/phone/GetPatrolList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					if(_type == 2) {
						item.name = item.name + '(' + item.explain + ')';
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
		var self = plus.webview.currentWebview();
		_radius = self.radius;
		_type = self.type;
		if(_type != 3) {
			var _title = document.getElementById("title");
			if(_type == 1) {
				_title.innerText = '周边沿街店家';
			} else {
				_title.innerText = '周边小摊小贩';
			}
			var _add = document.getElementById("add");
			_add.style.display = 'block';
			_add.addEventListener('tap', function() {
				if(_type == 1) {
					url = 'tjyjdj.html';
				} else {
					url = 'tjxtxf.html';
				}
				mui.openWindow({
					url: url,
					id: url,
				});
			})
		}

		//监听查询.
		window.addEventListener('search', function(e) {
			var strText = document.getElementById("searchText").value;
			searchByValue(strText);
		});

		window.addEventListener('refresh', function() {
			var self = plus.webview.currentWebview();
			self.reload(true);
			console.log('refresh');
		});

	});

	//查询
	function searchByValue(str) {
		//alert(str);
		_start = 0;
		_totalCount = 0;
		vm.items.splice(0); //清空
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}
})