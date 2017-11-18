Ext.define('TianZun.view.reportcenter.reportlist.XZH7N7controlWorkInfDailyReportDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZH7N7controlWorkInfDailyReportDetail',
    title: 'H7N9疫情(活禽交易)防控工作信息日报表',
    layout: 'fit',

    requires: [

          'TianZun.ux.ExportExcelButton'
    ],

    initComponent: function () {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var reportdate = this.record.get("reportdate");
        var date = new Date(reportdate);
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        var date = parseFloat(date.getDate());
        if (window.innerWidth > 1366) {
            var width = window.innerWidth * 0.62;
        }
        else {
            var width = window.innerWidth * 0.9;
        }
        var reportdate = this.record.get("reportdate");
        var store = Ext.create('TianZun.store.reportcenter.H7N7controlWorkStore');
        store.getProxy().url = "api/ReportCenter/GetH7N7Report?reportdate=" + this.record.get("reportdate");
        var showSummary = true;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.Ajax.request({
            url: 'api/ReportCenter/GetH7N7Report?reportdate=' + this.record.get("reportdate"),
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var isstatistics = jsonstr[0].isstatistics;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            autoScroll: true,
            width: width,
            items: [
                {
                    layout: 'hbox',
                    border: false,
                    xtype: 'panel',
                    name: '',
                    margin: '10 0 0 0',
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
                            extrapra: { reportid: 7, reportdate: reportdate, type: 1 },
                        },
                        //{
                        //    xtype: 'button',
                        //    id:'printbtn',
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
                               if (isstatistics == 0||isstatistics==null)
                               {
                                   Ext.getCmp('exportbtn').hidden = true;
                                   //Ext.getCmp('printbtn').hidden = true;
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
                        title: '<div style="text-align:center">H7N9疫情(活禽交易)防控工作信息日报表</div>',
                        selModel: {
                            selType: 'cellmodel'
                        },
                        plugins: [this.cellEditing],
                        viewConfig: {
                            stripeRows: false,
                            forceFit: true,
                            scrollOffset: 0,
                        },
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
                                header: '填表单位：秀洲区综合行政执法局<span style="padding-left:300px">报送日期：' + month + '月' + date+ '日</span>',
                                dataIndex: 'rate', hideable: false,
                                columns: [
                                    {
                                        header: '行政单位', dataIndex: 'unitname', hideable: false, sortable: false, align: 'center',
                                            width: 100,
                                            flex: 1, menuDisabled: true,
                                            summaryRenderer: function (value, summaryData, dataIndex) {
                                            return "<font color='red' size='2'>合计：</font>";
                                        },
                                    },
                            {
                                header: '巡查次数（次）', dataIndex: 'xccs', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '出动人员（人）', dataIndex: 'cdry', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '出动人员（人）', dataIndex: 'cdcl', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '发放宣传资料（份）', dataIndex: 'ffxczl', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '劝离活禽交易（起）', dataIndex: 'qlhqjy', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '查处活禽交易（起）', dataIndex: 'cchqjy', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '处置活禽数量（只）', dataIndex: 'czhqsl', hideable: false, sortable: false, align: 'center',
                                
                                    flex: 1, menuDisabled: true,
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
                                header: '其他', dataIndex: 'qt', hideable: false, sortable: false, align: 'center',
                                editor: { allowBlank: false, xtype: 'textarea', height: 60 },
                                flex: 1,menuDisabled: true,
                                summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData) {
                                    var sumValue = parseFloat(value);
                                    return "<font color='red' size='2'>-</font>";
                                },
                                field: {
                                    xtype: 'textarea', readOnly: true,
                                    height: 60,
                                }
                            },
                            {
                                header: '当日工作做法', dataIndex: 'drgzzf', hideable: false, sortable: false, align: 'center',
                                editor: { allowBlank: false, xtype: 'textarea', height:60 },
                                flex: 1,menuDisabled: true,
                                summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData) {
                                    var sumValue = parseFloat(value);
                                    return "<font color='red' size='2'>-</font>";
                                },
                                field: {
                                    xtype: 'textarea', readOnly: true,
                                    height: 60,
                                }
                            },
                                ]
                            },
                        ],
                    }
                ], buttons: [{
                    text: '确定',
                    handler: 'onClose'
                }, {
                    text: '取消',
                    handler: 'onClose'
                }]
            }]
        }]
        this.callParent();
    }
})