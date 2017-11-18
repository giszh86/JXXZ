Ext.define('TianZun.view.monitorproject.MonitorProEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorProEdit',

    title: '修改监控专题',
    layout: 'fit',

    initComponent: function () {
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
                labelWidth: 85
            },
            defaults: {
                xtype: 'textfield',
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'unitid',
                    value: this.record.get('unitid')
                },
                {
                    fieldLabel: '专题分组名称',
                    name: 'unitname',
                    allowBlank: false,
                    value: this.record.get('unitname'),
                },
                {
                    fieldLabel: '上级部门',
                    name: 'parentname',
                    allowBlank: false,
                    readOnly: true,
                    value: this.record.get('parentname')
                },
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditProOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});