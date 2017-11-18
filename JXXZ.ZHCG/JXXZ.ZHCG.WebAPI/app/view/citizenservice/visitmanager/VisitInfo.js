Ext.define('TianZun.view.citizenservice.visitmanager.VisitInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.visitInfo',
    title: '回访信息详情',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1000,
            overflowY: 'auto',
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
                                fieldLabel: '事件标题',
                                name: 'eventTitle',
                                margin: '0 0 10 0',
                                readOnly:true,
                                value: this.record.get('eventtitle')
                            },
                            {
                                fieldLabel: '回访时间',
                                name: 'visitTime',
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('visittime')
                            },
                            {
                                fieldLabel: '受访人',
                                name: 'businessperson',
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('respondents')
                            },
                            {
                                fieldLabel: '联系方式',
                                name: 'phone',
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('contact')
                            },
                            {
                                fieldLabel: '回访方式',
                                name: 'visitType',
                                colspan: 2,
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('returnvisitstr')
                            },
                            {
                                fieldLabel: '回访内容',
                                name: 'visitContent',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 40,
                                width: '100%',
                                readOnly: true,
                                value: this.record.get('returnvisitcontent')
                            },
                            {
                                fieldLabel: '满意度',
                                name: 'MYD',
                                colspan: 3,
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('satisfactionstr')
                            },
                            {
                                fieldLabel: '处理方式',
                                name: 'processmode',
                                colspan: 3,
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: this.record.get('processmode')
                            },
                            {
                                fieldLabel: '处理意见',
                                name: 'visitSuggest',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 40,
                                width: '100%',
                                readOnly: true,
                                value: this.record.get('processopinion')
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