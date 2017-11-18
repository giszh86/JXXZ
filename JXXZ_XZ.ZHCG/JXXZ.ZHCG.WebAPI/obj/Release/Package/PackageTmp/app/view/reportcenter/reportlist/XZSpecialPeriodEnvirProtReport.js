var padleft = function (num, len)
{
    return Array(Math.abs(("" + num).length - ((len || 2) + 1))).join(0) + num;
}
Ext.define('TianZun.view.reportcenter.reportlist.XZSpecialPeriodEnvirProtReport', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.XZSpecialPeriodEnvirProtReport',
    title: '特殊时期（互联网峰会）环境保障工作日报表',
    layout: 'fit',
    initComponent: function ()
    {
        Ext.tip.QuickTipManager.init();
        var me = this;
        var date = new Date();
        var month = parseFloat(date.getMonth()) + 1;
        var year = parseFloat(date.getFullYear());
        var hour = parseInt(date.getHours());
        var min = parseInt(date.getMinutes());
        var date = parseInt(date.getDate());
        var nextDate = date + 1;
        var width = window.innerWidth * 0.95;
        var store = Ext.create('TianZun.store.reportcenter.SpecialPeriodEnvirProtStore');
        store.getProxy().url = "api/ReportCenter/GetSpecialReport?reportdate=" + this.record.get("reportdate");
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.Ajax.request({
            url: "api/ReportCenter/GetSpecialReport?reportdate=" + this.record.get("reportdate"),
            method: 'get',
            async: false,
            success: function (response)
            {
                jsonstr = Ext.decode(response.responseText);
            }
        });
        var starttime = new Date(jsonstr[0].starttime);
        var endtime = new Date(jsonstr[0].endtime);
        var whattime = new Date(jsonstr[0].whattime);
        var time = starttime.getFullYear() + '-' + parseInt(starttime.getMonth() + 1) + '-' + starttime.getDate() + ' ' + whattime.getHours() + ':' + padleft(whattime.getMinutes(),2);
        var NextTime = endtime.getFullYear() + '-' + parseInt(endtime.getMonth() + 1) + '-' + endtime.getDate() + ' ' + whattime.getHours() + ':' + padleft(whattime.getMinutes(),2);
        var statisticsuser = jsonstr[0].statisticsuser;
        var shuser = jsonstr[0].shuser;
        var bzcslshdcqk = jsonstr[0].bzcslshdcqk;
        var fxwtycljg = jsonstr[0].fxwtycljg;
        var drjxyrdgzap = jsonstr[0].drjxyrdgzap;
        var xysjcmxtjjsx = jsonstr[0].xysjcmxtjjsx;

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
                     xtype: 'form',
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
                             xtype: 'button',
                             text: '统计',
                             width: 80,
                             margin: '0 10 5 0',
                             handler: 'onStaticsReport',
                         },
                     ]
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
                        title: '<div style="text-align:center">特殊时期（互联网峰会）环境保障工作日报表</div>',
                        plugins: [this.cellEditing],
                        selModel: {
                            selType: 'cellmodel'
                        },
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
                                header: '填表单位：秀洲区综合行政执法局<span style="padding-left:500px">填表时间：' + year + '年' + month + '月' + date + '日</span>',
                                dataIndex: 'rate', hideable: false,
                                columns: [
                                    {
                                        header: '中队名称', dataIndex: 'unitname', hideable: false, sortable: false, align: 'center',
                                        width: 100,
                                        flex: 1,menuDisabled: true,
                                        summaryRenderer: function (value, summaryData, dataIndex)
                                        {
                                            return "<font color='red' size='2'>合计：</font>";
                                        },
                                    },
                                    {
                                        header: '秸秆禁烧执法检查工作数据统计', hideable: false, sortable: false, align: 'center',
                                        columns: [
                                            {
                                                header: '督查次数', dataIndex: 'dccs', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '出动人次', dataIndex: 'cdrs', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '出动车次', dataIndex: 'cdcc', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '发现数', dataIndex: 'fxs', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '整改完成数', dataIndex: 'zgwcs', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '行政执法（起）', dataIndex: 'xzzf', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '罚款金额（元）', dataIndex: 'fkje', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '发放宣传告知书（份）', dataIndex: 'ffxcgzs', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '过火总面积（㎡）', dataIndex: 'ghzmj', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '整改总面积（㎡）', dataIndex: 'zgzmj', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        header: '城市道路扬尘污染防控数据统计', dataIndex: 'name', hideable: false, sortable: false, align: 'center',
                                        flex: 1,menuDisabled: true,
                                        columns: [
                                            {
                                                header: '无证清运建筑垃圾', dataIndex: 'wzqyjzlj', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '未按规定时间和路线清运建筑垃圾', dataIndex: 'wagdsjqyjzlj', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '随意倾倒建筑垃圾', dataIndex: 'syqdjzlj', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '工地周边场所尘土飞扬、污水流溢', dataIndex: 'gdzbcsctfy', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        header: '罚款金额（元）', dataIndex: 'fkjey', hideable: false, sortable: false, align: 'center',
                                        flex: 1,menuDisabled: true,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData)
                                        {
                                            var sumValue = parseFloat(value);
                                            return "<font color='red' size='2'>" + value + "</font>";
                                        },
                                        field: {
                                            xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                        },
                                    },
                                    {
                                        header: '餐厨油烟执法管控<br/>（露天烧烤治理）', hideable: false, sortable: false, align: 'center',
                                        flex: 1,menuDisabled: true,
                                        columns: [
                                            {
                                                header: '整改（户）', dataIndex: 'zg', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                            {
                                                header: '取缔（个）', dataIndex: 'qd', hideable: false, sortable: false, align: 'center',
                                                editor: { allowBlank: false, xtype: 'numberfield',decimalPrecision: 5, minValue: 0, },
                                                flex: 1,menuDisabled: true,
                                                summaryType: 'sum',
                                                summaryRenderer: function (value, summaryData)
                                                {
                                                    var sumValue = parseFloat(value);
                                                    return "<font color='red' size='2'>" + value + "</font>";
                                                },
                                                field: {
                                                    xtype: 'numberfield', decimalPrecision: 5, minValue: 0,
                                                },
                                            },
                                        ]
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
                   labelWidth: 75
               },
               defaults: {
                   xtype: 'label',
                   style: 'font-weight:bold; font-size:16px',
                   allowBlank: false,
                   width: 180,
               },
               items: [
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        width: '100%',
                        defaultType: 'textfield',
                        colspan: 4,
                        items: [
                            {
                                fieldLabel: '统计时间',
                                name: 'starttime',
                                labelWidth: 80,
                                format: 'Y-m-d',
                                editable: false,
                                xtype: 'datefield',
                                value: new Date(time)
                            }, {
                                fieldLabel: '~',
                                labelSeparator: '',
                                labelWidth: 20,
                                name: 'endtime',
                                editable: false,
                                format: 'Y-m-d H:i',
                                xtype: 'datetimefield',
                                value: new Date(NextTime)
                            },
                             {
                                 fieldLabel: '统计人',
                                 xtype: 'textfield',
                                 labelWidth: 120,
                                 name: 'statisticsuser',
                                 value: statisticsuser
                             },
                             {
                                 fieldLabel: '审核人',
                                 xtype: 'textfield',
                                 name: 'shuser',
                                 labelWidth: 120,
                                 value: shuser
                             },
                        ],
                    },
                   {
                       fieldLabel: ' 一、保障措施落实和督查情况',
                       xtype: 'textarea',
                       height: 30,
                       name: 'bzcslshdcqk',
                       width: "100%",
                       colspan: 3,
                       value: bzcslshdcqk,
                   },
                   {
                       fieldLabel: '二、发现问题与处理结果',
                       xtype: 'textarea',
                       height: 50,
                       width: "100%",
                       name: 'fxwtycljg',
                       colspan: 3,
                       value: fxwtycljg,
                   },
                   {
                       fieldLabel: '三、当日及下一日的工作安排',
                       xtype: 'textarea',
                       height: 50,
                       name: 'drjxyrdgzap',
                       width: "100%",
                       colspan: 3,
                       value: drjxyrdgzap,
                   },
                   {
                       fieldLabel: '四、需要市级层面协调解决事项',
                       xtype: 'textarea',
                       height: 50,
                       width: "100%",
                       name: 'xysjcmxtjjsx',
                       colspan: 3,
                       value: xysjcmxtjjsx
                   },
               ]
           }
            ], buttons: [{
                text: '提交',
                handler: 'onAddSpecialReportOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
       
        this.callParent();
    }
})