Ext.define('TianZun.view.sys.UnitEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitEdit',

    title: '修改部门',
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
                    name: 'ID'
                },
                {
                    fieldLabel: '部门编号',
                    name: 'Code',
                    allowBlank: false
                },
                {
                    fieldLabel: '部门名称',
                    name: 'Name',
                    allowBlank: false
                },
                {
                    fieldLabel: '部门类型',
                    xtype: 'combo',
                    name: 'UnitTypeID',
                    store: Ext.create('TianZun.store.sys.UnitTypeStore'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false,
                    allowBlank: false,
                    listeners: {
                        render: function (combo) {
                            this.getStore().load();
                        }
                    }
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