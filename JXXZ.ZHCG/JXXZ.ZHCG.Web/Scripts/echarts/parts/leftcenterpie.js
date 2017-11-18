// 基于准备好的dom，初始化echarts实例
var partsleftpieDom = document.getElementById('bujianrightCharts');
var partsleftpieChart = echarts.init(partsleftpieDom);

// 指定图表的配置项和数据
var option = {
    tooltip: {},
    grid: {
        left: '1%',
        right: '4%',
        bottom: '1%',
        width: '95%',
        top: '5%',
        containLabel: true
    },
    xAxis: {
        color: ['#fffff'],
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#16B2B5'
            },
        },
    },

    yAxis: {
        data: ["黑名单", "小摊小贩", "沿街店家"],
        axisLine: {
            lineStyle: {
                color: '#16B2B5',
            },
        },
        boundaryGap: ['5%', '5%']
    },

    textStyle: {
        color: '#ffffff',
        fontSize: 12
    },

    series: [
         {
             name: '部件',
             type: 'bar',
             barWidth: 12,
             data: [
                 {
                     name: '黑名单',
                     value: 20,
                     itemStyle: {
                         normal: {
                             color: '#E657FF'
                         }, emphasis: {
                             color: '#E657FF'
                         }
                     }
                 },
                 {
                     name: '小摊小贩',
                     value: 10,
                     itemStyle: {
                         normal: {
                             color: '#5CD2F6'
                         }, emphasis: {
                             color: '#5CD2F6'
                         }
                     }
                 },
                 {
                     name: '沿街店家',
                     value: 15,
                     itemStyle: {
                         normal: {
                             color: '#60F64D'
                         }, emphasis: {
                             color: '#60F64D'
                         }
                     }
                 }
             ]
         }
    ]
};

// 使用刚指定的配置项和数据显示图表。
partsleftpieChart.setOption(option);

function setpartsleftpieChart(data) {
    var streetShop,hawker,black;
    var array=data.split('|');
    streetShop=JSON.parse(array[5])[0];
    hawker=JSON.parse(array[5])[1];
    black=JSON.parse(array[5])[2];
    partsleftpieChart.setOption({
        series: [
            {
                data: [
                    {
                        name: '黑名单',
                        value: black,
                        itemStyle: {
                            normal: {
                                color: '#E657FF'
                            }, emphasis: {
                                color: '#E657FF'
                            }
                        }
                    },
                    {
                        name: '小摊小贩',
                        value: hawker,
                        itemStyle: {
                            normal: {
                                color: '#5CD2F6'
                            }, emphasis: {
                                color: '#5CD2F6'
                            }
                        }
                    },
                    {
                        name: '沿街店家',
                        value: streetShop,
                        itemStyle: {
                            normal: {
                                color: '#60F64D'
                            }, emphasis: {
                                color: '#60F64D'
                            }
                        }
                    }
                ]
            }
        ]
    });
    runpartsleftpieChart();
}
//重载趋势图
function runpartsleftpieChart() {
    var option = partsleftpieChart.getOption();
    if (partsleftpieChart) {
        partsleftpieChart.dispose();
    }
    partsleftpieChart = echarts.init(partsleftpieDom);
    if (typeof option === 'object') {
        partsleftpieChart.setOption(option, true);
    }
}