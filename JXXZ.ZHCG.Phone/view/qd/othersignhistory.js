require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		"pic": "mui.picker",
		"pop": "mui.poppicker",
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app', 'dataGet', 'pic', 'pop', 'Vue'], function(
	mui, app, dataGet, pic, pop, Vue) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				height: 50,
				auto: false,
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了',
				callback: pullfresh_up
			}
		}
	});
	var teamManbersID = '0'; //队员ID
	mui.plusReady(function() {
		var user = app.getUserInfo();
		//选择班组
		dataGet.getTeamList(user.ID, function(data) {
			document.getElementById("Squadron_list").addEventListener('tap', function() {
				var id = document.getElementById("Class_id").value;
				dataGet.choosePick(window.ArrayData.teamList, {
						text: ['#Squadron_Name', '#Class'],
						value: ['#Squadron_ID', '#Class_id'],
						options: {
							layer: 2
						}
					},
					function(items) {
						if(id != items[1].value) {
							document.getElementById("TeamManber_Name").innerText = '请选择';
							document.getElementById("TeamManber_ID").value = '';
							mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
							getTeamManber();
						}

					}
				)
			}, false)

		});

		//重置队员列表.
		getTeamManber();

		//重置队员列表.
		function getTeamManber() {
			teamManbersID = 0;
			var id = document.getElementById("Class_id").value;
			if(id == '') return;
			dataGet.getPersonByGroup(id);
		}

		//选择队员点击事件
		document.getElementById("TeamManber_List").addEventListener('tap', function() {

			var id = document.getElementById("Squadron_ID").value;
			if(id == '') {
				mui.toast('请选择班组');
				return;
			}
			dataGet.choosePick(window.ArrayData.personList, {
					text: '#TeamManber_Name',
					value: '#TeamManber_ID',
				},
				function(items) {
					if(items.length == 0) return;
					if(items[0].value != teamManbersID) {
						reload();
					}
				}
			)
		}, false);
		
		mui('#pullrefresh').pullRefresh().disablePullupToRefresh();

	});
	//重置
	function reload() {
		teamManbersID = document.getElementById("TeamManber_ID").value;
		vm.items.splice(0);
		vm.date = new Date();
		mui('#pullrefresh').pullRefresh().refresh(true);
		mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
		mui('#pullrefresh').pullRefresh().pullupLoading();
	}

	var vm = new Vue({
		el: '#mySh',
		data: {
			items: [],
			date: new Date(),
		},
		methods: {
			checkinDetail: function(checkinData) {
				console.log(checkinData)
				var url = 'qdxq.html'
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						date: checkinData.taskTime.Format('yyyy-MM-dd'),
						userid: teamManbersID
					}
				})
			}
		}
	});

	//http://192.168.0.207:8099/api/SignArea/GetSignInListById?start=0&limit=20&UserId=10
	//api/choose/GetSignInListById?date=2017-3-14&num=5&userid=10
	function pullfresh_up() {
		var that = this;
		var param = mui.param({
			date: vm.date.Format("yyyy-MM-dd"), //从那天开始取
			num: "5", //传取多少条数据
			userid: teamManbersID //传用户的id
		})
		var url = app.webApi + 'api/choose/GetSignInListById?' + param;
		console.log(url)
		mui.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: function(data) {
				for(var i = 0; i < data.length; i++) {
					var obj = clValue(data[i]);
					vm.items.push(obj);
				}
				vm.start = data.length;

				if(data.length > 0) {
					var temp = data[data.length - 1];
					var tempDate = new Date(temp.taskTime);
					tempDate.dateAdd('d', -1);
					vm.date = tempDate;
				}
			},
			error: function(e, x, t) {
				console.log('读取失败');
			},
			complete: function() {
				//判断结果为falsh的时候 显示没有数据
				that.endPullupToRefresh(vm.start <= 0);
			}
		});
	}

	function clValue(data) {
		var rst = {};
		rst.taskTime = new Date(data.taskTime);
		rst.weekday = data.weekday; //星期二			
		var _stime = new Date(data.start_stime || "2017-03-03 08:30:00");
		var _etime = new Date(data.start_etime || "2017-03-03 09:50:00");
		var sSTime = transposeDate(_stime); //为了判断是否在签退范围
		var sETime = transposeDate(_etime); //签到有效时间
		rst.qdsj = _stime.Format('hh:mm-') + _etime.Format('hh:mm'); //签到时间

		var _eStime = new Date(data.end_stime || "2017-03-03 17:30:00");
		var _eEtime = new Date(data.end_etime || "2017-03-03 18:00:00");
		var eSTime = transposeDate(_eStime); //为了判断是否在签退范围
		var eETime = transposeDate(_eEtime); //签退有效时间
		rst.qtsj = _eStime.Format('hh:mm-') + _eEtime.Format('hh:mm'); //签到时间

		for(var i = 0; i < data.signList.length; i++) {
			var temp = data.signList[i];
			var signinall = new Date(temp.signintime);
			var num = parseFloat(signinall.Format("h.mmss"));
			if(num >= sSTime && num <= sETime) {
				if(!rst.signinTime || rst.signinTime > signinall) {
					rst.signinTime = signinall;
				}
				rst.sjqd = new Date(rst.signinTime).Format('hh:mm'); //实际签到时间
			}
			if(num >= eSTime && num <= eETime) {
				if(!rst.signendTime || rst.signendTime < signinall) {
					rst.signendTime = signinall;
				}
				rst.sjqt = new Date(rst.signendTime).Format('hh:mm'); //实际签退时间
			}
		}
		if(rst.signinTime && rst.signendTime) {
			rst.title = '正常签到';
		} else if(rst.signinTime) {
			rst.title = '未签退';

		} else if(rst.signendTime) {
			rst.title = '未签到';
		} else {
			rst.title = '未签';
		}

		return rst;

	}

	function transposeDate(date) {
		var num = date.Format('h.mmss');
		return parseFloat(num);
	}

	//更新页面
	window.addEventListener('refresh', function() {
		var self = plus.webview.currentWebview();
		self.reload(true);
		console.log('refresh');
	});
});