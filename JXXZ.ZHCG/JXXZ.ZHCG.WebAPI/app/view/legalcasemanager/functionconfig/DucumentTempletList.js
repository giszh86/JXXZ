Ext.define('TianZun.view.legalcasemanager.functionconfig.DucumentTempletList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ducumentTempletList',
    title: '执法办案管理 > 配置管理 > 文书模版管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.DucumentTemplet',
    ],
    controller: 'ducumentTemplet',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.legalcasemanager.DucumentTemplet');

        this.items = [
            {
                layout: 'fit',
                border: false,
                name: 'doctemp',
                items: [{
                    xtype: 'grid',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    multiSelect: true,
                    columnLines: true,

                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '文书名称', dataIndex: 'ddname', flex: 1 },
                            { header: '上传时间', dataIndex: 'createtime', flex: 1 },
                            { header: '阶段名称', dataIndex: 'phasename', flex: 1 },
                    ],
                    store: store,
                    tbar: [
                        {
                            text: '新增',
                            handler: 'onAdd',
                            handleMouseEvents: false
                        },
                        {
                            text: '下载',
                            handler: 'onDownload',
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
                    }
                ]
            }
        ]

        this.callParent();
    }
});