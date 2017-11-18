// 基于准备好的dom，初始化echarts实例
var objnewcity = document.getElementById('newcity');
var monitorPienewChart = echarts.init(objnewcity);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color: ['#2AACAF', '#4FC877'],
    title: {
        text: '新城\n街道',
        x: 'center',
        y: 'center',
        top: '29%',
        textStyle: {
            color: '#c4efdd',
            fontSize: 15,
        },
    },
    series: [
        {
            name: '新城街道',
            type: 'pie',
            radius: ['60%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                //emphasis: {
                //    show: true,
                //    textStyle: {
                //        fontSize: '30',
                //        fontWeight: 'bold'
                //    }
                //}
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: []
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
monitorPienewChart.setOption(option);

function setmonitorPienewChart(dataValue) {
    monitorPienewChart.setOption({
        series: [
       {
           name: '新城街道',
           type: 'pie',
           radius: ['60%', '90%'],
           avoidLabelOverlap: false,
           label: {
               normal: {
                   show: false,
                   position: 'center'
               },
           },
           labelLine: {
               normal: {
                   show: false
               }
           },
           data: [
               { value: dataValue[0], name: '固定' },
               { value: dataValue[1], name: '移动' },
           ]
       }
        ]
    });
    //视频总数固定
    $('#newcityFixed').prop('number', 0).animateNumber({ number: dataValue[0] }, 5500);
    //视频总数移动
    $('#newcityMove').prop('number', 0).animateNumber({ number: dataValue[1] }, 5500);
    runmonitorPienewChart()
}

function runmonitorPienewChart() {
    var option = monitorPienewChart.getOption();
    if (monitorPienewChart) {
        monitorPienewChart.dispose();
    }
    monitorPienewChart = echarts.init(objnewcity);
    if (typeof option === 'object') {
        monitorPienewChart.setOption(option, true);
    }
}
