// 基于准备好的dom，初始化echarts实例
var objfirstpie = document.getElementById('firstpie');
var firstpieChart = echarts.init(objfirstpie);
// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
    },
    color: ['#DBD44F', '#47DA87', '#E56655', '#0BBBB9'],
    series: [
        {
            name: '',
            type: 'pie',
            selectedMode: 'single',
            selectedOffset: 2,
            radius: [0, '70%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                }
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
firstpieChart.setOption(option);

function changeCaseColumnright(data) {
    //简易案件
    $('#indexSimple').prop('number', 0).animateNumber({ number: data[0] }, 5500);
    //一般案件
    $('#indexGeneral').prop('number', 0).animateNumber({ number: data[1] }, 5500);
    //重大案件
    $('#indexMajor').prop('number', 0).animateNumber({ number: data[2] }, 5500);
    //违停案件
    $('#indexViolated').prop('number', 0).animateNumber({ number: data[3] }, 5500);
    firstpieChart.setOption({
        series: [
            {
                name: '',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 2,
                radius: [0, '70%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: data[0], name: '简易案件', selected: true },
                    { value: data[1], name: '一般案件', selected: true },
                    { value: data[2], name: '重大案件', selected: true },
                    { value: data[3], name: '违停案件', selected: true },
                ]
            }
        ]
    })
    runPie()
}

//重载首页柱状图
function runPie() {
    var option = firstpieChart.getOption();
    if (firstpieChart) {
        firstpieChart.dispose();
    }
    firstpieChart = echarts.init(objfirstpie);
    if (typeof option === 'object') {
        firstpieChart.setOption(option, true);
    }
}