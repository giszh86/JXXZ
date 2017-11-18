Ext.define('TianZun.view.lowlying.lowlyingmanagement.LowlyingEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lowlyingEdit',
    title: '临界值编辑',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'table',
                    columns: 2,
                    style: 'background:#e7f1fa',
                },
                fieldDefaults: {
                    labelAlign: 'center',
                    labelWidth: 75
                },
                defaults: {
                    xtype: 'textfield',
                    width: 255,
                },
                items: [
                     {
                         xtype: 'hidden',
                         name: 'id',
                         value: this.record.get("id")
                     },
                    {
                        fieldLabel: '原报警临界值',
                        xtype: 'displayfield',
                        //name: 'companyname',
                        margin: '20',
                        value: this.record.get("bjljz"),
                    },
                {
                    fieldLabel: '现报警临界值',
                    name: 'bjljz',
                    xtype: 'textfield',
                    allowBlank: false,
                    margin: '20',
                    //value: this.record.get('consultuser')
                    //value: '1'
                }, ]
            }], buttons: [{
                text: '提交',
                handler: 'onAddOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }
        ]
        this.callParent();
    }
});