Ext.define('TianZun.view.sys.PermissionList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.permissionList',

    requires: [
        'TianZun.controller.sys.Permission'
    ],

    controller: 'permission',
    title: '权限管理',
    layout: 'border',
    initComponent: function () {
        var store = Ext.create('TianZun.store.sys.PermissionPageStore');

        this.items = [
                {
                    xtype: 'treepanel',
                    border: false,
                    width: 250,
                    region: 'west',
                    padding: '0 2 0 0',
                    style: {
                        background: '#cccccc'
                    },
                    displayField: 'Name',
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
		                { header: '权限编号', dataIndex: 'Code', flex: 1 },
		                { header: '权限名称', dataIndex: 'Name', flex: 1 },
		                { header: '权限说明', dataIndex: 'Comment', flex: 1 },
		                { header: '排序', dataIndex: 'SeqNo', flex: 1 },
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
        ];

        this.tbar = [
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

        this.callParent();
    }
});