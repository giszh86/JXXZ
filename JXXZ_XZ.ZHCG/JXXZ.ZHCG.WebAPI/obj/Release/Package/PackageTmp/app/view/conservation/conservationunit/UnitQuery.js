Ext.define('TianZun.view.conservation.conservationunit.UnitQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitQuery',
    title: '条件搜索',
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
                width: 250,
                style: 'margin-bottom:15px'
            },
            items: [{
                fieldLabel: '公司名称',
                xtype: 'textfield',
                name: 'companyname',
            },
                 {
                     fieldLabel: '公司类型',
                     xtype: 'combo',
                     editable: false,
                     store: Ext.create('TianZun.store.sys.Dictionary', {
                         proxy: {
                             type: 'ajax',
                             method: "Get",
                             url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhgs_gslx',
                         }
                     }),
                     name: 'companytype',
                     valueField: 'zd_id',
                     displayField: 'zd_name',

                 },
                {
                    fieldLabel: '联系地址',
                    xtype: 'textfield',
                    name: 'address',
                    colspan: 2,
                    width: 500,
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