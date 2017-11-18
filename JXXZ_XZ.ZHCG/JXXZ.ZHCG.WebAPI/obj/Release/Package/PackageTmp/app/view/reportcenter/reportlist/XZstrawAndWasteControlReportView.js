Ext.define('TianZun.view.reportcenter.reportlist.XZstrawAndWasteControlReportView', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZstrawAndWasteControlReportView',
    title: '秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var year = this.record.get("reportyear");
        var reportdate = new Date();
        var width = window.innerWidth * 0.94;
        var store = Ext.create('TianZun.store.reportcenter.AddUp.AddUpstrawAndWasteControlStore');
        store.getProxy().url = "api/ReportCenter/ViewStrawAndWasteControlReport?year=" + year;
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
                            extrapra: { reportid: 3, reportyear: year, type: 2 },
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
                        title: '<div style="text-align:center">秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表</div>',
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
                                           header: '项目时间', hideable: false, sortable: false, align: 'center',
                                           dataIndex: 'classname',
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
                                                   header: '开展执<br/>法巡查<br/>次数<br/>（次）', dataIndex: 'kzzfxccs1', hideable: false, sortable: false,
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
                                                   header: '开展执<br/>法宣传<br/>次数<br/>（次）', dataIndex: 'kzzfxccs2', hideable: false, sortable: false,
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
                                                   header: '开展执<br/>法督察<br/>次数<br/>（次）', dataIndex: 'kzzfdccs', hideable: false, sortable: false,
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
                                           header: '执法处置',  hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           columns: [
                                               {
                                                   header: '秸秆', hideable: false, sortable: false, align: 'center',
                                                   menuDisabled: true,
                                                   columns: [
                                                   {
                                                       header: '出动、<br/>处置明<br/>火点<br/>（个）', dataIndex: 'fxczmhd', hideable: false, sortable: false, align: 'center',
                                                       
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
                                                   header: '过火<br/>面积<br/>（m²）', dataIndex: 'ghmj1', hideable: false, sortable: false, align: 'center',
                                                   
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
                                                   header: '发现、<br/>移送焦<br/>土点<br/>（个）', dataIndex: 'fxysjtd', hideable: false, sortable: false,
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
                                                   header: '过火<br/>面积<br/>（m²）', dataIndex: 'ghmj2', hideable: false, sortable: false,
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
                                                   header: '城市<br/>垃圾', dataIndex: '', hideable: false, sortable: false, align: 'center',
                                                   
                                                   menuDisabled: true,
                                                   columns: [
                                                       {
                                                           header: '发现、<br/>处置数<br/>（个）', dataIndex: 'fxczs', hideable: false, sortable: false,
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

                                   ]
                               },
                               {
                                   header: '<div style="text-align:left">统计年份：' + year + '</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '案件办理情况', hideable: false, sortable: false, align: 'center',
                                           menuDisabled: true,
                                           columns: [
                                               {
                                                   header: '露天焚烧秸秆的<br/>违法行为', dataIndex: 'ltfsjgla', hideable: false, sortable: false, align: 'center',
                                                   
                                                   menuDisabled: true,
                                                   columns: [
                                                        {
                                                            header: '立案<br/>(起)', dataIndex: 'ltfsjgja', hideable: false, sortable: false, align: 'center',
                                                            
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
                                                           header: '结案<br/>(起)', dataIndex: 'ltfsjgja', hideable: false, sortable: false, align: 'center',
                                                           
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
                                                            header: '实际收<br/>缴罚没款<br/>(起)', dataIndex: 'ltfsjgsjsjfk', hideable: false, sortable: false, align: 'center',
                                                            
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
                                                   header: '农业经营主体未及时收集导<br/>致秸秆被露天焚烧违法行为', hideable: false, sortable: false,
                                                   align: 'center',
                                                   menuDisabled: true,
                                                   columns: [
                                                       {
                                                           header: '立案<br/>(起)', dataIndex: 'nyjyla', hideable: false, sortable: false, align: 'center',
                                                           
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
                                                           header: '结案<br/>(起)', dataIndex: 'nyjyja', hideable: false, sortable: false, align: 'center',
                                                           
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
                                                            header: '实际收<br/>缴罚没款<br/>(起)', dataIndex: 'nyjysjsjfmk', hideable: false, sortable: false, align: 'center',
                                                            
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
                                                   header: '露天焚烧城市垃圾的<br/>违法行为', hideable: false, sortable: false,
                                                   align: 'center',
                                                   menuDisabled: true,
                                                   columns: [
                                                       {
                                                           header: '立案<br/>(起)', dataIndex: 'fscsljla', hideable: false, sortable: false, align: 'center',
                                                           
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
                                                           header: '结案<br/>(起)', dataIndex: 'fscsljja', hideable: false, sortable: false, align: 'center',
                                                           
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
                                                            header: '实际收<br/>缴罚没款<br/>(起)', dataIndex: 'fscsljsjsjfmk', hideable: false, sortable: false, align: 'center',
                                                            
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
                                   ]
                               }
                        ]
                    },
                {
                }]
            },
            ],
            buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    },
})