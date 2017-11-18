var monitorColumnChart = echarts.init(document.getElementById('monitorColumn'));;
option = {
    color: ['#2AB07D', '#75A200', '#1C81B4', '#AC8C00', '#6A4A9D', '#A94789', '#B45855'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        height: '100',
        left: '1%',
        bottom: '1%',
        width:'100%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['自建视频', '车载视频', '公安视频', '高空视频', '移动视频', '无人机', '单兵'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                textStyle: { color: "#c4efdd" },
            },
            axisLine: {
                lineStyle: {
                    color: '#10C642',
                },
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                textStyle: { color: "#c4efdd" }
            },
            axisLine: {
                lineStyle: {
                    color: '#10C642',
                },
            },
        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            barWidth: '30%',
            data: [80, 49, 75, 65, 80, 29, 55],
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colorList = ['#2AB07D', '#75A200', '#1C81B4', '#AC8C00', '#6A4A9D', '#A94789', '#B45855'];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }
    ]
};
monitorColumnChart.setOption(option);


