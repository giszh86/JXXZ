Ext.define('TianZun.view.administrativeapproval.bags.BagsList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bagsList',
    title: '行政审批管理 > 门前三包',
    layout: 'fit',

    requires: [
        'TianZun.controller.administrativeapproval.BagsManager',
    ],
    controller: 'bagsManager',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.administrativeapproval.bags.InFrontOfThree');
        this.items = [
            {
                xtype:'tabpanel',
                border: false,
                plain: true,
                bordor: false,
                bodyBordor:false,
                items: [
                    {  
                        layout: 'fit',
                        xtype: 'panel',
                        border: false,
                        title: '门前三包',
                        name:'mqsb',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '店家名称', dataIndex: 'storename', flex: 1, align: 'center' },
                                    {
                                        header: '店家类型',
                                        dataIndex: 'storetypename',
                                        flex: 1, align: 'center',
                                    },
                                    { header: '负责人', dataIndex: 'person', flex: 1, align: 'center' },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1, align: 'center' },
                                    { header: '地点', dataIndex: 'address', flex: 1, align: 'center' },
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
                                {
                                    text: '删除',
                                    handler: 'onDelete',
                                    handleMouseEvents: false
                                },
                                '->',
                                {
                                    text: '搜索条件',
                                    handler: 'onQuery',
                                    handleMouseEvents: false
                                },
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }]
                    }
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
                            text: "新增",
                            handler: 'onAdd'
                        })
                        ]);
                    },
                }
            }


        ]

        this.callParent();
    }
})