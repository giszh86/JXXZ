Ext.define('TianZun.view.reportcenter.reportlist.AddUpReportQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.addUpReportQuery',
    title: '搜索条件',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 550,
            height:150,
            layout: {
                type: 'table',
                columns: 1
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 75
            },
            defaults: {
                xtype: 'textfield',
                width: 280,
            },
            items: [{
                fieldLabel: '报表名称',
                name: 'reportname',
                xtype: 'textfield',
                width:'100%',
            },
            {
                fieldLabel: '年度',
                name: 'reportdate',
                xtype: 'textfield',
            }],
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