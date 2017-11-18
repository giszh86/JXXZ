Ext.define('TianZun.view.sys.DataDictionary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dataDictionary',
    title: '系统设置 > 数据字典',
    layout: 'fit',

    requires: [
        'TianZun.controller.sys.DataDictionary'
    ],
    controller: 'dataDictionary',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.sys.DataDictionaryListStore');
        var treestore = Ext.create('TianZun.store.sys.DataDictionaryTree');
        Ext.apply(this, {
            layout: 'border',
            items: [
                 {
                     xtype: 'treepanel',
                     rootVisible: false,
                     width: 300,
                     height: '95%',
                     border: false,
                     region: 'west',
                     overflowX: 'auto',
                     overflowY: 'auto',
                     store: treestore,
                     listeners: {
                         render: 'onTreeRender',
                         itemclick: 'onTreeItemClick',
                     }
                 },
                {
                    xtype: 'gridpanel',
                    border: false,
                    region: 'center',
                    viewConfig: {
                        enableTextSelection: true
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    multiSelect: true,
                    columnLines: true,
                    columns: [
                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                        { header: '字典信息名称', dataIndex: 'zd_name', flex: 1 },
                        { header: '字典信息标识', dataIndex: 'zd_type', flex: 1 },
                        { header: '字典类型', dataIndex: 'zd_typename', flex: 1 },
                        { header: '状态', dataIndex: 'status', flex: 1 },
                    ],
                    store: store,

                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: store,
                        displayInfo: true
                    },
                    listeners: {
                        itemdblclick: 'onGridItemDbClick',
                    }
                },
            ],
            tbar: [
                //{
                //    text: '查询',
                //    handler: 'onQuery'
                //},
                {
                    text: '添加',
                    action: 'add',
                    handler: 'onAdd'
                },
                {
                    text: '修改',
                    action: 'edit',
                    handler: 'onEdit'
                },
                {
                    text: '删除',
                    action: 'delete',
                    handler: 'onDelete'
                }
            ]
        })


        this.callParent();
    }
});