Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectQueryHawkers', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectQueryHawkers',
    title: '小摊小贩搜索',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodorPadding: 10,
            width: 535,
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
                fieldLabel: '姓名',
                xtype: 'textfield',
                name: 'person',
            },
            {
                fieldLabel: '联系电话',
                xtype: 'textfield',
                name: 'contactphone',
            },
            {
                fieldLabel: '类型',
                xtype: 'textfield',
                name: 'hawkertype',
            }],
            buttons: [{
                text: '确定',
                handler: 'onQueryxfOK',
            },
            {
                text: '清空',
                handler: 'onEmpty',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})