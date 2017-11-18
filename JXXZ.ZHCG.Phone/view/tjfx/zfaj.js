require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'echarts': 'echarts.common.min'
	}
});

require(['mui', 'app', 'echarts', 'Vue'], function(mui, app, echarts, Vue) {
	mui.init({});
	var dayData = [],
		monthData = [],
		yearData = [],
		dataName = [];
	var dayCase, monthCase, yearCase;
	mui.plusReady(function() {
		var vm = new Vue({
			el: '.mui-content',
			data: {
				items: [],
			}
		})

		function getData(type, parmas, selected) {
			var url = app.webApi + 'api/phone/GetStatisticsByZFAJ?type=' + type;
			console.log(url);
			plus.nativeUI.showWaiting('请稍后...');
			mui.ajax({
				url: url,
				success: function(data) {
					//console.log(JSON.stringify(data));
					vm.items=data.Items;
					//console.log(vm.items)
					//处理数据 TODO
					if(type == 1) {
						isLoader['日'] = true;
						selected = {
							'日': true,
							'月': false,
							'年': false
						}
						for(var i = 0; i < data.Items.length; i++) {
							dayData.push(data.Items[i].count);
							dataName.push(data.Items[i].name);
						}
						dayCase = data.Items;
						return
					} else if(type == 2) {
						for(var i = 0; i < data.Items.length; i++) {
							monthData.push(data.Items[i].count);
						}
						monthCase = data.Items;
					} else if(type == 3) {
						for(var i = 0; i < data.Items.length; i++) {
							yearData.push(data.Items[i].count);
						}
						yearCase = data.Items;
					}
					isLoader[parmas.name] = true;
					console.log(vm.items)
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
					//TODO 
					barChart.setOption({
						legend: {
							selected: selected
						},
						xAxis: [{
							data: dataName
						}],
						series: [{
							name: '日',
							data: dayData
						}, {
							name: '月',
							data: monthData
						}, {
							name: '年',
							data: yearData
						}]
					});
				}
			});
		}
		getData(1);
		var isLoader = {
			'日': false, //日
			'月': false, //月
			'年': false //年
		}

		var option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['日', '月', '年'],
				selected: {
					'日': true,
					'月': false,
					'年': false
				},
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				data: ['简易案件', '一般案件', '违停案件']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '日',
				type: 'bar',
				data: [68, 83, 30],
				barWidth: '30px',
				itemStyle: {
					normal: {
						//柱形图圆角，初始化效果
						barBorderRadius: [10, 10, 0, 0]
					}
				},
				label: {
					normal: {
						show: true,
						position: 'insideTop'
					}
				},
			}, {
				name: '月',
				type: 'bar',
				data: [8, 23, 30],
				barWidth: '30px',
				itemStyle: {
					normal: {
						//柱形图圆角，初始化效果
						barBorderRadius: [10, 10, 0, 0]
					}
				},
				label: {
					normal: {
						show: true,
						position: 'insideTop'
					}
				},
			}, {
				name: '年',
				type: 'bar',
				data: [5, 50, 80],
				barWidth: '30px',
				itemStyle: {
					normal: {
						//柱形图圆角，初始化效果
						barBorderRadius: [10, 10, 0, 0]
					}
				},
				label: {
					normal: {
						show: true,
						position: 'insideTop'
					}
				},
			}]
		};

		var barChart = echarts.init(document.getElementById("barChart"));
		barChart.setOption(option);
		barChart.on('legendselectchanged', function(parmas) {
			var obj = {};
			obj[parmas.name] = true;
			var selected = mui.extend({
				'日': false,
				'月': false,
				'年': false
			}, obj);

			if(isLoader[parmas.name]) {
				if(parmas.name == "日") {
					vm.items = dayCase;
				} else if(parmas.name == "月") {
					vm.items = monthCase;
				} else if(parmas.name == "年") {
					vm.items = yearCase;
				}
				//已经更新过了,直接跳转
				barChart.setOption({
					legend: {
						selected: selected
					}
				});
				return;
			}

			var type = "日月年".indexOf(parmas.name) + 1;
			getData(type, parmas, selected);

		});
	});
})