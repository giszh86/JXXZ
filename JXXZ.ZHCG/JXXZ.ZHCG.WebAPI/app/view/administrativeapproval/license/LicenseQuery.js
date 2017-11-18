Ext.define('TianZun.view.administrativeapproval.license.LicenseQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.licenseQuery',

    title: '查询条件',
    layout: 'fit',

    initComponent: function () {

        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
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
                margin:'10 10 10 0',
                style: 'margin-bottom:15px'
            },
            items: [
                {
                    fieldLabel: '编号',
                    name: 'sph',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '申请人',
                    name: 'sqr',
                    xtype: 'textfield',
                },
                {
                    fieldLabel: '审批类型',
                    xtype: 'combo',
                    editable: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_splx',
                        }
                    }),
                    name: 'splx',
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                },
                {
                    fieldLabel: '审批事项',
                    name: 'xksx',
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