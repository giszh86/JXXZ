// 基于准备好的dom，初始化echarts实例
var statisticalSnalysisObj = document.getElementById('statisticalSnalysis');
var statisticalSnalysisChart = echarts.init(statisticalSnalysisObj);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        width: '95%',
        height: '90%',
        containLabel: true
    },
    color: ['#EF6C55', '#2AB0E3', '#58CD79'],
    xAxis: [
        {
            type: 'category',
            data: ['高照中队', '新城中队', '王店中队', '洪合中队', '新腾中队', '王江泾中队', '油车港中队'],
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
        }
    ],
    yAxis: [
        {
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
        }
    ],
    series: [
        {
            name: '案源数',
            type: 'bar',
            data: [],
            barWidth: '20%',
        },
        {
            name: '立案数',
            type: 'bar',
            data: [],
            barWidth: '20%',
        },
         {
             name: '结案数',
             type: 'bar',
             data: [],
             barWidth: '20%',
         },
    ],
    textStyle:
    {
        color: '#59636F',
    },
};

// 使用刚指定的配置项和数据显示图表。
statisticalSnalysisChart.setOption(option);

function setstatisticalSnalysisData(data) {
    var array = data.split('|');
    var one = JSON.parse(array[0]);
    var two = JSON.parse(array[1]);
    var three = JSON.parse(array[2]);
    statisticalSnalysisChart.setOption({
        series: [
             {
                 name: '案源数',
                 data: one,
             },
            {
                name: '立案数',
                data: two,
                barWidth: '20%',
            },
            {
                name: '结案数',
                data: three,
            },
        ]
    });
    runstatisticalSnalysisChart();
}

//重载趋势图
function runstatisticalSnalysisChart() {
    var option = statisticalSnalysisChart.getOption();
    if (statisticalSnalysisChart) {
        statisticalSnalysisChart.dispose();
    }
    statisticalSnalysisChart = echarts.init(statisticalSnalysisObj);
    if (typeof option === 'object') {
        statisticalSnalysisChart.setOption(option, true);
    }

}