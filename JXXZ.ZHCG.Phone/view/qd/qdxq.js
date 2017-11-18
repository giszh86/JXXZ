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

require(['mui', 'app', 'Vue', 'com'], function(mui, app, Vue, com) {
	mui.init({});

	var vm = new Vue({
		el: '.mui-content',
		data: {
			model: {
				username: null
			}
		}
	});

	mui.plusReady(function() {
//		var user = app.getUserInfo();
//		if(!userid) userid = user.ID;
		var self = plus.webview.currentWebview();
//		var userid = self.userid==undefined?user.ID:self.userid;
		var userid = self.userid;
		var date = new Date(self.date);
		getDetail(userid, date);
		function getDetail(userId, date) {
			var param = mui.param({
				userid: userId,
				time: date.Format('yyyy-MM-dd')
			});
			var url = app.webApi + 'api/SignArea/GetSignDetails?' + param;
			console.log(url);
			plus.nativeUI.showWaiting('加载中...');
			mui.ajax({
				url: url,
				success: function(data) {
					updateObject(data);

				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete:function(){
					plus.nativeUI.closeWaiting();
				}
			});
		}
	});

	function updateObject(data) {
		if(data == null) return;
		var model = vm.model;
		model.ssbzname = data.ssbzname;
		model.sszdname = data.sszdname;
		model.username = data.username;
		var date = new Date(data.time);
		model.rwrq = date.Format('yyyy-MM-dd ') + getWeekday(date);
		model.jhqd = app.getHourTime(data.start_stime) + ' - ' + app.getHourTime(data.start_etime);
		model.jhqt = app.getHourTime(data.end_stime) + ' - ' + app.getHourTime(data.end_etime);
		var pattern = /\d{4}-\d{1,2}-\d{1,2}\s/;
		model.sjqd = getTime(data.start_stime, data.start_etime, data.usersigninlist, true);
		
		model.sjqt = getTime(data.end_stime, data.end_etime, data.usersigninlist, false);

	}

	//判断签到时间是否在这个范围内  早上的签到和晚上签退
	/**
	 * 
	 * @param {Object} startDate
	 * @param {Object} endDate
	 * @param {Object} arr
	 * @param {Boolean} true時取最小時間，false取最大時間
	 */
	function getTime(startDate, endDate, arr, flg) {
		var rst = null;
		var tempRst = null;
		var s1 = transposeDate(startDate);
		var s2 = transposeDate(endDate);
		for(var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var sDate = item.signinall;
			var sNum = transposeDate(sDate);
			if(sNum >= s1 && sNum <= s2) {
				if(rst) {
					if((rst < sNum) ^ flg) {
						rst = sNum
						tempRst = sDate;
					}
				} else {
					rst = sNum;
					tempRst = sDate;
				}
			}
		}
		return tempRst;
	}

	function transposeDate(date) {
		if(typeof(date) == 'string') date = new Date(date);
		var num = date.Format('h.mmss');
		return parseFloat(num);
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

})