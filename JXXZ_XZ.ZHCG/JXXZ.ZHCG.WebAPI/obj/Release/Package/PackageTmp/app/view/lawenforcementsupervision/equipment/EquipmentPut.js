Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentPut', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentPut',
    title: '设备入库',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 900,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '基础信息',
                layout: {
                    type: 'table',
                    columns: 3
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth: 100,
                    
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280,
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    vaalue: $.cookie("USER_ID")
                },
                {
                    xtype: 'hidden',
                    name: 'deviceid',
                    value: this.record.deviceid
                },
                {
                    fieldLabel: '<span style="color:red">*</span>入库类型',
                    xtype: 'combo',
                    name: 'storagetype',
                    margin: '20 0 10 0',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: 'Get',
                            url: configs.WebApi + '/api/Dictionary/GetZdList?zd_type=type_sbgl_sbrk',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false,
                    allowBlank:false
                },
                {
                    fieldLabel: '入库装备',
                    xtype: 'displayfield',
                    value: this.record.devicename,
                    margin:'20 0 10 0',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>入库装备数量',
                    xtype: 'textfield',
                    margin: '20 0 10 0',
                    name: 'number',
                    allowBlank:false
                },
                {
                    fieldLabel: '入库装备单价',
                    xtype: 'textfield',
                    margin: '0 0 10 0',
                    name: 'price',
                },
                {
                    fieldLabel: '生产日期',
                    xtype: 'datefield',
                    margin: '0 0 10 0',
                    name: 'producedate',
                },
                {
                    fieldLabel: '配发部门',
                    xtype: 'textfield',
                    margin: '0 0 10 0',
                    name: 'unitid',
                },
                {
                    fieldLabel: '处理人',
                    xtype: 'textfield',
                    margin: '0 0 10 0',
                    name: 'processuserid',
                    value:$.cookie("USER_NAME")
                },
                {
                    fieldLabel: '审核人',
                    xtype: 'textfield',
                    margin: '0 0 10 0',
                    name: 'shuserid',
                }
                ]
            }],
            buttons: [{
                text: '提交',
                handler: 'onsubmitrk',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();

    }
})