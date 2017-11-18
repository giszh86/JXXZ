Ext.define('TianZun.view.accountmanager.accountimage.AccountImageList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountImageList',
    title: '台帐统计管理>台帐照片管理',
    layout: 'fit',
    requires: [
      'TianZun.controller.accountmanager.AccountImage',
    ],
    controller: 'accountImage',

    initComponent: function () {
        var store = Ext.create('TianZun.store.accountmanager.accountimage.AccountImageList');

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
                        title: '台帐文件夹',
                        name: 'visitTab',
                        items: [{
                            xtype: 'grid',
                            columnLines: true,
                            columns: [
                                    { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                                    { header: '台帐分类', dataIndex: 'zd_name', flex: 1 },
                                    { header: '台帐总数', dataIndex: 'count', flex: 1 },
                                    { header: '文件大小', dataIndex: 'sum_size', flex: 1 }
                            ],
                            store: store,
                            //tbar: [
                            //    '->',
                            //    {
                            //        text: '搜索条件',
                            //        handler: 'onQuery',
                            //        handleMouseEvents: false
                            //    }
                            //],
                            listeners: {
                                itemdblclick: 'onGridItemDbClick',
                            }
                        },

                        ]
                    }
                ]
            }
        ]

        this.callParent();
    }
});