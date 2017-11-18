/**
 * 统一返回所有基础数据列表选择
 * 全局变量window.ArrayData 
 * 包含所有返回数组
 */
;
(function() {
	var factory = function(mui, app, pic) {
		var userInfo = app.getUserInfo();
		var data = {
			teamList: [], //中队+班组列表
			teamGroupList: [], //班组列表
			personList: [], //人员列表
			auditingWorkList: [{
				text: '通过',
				value: 1
			}, {
				value: 2,
				text: '不通过'
			}],
			satisfactionList: [{
				text: '满意',
				value: '满意'
			}, {
				text: '不满意',
				value: '不满意'
			},{
				text: '一般',
				value: '一般'
			}, {
				text: '无法联系',
				value: '无法联系'
			}],
			methodList: [{
				text: '教育劝导',
				value: '教育劝导'
			}, {
				text: '建议立案',
				value: '建议立案'
			}],
			carList: [{
				text: '小型汽车',
				value: 1
			}, {
				text: '大型汽车',
				value: 2
			}], //号牌种类
			srid: [{
				text: '专项整治1',
				value: 1
			}, {
				text: '专项整治2',
				value: 2
			}]
		};
		window.ArrayData = data;

		function SetValue(selector, value) {

			app.setValue(selector, value);
		}

		function SetData(popPicker, list, defaultValue) {
			if(defaultValue != undefined && typeof(defaultValue) != 'object') {
				defaultValue = [defaultValue];
			}
			if(typeof(list) == 'string') {
				var data = window.ArrayData[list];
				if(!data) return;
				popPicker.setData(data, defaultValue);
				if(!data || (data.length == 1 && data[0].value == null)) {

					if(popPicker) {
						console.log('重新加载数据选择器数据');
						window.setTimeout(function() {
							SetData(popPicker, list, defaultValue);
						}, 500);
					}

				}
			} else {
				popPicker.setData(list, defaultValue);
			}

		}

		function _InitArray(strArray) {
			var _data = window.ArrayData[strArray];
			_data.splice(0);
			var obj = [{
				text: '加载中..',
				value: null
			}];
			_data.push(obj);
		}

		function getTeamList(userId, callback) {
			data.teamList.splice(0);
			var url = app.webApi + 'api/signarea/getteam?userid=' + userId;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						window.ArrayData.teamList.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(data.teamList);
				}
			});
		}

		function getAllTeamList(userId, callback) {
			data.teamList.splice(0);
			var url = app.webApi + 'api/signarea/getteamofall?userid=' + userId;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						var children = temp.children;
						if(children.length == 0) {
							children.push({
								text: '没班组',
								value: null
							});
						}
						window.ArrayData.teamList.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(data.teamList);
				}
			});
		}

		function getStoreType(callback) {
			var data = [];
			for(var i = 0; i < 4; i++) {
				var obj = {
					text: '店家类型' + (i + 1),
					value: i + 1
				}
				data.push(obj);
			}
			if(typeof(callback) == 'function') callback(data);

		}

		function getSourceType(callback) {
			var url = app.webApi + 'api/citizenevent/getsourcestypes';
			console.log(url);
			var _data = [];
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.Name;
						temp.value = temp.ID;
						_data.push(temp);
					}
					_data = data;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(_data);

				}
			});
		}

		//满意度
		function getSatisfactionList(callback) {
			var data = window.ArrayData.satisfactionList;
			if(typeof(callback) == 'function') {
				callback(data);
			}
		}

		//处理方式
		function getMethodList(callback) {
			var data = window.ArrayData.methodList;
			if(typeof(callback) == 'function') {
				callback(data);

			}
		}

		//专项整治
		function getSridList(callback) {
			var url = app.webApi + '/api/Dictionary/GetZdList?zd_type=type_task';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//				console.log(JSON.stringify(data));
					var list = window.ArrayData.srid;
					list.splice(0);
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.zd_name;
						temp.value = temp.zd_id;
						list.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(window.ArrayData.srid);
				}
			});

			var arr = [];
			for(var i = 0; i < 5; i++) {
				var obj = {
					text: '专项整治' + (i + 1),
					value: i + 1
				}
				arr.push(obj);
			}
			if(typeof(callback) == 'function') callback(arr);

		}
		//号牌种类
		function getCarList(callback) {
			_InitArray('carList');
			var url = app.webApi + 'api/Dictionary/GetZdList?zd_type=case_type_car';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					var list = window.ArrayData.carList;
					list.splice(0);
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.zd_name;
						temp.value = temp.zd_id;
						list.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(window.ArrayData.carList);
				}
			});

		}

		//所属区域
		function getBelongsToArea(callback) {
			_InitArray('carList');
			var url = app.webApi + 'api/Dictionary/GetZdList?zd_type=type_yjdj_ssqy';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					var list = window.ArrayData.carList;
					list.splice(0);
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.zd_name;
						temp.value = temp.zd_id;
						list.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(window.ArrayData.carList);
				}
			});

		}

		//获取指挥中心人.
		function getUsersStaffList(callback) {
			var url = app.webApi + 'api/User/GetUsersStaffList?roleid=2';
			console.log(url);
			var _data = [];
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.DisplayName;
						temp.value = temp.ID;
						_data.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(_data);

				}
			});
		}

		//选择本人中队下内勤
		function getUsersPersonnelList(callback) {
			var user = app.getUserInfo();
			var url = app.webApi + 'api/User/GetUsersPersonnelList?roleid=3&unitid=' + user.UnitID;
			console.log(url);
			var _data = [];
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						temp.text = temp.DisplayName;
						temp.value = temp.ID;
						_data.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(_data.length == 0) {
						_data.push({
							text: '中队下没有内勤',
							value: null
						});
					}
					if(typeof(callback) == 'function') callback(_data);

				}
			});
		}

		/**
		 * 通用ajax
		 * @param {String} api接口
		 * @param {Object} 传参
		 * @param {Function} callback
		 * @param {String} window.ArrayData 全局变量名称
		 */
		function getChoose(api, option, callback, dataName) {
			var param = mui.param(option || {});
			var url = app.webApi + api;
			if(param) {
				url += '?' + param;
			}
			console.log(url);
			var _data = null;
			if(dataName) {
				_data = window.ArrayData[dataName];
				_InitArray(dataName)
			} else {
				_data = [];
			}
			mui.ajax({
				url: url,
				success: function(data) {
					_data.splice(0);
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						_data.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof(callback) == 'function') callback(_data);
				}
			});
		}

		/**
		 * 通用ajax
		 * @param {String} api接口
		 * @param {Object} 传参
		 * @param {Function} 处理function
		 * @param {Function} callback
		 */
		function chooseArray(api, options, detail, callback) {
			var param = mui.param(options || {});
			var url = app.webApi + api;
			if(param) {
				url += '?' + param;
			}
			console.log(url);
			var _data = [];
			mui.ajax({
				url: url,
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						var temp = data[i];
						if(typeof detail == 'function') temp = detail(temp, i);
						_data.push(temp);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					if(typeof callback == 'function') callback(_data);
				}
			});
		}

		var choosePop = null;
		var chooseDT = null;

		return {
			//满意度.satisfactionList
			getSatisfactionList: function(callback) {
				getSatisfactionList(callback);
			},

			getStoreType: function(callback) {
				getStoreType(callback);

			},

			/**
			 * 处理方式
			 * @param {Function} callback
			 * methodList
			 */
			getMethodList: function(callback) {
				getMethodList(callback);
			},
			/**
			 * 问题来源
			 * @param {Function} callback
			 */
			getSourceType: function(callback) {
				getSourceType(callback);
			},
			/**
			 * 获取中队+班组(包含全部)
			 * @param {Number} userId
			 * @param {Function} callback
			 */
			getAllTeamList: function(userId, callback) {
				//userId=5
				getAllTeamList(userId, callback);
			},
			//获取中队下所有内勤
			getUsersPersonnelList: function(callback) {
				getUsersPersonnelList(callback);
			},
			//获取所有指挥中心人员
			getUsersStaffList: function(callback) {
				getUsersStaffList(callback);

			},
			/**
			 * 获取中队+班组(不包含全部)
			 * @param {Number} userId
			 * @param {Function} callback
			 */
			getTeamList: function(userId, callback) {
				//userId=3
				getTeamList(userId, callback);
			},
			/**
			 * 获取所有中队
			 * @param {Function} callback
			 */
			getMiddleTeam: function(callback) {
				getChoose('api/Choose/GetMiddleTeam', {}, callback);
			},
			/**
			 * 获取中队下所有班组 获得班组
			 * @param {Number} teamId
			 * @param {Function} callback
			 */
			getTeamGroup: function(teamId, callback) {
				//teamId=11
				getChoose('api/choose/getteamgroup', {
					teamID: teamId
				}, callback, 'teamGroupList');
			},
			/**
			 * 根据班组获取对应
			 * @param {Number} groupId
			 * @param {Function} callback
			 */
			getPersonByGroup: function(groupId, callback) {
				//groupId=22
				getChoose('api/choose/GetPerson', {
					groupId: groupId
				}, callback, 'personList');
			},
			/**
			 * 根据中队返回所有班组+人员
			 * @param {Number} unitId
			 * @param {Function} callback
			 */
			getGroupAndPerson: function(unitId, callback) {
				//unitId=11
				getChoose('api/choose/GetGroupAndPerson', {
					unitId: unitId
				}, callback);
			},
			/**
			 * 返回事件大小类
			 * @param {Function} callback
			 */
			getClassType: function(callback) {
				getChoose('api/choose/GetClassType', null, callback);
			},
			/**
			 * 获取个人证件类别
			 * @param {Function} callback
			 */
			getTypeOfPerson: function(callback) {
				getChoose('api/choose/GetZds', {
					type: 'type_zrr'
				}, callback);
			},
			/**
			 * 获取单位证件类别
			 * @param {Function} callback
			 */
			getTypeOfUnit: function(callback) {
				getChoose('api/choose/getzds', {
					type: 'type_dw'
				}, callback);
			},
			/**
			 * 获取案件类别
			 * @param {Function} callback
			 */
			getCaseType: function(callback) {
				getChoose('api/choose/getzds', {
					type: 'type_case'
				}, callback);
			},
			/**
			 * 获取所有银行账户信息
			 * @param {Function} callback
			 */
			getBank: function(callback) {
				getChoose('api/choose/getbank', null, callback);
			},
			//适用处罚
			getPunishList: function(callback) {
				var arr = [];
				for(var i = 0; i < 5; i++) {
					var str = "处罚" + (i + 1);
					var title = "详情" + (i + 1);
					var obj = {
						value: i,
						text: str,
						title: title
					}
					arr.push(obj);
				}
				if(typeof(callback) == 'function') callback(arr);
			},
			/**
			 * 专项整治
			 * @param {Function} callback
			 */
			getSridList: function(callback) {
				getSridList(callback);
			},
			/**
			 * 号牌种类
			 * @param {Function} callback
			 */
			getCarList: function(callback) {
				getCarList(callback);
			},
			/**
			 * 获取指派队员
			 * @param {Function} callback
			 */
			getPersonnelList: function(callback) {
				var user = app.getUserInfo();
				chooseArray('api/User/GetUsersPersonnelList', {
					unitid: user.UnitID,
					roleid: 4
				}, function(item) {
					var obj = {
						text:item.DisplayName,
						value:item.ID,
					}
					return obj;
				}, callback)
			},

			/**
			 * 所属区域获取
			 * @param {Function} callback
			 */
			getBelongsToArea: function(callback) {
				getBelongsToArea(callback);
			},

			getYHHTList: function(callback) {
				var url = app.webApi + 'api/Contract/GetContractList?start=0&limit=999';
				var _data = [];
				console.log(url);
				mui.ajax({
					url: url,
					success: function(data) {
						for(var i = 0; i < data.Items.length; i++) {
							var temp = data.Items[i];
							temp.value = temp.contractid;
							temp.text = temp.contractname;
							_data.push(temp);
						}
					},
					error: function(x, t, e) {
						console.log(x);
					},
					complete: function() {
						if(typeof(callback) == 'function') callback(_data);
					}
				});
			},
			/**
			 * 通用接口
			 * @param {String} api
			 * @param {Object} 传参
			 * @param {Function} model 回调处理
			 * @param {Function} callback
			 */
			chooseArray: function(api, options, detailModel, callback) {
				chooseArray(api, options, detailModel, callback);
			},

			/**
			 * 支持多级联动
			 * @param {String,Array} dataList
			 * @param {Object} 4个属性:text[array],value[array],options[初始化],defaultValue[默认值]
			 * @param {Object} callback
			 */
			choosePick: function(dataList, selectors, callback) {
				if(!selectors) selectors = {};
				var options = selectors.options || {};
				var defaultValue = selectors.defaultValue;
				var spans = selectors.text || [];
				if(typeof(spans) != 'object') spans = [spans];
				var values = selectors.value || [];
				if(typeof(values) != 'object') values = [values];
				if(!defaultValue) { //没有给初始值.
					defaultValue = [];
					for(var i = 0; i < values.length; i++) {
						var str = app.getValue(document.querySelector(values[i]));
						defaultValue.push(str);
					}
				}
				if(choosePop) choosePop.dispose();
				choosePop = new mui.PopPicker(options);
				SetData(choosePop, dataList, defaultValue);
				choosePop.show(function(items) {
					var len = spans.length > values.length ? spans.length : values.length;
					for(var i = 0; i < len; i++) {
						if(!items[i]) break;
						if(spans[i]) SetValue(spans[i], items[i].text);
						if(values[i]) SetValue(values[i], items[i].value);
					}
					if(typeof(callback) == 'function') callback(items, choosePop);
				});
			},
			/**
			 * 日期选择
			 * @param {Object} options
			 * type:'datetime'	完整日期视图(年月日时分),'date'	年视图(年月日),
			 * 'time'	时间视图(时分),'month'月视图(年月),'hour'	时视图(年月日时)
			 * customData:别名,设置上午,下午,年,月,日,时,分的别名
			 * labels:设置标签区域提示语,默认["年", "月", "日", "时", "分"]
			 * beginDate:最大开始日期,数字或者date类型,数字代表年份
			 * endDate:最大结束日期
			 * value:默认时间,如果要设置默认的时分,不显示年月,还是要把年月补充完整.
			 * @param {Function} callback
			 */
			chooseDate: function(options, callback) {
				//TODO  以后再封装.
				if(!options) options = {};
				var _option = mui.extend({
					type: 'datetime',
					value: new Date().Format('yyyy-MM-dd hh:mm')
				}, options);
				chooseDT = new mui.DtPicker(_option);
				chooseDT.show(function(items) {
					if(typeof(callback) == 'function') {
						var flg = callback(items);
						if(flg === false) return flg;
					}
					chooseDT.dispose();

				});
			},
			initDate: function(selector, options, callback) {
				var dom = document.querySelector(selector);
				if(!dom) {
					alert('没有找到dom节点!');
					return;
				}
				var st = app.getValue(dom);
				if(!st) st = new Date().Format('yyyy-MM-dd hh:mm');
				if(!options) options = {};
				var _option = mui.extend({
					type: 'datetime',
					value: st
				}, options);
				chooseDT = new mui.DtPicker(_option);
				chooseDT.show(function(items) {

					if(items.value) app.setValue(dom, items.value);
					if(typeof(callback) == 'function') {
						var flg = callback(items);
						if(flg === false) return flg;
					}
					chooseDT.dispose();

				});

			},

			/**
			 * 字典表通用方法
			 * @param {Object} zdType
			 * @param {Object} callback
			 */
			getZdList: function(zdType, callback) {
				var url = app.webApi + 'api/Dictionary/GetZdList?zd_type=' + zdType;
				console.log(url);
				var _data = [];
				mui.ajax({
					url: url,
					success: function(data) {
						for(var i = 0; i < data.length; i++) {
							var temp = data[i];
							temp.value = temp.zd_id;
							temp.text = temp.zd_name;
							_data.push(temp);
						}
					},
					error: function(x, t, e) {
						console.log(x);
					},
					complete: function() {
						if(typeof(callback) == 'function') callback(_data);

					}
				});
			}
		}

	}
	if(typeof(define) == 'function' && define.amd && define.amd.vendor != 'dojotoolkit.org') {

		define(['mui', 'app', 'pic'], factory);
	} else {
		window.dataGet = factory(mui, app);
	}
})();