require(['esri/map', "esri/layers/ArcGISTiledMapServiceLayer",
	"esri/geometry/Point", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
	"esri/symbols/PictureMarkerSymbol", "esri/geometry/Polygon", "esri/geometry/Polyline",
	"esri/graphic", "esri/layers/GraphicsLayer", "esri/SpatialReference"
], function(
	Map, ArcGISTiledMapServiceLayer, Point, SimpleFillSymbol, SimpleLineSymbol,
	PictureMarkerSymbol, Polygon, Polyline,
	Graphic, GraphicsLayer, SpatialReference) {
	var aMap = new ArcgisMap();

	mui.init({});

	mui.plusReady(function() {
		var user = app.getUserInfo();
		var pos = app.getObject('position');
		var coord = pos.coords; //84坐标
		var myPoint;
		//var gps = position.wgs84ToGcj02(coord.latitude,coord.longitude);		//高德坐标

		//		var gps = position.transpose(pos, 'bd09ll');

		//var gps = position.gcj02ToWgs84(parseFloat(app.getItem('latitude')), parseFloat(app.getItem('longitude')));
		//		签到范围测试数据
		

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
							
							if(data.geometry!=null){
								aMap.addPolygon(stringToFloat(data.geometry.split(";")))	
							}
							
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

		updateMyLocation(); //更新个人位置

		//获取范围的坐标点从json格式转换为数字类型的数组
		function stringToFloat(arr){
			var polygonArr=[]
			for (var i = 0; i < arr.length; i++) {
				var arrString=arr[i].split(",")
				polygonArr.push([parseFloat(arrString[0]),parseFloat(arrString[1])])
			}
			return polygonArr;
		}
		
		//更新自己的位置
		function updateMyLocation() {
			aMap.markerLayer.clear();
			//自己的定位坐标
			var myPoint = {
				x: localStorage.getItem("longitude"),
				y: localStorage.getItem("latitude"),
				imgPath: "../../image/map/map_gr.png",
				imgPathHeight: 30,
				imgPathWidth: 20,
				isCenter: true,
			}
			aMap.addMarker(myPoint);
			window.setTimeout(function() {
				updateMyLocation();
			}, 5000);
		}

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

})