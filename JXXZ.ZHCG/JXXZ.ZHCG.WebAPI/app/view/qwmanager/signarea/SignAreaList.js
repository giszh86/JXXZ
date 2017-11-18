Ext.define('TianZun.view.qwmanager.signarea.SignAreaList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.signAreaList',
    title: '人员勤务管理 > 勤务计划管理 > 签到区域管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.qwmanager.SignArea',
    ],
    controller: 'signArea',

    border: false,
    bodyBorder: false,
    initComponent: function () {

        this.items = [
            {
                layout: 'fit',
                border: false,
                xtype: 'tabpanel',
                plain:true,
                items: [
                    {
                        layout: 'fit',
                        xtype: 'panel',
                        title:'签到区域管理',
                        border: false,
                        items: {
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '所属科室(中队)', dataIndex: 'sszdname', flex: 1 },
                                    { header: '签到区域名称', dataIndex: 'name', flex: 1 },
                                    { header: '区域说明', dataIndex: 'explain', flex: 1 },
                                    { header: '签到开始时间', dataIndex: 'start_stime', flex: 1 },
                                    { header: '签到结束时间', dataIndex: 'start_etime', flex: 1 },
                                    { header: '签退开始时间', dataIndex: 'end_stime', flex: 1 },
                                    { header: '签退结束时间', dataIndex: 'end_etime', flex: 1 },
                            ],
                            store: Ext.create('TianZun.store.qwmanager.SignAreaList'),
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
                            margin: '2 2 3 4',
                            text: '新增',
                            handler: 'onAdd',
                        })])
                    }
                }
            }


        ]

        this.callParent();
    }
})