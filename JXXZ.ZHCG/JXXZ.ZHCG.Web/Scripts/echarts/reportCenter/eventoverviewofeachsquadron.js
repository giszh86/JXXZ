// 基于准备好的dom，初始化echarts实例
var middleteameventObj = document.getElementById('middleteamevent');
var middleteameventChart = echarts.init(middleteameventObj);

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
            name: '上报数',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320],
            barWidth: '20%',
        },
        {
            name: '处理数',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 210],
            barWidth: '20%',
        },
         {
             name: '结案数',
             type: 'bar',
             data: [120, 132, 101, 134, 90, 230, 210],
             barWidth: '20%',
         },
    ],
    textStyle:
    {
        color: '#59636F',
    },
};

// 使用刚指定的配置项和数据显示图表。
middleteameventChart.setOption(option);

function setmiddleteameventData(data) {
    var array = data.split('|');
    var one = JSON.parse(array[0]);
    var two = JSON.parse(array[1]);
    var three = JSON.parse(array[2]);
    middleteameventChart.setOption({
        series: [
            {
                name: '上报数',
                data: one,
            },
            {
                name: '处理数',
                data: two,
            },
            {
                name: '结案数',
                data: three,
            }
        ]
    });
    runmiddleteameventChart();
}

//重载趋势图
function runmiddleteameventChart() {
    var option = middleteameventChart.getOption();
    if (middleteameventChart) {
        middleteameventChart.dispose();
    }
    middleteameventChart = echarts.init(middleteameventObj);
    if (typeof option === 'object') {
        middleteameventChart.setOption(option, true);
    }

}