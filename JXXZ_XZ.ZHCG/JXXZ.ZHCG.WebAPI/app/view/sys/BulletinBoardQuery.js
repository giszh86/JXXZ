Ext.define('TianZun.view.sys.BulletinBoardQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bulletinBoardQuery',

    title: '搜索条件',
    layout: 'fit',

    initComponent: function () {
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
                labelWidth: 45
            },
            defaults: {
                xtype: 'textfield',
                width: 255,
                margin:'10 0 10 0',
            },
            items: [
                {
                    fieldLabel: '标题',
                    name: 'title',
                    colspan: 2,
                    width: 510,
                },
                {
                    fieldLabel: '时间',
                    name: 'createtimefrom',
                    format: 'Y-m-d',
                    xtype: 'datefield',
                    editable: false,
                },
                {
                    fieldLabel: '至',
                    name: 'createtimeto',
                    format: 'Y-m-d',
                    xtype: 'datefield',
                    editable: false,
                },
            ],
            buttons: [{
                text: '确定',
                handler: 'onQueryOK'
            }, {
                text: '清空',
                handler: 'onEmpty'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});