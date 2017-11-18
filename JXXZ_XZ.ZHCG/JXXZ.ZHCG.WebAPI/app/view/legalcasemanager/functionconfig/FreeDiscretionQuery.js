Ext.define('TianZun.view.legalcasemanager.functionconfig.FreeDiscretionQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.freeDiscretionQuery',
    title: '查询条件',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 400,
            height: 150,
            margin:'10 0 0 0',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 70,
            },
            defaults: {
                xtype: 'textfield',
                width: 280,
            },
            items: [
                {
                    fieldLabel: '权利事项',
                    name: 'powername',
                    width:'95%',
                },
            ], buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }
        ]

        this.callParent();

    }
});