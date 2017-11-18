$(function () {
    cakecase.init();
});
//当页面改变大小的时候，重置菜单大小
document.body.onresize = function () {
    cakecase.resize();
}

var cakecase = {
    dataType: 3,
    init: function () { this.tabClick(); this.resize(); },
    resize: function () {
        this.chartLoad(1);
    },
    tabClick: function () {
        $(".tab").each(function (i) {
            $(this).click(function () {

                myChart.dataType = i + 1;
                myChart.chartLoad();
            });
        })
    },
    chartLoad: function (i) {
        myChart = echarts.init(document.getElementById('casePie'));
        myChart.setOption(option14);

    }
}

var myChart = null;

option14 = {
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
    color: ['#FF7C30', '#31CF00', '#00CFCD'],
    series: [
        {
            name: '访问来源',
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
            name: '',
            type: 'pie',
            radius: ['40%', '57%'],

            data: [
                { value: 335, name: '已立案' },
                { value: 310, name: '处理中' },
                { value: 234, name: '已结案' },
            ]
        }
    ]
};