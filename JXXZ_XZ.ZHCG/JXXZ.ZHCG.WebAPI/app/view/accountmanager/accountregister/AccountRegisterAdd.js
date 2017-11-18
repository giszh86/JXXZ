Ext.define('TianZun.view.accountmanager.accountregister.AccountRegisterAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountRegisterAdd',
    title: '添加台帐登记信息',
    layout: 'fit',

    initComponent: function () {
        var me = this;

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [{
                title: '手动添加台账',
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
                                    name: 'createuserid',
                                    value: $.cookie("USER_ID")
                                },
                                 {
                                     xtype: 'hidden',
                                     name: 'unitid',
                                     value: $.cookie("UNIT_ID")
                                 },
                                {
                                    fieldLabel: '标题',
                                    xtype: 'textfield',
                                    name: 'title',
                                    allowBlank: false,
                                    margin: '10 0 10 0',
                                },
                                {
                                    fieldLabel: '时间',
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    name: 'registertime',
                                    allowBlank: false,
                                    editable: false,
                                    margin: '10 0 10 0',
                                },
                                {
                                    fieldLabel: '人物',
                                    xtype: 'textfield',
                                    name: 'people',
                                    allowBlank: false,
                                    width: '94%',
                                    margin: '10 0 10 0',
                                },
                                {
                                    fieldLabel: '地点',
                                    xtype: 'textarea',
                                    name: 'address',
                                    colspan: 3,
                                    width: '98%',
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
                                    editable: false
                                },
                                {
                                    fieldLabel: '任务内容',
                                    xtype: 'textarea',
                                    name: 'content',
                                    colspan: 3,
                                    width: '98%',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '备注',
                                    xtype: 'textarea',
                                    name: 'remark',
                                    colspan: 3,
                                    width: '98%',
                                },
                                {
                                    xtype: 'fieldset',
                                    collapsible: false,
                                    title: '附件',
                                    colspan: 3,
                                    margin: '0 0 10 20',
                                    layout: 'fit',
                                    item: [],
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
                                },
                            ]
                        }
                ]
            },
            {
                title: '自动添加台账',
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                name:'tabform',
                width: 1000,
                overflowY: 'auto',
                items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'form2',
                        layout: {
                            type: 'table',
                            columns: 3,
                        }
                        ,
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 70,
                            margin: '0 0 10 0',
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: '98%',
                            colspan: 1
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'createuserid',
                                value: $.cookie("USER_ID")
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'unitid',
                                 value: $.cookie("UNIT_ID")
                             },
                            {
                                xtype: 'hidden',
                                name: 'citizenid',
                            },
                            {
                                fieldLabel: '事件信息',
                                xtype: 'textfield',
                                name: 'title',
                                allowBlank: false,
                                colspan: 1,
                               
                            },
                            {
                                text: "选择事件",
                                xtype: 'button',
                                colspan: 2,
                                width: '20%',
                                margin: '-8 0 0 20',
                                handler: 'onSelectEvent'
                            },
                            {
                                fieldLabel: '时间',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                name: 'registertime',
                                allowBlank: false,
                                editable: false,
                               
                            },
                            {
                                fieldLabel: '地点',
                                xtype: 'textfield',
                                name: 'address',
                                allowBlank: false,
                                colspan: 2,
                                width: '96%',
                            },
                            {
                                fieldLabel: '处理人员',
                                xtype: 'textfield',
                                name: 'people'
                            },
                            {
                                fieldLabel: '任务分类',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.accountmanager.accounttask.Type'),
                                name: 'taskclassid',
                                displayField: 'zd_name',
                                valueField: 'zd_id',
                                colspan: 2,
                                width: '96%',
                                allowBlank: false,
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
                            },
                            {
                                fieldLabel: '备注',
                                xtype: 'textarea',
                                name: 'remark',
                                colspan: 3,
                            },
                             
                        ]
                    }, ]
            }
            ]
            ,
            buttons: [{
                text: '提交',
                handler: 'onAddRegisterOK'
            }, {
                text: '取消',
                handler: "onClose"

            }]
        }];

        this.callParent();

    }
});
