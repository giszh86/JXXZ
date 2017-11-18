Ext.define('TianZun.view.qwmanager.policecenter.PoliceCenterList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.policeCenterList',
    title: '人员勤务管理 > 报警中心',
    layout: 'fit',
    requires: [
           'TianZun.controller.qwmanager.PoliceCenter',
           'TianZun.ux.ExportExcelButton'
    ],
    controller: 'policeCenter',
    
    initComponent: function () {
        var store = Ext.create('TianZun.store.alarmdetail.AlarmDetailStore');
       
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
                        title: '人员报警',
                        xtype: 'panel',
                        name: 'personPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '所属科室（中队）', dataIndex: 'unitname', flex: 1 },
                                    { header: '队员名称', dataIndex: 'username', flex: 1 },
                                    { header: '开始时间', dataIndex: 'alarmstrattime', flex: 1 },
                                    { header: '结束时间', dataIndex: 'alarmendtime', flex: 1 },
                                    { header: '报警类型', dataIndex: 'alarmtypename', flex: 1 },
                                    { header: '报警状态', dataIndex: 'statename', flex: 1 },
                                    { header: '申述状态', dataIndex: 'isallegename', flex: 1 },
                                    { header: '审核状态', dataIndex: 'appealsname', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '报警生效',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '报警作废',
                                    handler: 'onDispatch',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '申述审核',
                                    handler:'sssh',
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/AlarmDetail/ExportExcel',
                                    excelname: '人员报警列表',
                                    exceltitle: '人员报警列表',
                                    extrapra: {},
                                },
                                '->',
                                {
                                    text: '查询条件',
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
                        title: '车辆报警',
                        xtype: 'panel',
                        hidden:true,
                        name: 'historyPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '所属科室（中队）', dataIndex: 'car_num', flex: 1 },
                                    { header: '车牌号', dataIndex: 'car_typename', flex: 1 },
                                    { header: '开始时间', dataIndex: 'wt_time', flex: 1 },
                                    { header: '结束时间', dataIndex: 'wt_address', flex: 1 },
                                    { header: '报警类型', dataIndex: 'cfjdsh', flex: 1 },
                                    { header: '报警状态', dataIndex: '', flex: 1 },
                                    { header: '申述状态', dataIndex: 'cfjdsh', flex: 1 },
                            ],

                            tbar: [
                                 {
                                     text: '生效',
                                     handler: 'onDetail',
                                     handleMouseEvents: false
                                 },
                                {
                                    text: '作废',
                                    handler: 'onDispatch',
                                    handleMouseEvents: false
                                },                                 
                                {
                                    text: '申述审核',
                                    handler: 'sssh',
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/Violated/ExportExcel',
                                    excelname: '车辆报警列表',
                                    exceltitle: '车辆报警列表',
                                    extrapra: {},
                                },
                                '->',
                                {
                                    text: '查询条件',
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
                        }],
                    }
                ],
                listeners: {
                    'tabchange': function (tabPanel, newpolice, oldpolice, eOpts) {
                        var contentGrid = newpolice.down('grid');//grid
                        var contentBar = newpolice.down('pagingtoolbar')//bbar
                        if (newpolice.title == "人员报警") {
                            store = Ext.create('TianZun.store.alarmdetail.AlarmDetailStore');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newpolice.title == "车辆报警") {
                            alreadyStore = Ext.create('TianZun.store.legalcasemanager.IllegalCaseHandle');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } 
                    }
                }
            }
        ]

        this.callParent();
    }
})