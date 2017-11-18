Ext.define('TianZun.view.sys.UnitQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitQuery',

    title: '查询部门',
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
                    fieldLabel: '部门编号',
                    name: 'Code'
                },
                {
                    fieldLabel: '部门名称',
                    name: 'Name'
                },
                {
                    fieldLabel: '部门类型',
                    xtype: 'combo',
                    name: 'UnitTypeID',
                    store: Ext.create('TianZun.store.sys.UnitTypeStore'),
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