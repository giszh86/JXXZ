Ext.define('TianZun.view.sys.PermissionAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.permissionAdd',

    title: '添加权限',
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
                    name: 'ParentCode',
                    value: this.record.get('Code')
                },
                {
                    xtype: 'hidden',
                    name: 'Path',
                    value: this.record.get('Path')
                },
                {
                    fieldLabel: '权限编号',
                    name: 'Code',
                    allowBlank: false
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
                handler: 'onAddOK'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});