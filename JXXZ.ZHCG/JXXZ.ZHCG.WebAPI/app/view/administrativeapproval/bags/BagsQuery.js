Ext.define('TianZun.view.administrativeapproval.bags.BagsQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bagsQuery',

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
                margin: '10 10 10 0',
                style: 'margin-bottom:15px'
            },
            items: [{
                fieldLabel: '店家名称',
                name: 'storename',
                xtype: 'textfield',
                },{
                    fieldLabel: '店家类型',
                    xtype: 'combo',
                    editable: false,
                    //allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_djlx',
                        }
                    }),
                    name: 'storetype',
                    valueField: 'zd_name',
                    displayField: 'zd_name',
                },
                {
                    fieldLabel: '联系电话',
                    name: 'contactphone',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '地址',
                    name: 'address',
                    xtype: 'textfield',
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
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});