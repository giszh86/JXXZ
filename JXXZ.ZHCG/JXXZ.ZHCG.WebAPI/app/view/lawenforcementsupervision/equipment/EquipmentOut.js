Ext.define('TianZun.view.lawenforcementsupervision.equipment.EquipmentOut', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.equipmentOut',
    title: '设备出库',
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
                      xtype: 'hidden',
                      name: 'stocknum',
                      value: this.record.stocknum
                  },
                {
                    fieldLabel: '<span style="color:red">*</span>出库类型',
                    xtype: 'combo',
                    name: 'outtype',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: 'Get',
                            url: configs.WebApi + '/api/Dictionary/GetZdList?zd_type=type_sbgl_sbck',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false,
                    allowBlank:false
                },
                {
                    fieldLabel: '出库装备',
                    xtype: 'displayfield',
                    value: this.record.devicename,
                },
                {
                    fieldLabel: '处理人',
                    xtype: 'textfield',
                    name: 'process',
                    value:$.cookie("USER_NAME"),
                },
                {
                    fieldLabel: '<span style="color:red">*</span>出库装备数量',
                    xtype: 'textfield',
                    name: 'number',
                    allowBlank:false,
                },
                {
                    fieldLabel: '出库装备单价',
                    xtype: 'textfield',
                    name: 'price',
                    blanktext: '元',
                },
                {
                    fieldLabel: '申请人',
                    xtype: 'textfield',
                    name: 'applyuser',
                },
                {
                    fieldLabel: '领用单位',
                    xtype: 'textfield',
                    name: 'receiveunit',
                },
                //{
                //    fieldLabel: '管理部门',
                //    xtype: 'textfield',
                //    name: 'glbm',
                //},
                {
                    fieldLabel: '审核人',
                    xtype: 'textfield',
                    name: 'shuser',
                    colspan:2
                },
                {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    name: 'remark',
                    colspan: 3,
                    width:'96%',
                }
                ]
            }],
            buttons: [{
                text: '提交',
                handler: 'onsubmitout',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();

    }
})