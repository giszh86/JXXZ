Ext.define('TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.illegallyBuiltQuery',
    title:'搜索条件',
    layout: 'fit',
    initComponent: function () {
        var me = this;
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
            items: [{
                fieldLabel: '户主',
                name: 'wjholder',
                allowBlank: false,
            },
            {
                fieldLabel: '联系电话',
                name: 'contactphone',
                allowBlank: false,
            },
            {
                fieldLabel: '地址',
                name: 'address',
                allowBlank: false,
            },
            {
                fieldLabel: '处理情况',
                xtype: 'combo',
                name: 'process',
                store: Ext.create('TianZun.store.illegalconstruction.IllegalllybuiltType'),
                valueField: 'ID',
                displayField: 'Name',
                editable: false
            },
            {
                fieldLabel: '状态',
                name: 'isgd',
                xtype: 'combo',
                store: Ext.create('TianZun.store.illegalconstruction.Sfgd'),
                valueField: 'ID',
                displayField: 'Name',
                editable: false,
            }
            ],
            buttons:
                [
                    {
                        text: '确定',
                        handler: 'onQueryOk',
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