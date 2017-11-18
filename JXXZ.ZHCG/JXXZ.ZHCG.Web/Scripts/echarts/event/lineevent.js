var eventLineobj = document.getElementById('eventLine');
var eventLineChart = echarts.init(eventLineobj);

var option = {
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
        data: ['已上报', '处理中', '已完结'],
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
        left: '2%',
        right: '15%',
        bottom: '1%',
        containLabel: true,
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
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
            name: '已上报',
            type: 'line',
            data: [],
            lineStyle: {
                normal: {
                    color: '#a835c4'
                },
            },
        },
        {
            name: '处理中',
            type: 'line',
            data: [],
            lineStyle: {
                normal: {
                    color: '#65cdf2'
                },
            },
        },
        {
            name: '已完结',
            type: 'line',
            data: [],
            lineStyle: {
                normal: {
                    color: '#dbd44e'
                },
            },
        }
    ], textStyle: { color: '#c4efdd' },
};

eventLineChart.setOption(option);

function setDataEventLine(data) {
    var newdata = data.split('|');
    //x轴线
    var legenddata = JSON.parse(newdata[1]);
    //已上报
    var reporteddata = JSON.parse(newdata[2]);
    //处理中
    var processdata = JSON.parse(newdata[3]);
    //已完结
    var finishdata = JSON.parse(newdata[4]);

    eventLineChart.setOption({
        xAxis: {
            data: legenddata
        },
        series: [
            {
                name: '已上报',
                data: reporteddata
            },
            {
                name: '处理中',
                data: processdata
            },
            {
                name: '已完结',
                data: finishdata
            },
        ]
    })

    runEventLine();
}

//重载事件趋势图
function runEventLine() {
    var option = eventLineChart.getOption();
    if (eventLineChart) {
        eventLineChart.dispose();
    }
    eventLineChart = echarts.init(eventLineobj);
    if (typeof option === 'object') {
        eventLineChart.setOption(option, true);
    }

}