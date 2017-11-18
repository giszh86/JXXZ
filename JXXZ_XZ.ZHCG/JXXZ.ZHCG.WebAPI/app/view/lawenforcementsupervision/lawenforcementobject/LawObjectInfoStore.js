Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectInfoStore', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectInfoStore',
    title: '沿街店家详细信息',
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
                layout: 'fit',
                layout: {
                    type: 'table',
                    columns: 3
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    labelwidth: 70
                },
                defaults: {
                    xtype: 'displayfield',
                    editable:false,
                    width: 250
                },
                items: [{
                    xtype: 'hidden',
                    name: 'zfdx_shopid',
                    value: this.record.zfdx_shopid
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    xtype: 'displayfield',
                    name: 'storename',
                    allowBlank: false,
                    value: this.record.shopname
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家类型',
                    xtype: 'displayfield',
                    name: 'shoptype',
                    allowBlank: false,
                    editable: false,
                    value: this.record.shoptypename,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    xtype: 'displayfield',
                    allowBlank: false,
                    name: 'person',
                    value: this.record.person
                },
                {
                    fieldLabel: '证件号',
                    xtype: 'displayfield',
                    name: 'id',
                    value: this.record.card
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    xtype: 'displayfield',
                    allowBlank: false,
                    name: 'contactphone',
                    value: this.record.contactphone,
                },
                {
                    fieldLabel: '员工数',
                    xtype: 'displayfield',
                    name: 'staffsum',
                    value: this.record.staffsum,
                },
                {
                    fieldLabel: '许可证有效期',
                    xtype: 'displayfield',
                    editable: false,
                    name: 's_licence',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    value: this.record.s_licence
                },
                {
                    fieldLabel: '至',
                    //margin: '0 0 0 -80',
                    xtype: 'displayfield',
                    editable: false,
                    name: 'e_licence',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    value: this.record.e_licence
                },
                {
                    fieldLabel: '许可证号',
                    xtype: 'displayfield',
                    name: 'licencecard',
                    value: this.record.licencecard
                },
                {
                    fieldLabel: '经营有效期',
                    xtype: 'displayfield',
                    editable: false,
                    name: 's_business',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    value: this.record.s_business,
                },
                {
                    fieldLabel: '至',
                    //margin: '0 0 0 -80',
                    xtype: 'displayfield',
                    allowBlank: false,
                    name: 'e_business',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    value: this.record.e_business
                },
                {
                    fieldLabel: '营业面积',
                    xtype: 'displayfield',
                    name: 'businessarea',
                    value: this.record.businessarea,
                },
                {
                    fieldLabel: '地址',
                    xtype: 'displayfield',
                    colspan: 2,
                    width: 540,
                    name: 'address',
                    value: this.record.address,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>所属区域',
                    xtype: 'displayfield',
                    valueField: 'ID',
                    allowBlank: false,
                    editable: false,
                    value: this.record.sourceareaname,
                },
                {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'geography',
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: '地理位置',
                    width: '97.4%',
                    colspan: 3,
                    autoShow: true,
                    listeners: {
                        render: function (p)
                        {
                            p.getEl().on('click', function (p)
                            {
                                CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                            });
                        },
                    },
                    value: this.record.grometry,
                },
                ]
            }
            ],
            buttons: [{
                text: '关闭',
                handler: 'onclose',
            },
            ]
        }]
        this.callParent();
    }
})