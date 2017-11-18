Ext.define('TianZun.view.conservation.conservationtask.TaskList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.taskList',
    title: '养护作业监管 > 养护任务管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.conservation.conservationtask',
    ],
    controller: 'conservationtask',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.conservation.YHTaskUpcomingStore');
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
                        title: '待办养护任务',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件编号', dataIndex: 'yhtaskid', flex: 1 },
                                    { header: '养护对象', dataIndex: 'yhdxname', flex: 1 },
                                     { header: '问题大类', dataIndex: 'wtdlname', flex: 1 },
                                    { header: '问题小类', dataIndex: 'wtxlname', flex: 1 },
                                    { header: '当前步骤', dataIndex: 'wfdname', flex: 1 },
                                    { header: '问题地址', dataIndex: 'wtaddress', flex: 1 },
                                    { header: '养护公司', dataIndex: 'companyname', flex: 1 },
                                    { header: '养护合同', dataIndex: 'contractname', flex: 1 },
                                    { header: '发现时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '问题来源', dataIndex: 'wtlyname', flex: 1 },
                                    { header: '工作量估算（人天）', dataIndex: 'workload', flex: 1 },
                                    { header: '维修经费', dataIndex: 'outlay', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '处理',
                                    handler: 'onDealWith',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onLook',
                                    handleMouseEvents: false
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQueryyh',
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
                        title: '已办养护任务',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件编号', dataIndex: 'yhtaskid', flex: 1 },
                                    { header: '养护对象', dataIndex: 'yhdxname', flex: 1 },
                                     { header: '问题大类', dataIndex: 'wtdlname', flex: 1 },
                                    { header: '问题小类', dataIndex: 'wtxlname', flex: 1 },
                                    { header: '当前步骤', dataIndex: 'wfdname', flex: 1 },
                                    { header: '问题地址', dataIndex: 'wtaddress', flex: 1 },
                                    { header: '养护公司', dataIndex: 'companyname', flex: 1 },
                                    { header: '养护合同', dataIndex: 'contractname', flex: 1 },
                                    { header: '发现时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '问题来源', dataIndex: 'wtlyname', flex: 1 },
                                    { header: '工作量估算（人天）', dataIndex: 'workload', flex: 1 },
                                    { header: '维修经费', dataIndex: 'outlay', flex: 1 },
                            ],

                            tbar: [
                                 {
                                     text: '查看',
                                     handler: 'onLook',
                                     handleMouseEvents: false
                                 },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQueryyh',
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
                        title: '养护任务中心',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '案件编号', dataIndex: 'yhtaskid', flex: 1 },
                                    { header: '养护对象', dataIndex: 'yhdxname', flex: 1 },
                                     { header: '问题大类', dataIndex: 'wtdlname', flex: 1 },
                                    { header: '问题小类', dataIndex: 'wtxlname', flex: 1 },
                                    { header: '当前步骤', dataIndex: 'wfdname', flex: 1 },
                                    { header: '问题地址', dataIndex: 'wtaddress', flex: 1 },
                                    { header: '养护公司', dataIndex: 'companyname', flex: 1 },
                                    { header: '养护合同', dataIndex: 'contractname', flex: 1 },
                                    { header: '发现时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '问题来源', dataIndex: 'wtlyname', flex: 1 },
                                    { header: '工作量估算（人天）', dataIndex: 'workload', flex: 1 },
                                    { header: '维修经费', dataIndex: 'outlay', flex: 1 },
                            ],

                            tbar: [
                                 {
                                     text: '查看',
                                     handler: 'onLook',
                                     handleMouseEvents: false
                                 },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQueryyh',
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
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [{
                            xtype: 'component',
                            flex: 1
                        },
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: '2 2 3 4',
                            text: '巡查上报',
                            handler: 'onAddyh',
                        })
                        ])

                    },
                    'tabchange': function (tabPanel, newTask, oldTask, eOpts) {
                        var contentGrid = newTask.down('grid');//grid
                        var contentBar = newTask.down('pagingtoolbar')//bbar
                        if (newTask.title == "待办养护任务") {
                            store = Ext.create('TianZun.store.conservation.YHTaskUpcomingStore');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newTask.title == "已办养护任务") {
                            alreadyStore = Ext.create('TianZun.store.conservation.YHTaskEndStore');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newTask.title == "养护任务中心") {
                            allStore = Ext.create('TianZun.store.conservation.YHTaskAllStore');
                            contentGrid.setStore(allStore);
                            contentBar.setStore(allStore);
                            allStore.load();
                        }
                    }
                }
            },

        ]

        this.callParent();
    }
});