// 基于准备好的dom，初始化echarts实例
var personnelOnlinedom = document.getElementById('personnelOnlineChart');
var personnelOnlineChart = echarts.init(personnelOnlinedom);

var category = ['高照中队', '新城中队'];

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '1%',
        right: '4%',
        bottom: '1%',
        width: '95%',
        top: '15%',
        containLabel: true
    },
    legend: {
        data: ['bar'],
        textStyle: {
            color: '#ccc'
        }
    },
    xAxis: {
        show: false,
        splitLine: { show: false },
        axisLine: {
            lineStyle: {
                color: '#10C642'
            }
        }
    },
    yAxis: {
        axisLine: {
            show: false,
            lineStyle: {
                color: '#10C642'
            }
        },
        axisTick: {
            show: false
        },
        data: category,
    },
    series: [
     
    ],
    textStyle: { color: '#c4efdd' },
};

// 使用刚指定的配置项和数据显示图表。
personnelOnlineChart.setOption(option);

function setpersonnelOnlineData(data) {
    var array = data.split('|');
    var newcityOnline = array[0];
    var hightOnline = array[1];
    var newcityCount = array[2];
    var hightCount = array[3];
    personnelOnlineChart.setOption({
        series: [
                {
                    name: '在线数',
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: 16,
                    z: -9,
                    data: [
                         {
                             name: '高照中队',
                             value: hightOnline,
                             itemStyle: {
                                 normal: {
                                     color: new echarts.graphic.LinearGradient(
                                         0, 0, 0, 1,
                                         [
                                             { offset: 0, color: 'rgba(224,206,76,0.7)' },
                                             { offset: 0.2, color: 'rgba(224,206,76,0.5)' },
                                             { offset: 1, color: 'rgba(224,206,76,0.2)' }
                                         ]
                                     )
                                 }
                             },
                         },
                          {
                              name: '新城中队',
                              value: newcityOnline,
                              itemStyle: {
                                  normal: {
                                      color: new echarts.graphic.LinearGradient(
                                          0, 0, 0, 1,
                                          [
                                              { offset: 0, color: 'rgba(91,207,83,0.7)' },
                                              { offset: 0.2, color: 'rgba(91,207,83,0.5)' },
                                              { offset: 1, color: 'rgba(91,207,83,0.2)' }
                                          ]
                                      )
                                  }
                              },
                          }

                    ]
                },
              {
                  name: '人员总数',
                  type: 'pictorialBar',
                  symbol: 'rect',
                  symbolRepeat: true,
                  symbolSize: [5, 16],
                  symbolMargin: 1,
                  z: -10,
                  data: [
                      {
                          name: '高照人员总数',
                          value: hightCount,
                          itemStyle: {
                              normal: {
                                  color: 'rgba(77,73,50,1)'
                              }
                          },
                      },
                      {
                          name: '新城人员总数',
                          value: newcityCount,
                          itemStyle: {
                              normal: {
                                  color: 'rgba(75,70,87,1)'
                              }
                          },
                      }
                  ]
              }
        ]
    });
    runPersonnelOnline();
}

//重载事件趋势图
function runPersonnelOnline() {
    var option = personnelOnlineChart.getOption();
    if (personnelOnlineChart) {
        personnelOnlineChart.dispose();
    }
    personnelOnlineChart = echarts.init(personnelOnlinedom);
    if (typeof option === 'object') {
        personnelOnlineChart.setOption(option, true);
    }

}