require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui',
		'app': 'app',
		'dataGet': 'DataGet',
		"pic": "mui.picker.all",
		"pop": "mui.poppicker",
		'Vue': 'vue/vue.min',
		'com': 'common'
	}
});

require(['mui', 'app', 'dataGet', 'Vue', 'pic', 'com'],
	function(mui, app, dataGet, Vue, pic, com) {
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
		var vm = null;

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
			var url = app.webApi + 'api/SignArea/GetUserSignInList?' + param
			console.log(url)
			mui.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				success: function(data) {
					if(!vm.count) vm.count = data.Total;
					for(var i = 0; i < data.Items.length; i++) {
						//var obj = aRValue(data[i]);
						var obj = data.Items[i];
						obj.etime = obj.etime.replace(/(\d+-){2}\d+\s|:\d+$/g, "");
						obj.stime = obj.stime.replace(/(\d+-){2}\d+\s|:\d+$/g, "");
						vm.items.push(obj);
					}
					vm.start += data.Items.length;
					var _self = plus.webview.currentWebview().opener();
					mui.fire(_self, 'updateCount', {
						page: 0,
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

		mui.plusReady(function() {
			vm = new Vue({
				el: '#vueDiv',
				data: {
					items: [],
					count: 0,
					start: 0,
					limit: 20,
					sszd: 0,
					ssbc: 0
				},
				methods: {
					list_click: function(data) {
						var url = 'qdxq.html'
						mui.openWindow({
							url: url,
							id: url,
							extras: {
								userid: data.userid,
								date: new Date().Format('yyyy-MM-dd')
							}
						});
					}
				}
			});

			function aRValue(data) {
				var sRs = {};
				sRs.userid = data.userid;
				sRs.displayname = data.displayname;
				sRs.sex = data.sex;
				sRs.stime = data.stime == "未签到" ? data.stime : new Date(data.stime).Format("hh:ss");
				sRs.etime = data.etime == "未签退" ? data.stime : new Date(data.etime).Format("hh:ss");
				return sRs;
			}

			var user = app.getUserInfo();
			//选择中队和班级
			dataGet.getAllTeamList(user.ID, function(data) {
//				console.log(JSON.stringify(data));
				vm.sszd = data[0].value;
				document.getElementById("Squadron_Name").innerText = data[0].text;
				var arr = data[0].children;
				vm.ssbc = arr[0].value;
				document.getElementById("Class_Name").innerText = arr[0].text;
				document.getElementById("Squadron_list").addEventListener('tap', function() {
					dataGet.choosePick(window.ArrayData.teamList, {
							text: ['#Squadron_Name', '#Class_Name'],
							value: ['#Squadron_ID', '#Class_ID'],
							options: {
								layer: 2
							}
						},
						function(items) {
							if(items.length == 0) return;
							if(vm.sszd != items[0].value || vm.ssbc != items[1].value) {
								vm.sszd = items[0].value;
								vm.ssbc = items[1].value;
								vm.start = 0;
								vm.count = 0;
								vm.items.splice(0);
								mui('#pullrefresh').pullRefresh().pullupLoading();
							}

						}
					)
				}, false)
				window.setTimeout(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				}, 500);
			});
		});

		//更新页面
		window.addEventListener('refresh', function() {
			var self = plus.webview.currentWebview();
			self.reload(true);
			console.log('refresh');
		});

	});