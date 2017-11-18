var renyuanColumnObj = document.getElementById('renyuanlinechart');
var renyuanColumn = echarts.init(renyuanColumnObj);
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
        data: ['越界报警', '离线报警', '超时报警'],
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
            data: ['新城中队', '高照中队'],
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
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#0a668c'],
                    type: 'dashed',
                }
            },
        },
    ],
    series: [
        {
            name: '越界报警',
            type: 'bar',
            barWidth: '10%',
            data: [],
        },
        {
            name: '离线报警',
            type: 'bar',
            barWidth: '10%',
            data: [],
        },
        {
            name: '超时报警',
            type: 'bar',
            barWidth: '10%',
            data: [],
        }
    ],
    textStyle:
       {
           color: '#c4efdd',
       },
};



// 使用刚指定的配置项和数据显示图表。
renyuanColumn.setOption(renyuanColumnoption);

function setrenyuanColumnData(data) {
    var array = data.split("|");
    var one = JSON.parse(array[4]);
    var two = JSON.parse(array[5]);
    var three = JSON.parse(array[6]);
    renyuanColumn.setOption({
        series: [
            {
                name: '越界报警',
                data: one
            },
            {
                name: '离线报警',
                data: two
            },
            {
                name: '超时报警',
                data: three
            }
        ]
    });
    runrenyuanColumn();
}

//重载事件趋势图
function runrenyuanColumn() {
    var option = renyuanColumn.getOption();
    if (renyuanColumn) {
        renyuanColumn.dispose();
    }
    renyuanColumn = echarts.init(renyuanColumnObj);
    if (typeof option === 'object') {
        renyuanColumn.setOption(option, true);
    }

}