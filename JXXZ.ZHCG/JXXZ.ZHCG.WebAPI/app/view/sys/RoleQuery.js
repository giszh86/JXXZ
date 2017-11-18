Ext.define('TianZun.view.sys.RoleQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.roleQuery',

    title: '查询角色',
    layout: 'fit',

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 95
            },
            defaults: {
                xtype: 'textfield',
                width: 255
            },
            items: [
                {
                    fieldLabel: '角色名称',
                    name: 'Name'
                },
                {
                    fieldLabel: '是否系统内置',
                    xtype: 'combo',
                    name: 'IsSystem',
                    store: Ext.create('Ext.data.Store', {
                        data: [
                            { ID: 1, Name: '是' },
                            { ID: 0, Name: '否' }
                        ]
                    }),
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