var renyuanpieObj = document.getElementById('renyuanpie');
var renyuanpieChart = echarts.init(renyuanpieObj);

// 指定图表的配置项和数据
var renyuanpieoption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '总数',
        subtext: '',
        x: 'center',
        y: 'center',
        top: '35%',
        textStyle: {
            color: '#c4efdd',
        },
    },
    series: [
        {
            name: '人员在线数',
            type: 'pie',
            radius: ['50%', '70%'],
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
            color: ['#5DB747', '#C1BE2D', '#30B5C3'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
renyuanpieChart.setOption(renyuanpieoption);

function setrenyuanpieData(data) {
    var array = data.split('|');
    var newcityOnline = array[0];
    var hightOnline = array[1];
    var onlineCount = parseFloat(newcityOnline) + parseFloat(hightOnline);
    var newcityCount = array[2];
    var hightCount = array[3];
    var newcityandhightCount = parseFloat(newcityCount) + parseFloat(hightCount);
    var subtext = onlineCount + "/" + newcityandhightCount;

    $('#newCityOnline').prop('number', 0).animateNumber({ number: newcityOnline }, 5500);
    $('#newCityCount').prop('number', 0).animateNumber({ number: newcityCount }, 5500);
    $('#hightCityOnline').prop('number', 0).animateNumber({ number: hightOnline }, 5500);
    $('#hightCityCount').prop('number', 0).animateNumber({ number: hightCount }, 5500);

    renyuanpieChart.setOption({
        title:{
            subtext: subtext
        },
        series: [
            {
                name: '人员在线数',
                data: [
                    {
                        value: newcityOnline,
                        name: '新城中队'
                    },
                    {
                        value: hightOnline,
                        name: '高照中队'
                    }
                ]
            }
        ]
    });
    runrenyuanpie();
}


//重载事件趋势图
function runrenyuanpie() {
    var option = renyuanpieChart.getOption();
    if (renyuanpieChart) {
        renyuanpieChart.dispose();
    }
    renyuanpieChart = echarts.init(renyuanpieObj);
    if (typeof option === 'object') {
        renyuanpieChart.setOption(option, true);
    }

}