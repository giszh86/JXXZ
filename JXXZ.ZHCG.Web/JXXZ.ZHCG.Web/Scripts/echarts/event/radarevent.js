$(function () {
    radarevent.init();
});
//当页面改变大小的时候，重置菜单大小
document.body.onresize = function () {
    radarevent.resize();
}

var radarevent = {
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
        myChart = echarts.init(document.getElementById('eventRadar'));
        myChart.setOption(option13);

    }
}

var myChart = null;

option13 = {
    tooltip: {
        trigger: 'axis'
    },
    radar: [
        {
            indicator: [
                { text: '巡查上报', max: 100 },
                { text: '视频发现', max: 100 },
                { text: '物联感知', max: 100 },
                { text: '部门移交', max: 100 },
                { text: '微信', max: 100 },
                { text: '微博', max: 100 },
                { text: '公众APP', max: 100 },
                { text: '热线受理', max: 100 }
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
            data: [
                {
                    value: [100, 73, 85, 40, 100, 10, 80, 90],
                    name: '巡查上报'
                },
                {
                    value: [100, 73, 85, 40, 100, 10, 80, 90],
                    name: '视频发现'
                },
                 {
                     value: [100, 73, 85, 40, 100, 10, 80, 90],
                     name: '物联感知'
                 },

                 {
                     value: [100, 73, 85, 40, 100, 10, 80, 90],
                     name: '部门移交'
                 },
                 {
                     value: [100, 73, 85, 40, 100, 10, 80, 90],
                     name: '微信'
                 },
                  {
                      value: [100, 73, 85, 40, 100, 10, 80, 90],
                      name: '微博'
                  },
                   {
                       value: [100, 73, 85, 40, 100, 10, 80, 90],
                       name: '公众APP'
                   },
                   {
                       value: [100, 73, 85, 40, 100, 10, 80, 90],
                       name: '热线受理'
                   },

            ]
        }
    ]
};