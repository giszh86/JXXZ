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
        data: ['渣土车', '环卫车', '执法车'],
        textStyle:
        {
            color: '#c4efdd',
        },
        icon: 'rect',
        right: '0',
        bottom: '0',
        x: 'right',
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
    },
    series: [
        {
            name: '渣土车',
            type: 'line',
            stack: '总量',
            data: ['', 120, 132, 101, 134, 90, 230, 210, 100, 150, 160, 170],
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
            stack: '总量',
            data: ['', 220, 182, 191, 234, 290, 330, 310, 200, 250, 100, 170],
            lineStyle: {
                normal: {
                    color: '#65cdf2'
                },
            },
            symbol: 'rect',
        },
        {
            name: '执法车',
            type: 'line',
            stack: '总量',
            data: ['', 150, 232, 201, 154, 190, 330, 410, 300, 310, 320, 170],
            lineStyle: {
                normal: {
                    color: '#dbd44e'
                },
            },
            symbol: 'rect',
        }
    ],
    textStyle: { color: '#c4efdd' },
};

// 使用刚指定的配置项和数据显示图表。
vehiclelineChart.setOption(vehiclelineoption);
