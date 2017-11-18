var caseColumnObj = document.getElementById('caseColumn');
var caseColumnChart = echarts.init(caseColumnObj);
// 指定图表的配置项和数据
var option = {
    tooltip: {},
    grid: {
        left: '1%',
        right: '4%',
        bottom: '1%',
        width: '95%',
        top: '5%',
        containLabel: true
    },
    xAxis: {
        color: ['#fffff'],
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#16B2B5'
            },
        },
    },

    yAxis: {
        data: ["投诉举报","上级交办","下级报送","同级转办","巡查发现"],
        axisLine: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
        boundaryGap: ['5%', '5%']
    },

    textStyle: {
        color: '#ffffff',
        fontSize: 12
    },

    series: [
         {
             name:'一般案件',
             type: 'bar',
             barWidth: 12,
             itemStyle: {
                 normal: {
                     color: new echarts.graphic.LinearGradient(
                         0, 0, 0, 1,
                         [
                             { offset: 0, color: '#70F466' },
                             { offset: 0.5, color: '#65F65A' },
                             { offset: 1, color: '#4CF43F' }
                         ]
                     )
                 },
                 emphasis: {
                     color: new echarts.graphic.LinearGradient(
                         0, 0, 0, 1,
                         [
                             { offset: 0, color: '#70F466' },
                             { offset: 0.7, color: '#65F65A' },
                             { offset: 1, color: '#4CF43F' }
                         ]
                     )
                 }
             },
             data: null
         }
    ]
};

caseColumnChart.setOption(option);

function setCaseColumData(data) {
    var array = data.split('|');
    var caseColumnData = JSON.parse(array[1]);
    caseColumnChart.setOption({
        series:[
            {
                name: '一般案件',
                data: caseColumnData
            }
        ]
    });
    runCaseColumn();
}

//重载案件柱状图
function runCaseColumn() {
    var option = caseColumnChart.getOption();
    if (caseColumnChart) {
        caseColumnChart.dispose();
    }
    caseColumnChart = echarts.init(caseColumnObj);
    if (typeof option === 'object') {
        caseColumnChart.setOption(option, true);
    }

}