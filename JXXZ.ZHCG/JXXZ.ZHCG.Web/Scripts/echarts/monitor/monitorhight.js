// 基于准备好的dom，初始化echarts实例
var objhightcity = document.getElementById('hightcity');
var monitorPiehightChart = echarts.init(objhightcity);
// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color: ['#2AACAF', '#4FC877'],
    title: {
        text: '高照\n街道',
        x: 'center',
        y: 'center',
        top: '29%',
        textStyle:{
            color: '#c4efdd',
            fontSize: 15,
        },
    },
    series: [
        {
            name: '高照街道',
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
            data:[]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
monitorPiehightChart.setOption(option);


function setmonitorPiehightChart(dataValue) {
    monitorPiehightChart.setOption({
        series: [
       {
           name: '高照街道',
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
    $('#hightcityFixed').prop('number', 0).animateNumber({ number: dataValue[0] }, 5500);
    //视频总数移动
    $('#hightcityMove').prop('number', 0).animateNumber({ number: dataValue[1] }, 5500);
    runmonitorPiehightChart()
}

function runmonitorPiehightChart() {
    var option = monitorPiehightChart.getOption();
    if (monitorPiehightChart) {
        monitorPiehightChart.dispose();
    }
    monitorPiehightChart = echarts.init(objhightcity);
    if (typeof option === 'object') {
        monitorPiehightChart.setOption(option, true);
    }
}