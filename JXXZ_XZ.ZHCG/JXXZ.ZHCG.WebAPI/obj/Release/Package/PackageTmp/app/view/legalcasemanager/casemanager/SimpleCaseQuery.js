Ext.define('TianZun.view.legalcasemanager.casemanager.SimpleCaseQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.simpleCaseQuery',

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
                    fieldLabel: '案由',
                    margin: '0 20 0 0',
                    name: 'casereason',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '当事人',
                    name: 'pf_name',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '案发地址',
                    name: 'caseaddress',
                    xtype: 'textfield',
                    colspan: 2,
                },
                {
                    fieldLabel: '开始时间',
                    name: 'stime',
                    xtype: 'datefield',
                },
                {
                    fieldLabel: '结束时间',
                    name: 'etime',
                    xtype: 'datefield',
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