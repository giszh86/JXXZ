Ext.define('TianZun.view.qwmanager.signarea.SignAreaDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.signAreaDetail',
    title: '签到区域详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 950,
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 101
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 429
                        },
                        items: [
                             {
                                 xtype: 'hidden',
                                 name: 'userid',
                                 value: $.cookie("USER_ID")
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>所属中队',
                                name: 'sszd',
                                margin: '20 0 10 0',
                                readOnly: true,
                                value:me.record.get('sszdname'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>所属班次',                                
                                name: 'ssbc',
                                readOnly: true,
                                value: me.record.get('ssbcname'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到区域名称',
                                name: 'name',
                                colspan: 2,
                                margin: '10 0 10 0',
                                readOnly: true,
                                value: me.record.get('name'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到区域说明',
                                name: 'explain',
                                xtype: 'textarea',
                                colspan: 2,
                                margin: '10 0 10 0',
                                width: '97.5%',
                                readOnly: true,
                                value: me.record.get('explain'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到开始时间',
                                name: 'start_stime',
                                readOnly: true,
                                value: me.record.get('start_stime'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签到结束时间',
                                name: 'start_etime',
                                readOnly: true,
                                value: me.record.get('start_etime'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签退开始时间',
                                name: 'end_stime',
                                readOnly: true,
                                value: me.record.get('end_stime'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>签退结束时间',
                                name: 'end_etime',
                                readOnly: true,
                                value: me.record.get('end_etime'),
                            },
                            {
                                id: 'EVENT_COORDINATE_ID',
                                name: 'grometry',
                                fieldLabel: '签到位置',
                                margin: '10 0 10 0',
                                colspan: 2,
                                width: '97.5%',
                                autoShow: true,
                                value: me.record.get('grometry'),
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '签到区域', 0, 3, this.component.getValue());
                                        });
                                    },
                                }
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});