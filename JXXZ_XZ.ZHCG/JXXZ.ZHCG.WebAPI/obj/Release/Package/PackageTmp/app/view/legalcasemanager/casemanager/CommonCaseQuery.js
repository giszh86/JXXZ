Ext.define('TianZun.view.legalcasemanager.casemanager.CommonCaseQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.commonCaseQuery',

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
                    fieldLabel: '案件名称',
                    name: 'casename',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '类型',
                    xtype: 'combo',
                    name: 'casetypeid',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: { extraParams: { zd_type: 'type_case' } }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false,
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
                {
                    fieldLabel: '环节',
                    name: 'wfdid',
                    xtype: 'combo',
                    colspan: 2,
                    width: 510,
                    store: Ext.create('TianZun.store.legalcasemanager.CaseFlow'),
                    valueField: 'id',
                    displayFiled: 'name',
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