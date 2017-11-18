Ext.define('TianZun.view.legalcasemanager.functionconfig.DocumentConfigQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.documentConfigQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:300,
            layout: {
                type: 'table',
                columns: 1,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '文书名称',
                    name: 'ddname',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '环节名称',
                    name: 'wfdid',
                    xtype: 'combo',
                    store: Ext.create('TianZun.store.legalcasemanager.CaseFlow'),
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onHide'
            }]
        }];

        this.callParent();
    }
});