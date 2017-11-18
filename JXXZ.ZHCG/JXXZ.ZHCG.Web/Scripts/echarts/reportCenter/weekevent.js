// 基于准备好的dom，初始化echarts实例
var eventcaseObj = document.getElementById('eventcase');
var eventcaseChart = echarts.init(eventcaseObj);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        width: '92%',
        height: '90%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#246479',
            },
        },
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: ['#A9C9F4'],
                type: 'solid',
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#246479',
            },
        },
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: ['#A9C9F4'],
                type: 'solid',
            }
        },
    },
    color: ['#58CD79'],
    series: [
        {
            name: '事件数量',
            type: 'line',
            stack: '总量',
            data: []
        }
    ],
    textStyle:
   {
       color: '#59636F',
   },
};

// 使用刚指定的配置项和数据显示图表。
eventcaseChart.setOption(option);

function seteventcaseData(data) {
    var array = data.split('|');
    var namelist = JSON.parse(array[0]);
    var valuelist = JSON.parse(array[1]);
    eventcaseChart.setOption({
        xAxis: {
            data: namelist
        },
        series: [
            {
                name: '事件数量',
                data: valuelist
            }
        ]
    });
    runeventcaseChart();
}

//重载趋势图
function runeventcaseChart() {
    var option = eventcaseChart.getOption();
    if (eventcaseChart) {
        eventcaseChart.dispose();
    }
    eventcaseChart = echarts.init(eventcaseObj);
    if (typeof option === 'object') {
        eventcaseChart.setOption(option, true);
    }

}