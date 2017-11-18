Ext.define('TianZun.view.legalcasemanager.casemanager.CommonCaseList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commonCaseList',
    title: '执法办案管理 > 案件管理 > 一般案件',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.CommonCase',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'commonCase',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.legalcasemanager.CommonCaseList',
            { proxy: { extraParams: { userid: $.cookie('USER_ID'), status: 1 } } });//待处理案件

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
                        title: '待办案件',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '', dataIndex: 'isovertime', width:40},
                                    { header: '案件编号', dataIndex: 'casebh', flex: 1 },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '提交时间', dataIndex: 'createtime', flex: 1 },
                                    { header: '超期时间', dataIndex: 'etime', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfsname', flex: 1 },
                                    { header: '案件类型', dataIndex: 'zd_name', flex: 1 },
                            ],
                            listeners: {
                                selectionchange: function (obj) {
                                    me.down('grid').removeCls('x-grid-item-over')
                                    me.down('grid').removeCls('x-grid-item-selected')
                                }
                            },
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '处理',
                                    handler: 'onDispatch',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '撤销',
                                    handler: 'onRevoke',
                                    hidden:true,
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
                                itemclick:'revokeClick'
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '已办案件',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件编号', dataIndex: 'casebh', flex: 1 },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '提交时间', dataIndex: 'createtime', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfsname', flex: 1 },
                                    { header: '案件类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '超期时间', dataIndex: 'etime', flex: 1 },
                                    { header: '处理人', dataIndex: 'dealusername', flex: 1 },
                                    { header: '处理中队', dataIndex: 'zbunitname', flex: 1 },
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
                                    webapi: 'api/CommonCase/ExportExcel',
                                    excelname: '已办案件统计表',
                                    exceltitle: '已办案件统计表',
                                    extrapra: {userid:$.cookie('USER_ID'),status:2}
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
                        title: '撤销案件',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件编号', dataIndex: 'casebh', flex: 1 },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '提交时间', dataIndex: 'createtime', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfsname', flex: 1 },
                                    { header: '案件类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '处理人', dataIndex: 'dealusername', flex: 1 },
                                    { header: '处理中队', dataIndex: 'zbunitname', flex: 1 },
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
                                    webapi: 'api/CommonCase/ExportExcel',
                                    excelname: '撤销案件统计表',
                                    exceltitle: '撤销案件统计表',
                                    extrapra: { userid: $.cookie('USER_ID'), status: 3 }
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
                        title: '案件中心',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '', dataIndex: 'isovertime', width: 40 },
                                    { header: '案件编号', dataIndex: 'casebh', flex: 1 },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '提交时间', dataIndex: 'createtime', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfsname', flex: 1 },
                                    { header: '案件类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '超期时间', dataIndex: 'etime', flex: 1 },
                                    { header: '处理人', dataIndex: 'dealusername', flex: 1 },
                                    { header: '处理中队', dataIndex: 'zbunitname', flex: 1 },
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
                                    webapi: 'api/CommonCase/ExportExcel',
                                    excelname: '全部案件统计表',
                                    exceltitle: '全部案件统计表',
                                    extrapra: { userid: $.cookie('USER_ID'), status: 4 }
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
                                text: "案件上报",
                                handler: 'onAdd'
                            })
                        ]);
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待办案件") {
                            store = Ext.create('TianZun.store.legalcasemanager.CommonCaseList', { proxy: { extraParams: { userid: $.cookie('USER_ID'), status: 1 } } });
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();

                            var storefilter = newCard.up('commonCaseList').down('commonCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        } else if (newCard.title == "已办案件") {
                            alreadyStore = Ext.create('TianZun.store.legalcasemanager.CommonCaseList', { proxy: { extraParams: { userid: $.cookie('USER_ID'), status: 2 } } });
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();

                            var storefilter = newCard.up('commonCaseList').down('commonCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        } else if (newCard.title == "撤销案件") {
                            backStore = Ext.create('TianZun.store.legalcasemanager.CommonCaseList', { proxy: { extraParams: { userid: $.cookie('USER_ID'), status: 3 } } });
                            contentGrid.setStore(backStore);
                            contentBar.setStore(backStore);
                            backStore.load();

                            var storefilter = newCard.up('commonCaseList').down('commonCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        } else if (newCard.title == "案件中心") {
                            allStore = Ext.create('TianZun.store.legalcasemanager.CommonCaseAllList');
                            contentGrid.setStore(allStore);
                            contentBar.setStore(allStore);
                            allStore.load();

                            var storefilter = newCard.up('commonCaseList').down('commonCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        }
                    }
                }
            }
        ]

        this.callParent();
    }
})