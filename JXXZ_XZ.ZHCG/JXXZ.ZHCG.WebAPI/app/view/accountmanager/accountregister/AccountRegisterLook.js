Ext.define('TianZun.view.accountmanager.accountregister.AccountRegisterLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountRegisterLook',
    title: '台账详情',
    layout: 'fit',
    requires: [
    'TianZun.ux.ImageShowPanel',
    ],

    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.accountmanager.accountregister.RegisterFileListStore', { proxy: { type: 'ajax', extraParams: { registerid: this.record.get("registerid") } } });

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
                        name: 'visitwin',
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
                            width: '98%',
                        },
                        items: [
                        {
                            fieldLabel: '事件信息',
                            xtype: 'textfield',
                            name: 'registertitle',
                            allowBlank: false,
                            margin: '10 0 10 0',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('title')
                        },
                        {
                            fieldLabel: '时间',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            name: 'registertime',
                            allowBlank: false,
                            margin: '10 0 10 0',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('registertime')
                        },

                        {
                            fieldLabel: '人物',
                            xtype: 'textfield',
                            name: 'registerperson',
                            margin: '10 0 10 0',
                            width: '94%',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('people')
                        },
                        {
                            fieldLabel: '地点',
                            xtype: 'textfield',
                            name: 'registerplace',
                            allowBlank: false,
                            colspan: 3,
                            width: '98%',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('address')
                        },
                        {
                            fieldLabel: '任务分类',
                            xtype: 'combo',
                            store: Ext.create('TianZun.store.accountmanager.accounttask.Type'),
                            name: 'registertype',
                            displayField: 'zd_name',
                            valueField: 'zd_id',
                            colspan: 3,
                            allowBlank: false,
                            value: this.record.get('taskclassid'),
                            editable: false,
                            readOnly: true,
                            listeners: {
                                render: function (combo) {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            fieldLabel: '任务内容',
                            xtype: 'textarea',
                            name: 'registercontent',
                            colspan: 3,
                            width: '98%',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('content')
                        },
                        {
                            fieldLabel: '备注',
                            xtype: 'textarea',
                            name: 'remark',
                            colspan: 3,
                            width: '98%',
                            editable: false,
                            readOnly: true,
                            value: this.record.get('remark')
                        },
                        {
                            xtype: 'imageshowpanel',
                            store: store,
                            margin: '10 0 10 30',
                            width: '94%',
                            path: configs.AccountRegisterPath,
                            colspan: 3,
                        }
                        ]
                    }
            ],
            buttons: [
            {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});