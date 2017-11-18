Ext.define('TianZun.view.reportcenter.template.TemplateQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.templateQuery',
    title: '搜索',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 550,
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
            },],
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
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})