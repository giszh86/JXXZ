Ext.define('TianZun.view.reportcenter.template.TemplateList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateList',
    title: '报表中心 > 报表模板',
    layout: 'fit',

    requires: [
        'TianZun.controller.reportcenter.Template',
    ],
    controller: 'template',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.reportcenter.TemplateListStore');

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
                        title: '报表模板',
                        xtype: 'panel',
                        name: 'todoPanel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '模板名称', dataIndex: 'reportname', flex: 1 },
                                    { header: '报表类型', dataIndex: 'reporttypename', width: 120 },
                                    { header: '是否启用', dataIndex: 'isactived', width: 120 },
                                    { header: '填表时间', dataIndex: 'reporttime', flex: 1 },
                                    { header: '备注', dataIndex: 'remark', flex: 1 },

                            ],
                            store: store,
                            tbar: [
                                {
                                    text: '启用',
                                    handler: 'onQiyong',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '编辑',
                                    handler: 'onEdit',
                                    handleMouseEvents: false
                                },
                                {
                                    text: '查看',
                                    handler: 'onLook',
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
                    },
                ],
               
            }
        ]

        this.callParent();
    }
});