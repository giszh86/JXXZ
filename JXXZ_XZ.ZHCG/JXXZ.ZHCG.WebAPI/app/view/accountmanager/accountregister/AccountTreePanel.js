Ext.define('TianZun.view.accountmanager.accountregister.AccountTreePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountTreePanel',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 3,
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 95
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '任务名称',
                    name: 'title',
                    xtype: 'textfield'
                },
                {
                    fieldLabel: '台账任务分类',
                    xtype: 'combo',
                    name: 'taskclassid',
                    store: Ext.create('TianZun.store.accountmanager.accounttask.Type'),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false
                },
                {
                    fieldLabel: '中队',
                    name: 'unitid',
                    xtype: 'combo',
                    store: Ext.create('TianZun.store.accountmanager.accountregister.Unit'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },
                {
                    fieldLabel: '台账上报时间',
                    name: 'stime',
                    xtype: 'datefield',
                    editable: false
                },
                {
                    fieldLabel: '至',
                    margin: '0 0 12 -71',
                    name: 'etime',
                    xtype: 'datefield',
                    editable: false
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onRegisterQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});