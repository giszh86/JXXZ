Ext.define('TianZun.view.citizenservice.citizenevent.EventQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventQuery',

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
                    fieldLabel: '事件编号',
                    name: 'eventid'
                },
                {
                    fieldLabel: '事件标题',
                    name: 'eventtitle'
                },                
                {
                    fieldLabel: '事件来源',
                    xtype: 'combo',
                    name: 'sourceid',
                    store: Ext.create('TianZun.store.citizenservice.EventSource'),
                    valueField: 'ID',
                    displayField: 'Name',
                    editable: false
                },
                //{
                //    fieldLabel: '处理人',
                //    name: 'username'
                //},
                {
                    fieldLabel: '环节名称',
                    xtype: 'combo',
                    name: 'wfdname',
                    valueField: 'ID',
                    displayField:'Name',
                    store: Ext.create('TianZun.store.citizenservice.EventFlowDetail', { proxy: { extraParams: { wfsid: '2017021409560001' } }}),
                    valueField: 'id',
                    displayField: 'name',
                    editable: false
                },
                {
                    fieldLabel: '开始时间',
                    xtype:'datefield',
                    name: 'stime',
                    format:'Y-m-d'
                },
                {
                    fieldLabel: '结束时间',
                    xtype: 'datefield',
                    name: 'etime',
                    format: 'Y-m-d'
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