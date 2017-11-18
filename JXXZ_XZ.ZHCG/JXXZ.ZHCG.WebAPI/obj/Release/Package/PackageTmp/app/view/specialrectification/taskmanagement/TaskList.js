Ext.define('TianZun.view.specialrectification.taskmanagement.TaskList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.taskList',
    title: '专项整治系统 > 任务管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.specialrectification.Taskmanagement',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'taskmanagement',

    border: false,
    bodyBorder: false,
    initComponent: function () {

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        border: false,
                        title: '待办任务',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '任务标题', dataIndex: 'title', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfdname', flex: 1 },
                                    { header: '任务类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '紧急程度', dataIndex: 'levelstr', flex: 1 },
                                    { header: '任务区域', dataIndex: 'region', flex: 1 },
                                    { header: '任务时间', dataIndex: 'setime', flex: 1 },
                                    { header: '发起人', dataIndex: 'username', flex: 1 },
                            ],
                            store: Ext.create('TianZun.store.lawenforcementsupervision.TodoSpecialTaskList', {
                                proxy: { extraParams: {userid:$.cookie('USER_ID')}}
                            }),
                            tbar: [
                                {
                                    text: '处理',
                                    handler:'onHandle',
                                },
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/SpecialTask/ExportExcel',
                                    excelname: '待办任务统计表',
                                    exceltitle: '待办任务统计表',
                                    extrapra: { userid: $.cookie('USER_ID'), status: 1 },
                                    formsubmit: true
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
                        },
                        {
                            xtype: 'fieldset',
                            collapsible: false,
                            margin:'20 0 10 300',
                            border: 0,
                            name: 'todoFieldset',
                            layout: {
                                type: 'table',
                                columns: 7,
                            },
                            items: [
                            {
                                xtype: 'panel',
                                width: 80,
                                height: 120,
                                bordor: 0,
                                items: [{
                                    xtype: 'image',
                                    src: '../Images/images/灰阶发起任务.png',
                                    name: 'flow1',
                                    width: 80,
                                    height:80
                                },
                                {
                                    xtype: 'label',
                                    text: '发起任务',
                                    width: 80,
                                    style: 'text-align:center;display: inline-block;',
                                }]
                            },
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶箭头.png',
                                margin: '0 10 0 10',
                                name: 'jt1',
                            },
                            {
                                xtype: 'panel',
                                width: 80,
                                height: 120,
                                bordor: 0,
                                items: [{
                                    xtype: 'image',
                                    src: '../Images/images/灰阶启动任务.png',
                                    name: 'flow2',
                                    width: 80,
                                    height: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '启动任务',
                                    width: 80,
                                    style: 'text-align:center;display: inline-block;',
                                }]
                            },
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶箭头.png',
                                margin: '0 10 0 10',
                                name: 'jt2',
                            },
                            {
                                xtype: 'panel',
                                width: 80,
                                height: 120,
                                bordor: 0,
                                items: [{
                                    xtype: 'image',
                                    src: '../Images/images/灰阶过程上报.png',
                                    name: 'flow3',
                                    width: 80,
                                    height: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '过程上报',
                                    width: 80,
                                    style: 'text-align:center;display: inline-block;',
                                }]
                            },
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶箭头.png',
                                margin: '0 10 0 10',
                                name: 'jt3',
                            },
                            {
                                xtype: 'panel',
                                width: 80,
                                height: 120,
                                bordor: 0,
                                items: [{
                                    xtype: 'image',
                                    src: '../Images/images/灰阶任务总结.png',
                                    name: 'flow4',
                                    width: 80,
                                    height: 80
                                },
                                {
                                    xtype: 'label',
                                    text: '任务总结',
                                    width: 80,
                                    style: 'text-align:center;display: inline-block;',
                                }]
                            }
                            ]
                        }]
                    },
                    {
                        border: false,
                        title: '已办任务',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '任务标题', dataIndex: 'title', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfdname', flex: 1 },
                                    { header: '任务类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '紧急程度', dataIndex: 'levelstr', flex: 1 },
                                    { header: '任务区域', dataIndex: 'region', flex: 1 },
                                    { header: '任务时间', dataIndex: 'setime', flex: 1 },
                                    { header: '发起人', dataIndex: 'username', flex: 1 },
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
                                    webapi: 'api/SpecialTask/ExportExcel',
                                    excelname: '已办任务统计表',
                                    exceltitle: '已办任务统计表',
                                    extrapra: { userid: $.cookie('USER_ID'), status: 2 },
                                    formsubmit: true
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
                            },
                        },
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                margin: '20 0 10 300',
                                border: 0,
                                name: 'todoFieldset',
                                layout: {
                                    type: 'table',
                                    columns: 7,
                                },
                                items: [
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 120,
                                    bordor: 0,
                                    items: [{
                                        xtype: 'image',
                                        src: '../Images/images/灰阶发起任务.png',
                                        name: 'flow1',
                                        width: 80,
                                        height: 80
                                    },
                                    {
                                        xtype: 'label',
                                        text: '发起任务',
                                        width: 80,
                                        style: 'text-align:center;display: inline-block;',
                                    }]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt1',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 120,
                                    bordor: 0,
                                    items: [{
                                        xtype: 'image',
                                        src: '../Images/images/灰阶启动任务.png',
                                        name: 'flow2',
                                        width: 80,
                                        height: 80
                                    },
                                    {
                                        xtype: 'label',
                                        text: '启动任务',
                                        width: 80,
                                        style: 'text-align:center;display: inline-block;',
                                    }]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt2',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 120,
                                    bordor: 0,
                                    items: [{
                                        xtype: 'image',
                                        src: '../Images/images/灰阶过程上报.png',
                                        name: 'flow3',
                                        width: 80,
                                        height: 80
                                    },
                                    {
                                        xtype: 'label',
                                        text: '过程上报',
                                        width: 80,
                                        style: 'text-align:center;display: inline-block;',
                                    }]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt3',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 120,
                                    bordor: 0,
                                    items: [{
                                        xtype: 'image',
                                        src: '../Images/images/灰阶任务总结.png',
                                        name: 'flow4',
                                        width: 80,
                                        height: 80
                                    },
                                    {
                                        xtype: 'label',
                                        text: '任务总结',
                                        width: 80,
                                        style: 'text-align:center;display: inline-block;',
                                    }]
                                }
                                ]
                            }
                        ]
                    },
                    {
                        border: false,
                        title: '全部任务',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '任务标题', dataIndex: 'title', flex: 1 },
                                    { header: '当前环节', dataIndex: 'wfdname', flex: 1 },
                                    { header: '任务类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '紧急程度', dataIndex: 'levelstr', flex: 1 },
                                    { header: '任务区域', dataIndex: 'region', flex: 1 },
                                    { header: '任务时间', dataIndex: 'setime', flex: 1 },
                                    { header: '发起人', dataIndex: 'username', flex: 1 },
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
                                    webapi: 'api/SpecialTask/ExportExcel',
                                    excelname: '全部任务统计表',
                                    exceltitle: '全部任务统计表',
                                    extrapra: { userid: $.cookie('USER_ID'), status: 3 },
                                    formsubmit:true
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
                        },
                         {
                             xtype: 'fieldset',
                             collapsible: false,
                             margin: '20 0 10 300',
                             border: 0,
                             name: 'todoFieldset',
                             layout: {
                                 type: 'table',
                                 columns: 7,
                             },
                             items: [
                             {
                                 xtype: 'panel',
                                 width: 80,
                                 height: 120,
                                 bordor: 0,
                                 items: [{
                                     xtype: 'image',
                                     src: '../Images/images/灰阶发起任务.png',
                                     name: 'flow1',
                                     width: 80,
                                     height: 80
                                 },
                                 {
                                     xtype: 'label',
                                     text: '发起任务',
                                     width: 80,
                                     style: 'text-align:center;display: inline-block;',
                                 }]
                             },
                             {
                                 xtype: 'image',
                                 src: '../Images/images/灰阶箭头.png',
                                 margin: '0 10 0 10',
                                 name: 'jt1',
                             },
                             {
                                 xtype: 'panel',
                                 width: 80,
                                 height: 120,
                                 bordor: 0,
                                 items: [{
                                     xtype: 'image',
                                     src: '../Images/images/灰阶启动任务.png',
                                     name: 'flow2',
                                     width: 80,
                                     height: 80
                                 },
                                 {
                                     xtype: 'label',
                                     text: '启动任务',
                                     width: 80,
                                     style: 'text-align:center;display: inline-block;',
                                 }]
                             },
                             {
                                 xtype: 'image',
                                 src: '../Images/images/灰阶箭头.png',
                                 margin: '0 10 0 10',
                                 name: 'jt2',
                             },
                             {
                                 xtype: 'panel',
                                 width: 80,
                                 height: 120,
                                 bordor: 0,
                                 items: [{
                                     xtype: 'image',
                                     src: '../Images/images/灰阶过程上报.png',
                                     name: 'flow3',
                                     width: 80,
                                     height: 80
                                 },
                                 {
                                     xtype: 'label',
                                     text: '过程上报',
                                     width: 80,
                                     style: 'text-align:center;display: inline-block;',
                                 }]
                             },
                             {
                                 xtype: 'image',
                                 src: '../Images/images/灰阶箭头.png',
                                 margin: '0 10 0 10',
                                 name: 'jt3',
                             },
                             {
                                 xtype: 'panel',
                                 width: 80,
                                 height: 120,
                                 bordor: 0,
                                 items: [{
                                     xtype: 'image',
                                     src: '../Images/images/灰阶任务总结.png',
                                     name: 'flow4',
                                     width: 80,
                                     height: 80
                                 },
                                 {
                                     xtype: 'label',
                                     text: '任务总结',
                                     width: 80,
                                     style: 'text-align:center;display: inline-block;',
                                 }]
                             }
                             ]
                         }]
                    },
                ],
                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [{
                            xtype: 'component',
                            flex:1
                        },
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: '2 2 3 4',
                            text: '发起任务',
                            handler: 'onAdd',
                        })])
                    },
                    'tabchange': function (tabPanel, newRegulation, oldRegulation, eOpts) {
                        var contentGrid = newRegulation.down('grid');//grid
                        var contentBar = newRegulation.down('pagingtoolbar')//bbar
                        if (newRegulation.title == "待办任务") {
                            store = Ext.create('TianZun.store.lawenforcementsupervision.TodoSpecialTaskList', {
                                proxy: { extraParams: { userid: $.cookie('USER_ID') } }
                            });
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newRegulation.title == "已办任务") {
                            alreadyStore = Ext.create('TianZun.store.lawenforcementsupervision.FinishSpecialTask', {
                                proxy: { extraParams: { userid: $.cookie('USER_ID') } }
                            });
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newRegulation.title == "全部任务") {
                            allStore = Ext.create('TianZun.store.lawenforcementsupervision.AllSpecialTask');
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