var runlinepersonObj = document.getElementById('linepersonnel');
var linepersonnelChart = echarts.init(runlinepersonObj);

var optionlinepersonnel = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
    },
    color: ['#a835c4','#dbd44e'],
    grid: {
        top: '15%',
        bottom: '1%',
        left: '2%',
        right:'5%',
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
            name: '新城中队',
            type: 'line',
            //stack: '总量',
            data: [],
            lineStyle: {
                normal: {
                    color: '#A835C4'
                },
            },
            symbol: 'rect',
        },
        {
            name: '高照中队',
            type: 'line',
           // stack: '总量',
            data: [],
            lineStyle: {
                normal: {
                    color: '#DBD44E'
                },
            },
            symbol: 'rect',
        }
    ],
    textStyle: { color: '#c4efdd' },
};

// 使用刚指定的配置项和数据显示图表。
linepersonnelChart.setOption(optionlinepersonnel);

function setlinepersonnelData(data) {
    var array=data.split('|');
    var newCityMiddle=JSON.parse(array[0]);
    var hightCityMiddle=JSON.parse(array[1]);
    linepersonnelChart.setOption({
        series: [
            {
                name: '新城中队',
                data: newCityMiddle,
            },
            {
                name: '高照中队',
                data: hightCityMiddle
            }
        ]
    });
    runlinepersonnelChart();
}

//重载事件趋势图
function runlinepersonnelChart() {
    var option = linepersonnelChart.getOption();
    if (linepersonnelChart) {
        linepersonnelChart.dispose();
    }
    linepersonnelChart = echarts.init(runlinepersonObj);
    if (typeof option === 'object') {
        linepersonnelChart.setOption(option, true);
    }

}
