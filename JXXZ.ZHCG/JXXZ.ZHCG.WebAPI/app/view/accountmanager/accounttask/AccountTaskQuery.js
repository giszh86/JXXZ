Ext.define('TianZun.view.accountmanager.accounttask.AccountTaskQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountTaskQuery',
    title: '台帐任务查询',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:550,
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 95
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
            },
            items: [{
                fieldLabel: '台账任务名称',
                xtype: 'textfield',
                name: 'taskname',
            },
            {
                fieldLabel: '任务所属年度',
                xtype: 'combo',
                store: Ext.create('TianZun.store.common.YearStore'),
                valueField: 'Value',
                displayField: 'Value',
                editable: false,
                name: "taskyear",
            },
            {
                fieldLabel: '任务期限从',
                xtype: 'datefield',
                editable: false,
                name: 'starttime',
                format:'Y-m-d',
            },
             {
                 fieldLabel: '任务期限到',
                 xtype: 'datefield',
                 editable: false,
                 name: 'endtime',
                 format: 'Y-m-d',
             },
             {
                 fieldLabel: '台账类型',
                 xtype: 'combo',
                 store: Ext.create('TianZun.store.common.TZTypeStore'),
                 valueField: 'ID',
                 displayField: 'Name',
                 editable: false,
                 allowBlank: false,
                 name: 'tz_type',
             },
            ],
            buttons: [{
                text: '确定',
                handler: 'ontaskQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
})