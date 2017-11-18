require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		"pic": "mui.picker",
		"pop": "mui.poppicker",
		'picker': 'mui.picker.all',
		'common': 'common',
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app', 'dataGet', 'pic', 'pop', 'picker', 'common', 'Vue'], function(
	mui, app, dataGet, pic, pop, picker, common, Vue) {
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
				url = 'jyajxq.html';
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
			teamid: _unitid,
			starttime: _starttime,
			endtime: _endtime,
			start: _start,
			limit: _limit
		});
		//
		var url = app.webApi + 'api/phone/geteasycaselist?' + param;
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
		//选择中队和班级
		dataGet.getMiddleTeam(function(data) {
			data.unshift({
				text: '全部',
				value: 0
			});
			document.getElementById("Squadron_list").addEventListener('tap', function() {
				dataGet.choosePick(data, {
						text: '#Squadron_Name',
						value: '#Squadron_ID',
					},
					function(items) {
						console.log(2);
					}
				)
			}, false)
		})

		document.getElementById('starttime').value = _starttime;
		document.getElementById('endtime').value = _endtime;
		document.getElementById('li-starttime').addEventListener('tap', function() {
			var pick = new mui.DtPicker({
				type: 'date',
				value: _starttime
			});
			pick.show(function(rs) {
				if(rs.text) {
					document.getElementById('starttime').value = rs.text;
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
					document.getElementById('endtime').value = rs.text;
				}
				pick.dispose();
			});
		})

		//点击查询
		document.getElementById('search').addEventListener('tap', function() {
			_unitid = app.getValue(Squadron_ID);
			_starttime = document.getElementById('starttime').value;
			_endtime = document.getElementById('endtime').value;
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