var vehiclepieChart = echarts.init(document.getElementById('vehiclepie'));
// 指定图表的配置项和数据
var vehiclepieoption = {
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
            color: ['#CE5F52', '#4DA2B2', '#C1B154'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                { value: 120, name: '渣土车' },
                { value: 5, name: '执法车' },
            ]
        }
    ]
};
vehiclepieChart.setOption(vehiclepieoption);
