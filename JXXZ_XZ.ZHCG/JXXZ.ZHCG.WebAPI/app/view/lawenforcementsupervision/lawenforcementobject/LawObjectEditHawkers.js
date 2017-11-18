Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectEditHawkers', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectEditHawkers',
    title: '编辑小摊小贩信息',
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
                    xtype: 'hidden',
                    name: 'zfdx_shopid',
                    value: this.record.zfdx_shopid,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>姓名',
                    xtype: 'textfield',
                    allowBlank: false,
                    name: 'person',
                    value: this.record.person,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    name: 'contactphone',
                    allowBlank: false,
                    value: this.record.contactphone,
                },
                {
                    fieldLabel: '证件号',
                    xtype: 'textfield',
                    name: 'card',
                    value: this.record.card,
                },
                {
                    fieldLabel: '类型',
                    name: 'hawkertype',
                    value: this.record.hawkertype,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>所属区域',
                    xtype: 'combo',
                    valueField: 'ID',
                    colspan:2,
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
                    fieldLabel: '地点描述',
                    colspan: 3,
                    width: '96%',
                    xtype: 'textfield',
                    name: 'address',
                    value: this.record.address,
                },
                {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    colspan: 3,
                    width: '96%',
                    name: 'remark',
                    value: this.record.remark,
                },
                 {
                     id: 'EVENT_COORDINATE_ID',
                     name: 'grometry',
                     xtype: 'textfield',
                     fieldLabel: '地理位置',
                     width: '96%',
                     colspan: 3,
                     value:this.record.grometry,
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
                handler: 'onSubmitxf',
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