// 基于准备好的dom，初始化echarts实例
var partsrightpieObj = document.getElementById('rightcenterpartsPie');
var partsrightpieChart = echarts.init(partsrightpieObj);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '828',
        x: 'center',
        y: 'center',
        top: '35%',
        textStyle: {
            color: '#D36D22',
            fontFamily: 'digitalTableFont',
            fontSize:20
        },
    },
    color: ['#1A416B', '#A5CB09'],
    series: [
        {
            name: '',
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
                { value: 810, name: '' },
                { value: 1548, name: '积水点' }
            ]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
partsrightpieChart.setOption(option);

function setpartsrightpieChart(data) {
    var count, numberone, numbertwo;
    var array = data.split('|');
    count =JSON.parse(array[4])[2];
    numberone =JSON.parse(array[4])[0];
    numbertwo =JSON.parse(array[4])[1];
    partsrightpieChart.setOption({
        title: {
            text: count,
        },
        series: [
            {
                data: [
                     { value: numbertwo, name: '' },
                     { value: numberone, name: '积水点' }
                ]
            }
        ]
    });
    runpartsrightpieChart();
}

//重载趋势图
function runpartsrightpieChart() {
    var option = partsrightpieChart.getOption();
    if (partsrightpieChart) {
        partsrightpieChart.dispose();
    }
    partsrightpieChart = echarts.init(partsrightpieObj);
    if (typeof option === 'object') {
        partsrightpieChart.setOption(option, true);
    }
    partsrightpieChart.on('click', function (params) {
        var url = config.webApi + configajaxUrl.lowLyingAreaList + "?start=0&limit=" + config.pagetwoSize;
        lowLyingAreaList(url, 1);
        var titleArray = "<tr><td>报警状态</td><td>部件名称</td><td>报警临界值</td><td></td></tr>";
        showlistPanel();
        showlist("积水点列表", titleArray, 270, 370, configType.lowLyingType);
    });
}

