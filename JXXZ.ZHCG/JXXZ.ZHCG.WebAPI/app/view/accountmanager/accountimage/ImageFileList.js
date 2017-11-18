Ext.define('TianZun.view.accountmanager.accountimage.ImageFileList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.imageFileList',
    layout: 'fit',

    initComponent: function () {
        var store = Ext.create('TianZun.store.accountmanager.accountimage.AccountImageFile', { proxy: { type: 'ajax', extraParams: { tz_type: this.record.get("srid"), dt: this.record.get('createtime') } } });

        this.items = [
            {
                xtype: 'grid',
                columnLines: true,
                columns: [
                        { header: '序号', xtype: 'rownumberer', width: 60, align: 'center', sortable: false },
                        { header: '月份', dataIndex: 'createtime', flex: 1 },
                        { header: '类型', dataIndex: 'zd_name', flex: 1 },
                        { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                        { header: '文件名称', dataIndex: 'filename', flex: 1 },
                        { header: '文件大小', dataIndex: 'sum_size', flex: 1 }
                ],
                store: store,
                tbar: [
                   {
                       text: '返回',
                       handler: 'onFileCancel',
                       handleMouseEvents: false
                   },
                    //'->',
                    //{
                    //    text: '搜索条件',
                    //    handler: 'onQuery',
                    //    handleMouseEvents: false
                    //}
                ],
                listeners: {
                    itemdblclick: 'onFileItemDbClick',
                }
            }

        ]

        this.callParent();
    }
});