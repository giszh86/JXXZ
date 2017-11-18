require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		"pic": "mui.picker",
		"pop": "mui.poppicker",
		'dataGet': 'DataGet',
		'position': 'position',
		'com': 'common',
		'Vue': 'vue/vue.min'
	}
});

require(['mui', 'app', 'dataGet', 'position', 'com', 'Vue'],
	function(mui, app, dataGet, position, com, Vue) {

		mui.init({});

		mui.plusReady(function() {
			var user = app.getUserInfo();
			var pos = app.getObject('position');
			var coord = pos.coords; //84坐标
			//var gps = position.wgs84ToGcj02(coord.latitude,coord.longitude);		//高德坐标

			var gps = position.transpose(pos, 'bd09ll');

			//var gps = position.gcj02ToWgs84(parseFloat(app.getItem('latitude')), parseFloat(app.getItem('longitude')));
			var vm = new Vue({
				el: '.mui-content',
				data: {
					name: user.DisplayName,
					needQD: 0,
					qdcount: 0,
					qdTime: '00:00-00:00',
					qtTime: '00:00-00:00',
					qdAddress: '',
					isClick: false,
					issignin: false
				},
				methods: {
					//签到
					signIn: function() {
						var that = this;
						if(that.isClick) {
							mui.toast('你已经成功签到');
							return;
						}
						that.issignin = false;
						var data = {
							sszd: this.sszd,
							ssbc: this.ssbc,
							userid: user.ID,
							x84: coord.longitude, //上报给84坐标
							y84: coord.latitude,
							remark: '',
						}
						var url = app.webApi + 'api/SignArea/AddUserSignIn'
						console.log(url)
						mui.ajax({
							url: url,
							type: 'post',
							datatype: 'json',
							data: data,
							success: function(data) {
								console.log(JSON.stringify(data));
								//效果以后做
								var obj = JSON.parse(data);
								if(obj.resCode == 1) {
									that.isClick = true;
									mui.later(function() {
										that.isClick = false;
									}, 3000);

								} else if(obj.resCode == -1) {
									mui.toast('不在签到时间内');
								} else if(obj.resCode == -2) {
									mui.toast('您已经签到');
								} else {
									mui.toast(obj.msg);
								}

							},
							error: function(a, b, c) {
								app.errorMessage(a, b, c);

								console.log(a);
							},
							complete: function() {
								that.issignin = true;
								that.updatePage();
							}
						});
					},
					alert: function() {
						mui.toast('您不在签到区域内，无法签到');
					},
					//刷新页面.
					updatePage: function() {
						var that = this;
						var wgs84 = position.transWgs84('bd09ll', coord.latitude, coord.longitude);

						var param = mui.param({
							UserId: user.ID,
							x: wgs84.longitude, //经度
							y: wgs84.latitude //维度
						});

						var url = app.webApi + "api/SignArea/GetAreaGeometry?" + param;
						console.log(url);
						that.needQD = 0;
						that.qdcount = 0;
						//获取数据
						mui.ajax({
							url: url,
							type: 'get',
							datatype: 'json',
							success: function(data) {
								that.qdTime = app.getHourTime(data.start_stime) + '-' + app.getHourTime(data.start_etime);
								if(that.qdTime != '00:00-00:00') that.needQD++;
								that.qtTime = app.getHourTime(data.end_stime) + '-' + app.getHourTime(data.end_etime);
								if(that.qtTime != '00:00-00:00') that.needQD++;
								that.issignin = data.issignin;
								that.qdAddress = data.areaname;
								that.issignin = data.issignin;
								that.sszd = data.sszd;
								that.ssbc = data.ssbc;
								//判断当天已经签到次数
								var signin = getTime(data.start_stime, data.start_etime, data.usersigninlist, true);
								if(signin) that.qdcount++;
								var signout = getTime(data.end_stime, data.end_etime, data.usersigninlist, false);
								if(signout) that.qdcount++;
								points = getPoints(data.geometry);
								addPoints();
							},
							error: function(a, b, c) {
								app.errorMessage(a, b, c);

								console.log(a);
							},
							complete: function() {
								plus.nativeUI.closeWaiting();
							}
						});
					}
				}
			});

			vm.updatePage(); //更新数据

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
				if(arr) {
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
				}

				return tempRst;
			}

			function transposeDate(date) {
				if(typeof(date) == 'string') date = new Date(date);
				var num = date.Format('h.mmss');
				return parseFloat(num);
			}

			var mapCenter = new plus.maps.Point(pos.coords.longitude, pos.coords.latitude);

			var map = new plus.maps.Map('map', {
				zoom: 15,
				center: mapCenter
			});

			var points = [];
			var polygonObj = null;
			var mark = null;

			updateMyLocation(); //更新个人位置

			function updateMyLocation() {
				if(mark) map.removeOverlay(mark);

				mark = AddMarker({
					title: '我的位置'
				});
				window.setTimeout(function() {
					updateMyLocation();
				}, 5000);
			}

			function addPoints() {
				if(!map || points.length == 0) {
					mui.later(function() {
						addPoints();
					}, 1000);

				}
				if(polygonObj) {
					map.removeOverlay(polygonObj);
				}
				polygonObj = new plus.maps.Polygon(points);
				polygonObj.setStrokeColor('#8080c0');
				polygonObj.setStrokeOpacity(0.1);
				polygonObj.setFillColor('#8080c0');
				polygonObj.setFillOpacity(0.5);
				map.addOverlay(polygonObj);
			}

			//添加点
			function AddMarker(option) {
				//var pos = app.getObject('position');
				var pos = app.getObject('position');
				var coord = pos.coords;
				//var gps = position.wgs84ToGcj02(coord.latitude,coord.longitude);
				var gps = position.transpose(pos, 'bd09ll');

				var _option = mui.extend({
					latitude: gps.latitude,
					longitude: gps.longitude,
					title: null,
					icon: '../../image/map/map_gr.png'
				}, option);
				var marker = new plus.maps.Marker(new plus.maps.Point(_option.longitude, _option.latitude));
				if(_option.title) {
					var _bubble = new plus.maps.Bubble(_option.title);
					marker.setBubble(_bubble);
				}
				marker.setIcon(_option.icon);
				map.addOverlay(marker);

				return marker;
			}

			//转成高德坐标的数组.
			function getPoints(str) {
				var pattern = /\d+\.\d+/g
				var arr = [];
				if(!str) return arr;
				var mat = str.match(pattern);

				for(var i = 1; i < mat.length; i += 2) {
					var lon = mat[i - 1];
					var lat = mat[i];
					//var _gps = position.wgs84ToGcj02(lat, lon);

					var _gps = position.wgs84ToBd09(lat, lon);

					var point = new plus.maps.Point(_gps.longitude, _gps.latitude);
					arr.push(point);
				}
				return arr;
			}
			document.getElementById("signhistory").addEventListener('tap', function() {
				var url = '';
				if(user.Roles == "5") {
					url = 'signhistorylist.html';
				} else {
					url = 'mysignhistory.html';
				}
				mui.openWindow({
					url: url,
					id: url,
				});
			})
		});
	});