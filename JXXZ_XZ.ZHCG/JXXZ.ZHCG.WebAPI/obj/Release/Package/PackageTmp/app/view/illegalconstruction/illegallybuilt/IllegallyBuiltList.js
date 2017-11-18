Ext.define('TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.illegallyBuiltList',
    title: '违章建筑管理 > 违建管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.illegalconstruction.illegallybuilt',
    ],
    controller: 'illegallybuilt',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.illegalconstruction.Illegallybuilt');

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
                        title: '违建管理',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '户主', dataIndex: 'wjholder', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                                    { header: '违建类型', dataIndex: 'zd_name', flex: 1 },
                                    { header: '发现时间', dataIndex: 'foundtime', flex: 1 },
                                    { header: '地址', dataIndex: 'address', flex: 1 },
                                    { header: '处理情况', dataIndex: 'process', flex: 1 },
                                    { header: '状态', dataIndex: 'isgd', flex: 1 }
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onlookwj',
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
                                }
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
                        bar.insert(9, [{
                            xtype: 'component',
                            flex: 1
                        }, Ext.create('Ext.button.Button', {
                            width: 100,
                            margin: "2 2 3 4",
                            text: "新增违建",
                            handler: 'onAdd'
                        })
                        ])
                    },
                }
            }]

        this.callParent();
    }
});