Ext.define('TianZun.view.administrativeapproval.license.LicenseList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.licenseList',
    title: '行政审批管理 > 行政许可',
    layout: 'fit',

    requires: [
        'TianZun.controller.administrativeapproval.LicenseManager',
    ],
    controller: 'licenseManager',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.administrativeapproval.license.LicenseToApprove');//待审批

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
                        title: '待办许可',
                        xtype: 'panel',
                        name: 'todoApprove',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '编号', dataIndex: 'sph', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'splxname', flex: 1, align: 'center' },
                                    {
                                        header: '创建日期', dataIndex: 'createtime', flex: 1, align: 'center',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    },
                                    { header: '申请人', dataIndex: 'sqr', flex: 1, align: 'center' },
                                    { header: '地点', dataIndex: 'b_address', flex: 1, align: 'center' },
                                    { header: '事项描述', dataIndex: 'sxmx', flex: 1, align: 'center' },
                                    { header: '审批事项', dataIndex: 'xksx', flex: 1, align: 'center' },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '处理',
                                    handler: 'onDeal',
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
                            listeners: {
                                itemclick: 'cliclChangeFlow',
                            }
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '已办许可',
                        xtype: 'panel',
                        name: 'finishApprove',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,

                            columns: [
                                     { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                      { header: '编号', dataIndex: 'sph', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'splxname', flex: 1, align: 'center' },
                                    {
                                        header: '创建日期', dataIndex: 'createtime', flex: 1, align: 'center',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    },
                                    { header: '申请人', dataIndex: 'sqr', flex: 1, align: 'center' },
                                    { header: '地点', dataIndex: 'b_address', flex: 1, align: 'center' },
                                    { header: '事项描述', dataIndex: 'sxmx', flex: 1, align: 'center' },
                                    { header: '审批事项', dataIndex: 'xksx', flex: 1, align: 'center' },
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
                        title: '全部许可',
                        xtype: 'panel',
                        name: 'allApprove',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '编号', dataIndex: 'sph', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'splxname', flex: 1, align: 'center' },
                                    {
                                        header: '创建日期', dataIndex: 'createtime', flex: 1, align: 'center',
                                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    },
                                    { header: '申请人', dataIndex: 'sqr', flex: 1, align: 'center' },
                                    { header: '地点', dataIndex: 'b_address', flex: 1, align: 'center' },
                                    { header: '事项描述', dataIndex: 'sxmx', flex: 1, align: 'center' },
                                    { header: '审批事项', dataIndex: 'xksx', flex: 1, align: 'center' },
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
                            text: "添加行政许可",
                            handler: 'onAdd'
                        })
                        ]);
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待办许可") {
                            store = Ext.create('TianZun.store.administrativeapproval.license.LicenseToApprove');
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newCard.title == "已办许可") {
                            alreadyStore = Ext.create('TianZun.store.administrativeapproval.license.LicenseFinishApprove');
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newCard.title == "全部许可") {
                            allStore = Ext.create('TianZun.store.administrativeapproval.license.LicenseAllApprove');
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