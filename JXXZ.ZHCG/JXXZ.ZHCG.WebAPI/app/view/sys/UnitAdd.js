Ext.define('TianZun.view.sys.UnitAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitAdd',

    title: '添加部门',
    layout: 'fit',

    initComponent: function (){
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
                    name: 'ParentID',
                    value: this.record.get('ID')
                },
                {
                    xtype: 'hidden',
                    name: 'Path',
                    value: this.record.get('Path')
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
                    fieldLabel: '上级部门',
                    disabled: true,
                    value: this.record.get('Name')
                },
                {
                    fieldLabel: '部门类型',
                    xtype: 'combo',
                    name: 'UnitTypeID',
                    store: Ext.create('TianZun.store.sys.UnitTypeStore'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false,
                    allowBlank: false
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