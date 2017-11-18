Ext.define('TianZun.view.sys.QueryUser', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.userQuery',

    title: '查询用户',
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
                    fieldLabel: '用户编号',
                    name: 'Code'
                },
                {
                    fieldLabel: '用户名称',
                    name: 'DisplayName'
                },
                {
                    fieldLabel: '用户类型',
                    xtype: 'combo',
                    name: 'UserTypeID',
                    store: Ext.create('TianZun.store.sys.UserTypeStore'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                }
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '重置',
                handler: 'onHide'
            }]
        }];

        this.callParent();
    }
});