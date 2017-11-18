Ext.define('TianZun.view.conservation.conservationlog.LogQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.logQuery',
    title: '条件搜索',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 550,
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: 'right',
                margin:'0 20 10 0',
                labelWidth: 90,
            },
            defaults: {
                xtype: 'textfield',
                width: '100%',
            }, items: [{
                fieldLabel: '养护合同名称',
                xtype:'combo',
                name: 'yhcontract',
                colspan: 2,
                store: Ext.create('TianZun.store.conservation.HTSourceList'),
                displayField: 'Name',
                valueField: 'ID',
                editable: false,
            }, {
                fieldLabel: '填报时间从',
                name: 'createtimefrom',
                xtype: 'datefield',
                format:'Y-m-d',
                editable: false,
            },
            {
                fieldLabel: '填报时间到',
                name: 'createtimeto',
                xtype: 'datefield',
                format: 'Y-m-d',
                editable: false,
            }, ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
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