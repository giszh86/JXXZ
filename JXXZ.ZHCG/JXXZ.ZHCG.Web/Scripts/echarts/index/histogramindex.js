var objfirstspectrum = document.getElementById('firstspectrum');
var firstspectrumChart = echarts.init(objfirstspectrum);
var category = ['今日上报', '今日派遣', '今日完结', '超时未处理'];

var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '15%',
        left: '2%',
        right: '10%',
        bottom: '1%',
        containLabel: true,
    },
    xAxis: {
        data: category,
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        splitLine: { show: false },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [
         {
             name: '最大值',
             type: 'pictorialBar',
             symbol: 'roundRect',
             itemStyle: {
                 normal: {
                     color: '#7B7E7D'
                 }
             },
             symbolRepeat: true,
             symbolSize: [40, 4],
             symbolMargin: 1,
             z: -10,
             data: [60, 60, 60, 60]
         },
        {
            name: '当前值',
            type: 'bar',
            barGap: '-100%',
            barWidth: 40,
            z: -12,
            data: [
             {
                 name: '今日上报',
                 value: 20,
                 itemStyle: {
                     normal: {
                         color: '#0BA6AA',
                     },
                     emphasis: {
                         color: '#0BA6AA'
                     }
                 }
             },
             {
                 name: '今日派遣',
                 value: 30,
                 itemStyle: {
                     normal: {
                         color: '#45D784',
                     },
                     emphasis: {
                         color: '#45D784'
                     }
                 }
             },
             {
                 name: '今日完结',
                 value: 40,
                 itemStyle: {
                     normal: {
                         color: '#FEBC5B',
                     },
                     emphasis: {
                         color: '#FEBC5B'
                     }
                 }
             },
             {
                 name: '超时未处理',
                 value: 50,
                 itemStyle: {
                     normal: {
                         color: '#E06555',
                     },
                     emphasis: {
                         color: '#E06555'
                     }
                 }
             }

            ]
        },
    ]
};


firstspectrumChart.setOption(option);

function changeFirstspectrum(data) {
    //获取数组最大值
    var value = Array.max(data);
    var maxvalue = value + 10;
    var maxdata = [];
    for (var i = 0; i < data.length; i++) {
        maxdata.push(maxvalue);
    }
    firstspectrumChart.setOption({
        series: [
            {
                name: '最大值',
                type: 'pictorialBar',
                symbol: 'roundRect',
                itemStyle: {
                    normal: {
                        color: '#7B7E7D'
                    }
                },
                symbolRepeat: true,
                symbolSize: [40, 4],
                symbolMargin: 1,
                z: -10,
                data: maxdata,
            },
             {
                 name: '当前值',
                 type: 'bar',
                 barGap: '-100%',
                 barWidth: 40,
                 z: -12,
                 data: [
                  {
                      name: '今日上报',
                      value: data[0],
                      itemStyle: {
                          normal: {
                              color: '#0BA6AA',
                          },
                          emphasis: {
                              color: '#0BA6AA'
                          }
                      }
                  },
                  {
                      name: '今日派遣',
                      value: data[1],
                      itemStyle: {
                          normal: {
                              color: '#45D784',
                          },
                          emphasis: {
                              color: '#45D784'
                          }
                      }
                  },
                  {
                      name: '今日完结',
                      value: data[2],
                      itemStyle: {
                          normal: {
                              color: '#FEBC5B',
                          },
                          emphasis: {
                              color: '#FEBC5B'
                          }
                      }
                  },
                  {
                      name: '超时未处理',
                      value: data[3],
                      itemStyle: {
                          normal: {
                              color: '#E06555',
                          },
                          emphasis: {
                              color: '#E06555'
                          }
                      }
                  }

                 ]
             },
        ]
    });
    runHistogram();
}

//重载首页柱状图
function runHistogram() {
    var option = firstspectrumChart.getOption();
    if (firstspectrumChart) {
        firstspectrumChart.dispose();
    }
    firstspectrumChart = echarts.init(objfirstspectrum);
    if (typeof option === 'object') {
        firstspectrumChart.setOption(option, true);
    }
}