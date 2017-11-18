Ext.define('TianZun.view.citizenservice.visitmanager.VisitList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visitList',
    title: '市民服务管理 > 回访管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.citizenservice.VisitManager',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'visitManager',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.citizenservice.VisitList');

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
                        title: '回访管理',
                        name: 'visitTab',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                                    { header: '回访时间', dataIndex: 'visittime', flex: 1 },
                                    { header: '受访人', dataIndex: 'respondents', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contact', flex: 1 },
                                    { header: '回访方式', dataIndex: 'returnvisitstr', flex: 1 },
                                    { header: '满意度', dataIndex: 'satisfactionstr', flex: 1 },
                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '查看',
                                    handler: 'onDetail',
                                    handleMouseEvents: false
                                },
                                {
                                    xtype: 'exportbtn',
                                    text: '导出',
                                    webapi: 'api/CizitenVisit/ExportExcel',
                                    excelname: '回访管理统计表',
                                    exceltitle: '回访管理统计表',
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
                            text: "回访登记",
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