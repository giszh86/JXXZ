Ext.define('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectInfoHawkers', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.lawObjectInfoHawkers',
    title: '小摊小贩详情信息',
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
                    xtype: 'displayfield',
                    width: 280
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>姓名',
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
                    xtype: 'displayfield',
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
                    xtype: 'displayfield',
                    editable: false,
                    allowBlank: false,
                    colspan: 2,
                    name: 'sourcearea',
                    value: this.record.sourceareaname,
                },
                {
                    fieldLabel: '地点描述',
                    width: '96%',
                    colspan:3,
                    xtype: 'displayfield',
                    name: 'address',
                    value: this.record.address,
                },
                {
                    fieldLabel: '备注',
                    xtype: 'displayfield',
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
                    autoShow: true,
                    value: this.record.grometry,
                    listeners: {
                        render: function (p)
                        {
                            p.getEl().on('click', function (p)
                            {
                                CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                            });
                        },
                    }
                },
                ]
            }],
            buttons: [{
                text: '关闭',
                handler: 'onclose',
            }
            ]
        }]
        this.callParent();
    }
})