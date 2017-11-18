// 基于准备好的dom，初始化echarts实例
var objxiucity = document.getElementById('xiucity');
var monitorPieChart = echarts.init(objxiucity);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color: ['#2AACAF', '#4FC877'],
    title: {
        text: '视频\n总数',
        x: 'center',
        y: 'center',
        top: '29%',
        textStyle: {
            color: '#c4efdd',
            fontSize: 15,
        },
    },
    grid: {
        backgroundColor: 'rgba(238,238,238,1)'
    },
    series: [
        {
            name: '秀洲国家高新区',
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
monitorPieChart.setOption(option);

function setmonitorPieChart(dataValue) {
    monitorPieChart.setOption({
        series: [
           {
               name: '秀洲国家高新区',
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
    $('#xiucityFixed').prop('number', 0).animateNumber({ number: dataValue[0] }, 5500);
    //视频总数移动
    $('#xiucityMove').prop('number', 0).animateNumber({ number: dataValue[1] }, 5500);
    runmonitorPieChart()
}

function runmonitorPieChart() {
    var option = monitorPieChart.getOption();
    if (monitorPieChart) {
        monitorPieChart.dispose();
    }
    monitorPieChart = echarts.init(objxiucity);
    if (typeof option === 'object') {
        monitorPieChart.setOption(option, true);
    }
}
