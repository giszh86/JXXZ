Ext.define('TianZun.view.sys.UnitTypeEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitTypeEdit',

    title: '修改部门类型',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'ID'
                },
                {
                    fieldLabel: '类型名称',
                    name: 'Name',
                    allowBlank: false
                },
                {
                    fieldLabel: '排序',
                    xtype: 'numberfield',
                    name: 'SeqNo',
                    minValue: 1
                }
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
        this.child('form').loadRecord(this.record);
    }
});