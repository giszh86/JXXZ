Ext.define('TianZun.view.sys.RoleAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.roleAdd',

    title: '添加角色',
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
                    allowBlank: false
                },
                {
                    fieldLabel: '角色说明',
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