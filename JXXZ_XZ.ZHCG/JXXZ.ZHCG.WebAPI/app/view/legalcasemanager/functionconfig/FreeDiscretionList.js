Ext.define('TianZun.view.legalcasemanager.functionconfig.FreeDiscretionList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.freeDiscretionList',
    title: '执法办案管理>配置管理>自由裁量',
    layout: 'fit',
    requires: [
      'TianZun.controller.legalcasemanager.FreeDiscretion',
    ],
    controller: 'freeDiscretion',
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.FreeDiscretionList');

        this.items = [
                    {
                       layout: 'fit',
                        border: false,
                        xtype: 'panel',
                        items: [{
                            xtype: 'grid',
                            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                            multiSelect: true,
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '权利编号', dataIndex: 'code', flex: 1 },
                                    { header: '权力事项名称', dataIndex: 'powername', flex: 1 },
                                    { header: '法律法规', dataIndex: 'flfg', flex: 1 },
                                    { header: '裁量依据', dataIndex: 'clyj', flex: 1 },
                                    { header: '违法情形', dataIndex: 'wfqx', flex: 1 },
                                    { header: '处罚结果', dataIndex: 'cf', flex: 1 },
                            ],
                            store: store,
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
                    }
                ],
            }]

        this.callParent();
    }
})