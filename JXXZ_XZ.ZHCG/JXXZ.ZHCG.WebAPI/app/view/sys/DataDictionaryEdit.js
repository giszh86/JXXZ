Ext.define('TianZun.view.sys.DataDictionaryEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.dataDictionaryEdit',

    title: '修改字典',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
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
                width: 400
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'zd_type',
                    value: this.record.get('zd_type')
                },
                {
                    xtype: 'hidden',
                    name: 'zd_id',
                    value: this.record.get('zd_id')
                },
               {
                   fieldLabel: '字典名称',
                   name: 'zd_name',
                   allowBlank: false,
                   value: this.record.get('zd_name')
               },
                 {
                     fieldLabel: '字典排序',
                     name: 'zd_seq',
                     allowBlank: false,
                     value: this.record.get('zd_seq')
                 },
            ],
            buttons: [{
                text: '确定',
                handler: 'onEditOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});