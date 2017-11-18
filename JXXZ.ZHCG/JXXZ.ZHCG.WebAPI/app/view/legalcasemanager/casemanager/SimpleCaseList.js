Ext.define('TianZun.view.legalcasemanager.casemanager.SimpleCaseList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpleCaseList',
    title: '执法办案管理 > 案件管理 > 简易案件',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.SimpleCase',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'simpleCase',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.SimpleCaseList');//待处理案件

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
                        name: 'phonePanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '案发地址', dataIndex: 'caseaddress', flex: 1 },
                                    { header: '当事人', dataIndex: 'pf_name', flex: 1 },
                                    { header: '提交时间', dataIndex: 'sitedatetime', flex: 1 },
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
                                    handler: 'onEdit',
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
                        title: '全部案件',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件名称', dataIndex: 'casename', flex: 1 },
                                    { header: '案发地址', dataIndex: 'caseaddress', flex: 1 },
                                    { header: '当事人', dataIndex: 'pf_name', flex: 1 },
                                    { header: '提交时间', dataIndex: 'sitedatetime', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/SimpleCase/ExportExcel',
                                    excelname: '简易案件全部案件统计表',
                                    exceltitle: '简易案件全部案件统计表',
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
                        var contentGrid = newCard.down('grid');
                        //var contentBar = newCard.down('pagingtoolbar')
                        if (newCard.title == "待办案件") {
                            store = Ext.create('TianZun.store.legalcasemanager.SimpleCaseList');
                            contentGrid.setStore(store);
                            //contentBar.setStore(store);
                            store.load();

                            var storefilter = newCard.up('simpleCaseList').down('simpleCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        }else if (newCard.title == "全部案件") {
                            allStore = Ext.create('TianZun.store.legalcasemanager.SimpleCaseList');
                            contentGrid.setStore(allStore);
                            //contentBar.setStore(allStore);
                            allStore.load();

                            var storefilter = newCard.up('simpleCaseList').down('simpleCaseQuery');
                            if (storefilter)
                                storefilter.close();
                        }
                    }
                }
            }
        ]

        this.callParent();
    }
});