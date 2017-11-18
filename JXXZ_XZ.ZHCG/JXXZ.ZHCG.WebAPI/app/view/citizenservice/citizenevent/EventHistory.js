Ext.define('TianZun.view.citizenservice.citizenevent.EventHistory', {
    extend: 'Ext.Window',
    alias: 'widget.eventHistory',
    modal:true,
    title: '历史举报问题',
    layout: 'fit',

    initComponent: function () {
        var store = Ext.create('TianZun.store.citizenservice.AllEvent');
        var filters = [];
        if ($.trim(this.contactphone) != null && $.trim(this.contactphone) != "") {
            filters.push({ property: "contactphone", value: $.trim(this.contactphone) });
        }
        store.clearFilter(true);
        store.filter(filters);

        this.items = [{
            layout: 'fit',
            border: false,
            items: [{
                xtype: 'grid',
                columnLines: true,
                width: 800,
                height: 250,
                columns: [
                        { header: '事件标题', dataIndex: 'eventtitle', flex: 1 },
                        { header: '联系人', dataIndex: 'complainant', flex: 1 },
                        { header: '联系电话', dataIndex: 'contactphone', flex: 1 },
                        { header: '发现时间', dataIndex: 'foundtime', flex: 1 },
                ],
                store: store,
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true
                },
                listeners: {
                    itemdblclick: 'onLook'
                }
            }],
            buttons: [
                {
                    text: '查看',
                    handler: 'onLook',
                },
                {
                    text: '返回',
                    handler: 'onClose'
                }
            ]
        }]

        this.callParent();
    }
});