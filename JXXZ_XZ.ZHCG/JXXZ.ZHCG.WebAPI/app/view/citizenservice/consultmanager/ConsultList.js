Ext.define('TianZun.view.citizenservice.consultmanager.ConsultList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.consultList',
    title: '市民服务管理 > 咨询管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.citizenservice.ConsultManager',
        'TianZun.ux.ExportExcelButton'
    ],
    controller: 'consultManager',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.citizenservice.ConsultList');

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
                        title: '咨询管理',
                        name: 'consultTab',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '事件标题', dataIndex: 'title', flex: 1 },
                                    { header: '事件大类', dataIndex: 'bigtypename', flex: 1 },
                                    { header: '受理时间', dataIndex: 'acceptancetime', flex: 1 },
                                    { header: '处理人', dataIndex: 'createusername', flex: 1 },
                                    { header: '咨询人', dataIndex: 'consultuser', flex: 1 },
                                    { header: '联系电话', dataIndex: 'contact', flex: 1 },                                    
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
                                    webapi: 'api/CitizenConsul/ExportExcel',
                                    excelname: '咨询管理统计表',
                                    exceltitle: '咨询管理统计表',
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
                            text: "咨询登记",
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