Ext.define('TianZun.view.reportcenter.reportlist.XZlandLawCaseHalfMonthReportDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZlandLawCaseHalfMonthReportDetail',
    title: '秀洲区综合行政执法局土地执法案件情况分类统计报表（半月报）',
    layout: 'fit',
    requires: ['TianZun.ux.ExportExcelButton'],
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var mMainPanel;
        var me = this;
        var reportdate = this.record.get("reportdate");
        var date = new Date(reportdate);
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        var date = parseFloat(date.getDate());
        var width = window.innerWidth * 0.95;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        var store = Ext.create("TianZun.store.reportcenter.LandLawReportDataHalfMonthStore");
        store.getProxy().url = "api/ReportCenter/GetLandLawHalfMonthReport?reportdate=" + this.record.get("reportdate");
        Ext.Ajax.request({
            url: 'api/ReportCenter/GetLandLawHalfMonthReport?reportdate=' + this.record.get("reportdate"),
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var remark = jsonstr[0].remark;
        var isstatistics = jsonstr[0].isstatistics;
        var showSummary = true;
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
                            formsubmit: true,
                            extrapra: { reportid: 1, reportdate: reportdate, type: 1 },
                        },
                         //{
                         //    xtype: 'button',
                         //    id: 'printbtn',
                         //    text: '打印',
                         //    margin: '0 10 5 0',
                         //    handler: 'onPrint',
                         //    width: 90,
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
                xtype: 'form',
                border: false,
                name: '',
                items: [
                    {
                        columnLines: true,
                        xtype: 'gridpanel',
                        gridautoScroll: true,
                        region: 'center',
                        store: store,
                        enableNoGroups: false,
                        //enableColumnMove: false, //禁止拖放列 
                        //enableColumnResize: false, //禁止改变列宽度 
                        title: '<div style="text-align:center">秀洲区综合行政执法局土地执法案件情况分类统计报表（' + month + '月）数据截至每月15日</div>',
                        viewConfig: {
                            stripeRows: false,   //每行换颜色
                            forceFit: true,
                            enableTextSelection:true,
                            //scrollOffset: 0,
                        },
                        plugins: [this.cellEditing],
                        selModel: {
                            selType: 'cellmodel'
                        },
                        fieldDefaults: {
                            labelAlign: 'center',
                            align: 'center',
                        },
                        features: [{
                            id: 'group',
                            ftype: 'groupingsummary',
                            groupHeaderTpl: '{name}',
                            enableGroupingMenu: false,
                            //startCollapsed :true,
                        }],
                        columns: [
                            {
                                header: '填表单位：秀洲区综合行政执法局<span style="padding-left:500px">填表时间：' + year + '年' + month + '月15日</span>',
                                dataIndex: 'rate', hideable: false,
                                columns: [
                                     {
                                         header: '中队名称', dataIndex: 'unitname', hideable: false, sortable: false, align: 'center',
                                         width: 100,
                                         menuDisabled: true,sortable: false,
                                         summaryRenderer: function (value, summaryData, dataIndex)
                                         {
                                             return "<font color='red' size='2'>累计：</font>";
                                         },
                                     },
                                     {
                                         header: '违法用地<br/>总件数及<br/>卫片发现<br/>数', dataIndex: 'classname', hideable: false, align: 'center',
                                         menuDisabled: true,sortable: false,
                                         summaryRenderer: function (value, summaryData)
                                         {
                                             var sumValue = parseFloat(value);
                                             return "<font color='red' size='2'>-</font>";
                                         },
                                     }, {
                                         header: '查处违法<br/>用地案件<br/>总件数', dataIndex: 'wfydajzjs', hideable: false, align: 'center',
                                         menuDisabled: true,sortable: false,
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
                                         header: '国土部门<br/>移送数', dataIndex: 'gtbmyss', hideable: false, align: 'center',
                                         menuDisabled: true,sortable: false,
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
                                    header: '综合执法<br/>部门受理<br/>移送数', dataIndex: 'zhzfbmslyss', hideable: false, menuDisabled: true,sortable: false,
                                    align: 'center',
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
                                    header: '下达处罚<br/>决定书件<br/>数', dataIndex: 'xdcfjdsjs', hideable: false, menuDisabled: true,sortable: false,
                                    align: 'center',
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
                                    header: '申请强制<br/>执行件数', dataIndex: 'sqqzzxjs', hideable: false, menuDisabled: true,sortable: false,
                                    align: 'center',
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
                                    header: '立案查处及追责情况', hideable: false, menuDisabled: true,sortable: false, align: 'center',
                                    columns: [{
                                        text: '立案查处<br/>总件数',
                                        menuDisabled: true,sortable: false,
                                        align: 'center',
                                        dataIndex: 'lacczjs',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData)
                                        {
                                            var sumValue = parseFloat(value);
                                            return "<font color='red' size='2'>" + value + "</font>";
                                        },
                                        field: {
                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                        }
                                    }, {
                                        text: '面积',
                                         menuDisabled: true,
                                        columns: [{
                                            text: '涉案总面积',
                                            menuDisabled: true,sortable: false, align: 'center',
                                            dataIndex: 'sazmj',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '其中耕地<br/>面积',
                                            menuDisabled: true,sortable: false, align: 'center',
                                            dataIndex: 'qzgdmj',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, ]
                                    }, {
                                        text: '行政处罚',
                                         menuDisabled: true, hideable: false, sortable: false, align: 'center', editor: { allowBlank: false, xtype: 'numberfield', decimalPrecision: 5, minValue: 0, },
                                        columns: [{
                                            text: '罚款金额<br/>（万元）',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'fkje',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '没收面积<br/>（万平方<br/>米）',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'msmj',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '拆除违法<br/>建筑面积（万<br/>平方米）',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'ccwfjzmj',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '没收违法<br/>所得（万元）',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'mswfsd',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '处分',
                                             menuDisabled: true, hideable: false, sortable: false, align: 'center', editor: { allowBlank: false, xtype: 'numberfield', decimalPrecision: 5, minValue: 0, },
                                            columns: [{
                                                text: '提出处分<br/>建议（人）', menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'tccfjy',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, {
                                                text: '实际处分<br/>（人）', menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'sjcf',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, {
                                                text: '其他',
                                                menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'cfqt',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, ]
                                        }, {
                                            text: '追究刑事责任',
                                             menuDisabled: true, hideable: false, sortable: false, align: 'center', editor: { allowBlank: false, xtype: 'numberfield', decimalPrecision: 5, minValue: 0, },
                                            columns: [{
                                                text: '移送公安<br/>机关（人）',
                                                menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'ysgajg',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, {
                                                text: '采取强制<br/>措施（人）',
                                                menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'cqqzcs',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, {
                                                text: '追究刑事<br/>责任（人）',
                                                menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'zjxszr',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, {
                                                text: '其他',
                                                menuDisabled: true,sortable: false, align: 'center',
                                                dataIndex: 'zjxszrqt',
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                                }
                                            }, ]
                                        }, ]
                                    }, ]
                                },
                                {
                                    header: '结案情况',
                                     menuDisabled: true, hideable: false, sortable: false, align: 'center', editor: { allowBlank: false, xtype: 'numberfield', decimalPrecision: 5, minValue: 0, },
                                    columns: [{
                                        text: '已结案件数', menuDisabled: true,sortable: false, align: 'center',
                                        dataIndex: 'yjajs',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData)
                                        {
                                            var sumValue = parseFloat(value);
                                            return "<font color='red' size='2'>" + value + "</font>";
                                        },
                                        field: {
                                            xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                        }
                                    }, {
                                        text: '未结案', menuDisabled: true,sortable: false, align: 'center',
                                        columns: [{
                                            text: '总件数',
                                            menuDisabled: true,sortable: false, align: 'center',
                                            dataIndex: 'wjazjs',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '其中&nbsp;月&nbsp;日<br/>之前能移送的',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'nysd',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, {
                                            text: '未能在&nbsp;月&nbsp;日<br/>之前移送的',
                                            menuDisabled: true,sortable: false, align: 'center', dataIndex: 'yysd',
                                            summaryType: 'sum',
                                            summaryRenderer: function (value, summaryData)
                                            {
                                                var sumValue = parseFloat(value);
                                                return "<font color='red' size='2'>" + value + "</font>";
                                            },
                                            field: {
                                                xtype: 'displayfield', decimalPrecision: 5, minValue: 0,editable:false
                                            }
                                        }, ]
                                    }, ]
                                },
                                {
                                    header: '简要说明下列情况',  menuDisabled: true, hideable: false, columns: [{
                                        text: '主要工作<br/>亮点',
                                         menuDisabled: true, align: 'center', sortable: false,
                                        editor: { allowBlank: true, readOnly: true, xtype: 'textarea', minValue: 0, height: 60, text: '说明' }, dataIndex: 'zygzld',
                                    }, {
                                        text: '存在的主<br/>要问题',
                                         menuDisabled: true, sortable: false, align: 'center', editor: { allowBlank: true,readOnly:true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'czdzywt',
                                    }, {
                                        text: '面临的主<br/>要困难',
                                         menuDisabled: true, sortable: false, align: 'center', editor: { allowBlank: true, readOnly: true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'mldzykn',
                                    }, {
                                        text: '相关的意<br/>见建议',
                                         menuDisabled: true, sortable: false, align: 'center', editor: { allowBlank: true, readOnly: true, xtype: 'textarea', minValue: 0, height: 60 }, dataIndex: 'xgdyjjy',
                                    }, ]
                                },
                                ]
                            },
                        ],
                    }
                ]
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
                        name: 'remark',
                        height: 50,
                        readOnly: true,
                        value: remark,
                    }
                ]
            }
            ], buttons: [{
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