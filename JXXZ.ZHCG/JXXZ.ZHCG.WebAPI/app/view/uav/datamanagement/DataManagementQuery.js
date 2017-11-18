Ext.define('TianZun.view.uav.datamanagement.DataManagementQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.dataManagementQuery',
    title: '搜索',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bordorPadding: 10,
            width: 330,
            overflowY: 'auto',
                layout: {
                    type: 'table',
                    columns: 1,
                },
                fieldDefaults: {
                    labelAlign: "right",
                    labelWidth: 100,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [  
                {
                    fieldLabel: '设备名称',
                    name: 'sbmc',
                    allowBlank: false,
                    margin:'10 0 0 0',
                },
                {
                    fieldLabel: '时间',
                    name: 'scsj',
                    allowBlank: false,
                    margin: '10 0 10 0',
                }],
           
            buttons: [{
                text: '确定',
                handler: 'onQueryOksjgl',
            },
                    {
                        text: '清空',
                        handler: 'onEmptysjgl',
                    },
                    {
                        text: '关闭',
                        handler: 'onclosesjgl',
                    }]
        }]
        this.callParent();
    }
})