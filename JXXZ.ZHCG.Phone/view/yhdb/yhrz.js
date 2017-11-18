require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		"pic": "mui.picker",
		"pop": "mui.poppicker",
		'picker': 'mui.picker.all',
		'common': 'common',
		'Vue': 'vue/vue.min'
	}
});

require(['imm', 'mui', 'app', 'pic', 'pop', 'picker', 'common', 'Vue'], function(_, mui, app, pic, pop, picker, common, Vue) {
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
				url = 'yhrzXq.html';
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

	var _unitid = 0;
	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取10条
	var _starttime = new Date().Format('yyyy-MM-01');
	var _endtime = new Date().Format('yyyy-MM-dd');

	function pullupRefresh() {
		var user = app.getUserInfo();
		var param = mui.param({
			userid: user.ID,
			starttime: _starttime,
			endtime: _endtime,
			start: _start,
			limit: _limit
		});
		var url = app.webApi + 'api/phone/GetMaintainLogList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				//console.log(JSON.stringify(data));
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
		document.getElementById('starttime').innerText = _starttime;
		document.getElementById('endtime').innerText = _endtime;
		document.getElementById('li-starttime').addEventListener('tap', function() {
			var pick = new mui.DtPicker({
				type: 'date',
				value: _starttime
			});
			pick.show(function(rs) {
				if(rs.text) {
					document.getElementById('starttime').innerText = rs.text;
				}
				pick.dispose();
			});
		})
		document.getElementById('li-endtime').addEventListener('tap', function() {
			var pick = new mui.DtPicker({
				type: 'date',
				value: _endtime
			});
			pick.show(function(rs) {
				if(rs.text) {
					document.getElementById('endtime').innerText = rs.text;
				}
				pick.dispose();
			});
		})

		//点击查询
		document.getElementById('search').addEventListener('tap', function() {
			_starttime = document.getElementById('starttime').innerText;
			_endtime = document.getElementById('endtime').innerText;
			_start = 0;
			_totalCount = 0;
			vm.items.splice(0); //清空
			mui('#pullrefresh').pullRefresh().refresh(true);
			mui('#pullrefresh').pullRefresh().pullupLoading();
		})
		
		window.addEventListener('back', function() {
			vm.items.splice(0);
			_start = 0;
			_totalCount = 0;
			mui('#pullrefresh').pullRefresh().refresh(true);
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	});
});