Ext.define('TianZun.view.uav.basicinformation.InformationQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.informationQuery',
    title:'搜索条件',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [
            {
            xtype: 'form',
            bordor: false,
            bordorPadding: 10,
            width: 290,
            overflowY: 'auto',
            layout: {
                 type: 'table',
                 columns: 1,
                },
            fieldDefaults: {
                 labelAlign: "right",
                 labelWidth: 75,
                },
            defaults: {
                 xtype: 'textfield',
                 width: 255
                },
            items: [
                {
                    fieldLabel: '编号',
                    name: 'ovanum',
                    margin: '10 0 0 0',
                },
                {
                    fieldLabel: '设备名称',
                    name: 'ovaname',
                    margin: '10 0 10 0',
                }
            ],
            buttons: [{
                        text: '确定',
                        handler: 'onQueryOK',
                    },
                    {
                        text: '清空',
                        handler: 'onEmpty',
                    },
                    {
                        text: '关闭',
                        handler: 'onClose',
                    }]
        }]
        this.callParent();
    }
})