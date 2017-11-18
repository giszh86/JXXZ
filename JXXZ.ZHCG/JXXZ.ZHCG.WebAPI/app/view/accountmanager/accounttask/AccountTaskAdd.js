Ext.define('TianZun.view.accountmanager.accounttask.AccountTaskAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountTaskAdd',
    title: '添加台帐任务信息',
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
                        name: 'tztaskwin',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 105,
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
                                name: 'tz_json',
                                value: '',
                            },
                            {
                                xtype: 'hidden',
                                name: 'storeZD',
                                value: '',
                            },
                            {
                                xtype: 'hidden',
                                name: 'sszd',
                                value: '',
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'ssrw',
                                 value: '',
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>台帐任务名称',
                                xtype: 'textfield',
                                name: 'taskname',
                                allowBlank: false,
                                width: 600
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>任务所属年度',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.common.YearStore'),
                                displayField: 'Value',
                                valueField: 'Value',
                                name: "taskyear",
                                allowBlank: false,
                                width: '94%',
                                value: new Date().getFullYear(),
                                editable: false
                            },
                            {
                                xtype: 'tagfield',
                                fieldLabel: '<span style="color:red">*</span>任务分类',
                                store: Ext.create('TianZun.store.citizenservice.PunishType'),
                                displayField: 'Name',
                                valueField: 'ID',
                                name: "TypeArr",
                                allowBlank: false,
                                colspan: 2,
                                height: 52,
                                width: '98%',
                                editable: false,
                                listeners: {
                                    'change': function (obj) {
                                        me.down("hidden[name=tz_json]").setValue(""); 
                                        me.down("hidden[name=storeZD]").setValue("");
                                        me.down("hidden[name=sszd]").setValue("");
                                        me.down("hidden[name=ssrw]").setValue("");
                                    }
                                }
                            },

                            {
                                xtype: 'panel',
                                border: false,
                                colspan: 2,
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                margin: '-10 0 0 0',
                                items: [
                                     {
                                         xtype: 'combo',
                                         fieldLabel: '<span style="color:red">*</span>台帐类型',
                                         store: Ext.create('TianZun.store.common.TZTypeStore'),
                                         displayField: 'Name',
                                         valueField: 'ID',
                                         name: "tz_type",
                                         margin: '0 0 10 0',
                                         width: 200,
                                         allowBlank: false,
                                         value: 1,
                                         editable: false,
                                         listeners: {
                                             'change': function (obj) {
                                                 var starttime = obj.up().down('datetimefield[name=starttime]').getValue();
                                                 var enddate;
                                                 if (obj.getValue() == 1) {//月
                                                     enddate = Ext.Date.add(new Date(starttime), Ext.Date.MONTH, +1);
                                                 }
                                                 else {//年
                                                     enddate = Ext.Date.add(new Date(starttime), Ext.Date.YEAR, +1);
                                                 }
                                                 obj.up().down('datetimefield[name=endtime]').setValue(enddate);
                                             }
                                         }
                                     },
                                    {
                                        xtype: 'panel',
                                        margin: '0 10 10 0',
                                        border: false,
                                        layout: 'hbox',
                                        colspan: 2,
                                        items: [
                                            {
                                                xtype: 'datetimefield',
                                                border: false,
                                                name: 'starttime',
                                                editable: false,
                                                allowBlank: false,
                                                fieldLabel: '<span style="color:red">*</span>任务期限',
                                                margin: '10 0 10 100',
                                                format: 'Y-m-d H:i:s',
                                                value: new Date(Ext.Date.now())
                                            },
                                            {
                                                xtype: 'datetimefield',
                                                border: false,
                                                name: 'endtime',
                                                editable: false,
                                                allowBlank: false,
                                                fieldLabel: '至',
                                                labelWidth:20,
                                                margin: '10 0 10 0',
                                                format: 'Y-m-d H:i:s',
                                                value: Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.MONTH, +1),
                                            },                                           
                                        ]

                                    },

                                ]

                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>任务所属中队',
                                xtype: 'tagfield',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { type: 'ajax', extraParams: { unittypeid: 2 } } }),
                                displayField: 'Name',
                                valueField: 'ID',
                                name: "TypeArrZD",
                                allowBlank: false,
                                colspan: 2,
                                height: 52,
                                width: '98%',
                                editable: false,
                                listeners: {
                                    'change': function (obj) {
                                        me.down("hidden[name=tz_json]").setValue("");
                                        me.down("hidden[name=storeZD]").setValue("");
                                        me.down("hidden[name=sszd]").setValue("");
                                        me.down("hidden[name=ssrw]").setValue("");
                                    }
                                }
                            },
                            {
                                xtype: 'panel',
                                border: false,
                                colspan: 2,
                                width: 110,
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                margin: '-10 0 0 110',
                                items: [
                                    Ext.create('Ext.button.Button', {
                                        width: 100,
                                        margin: '10 0 10 0',
                                        text: "生成",
                                        handler: 'onUnit'
                                    })
                                ]

                            },
                            {
                                fieldLabel: '备注',
                                xtype: 'textarea',
                                name: 'remark',
                                colspan: 2,
                                height: 52,
                                width: '98%',
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: true,
                                title: '附件',
                                margin: '-8 0 10 10 ',
                                colspan: 2,
                                layout: 'fit',
                                width: '95%',
                                listeners: {
                                    afterrender: function (obj) {
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
                                            post_params: { 'path': configs.AccountTaskPath },
                                            height: 200,
                                        })
                                    }
                                }

                            },
                        ]
                    }
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddTaskOK'
            }, {
                text: '取消',
                handler: "onClose"

            }]
        }];

        this.callParent();

    }
});
