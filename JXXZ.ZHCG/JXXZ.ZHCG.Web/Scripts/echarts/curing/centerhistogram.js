var curringObjdom = document.getElementById('curinghistogram');
var curingcenterChart = echarts.init(curringObjdom);

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
    title: {
        text: '合同',
        x: 'right',
        y: 'bottom',
        textStyle: {
            color: '#c4efdd',
            fontSize: 12,
        },
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
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
    },

    yAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
        boundaryGap: ['5%', '5%'],
        axisTick: {
            show: false
        },
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
             data: []
         }
    ]
};


// 使用刚指定的配置项和数据显示图表。
curingcenterChart.setOption(option);

function setcuringhistogrameData(data) {
    var array = data.split('|');
    var namelist = JSON.parse(array[0]);
    var valuelist = JSON.parse(array[1]);
    curingcenterChart.setOption({
        yAxis: {
            data: namelist
        },
        series: [
            {
                data: valuelist
            }
        ]
    });
    runCurringCenter();
}

//重载趋势图
function runCurringCenter() {
    var option = curingcenterChart.getOption();
    if (curingcenterChart) {
        curingcenterChart.dispose();
    }
    curingcenterChart = echarts.init(curringObjdom);
    if (typeof option === 'object') {
        curingcenterChart.setOption(option, true);
    }

}