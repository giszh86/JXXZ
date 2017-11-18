Ext.define('TianZun.view.reportcenter.reportlist.XZBureauCenterWorkReportView', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZBureauCenterWorkReportView',
    title: '秀洲区综合行政执法局中心工作开展情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var year = this.record.get("reportyear");
        var width = window.innerWidth * 0.899;
        var reportdate =new Date();
        var store = Ext.create('TianZun.store.reportcenter.AddUp.AddUpBureauCenterWorkStore');
        store.getProxy().url = "api/ReportCenter/ViewBureauCenterWork?year=" + year;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            autoScroll: true,
            width: width,
            items: [
                {
                    layout: 'fit',
                    border: false,
                    xtype: 'panel',
                    name: '',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'table',
                        columns: 2,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 45,
                    },
                    defaults: {
                        xtype: 'textfield',
                        allowBlank: false,
                    },
                    items: [
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            name: 'exportbtn',
                            id: 'exportbtn',
                            margin: '0 10 5 0',
                            width: 90,
                            webapi: 'api/ReportCenter/ExportExcel',
                            excelname: me.title,
                            exceltitle: me.title,
                            formsubmit: true,
                            extrapra: { reportid: 6, reportyear: year, type: 2 },
                        },
                    ],
                },
                {
                    layout: 'fit',
                    border: false,
                    name: '',
                    items: [
                        {
                            columnLines: true,
                            xtype: 'gridpanel',
                            gridautoScroll: true,
                            region: 'center',
                            //enableColumnMove: false, //禁止拖放列 
                            //enableColumnResize: false, //禁止改变列宽度 
                            store: store,
                            title: '<div style="text-align:center">秀洲区综合行政执法局中心工作开展情况报表</div>',
                            viewConfig: {
                                stripeRows: false,
                                forceFit: true,
                                scrollOffset: 0,
                            },
                            fieldDefaults: {
                                labelAlign: 'center',
                                align: 'center',
                            },
                            features: [{
                                id: 'group',
                                ftype: 'summary',
                            }],
                            columns: [
                                   {
                                       header: '<div style="text-align:left">填表单位：秀洲区综合行政执法局</div>',
                                       hideable: false,
                                       dataIndex: 'rate',
                                       columns: [
                                           {
                                               header: '项目时间', dataIndex: 'classname', hideable: false, sortable: false, align: 'center',
                                               menuDisabled: true,
                                               summaryRenderer: function (value, summaryData)
                                               {
                                                   var sumValue = parseFloat(value);
                                                   return "<font color='red' size='2'>累计</font>";
                                               },
                                           },
                                           {
                                               header: '三改一拆（四边三化）', hideable: false, sortable: false, align: 'center',
                                               menuDisabled: true,
                                               columns: [
                                                   {
                                                       header: '城镇违法建筑', dataIndex: 'czczmj', hideable: false, sortable: false, align: 'center',
                                                       columns: [
                                                           {
                                                               header: '处置<br/>面积<br/>(㎡)', dataIndex: 'czczmj', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '拆除<br/>面积<br/>(㎡)', dataIndex: 'czccmj', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '立案<br/>(起)', dataIndex: 'czla', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '结案<br/>(起)', dataIndex: 'czja', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '实际<br/>收缴<br/>罚没<br/>款<br/>(元)', dataIndex: 'czsjsjfmk', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                       ]
                                                   },
                                                    {
                                                        header: '村镇违法建筑', hideable: false, sortable: false, align: 'center',
                                                        columns: [
                                                          {
                                                              header: '协助<br/>拆除<br/>面积<br/>(㎡)', dataIndex: 'czxzccmj', hideable: false, sortable: false, align: 'center',

                                                              menuDisabled: true,
                                                              summaryType: 'sum',
                                                              summaryRenderer: function (value, summaryData)
                                                              {
                                                                  var sumValue = parseFloat(value);
                                                                  return "<font color='red' size='2'>" + value + "</font>";
                                                              },
                                                              field: {
                                                                  xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                              }
                                                          },
                                                          {
                                                              header: '其中<br/>拆除<br/>违建<br/>猪舍<br/>面积<br/>(㎡)', dataIndex: 'czzsmj', hideable: false,
                                                              sortable: false, align: 'center',

                                                              menuDisabled: true,
                                                              summaryType: 'sum',
                                                              summaryRenderer: function (value, summaryData)
                                                              {
                                                                  var sumValue = parseFloat(value);
                                                                  return "<font color='red' size='2'>" + value + "</font>";
                                                              },
                                                              field: {
                                                                  xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                              }
                                                          },
                                                        ]
                                                    },
                                                    {
                                                        header: '乱堆放', hideable: false, sortable: false, align: 'center',
                                                        columns: [
                                                           {
                                                               header: '开展<br/>执法<br/>次数<br/>(次)', dataIndex: 'kzzfcs', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '责令<br/>限期<br/>整改<br/>通知<br/>书<br/>(份)', dataIndex: 'zlxqzgtzs', hideable: false,
                                                               sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '清理<br/>、处<br/>置面<br/>积<br/>(㎡)', dataIndex: 'qlczmj', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                           {
                                                               header: '清理<br/>、处<br/>置数<br/>辆<br/>吨)', dataIndex: 'qlczsl', hideable: false, sortable: false, align: 'center',

                                                               menuDisabled: true,
                                                               summaryType: 'sum',
                                                               summaryRenderer: function (value, summaryData)
                                                               {
                                                                   var sumValue = parseFloat(value);
                                                                   return "<font color='red' size='2'>" + value + "</font>";
                                                               },
                                                               field: {
                                                                   xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                               }
                                                           },
                                                        ]
                                                    },
                                               ]
                                           },
                                           {
                                               header: '五水共治', hideable: false, sortable: false, align: 'center',
                                               menuDisabled: true,
                                               columns: [
                                                   {
                                                       header: '河长制落实', hideable: false, sortable: false, align: 'center',
                                                       columns: [
                                                           {
                                                               header: '负责<br/>河道<br/>名称', dataIndex: 'fzhdmc', hideable: false, sortable: false, align: 'center',
                                                               menuDisabled: true,
                                                               
                                                           },
                                                           {
                                                               header: '巡查<br/>次数<br/>(次)', dataIndex: 'xccs', hideable: false, sortable: false, align: 'center',
                                                               
                                                               menuDisabled: true,
                                                           },
                                                           {
                                                               header: '发现<br/>、整<br/>改河<br/>道问<br/>题<br/>(个)', dataIndex: 'fxzghdwt', hideable: false,
                                                               sortable: false, align: 'center', 
                                                               menuDisabled: true,
                                                           },
                                                       ]
                                                   },
                                                   {
                                                       header: '规模场<br/>执法', dataIndex: 'gmczf', hideable: false, sortable: false, align: 'center',
                                                       menuDisabled: true, 
                                                   },
                                                   {
                                                       header: '涉河<br/>执法', dataIndex: 'shzf', hideable: false, sortable: false, align: 'center',
                                                       menuDisabled: true, 
                                                   }
                                               ]
                                           },
                                       ]
                                   },
                                   {
                                       header: '<div style="text-align:left">统计年份：' + year + '</div>',
                                       hideable: false,
                                       dataIndex: 'rate',
                                       columns: [
                                           {
                                               header: '五气共治', hideable: false, sortable: false, align: 'center',
                                               menuDisabled: true,
                                               columns: [
                                                   {
                                                       header: '秸秆<br/>、城<br/>市垃<br/>圾露<br/>天焚<br/>烧执<br/>法', dataIndex: 'jgcsljfs', hideable: false,
                                                       menuDisabled: true,
                                                       sortable: false, align: 'center',
                                                   },
                                                   {
                                                       header: '城市道路扬尘管控', hideable: false, sortable: false, align: 'center',
                                                       columns: [
                                                            {
                                                                header: '处置<br/>总问<br/>题<br/>(个)', dataIndex: 'dlczzwt', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '处置<br/>投诉<br/>举报<br/>(个)', dataIndex: 'dlcztsjb', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '立案<br/>(起)', dataIndex: 'dlla', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '实际<br/>收缴<br/>罚没<br/>款<br/>(元)', dataIndex: 'dlsjsjfmk', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                       ]
                                                   },
                                                   {
                                                       header: '餐厨油烟管控', hideable: false, sortable: false, align: 'center',
                                                       columns: [
                                                            {
                                                                header: '处置<br/>总问<br/>题<br/>(个)', dataIndex: 'ccyyczzwt', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '处置<br/>投诉<br/>举报<br/>(个)', dataIndex: 'cccztsjb', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '立案<br/>(起)', dataIndex: 'ccyyla', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                            {
                                                                header: '实际<br/>收缴<br/>罚没<br/>款<br/>(元)', dataIndex: 'ccsjsjfmk', hideable: false, sortable: false, align: 'center',

                                                                menuDisabled: true,
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value, summaryData)
                                                                {
                                                                    var sumValue = parseFloat(value);
                                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                                },
                                                                field: {
                                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                                }
                                                            },
                                                       ]
                                                   },
                                               ]
                                           },
                                       ]
                                   }
                            ]
                        },
                    {
                    }],
                },
            ]
            , buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }];
        this.callParent();
    },
})