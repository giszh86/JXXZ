var renyuanpieChart = echarts.init(document.getElementById('renyuanpie'));
// 指定图表的配置项和数据
var renyuanpieoption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '总数',
        subtext: '25/50',
        x: 'center',
        y: 'center',
        top: '35%',
        textStyle: {
            color: '#c4efdd',
        },
    },
    series: [
        {
            name: '',
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
            data: [
                { value: 335, name: '环卫人员' },
                { value: 310, name: '执法人员' },
                { value: 234, name: '养护人员' },
            ]
        }
    ]
};
renyuanpieChart.setOption(renyuanpieoption);
