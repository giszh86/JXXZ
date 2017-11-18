Ext.define('TianZun.view.monitorproject.MonitorprojectList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.monitorprojectList',
    title: '系统设置 > 监控专题管理',
    layout: 'fit',
    requires: [
       'TianZun.controller.monitorproject.Monitorproject',
    ],
    controller: 'monitorproject',
    initComponent: function ()
    {
        var treestore = Ext.create('TianZun.store.monitorproject.MonitorTreeStore');
        var tablestore = Ext.create('TianZun.store.monitorproject.MonitorListStore');
        Ext.apply(this, {
            layout: 'border',
            border: false,
            items: [
                {
                    xtype: 'treepanel',
                    border: false,
                    width: 270,
                    rootVisible: false,
                    region: 'west',
                    animate: true,
                    padding: '0 2 0 0',
                    store: treestore,
                    style: {
                        background: '#ccc',
                    },
                    listeners: {
                        render: 'onTreeRender',
                        itemclick: 'onTreeItemClick',
                        itemdblclick: 'onTreeItemDbClick',
                    }
                },
                {
                    xtype: 'gridpanel',
                    border: false,
                    region: 'center',
                    viewConfig: {
                        enableTextSelection: true,
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    multiSelect: true,
                    columnLines: true,
                    store: tablestore,
                    columns: [
                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                        { header: '监控名称', dataIndex: 'cameraname', flex: 1 },
                        { header: '监控类型', dataIndex: 'cameratypename', flex: 1 },
                        { header: '监控排序', dataIndex: 'seq', flex: 1 },
                    ],
                    tbar: [
                          {
                              text: '新增',
                              handler: 'onAddItem',
                              action: 'add',
                          },
                        {
                            text: '删除',
                            handler: 'onDeleteItem'
                        },
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: tablestore,
                        displayInfo: true
                    },
                    listeners: {
                        //双击查看
                        itemdblclick: 'onGridItemDbClick',
                    }
                }
            ], tbar: [
                {
                    text: '新增',
                    action: 'add',
                    handler: 'onAddRro',
                },
                {
                    text: '删除',
                    action: 'delete',
                    handler: 'onDeletePro'
                },
            ]
        });
        this.callParent();
    },
});