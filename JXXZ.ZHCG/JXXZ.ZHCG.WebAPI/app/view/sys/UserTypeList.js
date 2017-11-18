Ext.define('TianZun.view.sys.UserTypeList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userTypeList',

    requires: [
        'TianZun.controller.sys.UserType'
    ],

    controller: 'userType',
    title: '用户类型管理',
    sortable: false,

    initComponent: function () {
        var store = Ext.create('TianZun.store.sys.UserTypePageStore');

        Ext.apply(this, {
            viewConfig: {
                enableTextSelection: true
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
            multiSelect: true,
            columnLines: true,
            columns: [
                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                { header: '类型名称', dataIndex: 'Name', flex: 1 },
                { header: '排序', dataIndex: 'SeqNo', width: 100 }
            ],
            store: store,
            tbar: [
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
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true
            }
        });

        this.callParent();
    },
    listeners: {
        render: 'onRender',
        itemdblclick: 'onItemDbClick',
    }
});