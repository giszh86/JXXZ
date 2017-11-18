Ext.define('TianZun.view.legalcasemanager.casemanager.IllegalCaseList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.illegalCaseList',
    title: '执法办案管理 > 案件管理 > 违停案件',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.IllegalCase',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'illegalCase',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.IllegalCaseUpcoming');//待处理违停

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
                        title: '待办违停',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '车牌号码', dataIndex: 'car_num', flex: 1 },
                                    { header: '车辆种类', dataIndex: 'car_typename', flex: 1 },
                                    { header: '违法时间', dataIndex: 'wt_time', flex: 1 },
                                    { header: '违法地点', dataIndex: 'wt_address', flex: 1 },
                                    { header: '处罚决定书号', dataIndex: 'cfjdsh', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '审核',
                                    handler: 'onDispatch',
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
                        title: '已办违停',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '车牌号码', dataIndex: 'car_num', flex: 1 },
                                    { header: '车辆种类', dataIndex: 'car_typename', flex: 1 },
                                    { header: '违法时间', dataIndex: 'wt_time', flex: 1 },
                                    { header: '违法地点', dataIndex: 'wt_address', flex: 1 },
                                    { header: '处罚决定书号', dataIndex: 'cfjdsh', flex: 1 },
                            ],

                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                }, {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/Violated/ExportExcel',
                                    excelname: '已办违停统计表',
                                    exceltitle: '已办违停统计表',
                                    extrapra: { status: 0 }
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
                        title: '全部违停',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '车牌号码', dataIndex: 'car_num', flex: 1 },
                                    { header: '车辆种类', dataIndex: 'car_typename', flex: 1 },
                                    { header: '违法时间', dataIndex: 'wt_time', flex: 1 },
                                    { header: '违法地点', dataIndex: 'wt_address', flex: 1 },
                                    { header: '处罚决定书号', dataIndex: 'cfjdsh', flex: 1 },
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
                                    webapi: 'api/Violated/ExportExcel',
                                    excelname: '全部违停统计表',
                                    exceltitle: '全部违停统计表',
                                    extrapra: { status: 1 }
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
                    //afterrender: function (panel) {
                    //    var bar = panel.tabBar;
                       
                    //},
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待办违停") {
                            store = Ext.create('TianZun.store.legalcasemanager.IllegalCaseUpcoming');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newCard.title == "已办违停") {
                            alreadyStore = Ext.create('TianZun.store.legalcasemanager.IllegalCaseHandle');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newCard.title == "全部违停") {
                            allStore = Ext.create('TianZun.store.legalcasemanager.IllegalCaseAll');
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