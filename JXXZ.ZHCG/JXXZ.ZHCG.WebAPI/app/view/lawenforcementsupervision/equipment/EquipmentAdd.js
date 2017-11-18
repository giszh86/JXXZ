Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentAdd',
    title: '添加设备',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width:1000,
            overflowY: 'auto',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title:'基础信息',
                layout: {
                    type: 'table',
                    columns:3
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth:100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    vaalue:$.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>设备名称',
                    xtype: 'textfield',
                    name: 'devicename',
                    allowBlank: false,
                },
                {
                    fieldLabel: '品牌',
                    xtype: 'textfield',
                    name: 'brand',
                },
                {
                    fieldLabel: '型号',
                    xtype: 'textfield',
                    name: 'model',
                },
                {
                    fieldLabel: '计量单位',
                    xtype: 'textfield',
                    name: 'jldw',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>装备类别',
                    xtype: 'combo',
                    name: 'devicetype',
                    colspan:2,
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
                    allowBlank: false,
                },
                 
                {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    colspan: 3,
                    width: '96%',
                    name: 'remark',
                }]
            }],
            buttons: [{
                text: '提交',
                handler:'onsubmit',
            },
            {
                text: '取消',
                handler:'onclose',
            }]
        }]
        this.callParent();

    },
})