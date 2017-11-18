Ext.define('TianZun.view.citizenservice.citizenevent.EventList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventList',
    title: '市民服务管理 > 市民事件',
    layout: 'fit',

    requires: [
        'TianZun.controller.citizenservice.CitizenEvent',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'citizenEvent',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.citizenservice.TodoEvent');//待处理事件

        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [
                    {
                        //layout: 'fit',
                        border: false,
                        title: '待办事件',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                    { header: '', dataIndex: 'isovertime', width: 40 },
                                    { header: '事件编号', dataIndex: 'eventid', flex: 1 },
                                    { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                                    { header: '环节名称', dataIndex: 'wfdname', flex: 1 },
                                    { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '上报时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '创建人', dataIndex: 'username', flex: 1 },
                                    { header: '上报来源', dataIndex: 'workflowtypestr', flex: 1 },
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
                                    hidden: ValueInArr($.cookie('ROLE_IDS').split(','), 2, 1) ? false : true,
                                    handleMouseEvents: false
                                },
                                {
                                    text: '处理',
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
                        },
                        {
                            xtype: 'fieldset',
                            collapsible: false,
                            margin: '20 0 10 300',
                            border: 0,
                            name: 'todoFieldset',
                            layout: {
                                type: 'table',
                                columns: 9,
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件上报.png',
                                            name: 'flow1',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件上报',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件派遣.png',
                                            name: 'flow2',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件派遣',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件处理.png',
                                            name: 'flow3',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件处理',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件审核.png',
                                            name: 'flow4',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件审核',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt4',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件归档.png',
                                            name: 'flow5',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件归档',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                            ]
                        }]
                    },
                    {
                        border: false,
                        title: '已办事件',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                    { header: '事件编号', dataIndex: 'eventid', flex: 1 },
                                    { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                                    { header: '环节名称', dataIndex: 'wfdname', flex: 1 },
                                    { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '上报时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '下一步处理人', dataIndex: 'nextusername', flex: 1 },
                                    { header: '上报来源', dataIndex: 'workflowtypestr', flex: 1 },
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
                        },
                        {
                            xtype: 'fieldset',
                            collapsible: false,
                            margin: '20 0 10 300',
                            border: 0,
                            name: 'todoFieldset',
                            layout: {
                                type: 'table',
                                columns: 9,
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件上报.png',
                                            name: 'flow1',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件上报',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件派遣.png',
                                            name: 'flow2',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件派遣',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件处理.png',
                                            name: 'flow3',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件处理',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件审核.png',
                                            name: 'flow4',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件审核',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt4',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件归档.png',
                                            name: 'flow5',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件归档',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                            ]
                        }]
                    },
                    {
                        border: false,
                        title: '事件中心',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            height: window.innerHeight * 0.6,
                            columns: [
                                 { header: '', dataIndex: 'isovertime', width: 40 },
                                    { header: '事件编号', dataIndex: 'eventid', flex: 1 },
                                    { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                                    { header: '环节名称', dataIndex: 'wfdname', flex: 1 },
                                    { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                                    { header: '上报时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '下一步处理人', dataIndex: 'dbnextusername', flex: 1 },
                                    { header: '上报来源', dataIndex: 'workflowtypestr', flex: 1 },
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
                                    webapi: 'api/CitizenEvent/ExportExcel',
                                    excelname: '市民事件全部统计表',
                                    exceltitle: '市民事件全部统计表',
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
                                columns: 9,
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件上报.png',
                                            name: 'flow1',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件上报',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件派遣.png',
                                            name: 'flow2',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件派遣',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件处理.png',
                                            name: 'flow3',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件处理',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
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
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件审核.png',
                                            name: 'flow4',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件审核',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'image',
                                    src: '../Images/images/灰阶箭头.png',
                                    margin: '0 10 0 10',
                                    name: 'jt4',
                                },
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    height: 100,
                                    border: 0,
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: '../Images/images/灰阶事件归档.png',
                                            name: 'flow5',
                                            width: 80,
                                            height: 80,
                                        },
                                        {
                                            xtype: 'label',
                                            text: '事件归档',
                                            width: 80,
                                            style: 'text-align:center;display: inline-block;',
                                        }
                                    ]
                                },
                            ]
                        }]
                    },
                     {
                         border: false,
                         title: '延期事件',
                         xtype: 'panel',
                         name: 'allPanelReview',
                         items: [{
                             xtype: 'grid',
                             selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                             columnLines: true,
                             height: window.innerHeight * 0.6,
                             columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                     { header: '事件编号', dataIndex: 'eventid', flex: 1 },
                                     { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                                     { header: '环节名称', dataIndex: 'wfdname', flex: 1 },
                                     { header: '事件来源', dataIndex: 'sourcename', flex: 1 },
                                     { header: '上报时间', dataIndex: 'foundtime', flex: 1 },
                                     { header: '创建人', dataIndex: 'username', flex: 1 },
                             ],
                             tbar: [
                                 //{
                                 //    text: '查看',
                                 //    handler: 'onDetail',
                                 //    handleMouseEvents: false
                                 //},
                                 {
                                     text: '审核',
                                     handler: 'onReview',
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
                         },
                         {
                             xtype: 'fieldset',
                             collapsible: false,
                             margin: '20 0 10 300',
                             border: 0,
                             name: 'todoFieldset',
                             layout: {
                                 type: 'table',
                                 columns: 9,
                             },
                             items: [
                                 {
                                     xtype: 'panel',
                                     width: 80,
                                     height: 100,
                                     border: 0,
                                     items: [
                                         {
                                             xtype: 'image',
                                             src: '../Images/images/灰阶事件上报.png',
                                             name: 'flow1',
                                             width: 80,
                                             height: 80,
                                         },
                                         {
                                             xtype: 'label',
                                             text: '事件上报',
                                             width: 80,
                                             style: 'text-align:center;display: inline-block;',
                                         }
                                     ]
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
                                     height: 100,
                                     border: 0,
                                     items: [
                                         {
                                             xtype: 'image',
                                             src: '../Images/images/灰阶事件派遣.png',
                                             name: 'flow2',
                                             width: 80,
                                             height: 80,
                                         },
                                         {
                                             xtype: 'label',
                                             text: '事件派遣',
                                             width: 80,
                                             style: 'text-align:center;display: inline-block;',
                                         }
                                     ]
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
                                     height: 100,
                                     border: 0,
                                     items: [
                                         {
                                             xtype: 'image',
                                             src: '../Images/images/灰阶事件处理.png',
                                             name: 'flow3',
                                             width: 80,
                                             height: 80,
                                         },
                                         {
                                             xtype: 'label',
                                             text: '事件处理',
                                             width: 80,
                                             style: 'text-align:center;display: inline-block;',
                                         }
                                     ]
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
                                     height: 100,
                                     border: 0,
                                     items: [
                                         {
                                             xtype: 'image',
                                             src: '../Images/images/灰阶事件审核.png',
                                             name: 'flow4',
                                             width: 80,
                                             height: 80,
                                         },
                                         {
                                             xtype: 'label',
                                             text: '事件审核',
                                             width: 80,
                                             style: 'text-align:center;display: inline-block;',
                                         }
                                     ]
                                 },
                                 {
                                     xtype: 'image',
                                     src: '../Images/images/灰阶箭头.png',
                                     margin: '0 10 0 10',
                                     name: 'jt4',
                                 },
                                 {
                                     xtype: 'panel',
                                     width: 80,
                                     height: 100,
                                     border: 0,
                                     items: [
                                         {
                                             xtype: 'image',
                                             src: '../Images/images/灰阶事件归档.png',
                                             name: 'flow5',
                                             width: 80,
                                             height: 80,
                                         },
                                         {
                                             xtype: 'label',
                                             text: '事件归档',
                                             width: 80,
                                             style: 'text-align:center;display: inline-block;',
                                         }
                                     ]
                                 },
                             ]
                         }]
                     },
                ],

                listeners: {
                    afterrender: function (panel) {
                        var bar = panel.tabBar;
                        bar.insert(9, [
                        {
                            xtype: 'component', //撑开
                            flex: 1
                        },
                        Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: "2 2 3 4",
                            text: "事件上报",
                            hidden: ValueInArr($.cookie('ROLE_IDS').split(','), 2, 1) ? false : true,//指挥中心上报
                            handler: 'onAdd'
                        })
                        ]);
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待办事件") {
                            store = Ext.create('TianZun.store.citizenservice.TodoEvent');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newCard.title == "已办事件") {
                            alreadyStore = Ext.create('TianZun.store.citizenservice.FinishEvent');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newCard.title == "事件中心") {
                            allStore = Ext.create('TianZun.store.citizenservice.AllEvent');
                            contentGrid.setStore(allStore);
                            contentBar.setStore(allStore);
                            allStore.load();
                        } else if (newCard.title == "延期事件") {
                            allStore = Ext.create('TianZun.store.citizenservice.ReviewStore');
                            contentGrid.setStore(allStore);
                            contentBar.setStore(allStore);
                            allStore.load();
                        }
                    }
                }
            }
        ]

        this.callParent();
    },
    listeners : { render: 'onRender' }
});