var casepieObj = document.getElementById('casePie');
var casepieChart = echarts.init(casepieObj);

var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    grid: {
        top: '1%',
        left: '20%',
        bottom: '1%',
        containLabel: true,
    },
    color: ['#31CF00', '#FF7C30', '#00CFCD'],
    series: [
        {
            name: '',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
        },
        {
            name: '案件状态',
            type: 'pie',
            radius: ['40%', '57%'],
            data:  []
        }
    ]
};
casepieChart.setOption(option);

function setCakeCaseData(data) {
    var array = data.split('|');
    var numberlist = JSON.parse(array[0]);
    var alreadyOnCase = numberlist[0];
    var inProcess = numberlist[1];
    var caseClosed = numberlist[2];
    $('#alreadyOnCase').prop('number', 0).animateNumber({ number: alreadyOnCase }, 5500);
    $('#inProcess').prop('number', 0).animateNumber({ number: inProcess }, 5500);
    $('#caseClosed').prop('number', 0).animateNumber({ number: caseClosed }, 5500);
    casepieChart.setOption({
        series: [
            {
                name: '案件状态',
                data: [
                    {
                        value: alreadyOnCase,
                        name: '已立案'
                    },
                    {
                        value: inProcess,
                        name: '处理中'
                    },
                    {
                        value: caseClosed,
                        name: '已结案'
                    }
                ]
            }
        ]
    });
    runCasePie();
}

//重载案件饼图
function runCasePie() {
    var option = casepieChart.getOption();
    if (casepieChart) {
        casepieChart.dispose();
    }
    casepieChart = echarts.init(casepieObj);
    if (typeof option === 'object') {
        casepieChart.setOption(option, true);
    }

}