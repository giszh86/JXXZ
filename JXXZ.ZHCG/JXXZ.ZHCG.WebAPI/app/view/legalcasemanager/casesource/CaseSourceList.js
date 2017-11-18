Ext.define('TianZun.view.legalcasemanager.casesource.CaseSourceList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseSourceList',
    title: '执法办案管理 > 案源管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.CaseSource',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'caseSource',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.TodoCaseSource',
            { proxy: { extraParams: { userid: $.cookie('USER_ID') } } });//待处理案件

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
                        title: '待处理案源',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '联系人', dataIndex: 'contact', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                                    { header: '案发地址', dataIndex: 'wfxwfsdz', flex: 1 },
                                    { header: '案件状态', dataIndex: 'lazt', flex: 1 },
                                    { header: '提交时间', dataIndex: 'createtime', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '编辑',
                                    handler: 'onDispatch',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '立案',
                                    handler: 'onRegister',
                                    hidden: true,
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
                                itemclick: 'onCaseSourceItemClick',
                            }
                        }],
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '已处理案源',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '联系人', dataIndex: 'contact', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                                    { header: '案发地址', dataIndex: 'wfxwfsdz', flex: 1 },
                                    { header: '状态', dataIndex: 'statusname', flex: 1 },
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
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '全部案源',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '联系人', dataIndex: 'contact', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                                    { header: '案发地址', dataIndex: 'wfxwfsdz', flex: 1 },
                                    { header: '状态', dataIndex: 'statusname', flex: 1 },
                            ],
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/CaseSourceL/ExportExcel',
                                    excelname: '全部案源统计表',
                                    exceltitle: '全部案源统计表',
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
                        }]
                    },
                ],
                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [{
                            xtype: 'component', //撑开
                            flex: 1
                        },
                            Ext.create('Ext.button.Button', {
                                width: 100,
                                margin: "2 2 3 4",
                                text: "案源登记",
                                handler: 'onAdd'
                            })
                        ]);
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待处理案源") {
                            store = Ext.create('TianZun.store.legalcasemanager.TodoCaseSource', { proxy: { extraParams: { userid: $.cookie('USER_ID') } } });
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newCard.title == "已处理案源") {
                            alreadyStore = Ext.create('TianZun.store.legalcasemanager.FinishCaseSource', { proxy: { extraParams: { userid: $.cookie('USER_ID') } } });
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newCard.title == "全部案源") {
                            allStore = Ext.create('TianZun.store.legalcasemanager.AllCaseSource');
                            contentGrid.setStore(allStore);
                            contentBar.setStore(allStore);
                            allStore.load();
                        }
                    }
                }
            }
        ]

        this.callParent();
    }
});