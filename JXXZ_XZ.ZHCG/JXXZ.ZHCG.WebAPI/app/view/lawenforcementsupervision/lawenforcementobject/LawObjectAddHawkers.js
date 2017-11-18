Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectAddHawkers', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectAddHawkers',
    title: '添加小摊小贩信息',
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
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>姓名',
                    xtype: 'textfield',
                    allowBlank:false,
                    name: 'person',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    name: 'contactphone',
                    allowBlank: false,
                },
                {
                    fieldLabel: '证件号',
                    xtype: 'textfield',
                    name: 'card',
                },
                {
                    fieldLabel: '类型',
                    name: 'hawkertype',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>所属区域',
                    xtype: 'combo',
                    editable: false,
                    allowBlank: false,
                    colspan:2,
                    name: 'sourcearea',
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yjdj_ssqy',
                        }
                    }),
                    valueField: 'zd_id',
                    displayField: 'zd_name',
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
                    fieldLabel: '地点描述',
                    colspan: 3,
                    width: '96%',
                    xtype: 'textfield',
                    name: 'address',
                },
                {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    colspan:3,
                    width:'96%',
                    name: 'remark',
                },
                {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'grometry',
                    xtype: 'textfield',
                    fieldLabel: '地理位置',
                    width: '96%',
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
                text: '提交',
                handler: 'onsubmitxf',
            },
            {
                text: '取消',
                handler: 'onclose',
            }
           ]
        }]
        this.callParent();
    }
})