var caseColumnrightobj = document.getElementById('caseColumnright');
var caseColumnrightChart = echarts.init(caseColumnrightobj);
var category = ['一般案件', '违停案件', '重大案件', '简易案件'];
// 指定图表的配置项和数据
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
            name: '案件数量',
            type: 'bar',
            barGap: '-100%',
            barWidth: 40,
            z: -12,
            data: [
             {
                 name: '一般案件',
                 value: 20,
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
                 name: '违停案件',
                 value: 30,
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
                 name: '重大案件',
                 value: 40,
                 itemStyle: {
                     normal: {
                         color: '#E06555',
                     },
                     emphasis: {
                         color: '#E06555'
                     }
                 }
             },
             {
                 name: '简易案件',
                 value: 50,
                 itemStyle: {
                     normal: {
                         color: '#0BA6AA',
                     },
                     emphasis: {
                         color: '#0BA6AA'
                     }
                 }
             }

            ]
        },
    ]
};
caseColumnrightChart.setOption(option);

function setCaseColumnrightData(data) {
    var array = data.split('|');
    var casedata = JSON.parse(array[3]);
    //获取数组最大值
    var value = Array.max(casedata);
    var maxvalue = value + 10;
    var maxdata = [];
    for (var i = 0; i < casedata.length; i++) {
        maxdata.push(maxvalue);
    }

    caseColumnrightChart.setOption({
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
               name: '案件数量',
               type: 'bar',
               barGap: '-100%',
               barWidth: 40,
               z: -12,
               data: [
               {
                   name: '一般案件',
                   value: casedata[0],
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
                 name: '违停案件',
                 value: casedata[1],
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
                 name: '重大案件',
                 value: casedata[2],
                 itemStyle: {
                     normal: {
                         color: '#E06555',
                     },
                     emphasis: {
                         color: '#E06555'
                     }
                 }
             },
             {
                 name: '简易案件',
                 value: casedata[3],
                 itemStyle: {
                     normal: {
                         color: '#0BA6AA',
                     },
                     emphasis: {
                         color: '#0BA6AA'
                     }
                 }
             }

               ]
           },
        ]
    })

    runcaseColumnrightChart();
}

//重载案件频谱图
function runcaseColumnrightChart() {
    var option = caseColumnrightChart.getOption();
    if (caseColumnrightChart) {
        caseColumnrightChart.dispose();
    }
    caseColumnrightChart = echarts.init(caseColumnrightobj);
    if (typeof option === 'object') {
        caseColumnrightChart.setOption(option, true);
    }

}