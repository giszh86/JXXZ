Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentQuery', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentQuery',
    title: '搜索条件',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 345,
                layout: {
                    type: 'table',
                    columns: 1
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth: 100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [
                {
                    fieldLabel: '设备名称',
                    xtype: 'textfield',
                    margin:'10 0 0 0',
                    name: 'devicename',
                },
                {
                    fieldLabel: '设备类别',
                    xtype: 'combo',
                    name: 'devicetype',
                    margin: '10 0 0 0',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: 'Get',
                            url: configs.WebApi + '/api/Dictionary/GetZdList?zd_type=type_sbgl_sblb',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false,
                },
                ],
            buttons: [{
                text: '提交',
                handler: 'onsubmitss',
            },
            {
                text: '清空',
                handler:'onempty',
            },
           {
               text: '取消',
               handler: 'onclose',
           }]
            }],
        this.callParent();

    }
})