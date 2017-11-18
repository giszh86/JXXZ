Ext.define('TianZun.view.reportcenter.reportlist.XZstrawAndWasteControlReportDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZstrawAndWasteControlReportDetail',
    title: '秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var reportdate = this.record.get("reportdate");
        var date = new Date(reportdate);
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        var date = parseFloat(date.getDate());
        var width = window.innerWidth * 0.94;
        var store = Ext.create('TianZun.store.reportcenter.strawAndWasteControlStore');
        store.getProxy().url = "api/ReportCenter/GetStrawAndWasteControlReport?reportdate=" + this.record.get("reportdate");
        var showSummary = true;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.Ajax.request({
            url: 'api/ReportCenter/GetStrawAndWasteControlReport?reportdate=' + this.record.get("reportdate"),
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var isstatistics = jsonstr[0].isstatistics;
        var remark = jsonstr[0].remark;
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            autoScroll: true,
            width: width,
            //height: 1200,
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
                            extrapra: { reportid: 3, reportdate: reportdate, type: 1 },
                        },
                        //{
                        //    xtype: 'button',
                        //    text: '打印',
                        //    margin: '0 10 5 0',
                        //    handler: '',
                        //},
                    ],
                    listeners:
                       {
                           beforerender: function (obj)
                           {
                               if (isstatistics == 0 || isstatistics == null)
                               {
                                   Ext.getCmp('exportbtn').hidden = true;
                               }
                           },
                       }
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
                        plugins: [this.cellEditing],
                        fieldDefaults: {
                            labelAlign: 'center',
                            align: 'center',
                        },
                        selModel: {
                            selType: 'cellmodel'
                        },
                        features: [{
                            id: 'group',
                            ftype: 'groupingsummary',
                            groupHeaderTpl: '{name}',
                            hideGroupedHeader: true,
                            enableGroupingMenu: false,
                        }],
                        columns: [
                               {
                                   header: '<div style="text-align:left">填表单位：秀洲区综合行政执法局</div>',
                                   hideable: false,
                                   dataIndex: 'rate',
                                   columns: [
                                       {
                                           header: '中队名称',
                                           hideable: false,
                                           dataIndex: 'unitname', sortable: false,
                                           menuDisabled: true,
                                           summaryType: 'sum',
                                           align: 'center',
                                           width: 100,
                                           summaryRenderer: function (value, summaryData, dataIndex)
                                           {
                                               return "<font color='red' size='2'>累计：</font>";
                                           },
                                       },
                                       {
                                           header: '项目时间', hideable: false, sortable: false, align: 'center',
                                           dataIndex: 'classname',
                                           menuDisabled: true,
                                           summaryRenderer: function (value, summaryData)
                                           {
                                               var sumValue = parseFloat(value);
                                               return "<font color='red' size='2'>-</font>";
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
                                   header: '<div style="text-align:left">填报时间：' + year + '年' + month + '月25日</div>',
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
                                       {
                                           header: '简要说明下列情况',  menuDisabled: true, hideable: false, sortable: false, columns: [{
                                               text: '主要工作亮点',
                                                menuDisabled: true, sortable: false,flex:1,
                                               align: 'center',
                                               editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60, editable: false, readOnly: true, },
                                               dataIndex: 'zygzld',
                                           }, {
                                               text: '存在的主要问题',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60, editable: false, readOnly: true, },
                                               dataIndex: 'czdzywt',
                                           }, {
                                               text: '面临的主要困难',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60, editable: false, readOnly: true, },
                                               dataIndex: 'mldzykn',
                                           }, {
                                               text: '相关的意见建议',
                                               menuDisabled: true, sortable: false, flex: 1,
                                               align: 'center',
                                               editor: { allowBlank: true, xtype: 'textarea', minValue: 0, height: 60, editable: false, readOnly: true, },
                                               dataIndex: 'xgdyjjy',
                                           }, ]
                                       },
                                   ]
                               }
                        ]
                    },
                {
                }]
            },
            {
                layout: 'fit',
                border: false,
                xtype: 'form',
                name: '',
                margin: '10 0 0 0',
                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 45,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 500,
                },
                items: [
                    {
                        fieldLabel: '备注',
                        colspan: 3,
                        xtype: 'textarea',
                        width: width * 0.97,
                        height: 50,
                        editable:false,
                        name: 'remark',
                        readOnly:true,
       //                 value: '1.明火点、焦土点：一个当事人某一时刻的多个焚烧点以一处计入；\r\n' +
       //'2.结案：跨年度案件结案不计入，以当年立案案件结案为准；\r\n' +
       //'3.实际收缴罚没款：实际收缴的罚没款总额。\r\n',
                        value: remark
                    }
                ]
            }
            ],
            buttons: [{
                text: '确定',
                handler: 'onClose'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    },
})