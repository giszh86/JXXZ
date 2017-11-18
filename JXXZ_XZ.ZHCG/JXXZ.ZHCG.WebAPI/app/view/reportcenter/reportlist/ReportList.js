Ext.define('TianZun.view.reportcenter.reportlist.ReportList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportList',
    title: '报表中心 > 报表列表',
    layout: 'fit',

    requires: [
        'TianZun.controller.reportcenter.reportList',
    ],
    controller: 'reportList',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.reportcenter.ReportDateListStore');

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        layout: 'fit',
                        border: false,
                        title: '待填报表',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '报表名称', dataIndex: 'reportname', flex: 1 },
                                    { header: '填报时间', dataIndex: 'reporttime', flex: 1 },
                                    { header: '上报中队', dataIndex: 'unitname', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '上报',
                                    handler: 'onAdddt',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuery',
                                    handleMouseEvents: false
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '历史报表',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '报表名称', dataIndex: 'reportname', flex: 1 },
                                    { header: '填报时间', dataIndex: 'reporttime', flex: 1 },
                                    { header: '上报中队', dataIndex: 'unitname', flex: 1 },
                            ],

                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                }, 
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuery',
                                    handleMouseEvents: false
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '累计报表',
                        xtype: 'panel',
                        name: 'AddUpPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '报表名称', dataIndex: 'reportname', flex: 1 },
                                    { header: '所属年度', dataIndex: 'reportyear', flex: 1 },
                            ],
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onAddUpView',
                                    handleMouseEvents: false
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuery',
                                    handleMouseEvents: false
                                }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                ],
                listeners: {
                    'tabchange': function (tabPanel, newbb, oldbb, eOpts) {
                        var contentGrid = newbb.down('grid');//grid
                        var contentBar = newbb.down('pagingtoolbar')//bbar
                        if (newbb.title == "待填报表") {
                            store = Ext.create('TianZun.store.reportcenter.ReportDateListStore');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newbb.title == "历史报表") {
                            alreadyStore = Ext.create('TianZun.store.reportcenter.ReportDateListStore');
                            alreadyStore.getProxy().url = "api/ReportCenter/GetHisReportList";
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        }
                        else if (newbb.title == "累计报表")
                        {
                            AddUpStore = Ext.create('TianZun.store.reportcenter.ReportDateListStore');
                            AddUpStore.getProxy().url = "api/ReportCenter/GetAddUpReportList";
                            contentGrid.setStore(AddUpStore);
                            contentBar.setStore(AddUpStore);
                            AddUpStore.load();
                        }
                    }
                }
            }
        ]

        this.callParent();
    }
});