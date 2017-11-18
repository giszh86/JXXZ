var caseColumnChart = echarts.init(document.getElementById('caseColumn'));
var data = [100, 150, 200, 125, 80];
// 指定图表的配置项和数据
var option = {
    tooltip: {},
    grid: {
        left: '1%',
        right: '4%',
        bottom: '1%',
        width: '95%',
        top: '5%',
        containLabel: true
    },
    xAxis: {
        color: ['#fffff'],
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#16B2B5'
            },
        },
    },

    yAxis: {
        data: ["领导督办", "监控", "群众热线", "智慧平台", "队员巡查发现"],
        axisLine: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
        boundaryGap: ['5%', '5%']
    },

    textStyle: {
        color: '#ffffff',
        fontSize: 12
    },

    series: [
         {
             type: 'bar',
             barWidth: 12,
             itemStyle: {
                 normal: {
                     color: new echarts.graphic.LinearGradient(
                         0, 0, 0, 1,
                         [
                             { offset: 0, color: '#70F466' },
                             { offset: 0.5, color: '#65F65A' },
                             { offset: 1, color: '#4CF43F' }
                         ]
                     )
                 },
                 emphasis: {
                     color: new echarts.graphic.LinearGradient(
                         0, 0, 0, 1,
                         [
                             { offset: 0, color: '#70F466' },
                             { offset: 0.7, color: '#65F65A' },
                             { offset: 1, color: '#4CF43F' }
                         ]
                     )
                 }
             },
             data: data
         }
    ]
};
caseColumnChart.setOption(option);