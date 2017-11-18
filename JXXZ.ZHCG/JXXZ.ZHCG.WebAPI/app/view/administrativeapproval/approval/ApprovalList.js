Ext.define('TianZun.view.administrativeapproval.approval.ApprovalList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.approvalList',
    title: '行政审批管理 > 行政审批',
    layout: 'fit',

    requires: [
        'TianZun.controller.administrativeapproval.ApprovalManager',
    ],
    controller: 'approvalManager',

    border: false,
    bodyBorder: false,
    initComponent: function ()
    {
        var isxzk = false;
        if ($.cookie("ROLE_IDS").indexOf('14') >= 0)
        {
            isxzk = true;
        }
        var me = this;
        var date = Ext.util.Format.date(new Date(), 'Y-m-d');
        var store = Ext.create('TianZun.store.administrativeapproval.Approval.ApprovalListStore');
        store.getProxy().url = "api/Approval/GetToBeApprovalList?userid=" + $.cookie("USER_ID") + "&status=0&isxzk=" + isxzk;
        this.items = [
            {
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                name:'tabpanel',
                items: [
                    {
                        layout: 'fit',
                        border: false,
                        title: '待审批',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '审批号', dataIndex: 'row_id', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'processversioninstancename', flex: 1, align: 'center' },
                                    { header: '审批日期', dataIndex: 'banjiedate', flex: 1, align: 'center' },
                                    { header: '申请单位名称', dataIndex: 'applyername', flex: 1, align: 'center' },
                                    { header: '项目名称', dataIndex: 'projectname', flex: 1, align: 'center' },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '处理',
                                    handler: 'onDeal',
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
                        title: '归档',
                        xtype: 'panel',
                        name: 'archivepanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '审批号', dataIndex: 'row_id', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'processversioninstancename', flex: 1, align: 'center' },
                                    { header: '审批日期', dataIndex: 'banjiedate', flex: 1, align: 'center' },
                                    { header: '申请单位名称', dataIndex: 'applyername', flex: 1, align: 'center' },
                                    { header: '项目名称', dataIndex: 'projectname', flex: 1, align: 'center' },
                            ],
                            tbar: [
                                {
                                    text: '处理',
                                    handler: 'onDeal',
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
                        }],
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '已审批',
                        xtype: 'panel',
                        name: 'finishPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '审批号', dataIndex: 'row_id', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'processversioninstancename', flex: 1, align: 'center' },
                                    { header: '审批日期', dataIndex: 'banjiedate', flex: 1, align: 'center' },
                                    { header: '申请单位名称', dataIndex: 'applyername', flex: 1, align: 'center' },
                                    { header: '项目名称', dataIndex: 'projectname', flex: 1, align: 'center' },
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
                        title: '全部审批',
                        xtype: 'panel',
                        name: 'allPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            columnLines: true,
                            columns: [
                                     {
                                         header: '', dataIndex: 'isovertime', width: 40,
                                     },
                                    { header: '审批号', dataIndex: 'row_id', flex: 1, align: 'center' },
                                    { header: '审批类型', dataIndex: 'processversioninstancename', flex: 1, align: 'center' },
                                    { header: '审批日期', dataIndex: 'banjiedate', flex: 1, align: 'center' },
                                    { header: '申请单位名称', dataIndex: 'applyername', flex: 1, align: 'center' },
                                    { header: '项目名称', dataIndex: 'projectname', flex: 1, align: 'center' },
                                    { header: '地图定位', dataIndex: 'location', flex: 1, align: 'center' },
                                    //{ header: '当前处理人', dataIndex: 'flowusername', flex: 1, align: 'center' },
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
                    'beforerender': function (obj) {
                        if ($.cookie('ROLE_IDS').indexOf(14) < 0) {
                            obj.tabBar.items.items[1].hide();
                            //me.down("panel[name=archivepanel]").setHidden (true);
                        }
                    },
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        var contentGrid = newCard.down('grid');//grid
                        var contentBar = newCard.down('pagingtoolbar')//bbar
                        if (newCard.title == "待审批") {
                            store = Ext.create('TianZun.store.administrativeapproval.Approval.ApprovalListStore');
                            store.getProxy().url = "api/Approval/GetToBeApprovalList?userid=" + $.cookie("USER_ID") + "&status=0&isxzk=" + isxzk;
                            contentGrid.setStore(store);
                            contentBar.setStore(store);
                            store.load();
                        } else if (newCard.title == "归档") {
                            archiveStore = Ext.create('TianZun.store.administrativeapproval.Approval.ApprovalListStore');
                            archiveStore.getProxy().url = "api/Approval/GetToBeApprovalList?userid=" + $.cookie("USER_ID") + "&status=3&isxzk=" + isxzk;
                            contentGrid.setStore(archiveStore);
                            contentBar.setStore(archiveStore);
                            archiveStore.load();
                        } else if (newCard.title == "已审批") {
                            alreadyStore = Ext.create('TianZun.store.administrativeapproval.Approval.ApprovalListStore');
                            alreadyStore.getProxy().url = "api/Approval/GetToBeApprovalList?userid=" + $.cookie("USER_ID") + "&status=1&isxzk=" + isxzk;
                            contentGrid.setStore(alreadyStore);
                            contentBar.setStore(alreadyStore);
                            alreadyStore.load();
                        } else if (newCard.title == "全部审批") {
                            allStore = Ext.create('TianZun.store.administrativeapproval.Approval.ApprovalAllListStore');
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