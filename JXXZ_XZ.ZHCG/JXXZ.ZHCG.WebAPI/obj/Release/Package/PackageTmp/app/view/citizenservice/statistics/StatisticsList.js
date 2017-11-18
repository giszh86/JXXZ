Ext.define('TianZun.view.citizenservice.statistics.StatisticsList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.statisticsList',
    title: '市民服务管理 > 统计报表',
    layout: 'fit',

    requires: [
        'TianZun.controller.citizenservice.StatisticsManager',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'statisticsManager',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        var dt = new Date();
        var monthStore = Ext.create('TianZun.store.citizenservice.StatisticalReport');

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [{
                layout: 'fit',
                border: false,
                title: '月度报表',
                items: [{
                    layout: 'fit',
                    xtype: 'form',
                    border: false,
                    style: 'border-top: 0;',
                    width: 1000,
                    height: 550,
                    overflowY: 'auto',
                    items: [
                    {
                        xtype: 'hidden',
                        name: 'pryear',
                        value: dt.getFullYear()
                    },
                    {
                        xtype: 'hidden',
                        name:'prmonth'
                    },
                    {
                        xtype: 'hidden',
                        name: 'prsourceid'
                    },
                    {
                        xtype: 'hidden',
                        name: 'prsource'
                    },
                    {
                        xtype: 'grid',
                        multiSelect: true,
                        columnLines: true,                        
                        columns: [
                                { header: '职能部门', dataIndex: 'unitname', flex: 1 },
                                { header: '事件编号', dataIndex: 'eventid', flex: 1 },
                                { header: '投诉人', dataIndex: 'complainant', flex: 1 },
                                { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                                { header: '上报时间', dataIndex: 'foundtime', flex: 1 },
                                { header: '归档时间', dataIndex: 'archivingtime', flex: 1 },
                                { header: '事件来源', dataIndex: 'bigclassname', flex: 1 },
                                { header: '满意度', dataIndex: 'satisfaction', flex: 1},
                        ],
                        store: monthStore,
                        tbar: [
                              '->',
                        {
                            xtype: 'fieldset',
                            border: 0,
                            layout: 'table',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 60
                            },
                            defaults: {
                                xtype: 'textfield',
                                width: 100
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'moyear',
                                    margin: '3 0 0 0',
                                    valueField: 'ID',
                                    displayField: 'Year',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                            { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                            { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                            { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                            { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                        ]
                                    }),
                                    value: dt.getFullYear(),
                                },
                                {
                                    xtype: 'label',
                                    margin: '5 10 0 10',
                                    html: '<b style="font-size:15px;">年</b>',
                                },
                                {
                                    xtype: 'combo',
                                    name: 'mmonth',
                                    margin: '3 0 0 0',
                                    valueField: 'ID',
                                    displayField: 'Month',
                                    editable: false,
                                    store: Ext.create('TianZun.store.sys.GetAllMonth'),
                                    //value: dt.getMonth()+1,
                                }, 
                                {
                                    xtype: 'label',
                                    margin: '5 10 0 10',
                                    html: '<b style="font-size:15px;">月</b>',
                                },
                                 {
                                     fieldLabel: '事件来源',
                                     xtype: 'combo', 
                                     name: 'sourceid',
                                     margin: '3 0 0 10',
                                     store: Ext.create('TianZun.store.citizenservice.EventSource'),
                                     valueField: 'ID',
                                     displayField: 'Name',
                                     editable: false,
                                     width:'250px',
                                 },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryMonthOK'
                                }
                            ]
                        },
                            '->',
                            {
                                text: '打印预览',
                                handler: 'onPrintMonth',
                                handleMouseEvents: false
                            },
                            {
                                xtype: 'exportbtn',
                                text: '导出',
                                webapi: 'api/StatisticalReport/ExportMonthExcel',
                                listeners: {
                                    mouseover: function (obj) {
                                        obj.excelname = me.down('hidden[name=pryear]').getValue() + '年' + (me.down('hidden[name=prmonth]').getValue() == '' ? '' : me.down('hidden[name=prmonth]').getValue() + '月') + (me.down('hidden[name=prsourceid]').getValue() == '' ? '全部类' : me.down('hidden[name=prsource]').getValue() + '类') + '统计表';
                                        obj.exceltitle = me.down('hidden[name=pryear]').getValue() + '年' + (me.down('hidden[name=prmonth]').getValue() == '' ? '' : me.down('hidden[name=prmonth]').getValue() + '月') + (me.down('hidden[name=prsourceid]').getValue() == '' ? '全部类' : me.down('hidden[name=prsource]').getValue() + '类') + '统计表';
                                        obj.extrapra = { year: me.down('hidden[name=pryear]').getValue(), month: me.down('hidden[name=prmonth]').getValue(), sourceid: me.down('hidden[name=prsourceid]').getValue() };
                                    }
                                }
                            },
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        },
                    },
                        
                    ]                    
                }],
            },
            {
                layout: 'fit',
                border: false,
                title: '年度报表',
                items: [{
                    layout: 'fit',
                    xtype: 'form',
                    border: false,
                    style: 'border-top: 0;',
                    width: 1000,
                    height: 550,
                    overflowY: 'auto',
                    items: [
                    {
                        xtype: 'hidden',
                        name: 'pryyear',
                        value: dt.getFullYear()
                    },
                    {
                        xtype: 'grid',
                        columnLines: true,
                        //features: [{
                        //    ftype: 'summary'
                        //}],
                        tbar: [
                              '->',
                        {
                            xtype: 'fieldset',
                            border: 0,
                            layout: 'table',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 60
                            },
                            defaults: {
                                xtype: 'textfield',
                                width: 100
                            },
                            name: '',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'yyear',
                                    margin:'3 0 0 0',
                                    valueField: 'ID',
                                    displayField: 'Year',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        data: [
                                            { ID: dt.getFullYear(), Year: dt.getFullYear() },
                                            { ID: dt.getFullYear() - 1, Year: dt.getFullYear() - 1 },
                                            { ID: dt.getFullYear() - 2, Year: dt.getFullYear() - 2 },
                                            { ID: dt.getFullYear() - 3, Year: dt.getFullYear() - 3 },
                                            { ID: dt.getFullYear() - 4, Year: dt.getFullYear() - 4 },
                                        ]
                                    }),
                                    value: dt.getFullYear(),
                                },
                                {
                                    xtype: 'label',
                                    margin: '0 10 0 10',
                                    html: '<b style="font-size:15px;">年</b>',                                    
                                },
                                {
                                    xtype: 'button',
                                    name: '',
                                    text: '查询',
                                    margin: '0 0 0 20',
                                    width: 50,
                                    handler: 'onQueryYearOK'
                                }                                
                            ]
                        },
                        '->',
                        {
                            text: '打印预览',
                            handler: 'onPrintYear',
                            handleMouseEvents: false
                        },
                        {
                            xtype: 'exportbtn',
                            text: '导出',
                            webapi: 'api/StatisticalReport/ExportYearExcel',
                            listeners: {
                                mouseover: function (obj) {
                                    obj.excelname = me.down('hidden[name=pryyear]').getValue() + '年归类统计表';
                                    obj.exceltitle = me.down('hidden[name=pryyear]').getValue() + '年归类统计表';
                                    obj.extrapra = { year: me.down('hidden[name=pryyear]').getValue() };
                                }
                            }
                        },
                        ],
                        listeners: {
                            render: 'onQueryYearOK'
                        }
                    }]
                }]
            }]
        }];

        this.callParent();
    }
});