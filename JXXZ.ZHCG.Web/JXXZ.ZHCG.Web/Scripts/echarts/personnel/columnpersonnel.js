var renyuanColumn = echarts.init(document.getElementById('renyuanlinechart'));
// 指定图表的配置项和数据
var renyuanColumnoption = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['环卫人员', '执法人员', '养护人员'],
        icon: 'rect',
        itemWidth: 8,
        itemHeight: 8,
        textStyle:
        {
            color: '#c4efdd',
        },
    },
    grid: {
        height:'100',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color: ['#4D9847', '#B7AB57', '#489EB1'],
    xAxis: [
        {
            type: 'category',
            data: ['新城街道', '高照街道', '秀洲高新区'],
            axisTick: {
                alignWithLabel: true
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
            axisLine: {
                lineStyle: {
                    color: '#10C642',
                },
            },
        },
    ],
    series: [
        {
            name: '环卫人员',
            type: 'bar',
            barWidth: '10%',
            data: [50, 45, 30],
        },
        {
            name: '养护人员',
            type: 'bar',
            barWidth: '10%',
            data: [35, 37, 40],
        },
        {
            name: '执法人员',
            type: 'bar',
            barWidth: '10%',
            data: [25, 52, 45],
        }
    ],
    textStyle:
       {
           color: '#c4efdd',
       },
};



// 使用刚指定的配置项和数据显示图表。
renyuanColumn.setOption(renyuanColumnoption);