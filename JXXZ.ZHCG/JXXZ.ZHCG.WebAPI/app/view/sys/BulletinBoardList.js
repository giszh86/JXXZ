Ext.define('TianZun.view.sys.BulletinBoardList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bulletinBoardList',
    title: '系统设置 > 公告管理',
    layout: 'fit',

    requires: [
        'TianZun.controller.sys.BulletinBoard',
    ],
    controller: 'bulletinBoard',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var store = Ext.create('TianZun.store.BulletinBoard.BulletinBoardStore');

        this.items = [
            {
                layout: 'fit',
                border: false,
                xtype: 'panel',
                items: [{
                    xtype: 'grid',
                    store: store,
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "SINGLE" }),
                    multiSelect: true,
                    columnLines: true,
                    columns: [
                            { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                            { header: '标题', dataIndex: 'title', flex: 1 },
                            { header: '作者', dataIndex: 'author', flex: 1 },
                            { header: '创建日期', dataIndex: 'createtime', flex: 1 },
                    ],
                    tbar: [
                        {
                            text: '新增',
                            handler: 'onAdd',
                            handleMouseEvents: false,
                        },
                        {
                            text: '编辑',
                            handler: 'onEdit',
                            handleMouseEvents: false
                        },
                        {
                            text: '删除',
                            handler: 'onDelete',
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
                    listeners: {
                        itemclick: 'cliclChangeFlow',
                    }
                }]
            }, ]
        this.callParent();
    }
});