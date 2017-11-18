Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentEdit',
    title: '修改设备信息',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 1000,
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
                    labelwidth: 100
                },
                defaults: {
                    xtype: 'textfield',
                    width: 280
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
                    fieldLabel: '<span style="color:red">*</span>设备名称',
                    xtype: 'textfield',
                    name: 'devicename',
                    margin:'20 0 10 0',
                    allowBlank: false,
                    value: this.record.devicename
                },
                {
                    fieldLabel: '品牌',
                    xtype: 'textfield',
                    margin: '20 0 10 0',
                    name: 'brand',
                    value: (this.record.brand == null ? "" : this.record.brand)
                },
                {
                    fieldLabel: '型号',
                    xtype: 'textfield',
                    margin: '20 0 10 0',
                    name: 'model',
                    value:(this.record.model==null?"":this.record.model)
                },
                {
                    fieldLabel: '计量单位',
                    xtype: 'textfield',
                    margin: '0 0 10 0',
                    name: 'jldw',
                    value: (this.record.jldw == null ? "" : this.record.jldw)
                },
                {
                    fieldLabel: '<span style="color:red">*</span>装备类别',
                    xtype: 'combo',
                    name: 'devicetype',
                    margin: '0 0 10 0',
                    colspan: 2,
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
                    listeners: {
                        beforerender: function (obj) {
                            obj.setValue((me.record.devicetype == null ? "0" : me.record.devicetype));
                            this.getStore().load();
                        },

                    },
                },
                {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    colspan: 3,
                    margin: '0 0 10 0',
                    width: '96%',
                    name: 'remark',
                    value: (this.record.remark == null ? "" : this.record.remark)
                }]
            }],
            buttons: [{
                text: '提交',
                handler: 'onsubmitxg',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();

    }
})