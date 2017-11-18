Ext.define('TianZun.view.sys.DataDictionaryAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.dataDictionaryAdd',

    title: '添加字典',
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
                    name: 'remark',
                    value: this.record.get('ddid')
                },
                {
                    xtype: 'hidden',
                    name: 'parentid',
                    value: this.record.get('zdid')
                },
                {
                    xtype: 'hidden',
                    name: 'zd_type',
                    id: 'zd_type',
                    value: this.a
                },
                {
                    xtype: 'hidden',
                    name: 'zd_id',
                    id: 'zd_id',
                    value: this.c
                },
                {
                   fieldLabel: '上级部门',
                   disabled: true,
                   //name: 'parentname',
                   //id: 'parentname',
                   value: this.b
               },
               {
                   fieldLabel: '字典名称',
                   name: 'zd_name',
                   allowBlank: false,
               },
                 {
                     fieldLabel: '字典排序',
                     name: 'zd_seq',
                     allowBlank: false,
                     xtype: 'numberfield',
                     minValue: 1,
                     value: 1
                 },
            ],
            buttons: [{
                text: '确定',
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});