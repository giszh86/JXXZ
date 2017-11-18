Ext.define('TianZun.view.accountmanager.accountregister.AccountRegisterEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountRegisterEdit',
    title: '台账编辑',
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
                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 70,
                            margin: '0 0 10 0',
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: '98%',
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'registerid',
                                value: this.record.get('registerid'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'createuserid',
                                value: $.cookie("USER_ID")
                            },
                        {
                            fieldLabel: '标题',
                            xtype: 'textfield',
                            name: 'title',
                            allowBlank: false,
                            margin: '10 0 10 0',
                            value: this.record.get('title')
                        },
                        {
                            fieldLabel: '时间',
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            name: 'registertime',
                            margin: '10 0 10 0',
                            allowBlank: false,
                            editable: false,
                            value: this.record.get('registertime')
                        },

                        {
                            fieldLabel: '人物',
                            xtype: 'textfield',
                            name: 'people',
                            width: '94%',
                            margin: '10 0 10 0',
                            value: this.record.get('people')
                        },
                        {
                            fieldLabel: '地点',
                            xtype: 'textfield',
                            name: 'address',
                            allowBlank: false,
                            colspan: 3,
                            width: '98%',
                            value: this.record.get('address')
                        },
                        {
                            fieldLabel: '任务分类',
                            xtype: 'combo',
                            store: Ext.create('TianZun.store.accountmanager.accountregister.RegisterTypeClass'),
                            name: 'taskclassid',
                            displayField: 'zd_name',
                            valueField: 'zd_id',
                            colspan: 3,
                            width: '98%',
                            allowBlank: false,
                            value: this.record.get('taskclassid'),
                            listeners: {
                                render: function (combo) {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            fieldLabel: '任务内容',
                            xtype: 'textarea',
                            name: 'content',
                            colspan: 3,
                            width: '98%',
                            value: this.record.get('content')
                        },
                        {
                            fieldLabel: '备注',
                            xtype: 'textarea',
                            name: 'remark',
                            colspan: 3,
                            width: '98%',
                            value: this.record.get('remark')
                        },
                        {
                            xtype: 'imageshowpanel',
                            store: store,
                            margin: '10 0 10 30',
                            width: '94%',
                            path: configs.AccountRegisterPath,
                            colspan: 3,
                        },
                        {
                            xtype: 'fieldset',
                            collapsible: true,
                            title: '新增附件',
                            collapsed: true,
                            margin: '0 0 10 20',
                            colspan: 3,
                            layout: 'fit',
                            item: [],
                            width: '94%',
                            listeners: {
                                afterRender: function (obj) {
                                    obj.add({
                                        xtype: 'uploadpanel',
                                        border: false,
                                        file_types: '*.*',
                                        addFileBtnText: '选择文件...',
                                        uploadBtnText: '上传',
                                        removeBtnText: '移除所有',
                                        cancelBtnText: '取消上传',
                                        file_size_limit: 10000,//MB
                                        upload_url: 'api/Common/UploadFile',
                                        post_params: { 'path': configs.AccountRegisterPath },
                                        height: 200,
                                    })
                                }
                            }

                        }
                        ]
                    }
            ],
            buttons: [
                {
                    text: '提交',
                    handler: 'onAddRegisterEditOK'
                },
            {
                text: '取消',
                handler: 'onClose'
            }]
        }];

        this.callParent();
    }
});