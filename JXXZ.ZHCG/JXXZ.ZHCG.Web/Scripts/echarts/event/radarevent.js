var objeventPieDom = document.getElementById('eventRadar');
var eventpieChart = echarts.init(objeventPieDom);
var option = {
    tooltip: {
        trigger: 'axis',
        position: ['50%', '-60px']
    },
    radar: [
        {
            indicator: [
                { text: '巡查发现', max: 100 },
                { text: '数字城管', max: 100 },
                { text: '24小时值班', max: 100 },
                { text: '市局96310', max: 100 },
                { text: '信访', max: 100 },
                { text: '市场信箱', max: 100 },
                { text: '行风热线', max: 100 },
                { text: '环境曝光台', max: 100 },
            ],
            center: ['50%', '40%'],
            radius: 35
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: null
        }
    ]
};
eventpieChart.setOption(option);

function setDataEventPieChart(data) {
    var newdata = data.split('|');
    var seriesData = JSON.parse(newdata[0]);
    //巡查发现
    var xcfx = seriesData[0].value[0];
    $('#xcsx').prop('number', 0).animateNumber({ number: xcfx }, 5500);
    //数字城管
    var szcg = seriesData[0].value[1];
    $('#szcg').prop('number', 0).animateNumber({ number: szcg }, 5500);
    //24小时值班
    var hourwork = seriesData[0].value[2];
    $('#hourwork').prop('number', 0).animateNumber({ number: hourwork }, 5500);
    //市局96310
    var citybureau = seriesData[0].value[3];
    $('#citybureau').prop('number', 0).animateNumber({ number: citybureau }, 5500);
    //信访
    var thepetition = seriesData[0].value[4];
    $('#thepetition').prop('number', 0).animateNumber({ number: thepetition }, 5500);
    //市长信箱
    var mayormMailbox = seriesData[0].value[5];
    $('#mayormMailbox').prop('number', 0).animateNumber({ number: mayormMailbox }, 5500);
    //行风热线
    var goodhotline = seriesData[0].value[6];
    $('#goodhotline').prop('number', 0).animateNumber({ number: goodhotline }, 5500);
    //环境曝光台
    var environment = seriesData[0].value[7];
    $('#environment').prop('number', 0).animateNumber({ number: environment }, 5500);
    eventpieChart.setOption({
        series: [
            {
                data: seriesData
            }
        ]
    })
    runeventPieChart();
}


function runeventPieChart() {
    var option = eventpieChart.getOption();
    if (eventpieChart) {
        eventpieChart.dispose();
    }
    eventpieChart = echarts.init(objeventPieDom);
    if (typeof option === 'object') {
        eventpieChart.setOption(option);
    }
}