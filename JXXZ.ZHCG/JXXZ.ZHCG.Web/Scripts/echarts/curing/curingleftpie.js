// 基于准备好的dom，初始化echarts实例
var curingleftpieObj = document.getElementById('curingleftpie');
var curingleftpieChart = echarts.init(curingleftpieObj);

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
            fontSize:20,
        },
    },
    color: ['#FF7C30', '#00CFCD', '#31CF00'],

    grid: {
        height: '100',
        width:'100%',
    },
    series: [
        {
            name: '养护考核',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            data: []
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
curingleftpieChart.setOption(option);

function setcuringleftpieData(data) {
    var jsondata = JSON.parse(data);
    var one = jsondata[0];
    $('#ninetytop').prop('number', 0).animateNumber({ number: one }, 5500);
    var two = jsondata[1];
    $('#sixtytop').prop('number', 0).animateNumber({ number: two }, 5500);
    var three = jsondata[2];
    $('#sixtydown').prop('number', 0).animateNumber({ number: three }, 5500);
    var count = jsondata[3];
    curingleftpieChart.setOption({
        title:{
            text: count
        },
        series: [
            {
                name: '养护考核',
                data: [
                    {
                        name: '60分以下考核',
                        value: three
                    },
                    {
                        name: '90分以上考核',
                        value: one
                    },
                    {
                        name: '60~90分考核',
                        value: two
                    }
                ]
            }
        ]
    });
    runcuringleftpie();
}

//重载趋势图
function runcuringleftpie() {
    var option = curingleftpieChart.getOption();
    if (curingleftpieChart) {
        curingleftpieChart.dispose();
    }
    curingleftpieChart = echarts.init(curingleftpieObj);
    if (typeof option === 'object') {
        curingleftpieChart.setOption(option, true);
    }

}