Ext.define('TianZun.view.sys.PermissionEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.permissionEdit',

    title: '修改权限',
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
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'Code',
                    value: this.record.get('Code')
                },
                {
                    fieldLabel: '权限编号',
                    value: this.record.get('Code'),
                    disabled: true
                },
                {
                    fieldLabel: '权限名称',
                    name: 'Name',
                    allowBlank: false
                },
                {
                    fieldLabel: '上级权限',
                    disabled: true,
                    value: this.record.get('Name')
                },
                {
                    fieldLabel: '排序',
                    xtype: 'numberfield',
                    name: 'SeqNo',
                    minValue: 1
                },
                {
                    fieldLabel: '权限说明',
                    xtype: 'textareafield',
                    name: 'Comment',
                    colspan: 2,
                    width: 510,
                    height: 75
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