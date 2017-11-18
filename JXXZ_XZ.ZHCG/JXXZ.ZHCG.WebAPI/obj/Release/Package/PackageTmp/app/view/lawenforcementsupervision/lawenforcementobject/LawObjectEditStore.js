Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectEditStore', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectEditStore',
    title: '修改沿街店家信息',
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
                layout:'fit',
                layout: {
                    type: 'table',
                    columns: 3
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth: 70
                },
                defaults: {
                    xtype: 'textfield',
                    width: 250
                },
                items: [{
                    xtype: 'hidden',
                    name: 'zfdx_shopid',
                    value: this.record.zfdx_shopid,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    xtype: 'textfield',
                    name: 'shopname',
                    allowBlank: false,
                    value: this.record.shopname
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家类型',
                    xtype: 'combo',
                    name: 'shoptype',
                    allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_djlx',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    editable: false,
                    listeners: {
                        beforerender: function (obj)
                        {
                            obj.setValue(me.record.shoptype);
                            this.getStore().load();
                        },
                    },
                },
                {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'person',
                    value: this.record.person
                },
                {
                    fieldLabel: '证件号',
                    xtype: 'textfield',
                    name: 'card',
                    value: this.record.card
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    allowBlank: false,
                    name: 'contactphone',
                    value: this.record.contactphone,
                },
                {
                    fieldLabel: '员工数',
                    xtype: 'numberfield',
                    name: 'staffsum',
                    value: this.record.staffsum,
                },
                {
                    fieldLabel: '许可证有效期',
                    xtype: 'datefield',
                    editable: false,
                    name: 's_licence',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                    value: new Date(this.record.s_licence),
                },
                {
                    fieldLabel: '至',
                    //margin: '0 0 0 -80',
                    xtype: 'datefield',
                    editable:false,
                    name: 'e_licence',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                    value: new Date(this.record.e_licence),
                },
                {
                    fieldLabel: '许可证号',
                    xtype: 'textfield',
                    name: 'licencecard',
                    value: this.record.licencecard,
                },
                {
                    fieldLabel: '经营有效期',
                    xtype: 'datefield',
                    editable: false,
                    name: 's_business',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                    value: new Date(this.record.s_business),
                },
                {
                    fieldLabel: '至',
                    //margin: '0 0 0 -80',
                    xtype: 'datefield',
                    editable: false,
                    name: 'e_business',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                    value: new Date(this.record.e_business),
                },
                {
                    fieldLabel: '营业面积',
                    xtype: 'textfield',
                    name: 'businessarea',
                    value: this.record.businessarea,
                },
                {
                    fieldLabel: '地址',
                    xtype: 'textfield',
                    colspan: 2,
                    width: 540,
                    name: 'address',
                    value: this.record.address,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>所属区域',
                    xtype: 'combo',
                    valueField: 'ID',
                    allowBlank: false,
                    editable: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yjdj_ssqy',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    name: 'sourcearea',
                    readOnly: configs.TOWNID == null ? false : true,
                    listeners: {
                        beforerender: function (obj)
                        {
                            obj.setValue(me.record.sourcearea);
                            this.getStore().load();
                        },
                    },
                },
                {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'grometry',
                    xtype: 'textfield',
                    fieldLabel: '地理位置',
                    width: '97.4%',
                    colspan: 3,
                    autoShow: true,
                    listeners: {
                        render: function (p) {
                            p.getEl().on('click', function (p) {
                                CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 1, 1, this.component.getValue());
                            });
                        },
                    },
                    value: this.record.grometry,
                },
                ]
            }
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditOKdj',
            },
            {
                text: '取消',
                handler: 'onclose',
            }]
        }]
        this.callParent();
    }
})