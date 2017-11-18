// 基于准备好的dom，初始化echarts实例
var partshistogramObj = document.getElementById('leftpartslefthistogram');
var partshistogramChart = echarts.init(partshistogramObj);

// 指定图表的配置项和数据
var option = {
    color: ['#A94789', '#6A4A9D', '#2AB07D', '#AC8C00', '#75A200', '#1C81B4'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        height: '100',
        left: '1%',
        bottom: '3%',
        width: '100%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
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
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#0a668c'],
                    type: 'dashed',
                }
            },
        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            barWidth: '30%',
            data: [],
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colorList = ['#A94789', '#6A4A9D', '#2AB07D', '#AC8C00', '#75A200', '#1C81B4'];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
partshistogramChart.setOption(option);

function setpartshistogramChart(data) {
    var array = data.split('|');
    var newdata = array[2];
    var number = JSON.parse(array[0]);
    $('#partsallCount').prop('number', 0).animateNumber({ number: number }, 5500);

    var publicToilet = JSON.parse(array[3])[0];
    $('#publicToilet').prop('number', 0).animateNumber({ number: publicToilet }, 5500);
    var advertisingPlaque = JSON.parse(array[3])[1];
    $('#advertisingPlaque').prop('number', 0).animateNumber({ number: advertisingPlaque }, 5500);
    var fireControl = JSON.parse(array[3])[2];
    $('#fireControl').prop('number', 0).animateNumber({ number: fireControl }, 5500);
    var pipelines = JSON.parse(array[3])[3];
    $('#pipelines').prop('number', 0).animateNumber({ number: pipelines }, 5500);
    var manholeCover = JSON.parse(array[3])[4];
    $('#manholeCover').prop('number', 0).animateNumber({ number: manholeCover }, 5500);
    var streetLamp = JSON.parse(array[3])[5];
    $('#streetLamp').prop('number', 0).animateNumber({ number: streetLamp }, 5500);
    var parkingLot = JSON.parse(array[3])[6];
    $('#parkingLot').prop('number', 0).animateNumber({ number: parkingLot }, 5500);
    var chartdata = JSON.parse(newdata);
    var xAxisData = JSON.parse(array[1]);
    partshistogramChart.setOption({
        xAxis:[
            {
                data: xAxisData
            }
        ],
        series: [
            {
                data: chartdata
            }
        ]
    });
    runpartshistogramChart();
}
//重载趋势图
function runpartshistogramChart() {
    var option = partshistogramChart.getOption();
    if (partshistogramChart) {
        partshistogramChart.dispose();
    }
    partshistogramChart = echarts.init(partshistogramObj);
    if (typeof option === 'object') {
        partshistogramChart.setOption(option, true);
    }
}