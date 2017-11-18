Ext.define('TianZun.view.monitorproject.MonitorItemQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.monitorItemQuery',
    title: '搜索',
    layout: 'fit',
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width:300,
            layout: {
                type: 'table',
                columns: 1,
            },
            fieldDefaults: {
                labelAlign: "right",
                labelWidth: 65,
            },
            defaults: {
                xtype:'textfield',
                width: 255
            },
            items: [
                {
                    fieldLabel: '监控名称',
                    name: 'unitname',
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryItemOK'
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