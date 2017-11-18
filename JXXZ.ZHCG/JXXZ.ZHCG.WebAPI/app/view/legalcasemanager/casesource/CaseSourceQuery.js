Ext.define('TianZun.view.legalcasemanager.casesource.CaseSourceQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.caseSourceQuery',

    title: '查询条件',
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
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '案件来源',
                    xtype: 'combo',
                    name: 'sourceid',
                    store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                    allowBlank: false,
                },
                {
                    fieldLabel: '联系人',
                    name: 'contact',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '联系方式',
                    name: 'contactphone',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '案发地址',
                    name: 'wfxwfsdz',
                    xtype: 'textfield',
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