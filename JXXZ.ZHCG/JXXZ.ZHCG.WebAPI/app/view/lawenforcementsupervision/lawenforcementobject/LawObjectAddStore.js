Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectAddStore', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectAddStore',
    title: '添加沿街店家信息',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width:900,
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
                    labelwidth: 70
                },
                defaults: {
                    xtype: 'textfield',
                    width: 250
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID"),
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    xtype: 'textfield',
                    name: 'shopname',
                    allowBlank:false,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家类型',
                    xtype: 'combo',
                    name: 'shoptype',
                    allowBlank: false,
                    editable:false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_djlx',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'person',
                },
                {
                    fieldLabel: '证件号',
                    xtype: 'textfield',
                    name: 'card',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    minValue: 0,
                    allowDecimals:false,
                    allowBlank: false,
                    name: 'contactphone',
                },
                {
                    fieldLabel: '员工数',
                    xtype: 'numberfield',
                    name: 'staffsum',
                },
                {
                    fieldLabel: '许可证有效期',
                    xtype: 'textfield',
                    editable: false,
                    name: 's_licence',
                    xtype: 'datefield',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                },
                {
                    fieldLabel: '至',
                    //margin:'0 0 0 -40',
                    xtype: 'textfield',
                    editable: false,
                    name: 'e_licence',
                    xtype: 'datefield',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                },
                {
                    fieldLabel: '许可证号',
                    xtype: 'textfield',
                    name: 'licencecard',
                },
                {
                    fieldLabel: '经营有效期',
                    editable:false,
                    name: 's_business',
                    xtype: 'datefield',
                    format: "Y-m-d",//日期的格式
                    altFormats: "Y/m/d|Ymd",
                },
                {
                    fieldLabel: '至',
                    //margin:'0 0 0 -40',
                    editable: false,
                    name: 'e_business',
                    format: "Y-m-d",//日期的格式
                    xtype: 'datefield',

                },
                {
                    layout: 'hbox',
                    xtype: 'panel',
                    border:false,
                    items: [
                        {
                            fieldLabel: '营业面积',
                            xtype: 'textfield',
                            name: 'businessarea',
                            width:'90%'
                        },
                        {
                            xtype: 'label',
                            margin:'0 0 0 10',
                            html:'㎡'
                        }
                    ]
                },
                {
                    fieldLabel: '地址',
                    xtype: 'textfield',
                    colspan: 2,
                    width: 540,
                    name: 'address',
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
                        render: function (obj) {
                            if (configs.TOWNID != null) {
                                var zdid = configs.TOWNID == 11 ? 1 : configs.TOWNID == 13 ? 4 : configs.TOWNID == 14 ? 6 : configs.TOWNID == 16 ? 5 : configs.TOWNID == 17 ? 8 : 0;
                                obj.setValue(zdid);
                                obj.getStore().load();
                            }
                        },
                    }
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
                    }
                },
                ]
            }],
            buttons: [{
                text:'提交',
                handler:'onsubmitdj',
            },
            {
                text: '取消',
                handler:'onclose',
            }]
        }]
        this.callParent();
    }
})