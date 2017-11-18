require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		"pic": "mui.picker",
		"pop": "mui.poppicker",
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app', 'dataGet', 'pic', 'pop', 'Vue'],
	function(mui, app, dataGet, pic, pop, Vue) {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					auto: false,
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		var vm = new Vue({
			el: '#vueDiv',
			data: {
				items: [],
				count: 0,
				start: 0,
				limit: 20,
				sszd: 0,
				ssbc: 0,
				sszdName: '',
				ssbcName: '',
				nowDate: new Date()
			},
			methods: {
				listClick: function(item) {
					var url = 'qdxq.html'
					mui.openWindow({
						url: url,
						id: url,
						extras: {
							userid: item.userid,
							date: this.nowDate.Format('yyyy-MM-dd')
						}
					});
				}
			}
		});

		function pullupRefresh() {
			if(!vm) window.setTimeout(function() {
				pullupRefresh();
			}, 1000);

			var that = this;
			var param = mui.param({
				sszd: vm.sszd,
				ssbc: vm.ssbc,
				start: vm.start,
				limit: vm.limit
			});
			var url = app.webApi + 'api/SignArea/GetNotSignList?' + param
			console.log(url)
			mui.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				success: function(data) {
					if(!vm.count) vm.count = data.Total;
					for(var i = 0; i < data.Items.length; i++) {
						//var obj = aRValue(data[i]);
						var obj = createObject(data.Items[i]);
						vm.items.push(obj);
					}
					vm.start += data.Items.length;
					var _self = plus.webview.currentWebview().opener();
					mui.fire(_self, 'updateCount', {
						page: 1,
						count: vm.count
					});
				},
				error: function(e, x, t) {
					console.log('读取失败');
				},
				complete: function() {
					that.endPullupToRefresh(vm.start >= vm.count);
				}
			});

		}

		function createObject(item) {
			var obj = {
				name: item.displayname,
				userid: item.userid,
				sex: item.sex ? item.sex : '男',
				nowDate: vm.nowDate,
				weekDay: getWeekday(vm.nowDate),
			}
			obj.signin = app.getHourTime(item.start_stime) + '-' + app.getHourTime(item.start_etime);
			obj.signout = app.getHourTime(item.end_stime) + '-' + app.getHourTime(item.end_etime);
			return obj
		}

		function getWeekday(date) {
			var week = date.getDay();
			var str = '星期';
			switch(week) {
				case 0:
					str += "日";
					break;
				case 1:
					str += "一";
					break;
				case 2:
					str += "二";
					break;
				case 3:
					str += "三";
					break;
				case 4:
					str += "四";
					break;
				case 5:
					str += "五";
					break;
				case 6:
					str += "六";
					break;
			}
			return str;
		}

		mui.plusReady(function() {
			var user = app.getUserInfo();

			//选择中队和班级
			dataGet.getAllTeamList(user.ID, function(data) {
				vm.sszd = data[0].value;
				vm.sszdName = data[0].text;
				var arr = data[0].children;
				vm.ssbc = arr[0].value;
				vm.ssbcName = arr[0].text;
				document.getElementById("Squadron_list").addEventListener('tap', function() {
					dataGet.choosePick(window.ArrayData.teamList, {
							text: ['#Squadron_Name', '#Class'],
							value: ['#Squadron_ID', '#Class_id'],
							options: {
								layer: 2
							}
						},
						function(items) {
							if(items.length == 0) return;
							if(vm.sszd != items[0].value || vm.ssbc != items[1].value) {
								vm.sszd = items[0].value;
								vm.ssbc = items[1].value;
								vm.sszdName = items[0].text;
								vm.ssbcName = items[1].text;
								vm.start = 0;
								vm.count = 0;
								vm.items.splice(0);
								mui('#pullrefresh').pullRefresh().pullupLoading();
							}
						}
					)
				}, false);
				window.setTimeout(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				}, 500);
			});

		});

	});