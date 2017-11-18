require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'pic': 'mui.picker.all',
		'common': 'common',
		'Vue': 'vue/vue.min'
	}
});

require(['mui','app', 'pic', 'common','Vue'], function( mui, app, pic, common, Vue) {
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
				url = 'bjreport.html';
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
	var _starttime=new Date().Format('yyyy-MM-01');
	var _endtime=new Date().Format('yyyy-MM-dd');

	function pullupRefresh() {
		var user = app.getUserInfo();
		var param = mui.param({
			userid: user.ID,
			start: _start,
			limit: _limit,
			starttime: _starttime,
			endtime: _endtime
		});
		var url = app.webApi + 'api/phone/GetAlarmList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
//				console.log(JSON.stringify(data));
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					if(item.time){
						item.time=item.time.substring(0,10);
					}
					if(item.startDate){
						item.startDate=item.startDate.substring(11,16);
					}
					if(item.endDate){
						item.endDate=item.endDate.substring(11,16);
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
		document.getElementById('label-starttime').innerText=_starttime;
		document.getElementById('label-endtime').innerText=_endtime;
		document.getElementById('starttime').addEventListener('tap',function(){
			var pick = new mui.DtPicker({
				type: 'date',
				value: _starttime
			});
			pick.show(function(rs) {
				if(rs.text){
					document.getElementById('label-starttime').innerText = rs.text;
				}
				pick.dispose();
			});
		})
		document.getElementById('endtime').addEventListener('tap',function(){
			var pick = new mui.DtPicker({
				type: 'date',
				value: _endtime
			});
			pick.show(function(rs) {
				if(rs.text){
					document.getElementById('label-endtime').innerText = rs.text;
				}
				pick.dispose();
			});
		})
		
		//点击查询
		document.getElementById('search').addEventListener('tap',function(){
			_starttime=document.getElementById('label-starttime').innerText;
			_endtime=document.getElementById('label-endtime').innerText;
			searchByValue();
		})
		
		window.addEventListener('back',function(){
			searchByValue();
		});
		
		window.addEventListener('refresh', function() {
			var self = plus.webview.currentWebview();
			self.reload(true);
			console.log('refresh');
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