Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectQueryStore', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectQueryStore',
    title: '沿街店家搜索',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 550,
            margin: '10 0 0 0',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
            },
            items: [{
                fieldLabel: '店家名称',
                xtype: 'textfield',
                name: 'shopname',
            },
            {
                fieldLabel: '负责人',
                xtype: 'textfield',
                name: 'person',
            },
            {
                fieldLabel: '地址',
                xtype: 'textfield',
                name: 'address',
            }],
            buttons: [{
                text: '确定',
                handler: 'onQuerydjOK',
            },
            {
                text: '清空',
                handler: 'onEmpty',
            },
            {
                text: '关闭',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})