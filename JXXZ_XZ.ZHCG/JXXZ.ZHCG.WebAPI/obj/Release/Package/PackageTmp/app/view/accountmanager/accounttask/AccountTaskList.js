Ext.define('TianZun.view.accountmanager.accounttask.AccountTaskList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountTaskList',
    title: '台帐统计管理>台帐任务管理',
    layout: 'fit',
    requires: [
      'TianZun.controller.accountmanager.AccountTask',
    ],
    controller: 'accountTask',

    initComponent: function () {
        var store = Ext.create('TianZun.store.accountmanager.accounttask.AccountTaskList');

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
                        title: '任务列表',
                        name: 'visitTab',

                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            name:'gridtop',
                            columns: [
                                    { header: '任务名称', dataIndex: 'taskname', flex: 1 },
                                    { header: '所属年度', dataIndex: 'taskyear', flex: 1 },
                                    { header: '台帐类型', dataIndex: 'tz_type', flex: 1 },
                                    { header: '任务期限', dataIndex: 'rwqx', flex: 1 },
                                    { header: '所属部门', dataIndex: 'ssbm', flex: 1 },
                                    { header: '添加人', dataIndex: 'createusername', flex: 1 },
                                    { header: '添加时间', dataIndex: 'createtime', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onLook',
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
                            }
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
                            text: "添加任务",
                            handler: 'onAdd'
                        })
                        ]);

                    },
                }
            }
        ]

        this.callParent();
    }
});