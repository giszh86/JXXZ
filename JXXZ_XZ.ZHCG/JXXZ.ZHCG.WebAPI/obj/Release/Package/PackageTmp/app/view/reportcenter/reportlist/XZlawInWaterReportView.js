Ext.define('TianZun.view.reportcenter.reportlist.XZlawInWaterReportView', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZlawInWaterReportView',
    title: '秀洲区综合行政执法局水行政执法情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var reportdate = new Date();
        var year = this.record.get("reportyear");
        if (window.innerWidth > 1366) {
            var width = window.innerWidth * 0.8135;
        }
        else {
            var width = window.innerWidth * 0.95;
        }
        var store = Ext.create('TianZun.store.reportcenter.AddUp.AddUplawInWaterStore');
        store.getProxy().url = "api/ReportCenter/ViewLawInWater?year=" + year;
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
                            id: 'exportbtn',
                            margin: '0 10 5 0',
                            width: 90,
                            webapi: 'api/ReportCenter/ExportExcel',
                            excelname: me.title,
                            exceltitle: me.title,
                            formsubmit:true,
                            extrapra: { reportid: 5, reportyear: year, type: 2 },
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
                        title: '<div style="text-align:center">秀洲区综合行政执法局水行政执法情况报表</div>',
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
                                           header: '执法情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '出动执<br/>法人员<br/>（人）', dataIndex: 'cdzfry', hideable: false, sortable: false, align: 'center',
                                                  
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
                                                   header: '出动执<br/>法车辆<br/>（车）', dataIndex: 'cdzfcl', hideable: false, sortable: false, align: 'center',
                                                  
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
                                                   header: '开展执<br/>法巡查<br/>次数<br/>（次）', dataIndex: 'kzzfxccs', hideable: false, sortable: false, align: 'center',
                                                  
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
                                                   header: '责令限<br/>期整改<br/>通知书<br/>（份）', dataIndex: 'zlxqzgtzs', hideable: false, sortable: false, align: 'center',
                                                  
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
                                                   header: '发现涉<br/>水问题<br/>（个）', dataIndex: 'fxsswt', hideable: false, sortable: false, align: 'center',
                                                  
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
                                                   header: '完成整<br/>改涉水<br/>问题<br/>（个）', dataIndex: 'wczgsswt', hideable: false, sortable: false, align: 'center',
                                                  
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
                                        
                                   ],
                               },
                               {
                                   header: '<div style="text-align:left">统计年份：' + year + '</div>', hideable: false, sortable: false, align: 'center',
                                   menuDisabled: true,
                                   columns: [
                                       {
                                           header: '案件办理情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '违法线索情况', hideable: false, sortable: false, align: 'center',
                                                   columns: [
                                                       {
                                                           header: '接受<br/>移送<br/>(件)', dataIndex: 'jsys', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                           header: '检查<br/>发现<br/>(件)', dataIndex: 'jcfx', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                           header: '投诉<br/>举报<br/>(件)', dataIndex: 'tsjb', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                   ]
                                               },
                                               {
                                                   header: '行政处罚情况', hideable: false, sortable: false, align: 'center',
                                                   columns: [
                                                       {
                                                           header: '总立<br/>案数<br/>(起)', dataIndex: 'zlas', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                           header: '①河道管理类', hideable: false, sortable: false, align: 'center',
                                                           columns: [
                                                               {
                                                                   header: '建设妨<br/>碍行洪<br/>的建<br/>（构）<br/>筑物', dataIndex: 'jsfaxhdjzw', hideable: false, sortable: false, align: 'center',
                                                                   editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                                   header: '弃置、<br/>倾倒抬<br/>高河床<br/>、缩窄<br/>河道废<br/>弃物', dataIndex: 'hdfqw', hideable: false, sortable: false, align: 'center',
                                                                   editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                                   header: '抛撒垃<br/>圾、动<br/>物尸体<br/>等', dataIndex: 'pslj', hideable: false, sortable: false, align: 'center',
                                                                   editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                           ]
                                                       },
                                               {
                                                   header: '②水资源类', hideable: false, sortable: false, align: 'center',
                                                   columns: [
                                                       {
                                                           header: '农村供<br/>水类', dataIndex: 'ncgsl', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                           header: '城市供<br/>水类', dataIndex: 'csgsl', hideable: false, sortable: false, align: 'center',
                                                           editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                   ]
                                               },
                                               {
                                                   header: '③排水<br/>与污水<br/>处理类', dataIndex: 'psywscll', hideable: false, sortable: false, align: 'center',
                                                   editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                    header: '结案数<br/>(起)', dataIndex: 'jas', hideable: false, sortable: false, align: 'center',
                                                    editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                     header: '实际收<br/>缴罚没<br/>款(元)', dataIndex: 'sjsjfmk', hideable: false, sortable: false, align: 'center',
                                                     editor: { allowBlank: false, xtype: 'displayfield', decimalPrecision: 5, minValue: 0, editable: false },
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
                                                   ]
                                               },
                                           ]
                                       },
                                   ]
                               }
                        ]
                    }]
                },
            ]
            , buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    },
})