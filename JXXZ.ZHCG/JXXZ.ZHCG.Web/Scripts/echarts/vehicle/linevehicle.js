var vehiclelineChart = echarts.init(document.getElementById('vehicleline'));
var vehiclelineoption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
    },
    color: ['#a835c4', '#65cdf2', '#dbd44e'],
    legend: {
        data: ['渣土车', '环卫车'],
        textStyle:
        {
            color: '#c4efdd',
        },
        icon: 'rect',
        right: '12',
        top: '10',
        orient: 'vertical',
        itemWidth: 8,
        itemHeight: 8,
    },
    grid: {
        top: '15%',
        left: '0%',
        right: '15%',
        bottom: '1%',
        containLabel: true,
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#10C642',
            },
        },
        data: ['', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#10C642',
            },
        },
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: ['#0a668c'],
                type: 'dashed',
            }
        },
    },
    series: [
        {
            name: '渣土车',
            type: 'line',
            data: ['', 60, 70, 75, 80, 50, 65, 78, 55, 60, 100, 40],
            lineStyle: {
                normal: {
                    color: '#a835c4'
                },
            },
            symbol: 'rect',
        },
        {
            name: '环卫车',
            type: 'line',
            data: ['', 14, 8, 9, 10, 8, 15, 8, 9, 7, 10, 15],
            lineStyle: {
                normal: {
                    color: '#65cdf2'
                },
            },
            symbol: 'rect',
        }
    ],
    textStyle: { color: '#c4efdd' },
};

// 使用刚指定的配置项和数据显示图表。
vehiclelineChart.setOption(vehiclelineoption);
