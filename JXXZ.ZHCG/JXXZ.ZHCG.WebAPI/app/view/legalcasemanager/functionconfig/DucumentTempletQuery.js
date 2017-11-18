Ext.define('TianZun.view.legalcasemanager.functionconfig.DucumentTempletQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.ducumentTempletQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width:300,
            layout: {
                type: 'table',
                columns: 1,
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
                    fieldLabel: '文书名称',
                    name: 'ddname',
                    margin:'10 0 10 0',
                    xtype: 'textfield'
                },                
                {
                    fieldLabel: '开始时间',
                    name: 'stime',
                    xtype: 'datefield'
                },
                {
                    fieldLabel: '结束时间',
                    name: 'etime',
                    xtype: 'datefield'
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