require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'com': 'common',
	}
});

require(['mui', 'app', 'Vue','com'], function(mui, app, Vue,com) {
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
				var url = '../todo/todo.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						wfdid: wfdid,
						model: item
					},
					show: {
						autoShow: false
					}
				});

			}

		}
	});

	var _start = 0;
	var _totalCount = 0;
	var _limit = 10; //每次取15条

	function pullupRefresh() {
		var that = this;
		var user = app.getUserInfo();
		var str = document.getElementById("searchText").value;
		var filter = [{
			property: 'title',
			value: str
		}];
		var param = mui.param({
			filter: '[{"property":"eventtitle","value":"'+str+'"}]',
//			name: str,
			start: _start,
			limit: _limit,
			page: 1,
			userid: user.ID,
			status: 1
		});
		var url = app.webApi + 'api/CitizenEvent/GetCitizenServicesList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				if(_totalCount == 0) _totalCount = data.Total;
				_start += data.Items.length;
				var newDate=new Date();
				var TheRestOfTheTime;
				for(var i = 0; i < data.Items.length; i++) {
					var item = data.Items[i];
					item.imgSrc = app.getPhotoPath(item.photo1, '../../image/nophoto.png','CitizenServiceOriginalPath');
//					console.log(item.imgSrc);
					
					
					var limittime=new Date(data.Items[i].limittime);
					var foundtime=new Date(data.Items[i].foundtime);
					//计算总时间
					var totaltime=foundtime.dateDiff('h',limittime);
					//计算剩下的时间
					TheRestOfTheTime=totaltime-foundtime.dateDiff('h',newDate);
					//<0为已超期<(totaltime/2)为快超期 不然就是未超期
					if(TheRestOfTheTime<0){
						item.timeCalculationResult='../../image/wddb/time1.png'
					}else if(TheRestOfTheTime<(totaltime/2)){
						item.timeCalculationResult='../../image/wddb/time3.png'
					}else{
						item.timeCalculationResult='../../image/wddb/time2.png'
					}
					
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
		_start = 0;
		_totalCount = 0;
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}

})