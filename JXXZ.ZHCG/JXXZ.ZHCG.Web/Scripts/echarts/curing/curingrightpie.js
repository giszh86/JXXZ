// 基于准备好的dom，初始化echarts实例
var curingrightpieObj = document.getElementById('curingrightpie');
var curingrightpieChart = echarts.init(curingrightpieObj);

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '',
        x: 'center',
        y: 'center',
        top: '35%',
        textStyle: {
            color: '#D36D22',
            fontFamily: 'digitalTableFont',
            fontSize: 20,
        },
    },
    color: ['#FF7C30', '#00CFCD', '#31CF00'],
    series: [
        {
            name: '养护上报',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            data: []
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
curingrightpieChart.setOption(option);

function setcuringrightpieData(data) {
    var array = data.split('|');
    var jsondata = JSON.parse(array[3]);
    var jsonName = JSON.parse(array[2]);
    var oneName = jsonName[0];
    var one = jsondata[0];
    var twoName = jsonName[1];
    var two = jsondata[1];
    var threeName = jsonName[2];
    var three = jsondata[2];
    var count = jsondata[3];
    $("#curringRightOneName").text(threeName);
    $("#curringRightTwoName").text(twoName);
    $("#curringRightThreeName").text(oneName);
    $('#nowMonthMoneyed').prop('number', 0).animateNumber({ number: three }, 5500);
    $('#nowMonthMoney').prop('number', 0).animateNumber({ number: two }, 5500);
    $('#nowMonthMoneyCount').prop('number', 0).animateNumber({ number: one }, 5500);
    curingrightpieChart.setOption({
        title: {
            text: count
        },
        series: [
            {
                name: '养护上报',
                data: [
                    {
                        name: threeName,
                        value: three
                    },
                    {
                        name: oneName,
                        value: one
                    },
                    {
                        name: twoName,
                        value: two
                    }
                ]
            }
        ]
    });
    runcuringrightpieChart();
}

//重载趋势图
function runcuringrightpieChart() {
    var option = curingrightpieChart.getOption();
    if (curingrightpieChart) {
        curingrightpieChart.dispose();
    }
    curingrightpieChart = echarts.init(curingrightpieObj);
    if (typeof option === 'object') {
        curingrightpieChart.setOption(option, true);
    }

}