Ext.define('TianZun.view.citizenservice.consultmanager.ConsultInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.consultInfo',
    title: '咨询登记详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 312
                        },
                        items: [
                            {
                                fieldLabel: '咨询人',
                                name: 'consultPerson',
                                margin: '20 0 10 0',
                                readOnly: true,
                                value: this.record.get('consultuser')
                            },
                            {
                                fieldLabel: '联系方式',
                                name: 'phone',
                                margin: '20 0 10 0',
                                readOnly: true,
                                value: this.record.get('contact')
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件标题',
                                name: 'eventTitle',
                                margin: '20 0 10 0',
                                readOnly: true,
                                value: this.record.get('title')
                            },

                            {
                                fieldLabel: '受理时间',
                                name: 'visitTime',
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('createtime')
                            },
                            {
                                fieldLabel: '<span style="color:red"></span>事件大类',
                                colspan: 2,
                                readOnly: true,
                                value: this.record.get('bigtypename')
                            },
                            {
                                fieldLabel: '<span style="color:red"></span>事件小类',
                                xtype: 'textarea',
                                name: 'categoryID',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 40,
                                width: '100%',
                                readOnly: true,
                                value: this.record.get('smalltypename')
                            },
                            {
                                fieldLabel: '咨询内容',
                                xtype:'textarea',
                                name: 'consultContent',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 40,
                                width: '100%',
                                readOnly: true,
                                value: this.record.get('consultcontent')
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '返回',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});