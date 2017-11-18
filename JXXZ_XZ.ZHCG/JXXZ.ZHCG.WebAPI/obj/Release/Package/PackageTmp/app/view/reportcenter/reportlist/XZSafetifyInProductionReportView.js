Ext.define('TianZun.view.reportcenter.reportlist.XZSafetifyInProductionReportView', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZSafetifyInProductionReportView',
    title: '秀洲区综合行政执法局安全生产执法情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var year = this.record.get("reportyear");
        var reportdate = new Date();
        var width = window.innerWidth * 0.922;
        var store = Ext.create('TianZun.store.reportcenter.AddUp.AddUpSafetifyInProductionStore');
        store.getProxy().url = "api/ReportCenter/ViewAddUpSafetifyinProductionReport?year=" + this.record.get("reportyear");
        var me = this;
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
                            id: 'exportbtn',
                            text: '导出',
                            margin: '0 10 5 0',
                            width: 90,
                            webapi: 'api/ReportCenter/ExportExcel',
                            excelname: me.title,
                            exceltitle: me.title,
                            formsubmit: true,
                            extrapra: { reportid: 2, reportyear: year, type: 2 },
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
                        store: store,
                        //enableColumnMove: false, //禁止拖放列 
                        //enableColumnResize: false, //禁止改变列宽度 
                        title: '<div style="text-align:center">秀洲区综合行政执法局安全生产执法情况报表</div>',
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
                                   header:  '<div style="text-align:left">填表单位：秀洲区综合行政执法局</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '时间', dataIndex: 'month', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryRenderer: function (value, summaryData)
                                           {
                                               var sumValue = parseFloat(value);
                                               return "<font color='red' size='2'>累计</font>";
                                           },
                                       },
                                       {
                                           header: '执法情况',  hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '出动执<br/>法人员<br/>（人次）', dataIndex: 'cdzfry', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '检查生<br/>产经营<br/>单位<br/>（家次）', dataIndex: 'jcscjydw', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '发现安<br/>全隐患<br/>或违法<br/>行为<br/>（个）', dataIndex: 'fxaqyh', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '完成整<br/>改安全<br/>隐患或<br/>违法行为<br/>（个）', dataIndex: 'wczgaqyh', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               }
                                           ]
                                       },
                                       {
                                           header: '执法文书使用情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '现场检<br/>查记录<br/>（份）', dataIndex: 'xcjcjl', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true, 
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '责令限<br/>期整改<br/>指令书<br/>（份）', dataIndex: 'zlxqzgzls', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '现场处<br/>理措施<br/>决定书<br/>（份）', dataIndex: 'xcclcsjds', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               },
                                               {
                                                   header: '整改复<br/>查意见<br/>书（份）', dataIndex: 'zgfcyjs', hideable: false, sortable: false,
                                                   align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   summaryRenderer: function (value, summaryData)
                                                   {
                                                       var sumValue = parseFloat(value);
                                                       return "<font color='red' size='2'>" + value + "</font>";
                                                   },
                                                   field: {
                                                       xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                   }
                                               }
                                           ]
                                       },

                                   ]
                               },
                               {
                                   header: '<div style="text-align:left">统计年份：' + year +'</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '案件办理情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '线索、案件移交情况', dataIndex: '', hideable: false, sortable: false, align: 'center',
                                                  
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   columns: [
                                                    {
                                                        header: '接受移<br/>送案件<br/>(件)', dataIndex: 'jsys', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '接受通<br/>报线索(件)', dataIndex: 'jcfx', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '案件、<br/>线索外<br/>移(件)', dataIndex: 'xswy', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                   ]
                                               },
                                               {
                                                   header: '行政处罚情况',hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   columns: [
                                                    {
                                                        header: '立案<br/>（起）', dataIndex: 'la', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '警告<br/>（起）', dataIndex: 'jg', hideable: false, sortable: false, align: 'center',

                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData) {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                        }
                                                    },
                                                    {
                                                        header: '决定罚<br/>款额<br/>（万元）', dataIndex: 'jdfke', hideable: false, sortable: false, align: 'center',

                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData) {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false
                                                        }
                                                    },
                                                    {
                                                        header: '结案<br/>（起）', dataIndex: 'ja', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '实际<br/>收缴<br/>罚没<br/>款<br/>（万元）', dataIndex: 'sjsjfmk', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '停产<br/>停业<br/>整顿<br/>（家）', dataIndex: 'tctyzd', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                        }
                                                    },
                                                    {
                                                        header: '提请<br/>关闭<br/>（家）', dataIndex: 'tqgb', hideable: false, sortable: false, align: 'center',
                                                       
                                                        menuDisabled: true,
                                                        summaryType: 'sum',
                                                        summaryRenderer: function (value, summaryData)
                                                        {
                                                            var sumValue = parseFloat(value);
                                                            return "<font color='red' size='2'>" + value + "</font>";
                                                        },
                                                        field: {
                                                            xtype: 'displayfield', decimalPrecision: 5
                                                        }
                                                    },
                                                   ]
                                               },
                                               {
                                                   header: '案件办理分类情况', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   summaryType: 'sum',
                                                   columns: [
                                                       {
                                                           header: '主要负责<br/>人不履行<br/>管理职责', dataIndex: 'zyfzr', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '安全生产<br/>条件和机<br/>构人员<br/>配备', dataIndex: 'aqsctj', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '培训和<br/>持证管<br/>理规定', dataIndex: 'pxhczglgd', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '事故隐患<br/>排查和治理<br/>管理规定', dataIndex: 'sgyhpc', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '“三同时<br/>”规定', dataIndex: 'stsgd', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '设备管理<br/>和经营场<br/>所规定', dataIndex: 'sbglhjycsgd', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '劳动保护<br/>、劳动合<br/>同管理', dataIndex: 'ldbhldhtgl', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '有限空间<br/>作业、危<br/>险作业以<br/>及其他特<br/>别规定', dataIndex: 'yxkjzy', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                       {
                                                           header: '单位拒绝<br/>、阻碍监<br/>督检查', dataIndex: 'dwjjzajdgl', hideable: false, sortable: false, align: 'center',
                                                           menuDisabled: true,
                                                           summaryType: 'sum',
                                                           summaryRenderer: function (value, summaryData) {
                                                               var sumValue = parseFloat(value);
                                                               return "<font color='red' size='2'>" + value + "</font>";
                                                           },
                                                           field: {
                                                               xtype: 'displayfield', decimalPrecision: 5
                                                           }
                                                       },
                                                   ]
                                               }
                                           ]
                                       },
                                   ]
                               }
                        ]
                    },
                {
                }]
            },
            ], buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
       
    },
})