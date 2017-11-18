var eventLineChart = echarts.init(document.getElementById('eventLine'));;
option = {
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
        orient: 'vertical',
        right: '12',
        top: '10',
        data: ['已上报', '已处理', '已完结'],
        textStyle:
        {
            color: '#c4efdd',
        },
        icon: 'rect',
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
            lineStyle: {
                color: '#10C642',
            },
        },
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
            name: '已上报',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
                normal: {
                    color: '#a835c4'
                },
            },
        },
        {
            name: '已处理',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            lineStyle: {
                normal: {
                    color: '#65cdf2'
                },
            },
        },
        {
            name: '已完结',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
            lineStyle: {
                normal: {
                    color: '#dbd44e'
                },
            },
        }
    ], textStyle: { color: '#c4efdd' },
};

eventLineChart.setOption(option);
