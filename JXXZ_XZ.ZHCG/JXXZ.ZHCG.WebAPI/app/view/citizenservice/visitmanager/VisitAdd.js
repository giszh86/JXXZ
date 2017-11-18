Ext.define('TianZun.view.citizenservice.visitmanager.VisitAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.visitAdd',
    title: '回访登记',
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
                        name:'visitwin',
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
                            width: 319
                        },
                        items: [
                            {
                                name: 'visitEvent',
                                xtype: 'panel',
                                colspan: 3,
                                margin: '10 0 10 0',
                                border:0,
                                items: [{
                                    xtype: 'label',
                                    text: '回访事件:',
                                    margin:'10 10 10 20',
                                }, {
                                    xtype: 'button',
                                    text: '关联相关市民事件',
                                    handler:'onVisitEvent'
                                }],
                            },
                            {
                                xtype: 'hidden',
                                name: 'userid',
                                value:$.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'citizenid',
                            },
                            {
                                xtype: 'hidden',
                                name: 'eventrecord',
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件标题',
                                name: 'eventTitle',
                                xtype: 'textfield',
                                allowBlank: false,
                                readOnly:true,
                                margin:'0 0 10 0',
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'visittime',
                                editable: false,
                                fieldLabel: '回访时间',
                                margin: '0 0 10 0',
                                format: 'Y-m-d H:i:s',
                            },
                            {
                                fieldLabel: '受访人',
                                name: 'respondents',
                                xtype: 'textfield',
                                margin: '0 0 10 0',
                            },
                            {
                                fieldLabel: '联系方式',
                                name: 'contact',
                                xtype: 'textfield',
                                margin: '0 0 10 0',
                            },
                            {
                                fieldLabel: '回访方式',
                                name: 'returnvisit',
                                xtype: 'radiogroup',
                                colspan: 2,
                                margin: '0 0 10 0',
                                hideLabels: false,
                                defaults: {
                                    flex: 1
                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: '电话',
                                        name: 'returnvisit',
                                        inputValue: '1',
                                        checked: true,
                                    },
                                    {
                                        boxLabel: '实地勘察',
                                        name: 'returnvisit',
                                        inputValue: '2'
                                    },
                                    {
                                        boxLabel: '面谈',
                                        name: 'returnvisit',
                                        inputValue: '3'
                                    },
                                ]
                            },
                            {
                                fieldLabel: '回访内容',
                                name: 'returnvisitcontent',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 80,
                                width: '100%'
                            },
                            {
                                fieldLabel: '满意度',
                                name: 'satisfaction',
                                xtype: 'radiogroup',
                                colspan: 3,
                                margin: '0 0 10 0',
                                hideLabels: false,
                                defaults: {
                                    flex: 1
                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: '满意',
                                        name: 'satisfaction',
                                        inputValue: '1',
                                        checked: true,
                                    },
                                    {
                                        boxLabel: '一般',
                                        name: 'satisfaction',
                                        inputValue: '2'
                                    },
                                    {
                                        boxLabel: '不满意',
                                        name: 'satisfaction',
                                        inputValue: '3'
                                    },
                                ]
                            },
                            {
                                fieldLabel: '处理方式',
                                name: 'processmode',
                                xtype: 'radiogroup',
                                colspan: 3,
                                margin: '0 0 10 0',
                                hideLabels: false,
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: '归档',
                                        name: 'processmode',
                                        inputValue: '1',
                                        checked: true,
                                    },
                                    {
                                        boxLabel: '重新指派件',
                                        name: 'processmode',
                                        inputValue: '2',
                                        margin: '0 0 0 30',
                                    },
                                    {
                                        boxLabel: '解释',
                                        name: 'processmode',
                                        margin:'0 0 0 20',
                                        inputValue: '3'
                                    },
                                ]
                            },
                            {
                                fieldLabel: '处理意见',
                                name: 'processopinion',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '0 0 10 0',
                                height: 80,
                                width: '100%'
                            },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddVisitOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    }
});