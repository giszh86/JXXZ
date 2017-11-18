var caseColumnrightChart = echarts.init(document.getElementById('caseColumnright'));
var colors = ['#12BE23'];
// 指定图表的配置项和数据
var option15 = {
    color: colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        textStyle: {
            fontSize: 12,
        }
    },
    grid: {
        left: '1%',
        right: '4%',
        bottom: '1%',
        width: '95%',
        top: '10%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            color: ['#76A4C7'],
            axisLine: {
                lineStyle: {
                    color: '#6B8BA2'
                },
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12
                },
            },
            data: ['一般案件', '违停案件', '重大案件', '简易案件'],
        },
    ],
    yAxis: [
        {
            color: ['#76A4C7'],
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#6B8BA2'
                },
            },
            axisLabel: {
                textStyle: {
                    fontSize: 12
                },
            },
        }
    ],
    series: [
        {
            name: '案件数量',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#EA1400' },
                            { offset: 0.5, color: '#FFFF01' },
                            { offset: 1, color: '#2BFE0F' }
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#EA1400' },
                            { offset: 0.7, color: '#FFFF01' },
                            { offset: 1, color: '#2BFE0F' }
                        ]
                    )
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: [180, 60, 110, 220],
        },
           {
               name: '条数',
               type: 'line',
               yAxisIndex: 0,
               data: [180, 60, 110, 220],
           }
    ]
};

caseColumnrightChart.setOption(option15);