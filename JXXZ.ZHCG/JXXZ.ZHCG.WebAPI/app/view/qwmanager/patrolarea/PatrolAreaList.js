Ext.define('TianZun.view.qwmanager.patrolarea.PatrolAreaList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.patrolAreaList',
    title: '人员勤务管理 > 勤务计划管理 > 巡查区域管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.qwmanager.PatrolArea',
    ],
    controller: 'patrolArea',

    border: false,
    bodyBorder: false,
    initComponent: function () {

        this.items = [
            {
                layout:'fit',
                border: false,
                plain: true,
                xtype: 'tabpanel',
                items: [
                    {
                        layout: 'fit',
                        xtype: 'panel',
                        border: false,
                        title:'巡查区域管理',
                        items: {
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '所属科室(中队)', dataIndex: 'sszdname', flex: 1 },
                                    { header: '巡查区域名称', dataIndex: 'name', flex: 1 },
                                    { header: '区域类型', dataIndex: 'areatypestr', flex: 1 },
                                    { header: '区域说明', dataIndex: 'explain', flex: 1 },
                                    { header: '创建时间', dataIndex: 'createtime', flex: 1 },
                            ],
                            store: Ext.create('TianZun.store.qwmanager.PatrolAreaList'),
                            tbar: [
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
                        }
                    }
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
                            margin: "2 2 3 4",
                            text: "新增",
                            handler: 'onAdd'
                        })])
                    }
                }
            }


        ]

        this.callParent();
    }
})