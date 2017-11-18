Ext.define('TianZun.view.sys.UnitManage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.unitManage',

    requires: [
        'TianZun.controller.sys.Unit'
    ],

    controller: 'unit',
    title: '部门管理',
    sortable: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.sys.UnitPageStore');

        Ext.apply(this, {
            layout: 'border',
            items: [
                {
                    xtype: 'treepanel',
                    border: false,
                    width: 250,
                    region: 'west',
                    padding: '0 2 0 0',
                    style: {
                        background: '#cccccc'
                    },
                    listeners: {
                        render: 'onTreeRender',
                        itemclick: 'onTreeItemClick'
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
		                { header: '部门名称', dataIndex: 'Name', flex: 1 },
		                { header: '编号', dataIndex: 'Code', flex: 1 },
		                { header: '部门类型', dataIndex: 'UnitTypeName', flex: 1 },
                        {
                            xtype: 'datecolumn',
                            header: '更新时间',
                            dataIndex: 'UpdatedTime',
                            format: 'Y-m-d H:i',
                            width: 125,
                            flex:1
                        }
                      
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
                {
                    text: '查询',
                    handler: 'onQuery'
                },
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
        });

        this.callParent();
    }
});