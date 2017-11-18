Ext.define('TianZun.view.sys.RoleEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.roleEdit',

    title: '修改角色',
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
                width: 255
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'ID'
                },
                {
                    fieldLabel: '角色名称',
                    name: 'Name',
                    allowBlank: false
                },
                {
                    fieldLabel: '排序',
                    xtype: 'numberfield',
                    name: 'SeqNo',
                    minValue: 1
                },
                {
                    fieldLabel: '所属权限',
                    xtype: 'treepicker',
                    name: 'PermissionCodeArr',
                    store: Ext.create('TianZun.store.sys.PermissionTreeStore'),
                    displayField: 'Name',
                    valueField: 'Code',
                    colspan: 2,
                    width: 510,
                    editable: false,
                    allowBlank: false,
                    value: me.permissionCodeArr
                },
                {
                    fieldLabel: '角色说明',
                    xtype: 'textareafield',
                    name: 'Comment',
                    colspan: 2,
                    width: 510,
                    height: 75
                },
                {
                    fieldLabel: '创建时间',
                    value: Ext.Date.format(this.record.get('CreatedTime'), 'Y-m-d H:i'),
                    disabled: true
                },
                {
                    fieldLabel: '更新时间',
                    value: Ext.Date.format(this.record.get('UpdatedTime'), 'Y-m-d H:i'),
                    disabled: true
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onEditOK',
                disabled: function () {
                    if (me.record.get('IsSystem') == 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }()
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
        this.child('form').loadRecord(this.record);
    }
});