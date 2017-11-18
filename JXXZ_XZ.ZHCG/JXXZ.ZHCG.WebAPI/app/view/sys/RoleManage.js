Ext.define('TianZun.view.sys.RoleManage', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roleManageList',

    requires: [
        'TianZun.controller.sys.RoleManage'
    ],

    controller: 'roleManage',
    title: '角色管理',
    sortable: false,

    initComponent: function () {
        var store = Ext.create('TianZun.store.sys.RoleManageStore');

        Ext.apply(this, {
            viewConfig: {
                enableTextSelection: true
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
            multiSelect: true,
            columnLines: true,
            columns: [
                { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                { header: '角色名称', dataIndex: 'Name', width: 150 },
                { header: '说明', dataIndex: 'Comment', flex: 1 },
                { header: '是否系统内置', dataIndex: 'IsSystemName', width: 105 },
                { header: '排序', dataIndex: 'SeqNo', width: 60 },
                {
                    xtype: 'datecolumn',
                    header: '更新时间',
                    dataIndex: 'UpdatedTime',
                    format: 'Y-m-d H:i',
                    width: 125
                }
            ],
            store: store,
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