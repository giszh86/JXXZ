var objmonitorColumn = document.getElementById('monitorColumn');
var monitorColumnChart = echarts.init(objmonitorColumn);

var option = {
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
            data: ['自建视频', '车载视频', '公安视频', '高空视频', '移动视频', '无人机', '执法记录仪'],
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
                        var colorList = ['#2AB07D', '#75A200', '#1C81B4', '#AC8C00', '#6A4A9D', '#A94789', '#B45855'];
                        return colorList[params.dataIndex]
                    }
                }
            }
        }
    ]
};
monitorColumnChart.setOption(option);


function setmonitorColumnChart(dataValue) {
    monitorColumnChart.setOption({
        series: [
       {
           name: '',
           type: 'bar',
           barWidth: '30%',
           data: dataValue,
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
    });
    //自建视频
    $('#SelfBuiltVideo').prop('number', 0).animateNumber({ number: dataValue[0] }, 5500);
    //车载视频
    $('#CarVideo').prop('number', 0).animateNumber({ number: dataValue[1] }, 5500);
    //公安视频
    $('#PublicSecurityVideo').prop('number', 0).animateNumber({ number: dataValue[2] }, 5500);
    //高空视频
    $('#HighAltitudeVideo').prop('number', 0).animateNumber({ number: dataValue[3] }, 5500);
    //移动视频
    $('#MoveVideo').prop('number', 0).animateNumber({ number: dataValue[4] }, 5500);
    //无人机
    $('#UAV').prop('number', 0).animateNumber({ number: dataValue[5] }, 5500);
    //单兵
    $('#Soldier').prop('number', 0).animateNumber({ number: dataValue[6] }, 5500);
    runMonitor()
}
//重载首页柱状图
function runMonitor() {
    var option = monitorColumnChart.getOption();
    if (monitorColumnChart) {
        monitorColumnChart.dispose();
    }
    monitorColumnChart = echarts.init(objmonitorColumn);
    if (typeof option === 'object') {
        monitorColumnChart.setOption(option, true);
    }
}

