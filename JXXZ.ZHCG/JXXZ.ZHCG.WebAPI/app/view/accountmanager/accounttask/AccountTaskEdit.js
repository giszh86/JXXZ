Ext.define('TianZun.view.accountmanager.accounttask.AccountTaskEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountTaskEdit',
    title: '台帐任务信息编辑',
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.accountmanager.accounttask.TaskFileListStore', { proxy: { type: 'ajax', extraParams: { TaskID: this.record.get("taskid") } } });

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1015,
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
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'createuserid',
                                value: $.cookie("USER_ID")
                            },
                            {
                                xtype: 'hidden',
                                name: 'taskid',
                                value: this.record.get("taskid")
                            },
                            {
                                xtype: 'hidden',
                                name: 'tz_json',
                                value: this.record.get("tz_json")
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'storeZD',
                                 value: '',
                             },
                            {
                                fieldLabel: '<span style="color:red">*</span>台帐任务名称',
                                xtype: 'textfield',
                                name: 'taskname',
                                allowBlank: false,
                                width: 600,
                                value: this.record.get("taskname"),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>任务所属年度',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.common.YearStore'),
                                displayField: 'Value',
                                valueField: 'Value',
                                width: '94%',
                                name: "taskyear",
                                margin: '0 0 10 0',
                                allowBlank: false,
                                value: this.record.get('taskyear'),
                                editable: false,
                                beforeRender: function () {
                                    this.getStore().load();
                                }
                            },
                            {
                                fieldLabel: '任务分类<span style="color:red">*</span>',
                                xtype: 'textarea',
                                name: 'ssrw',
                                colspan: 2,
                                height: 52,
                                width: 950,
                                readOnly:true,
                                value: this.record.get("ssrw")
                            },
                            //{
                            //    xtype: 'tagfield',
                            //    fieldLabel: '<span style="color:red">*</span>任务分类',
                            //    store: Ext.create('TianZun.store.citizenservice.PunishType'),
                            //    displayField: 'Name',
                            //    valueField: 'ID',
                            //    name: "TypeArr",
                            //    allowBlank: false,
                            //    value: me.TypeArr,
                            //    labelAlign: 'right',
                            //    readOnly:true,
                            //    margin: '0 0 10 0',
                            //    colspan: 2,
                            //    height: 52,
                            //    width: 950,
                            //    beforeRender: function () {
                            //        this.getStore().load();
                            //    }
                            //},
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
                                         margin: '0 0 10 -5',
                                         width: 200,
                                         allowBlank: false,
                                         name: 'tz_type',
                                         value: this.record.get("tz_type"),
                                         editable: false,
                                         listeners: {
                                             'change': function (obj)
                                             {
                                                 var starttime = me.down('datetimefield[name=starttime]').getValue();
                                                 var enddate;
                                                 if (obj.getValue() == 1) {//月
                                                     enddate = Ext.Date.add(new Date(starttime), Ext.Date.MONTH, +1);
                                                 }
                                                 else {//年
                                                     enddate = Ext.Date.add(new Date(starttime), Ext.Date.YEAR, +1);
                                                 }
                                                 me.down('datetimefield[name=endtime]').setValue(enddate);
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
                                                value: new Date(this.record.get("starttime"))
                                            },
                                            {
                                                xtype: 'datetimefield',
                                                border: false,
                                                name: 'endtime',
                                                editable: false,
                                                allowBlank: false,
                                                fieldLabel: '至',
                                                labelWidth: 20,
                                                margin: '10 0 10 0',
                                                format: 'Y-m-d H:i:s',
                                                value: new Date(this.record.get("endtime"))
                                            },
                                        ],
                                    },
                                ]
                            },
                             {
                                 fieldLabel: '所属中队',
                                 xtype: 'textarea',
                                 name: 'sszd',
                                 colspan: 2,
                                 height: 52,
                                 width: 950,
                                 readOnly: true,
                                 value: this.record.get("sszd")
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
                               margin: '10 0 0 110',
                               items: [
                                   Ext.create('Ext.button.Button', {
                                       width: 100,
                                       margin: '10 0 10 0',
                                       text: "查看",
                                       handler: 'onUnitLook'
                                   })
                               ]

                           },
                            {
                                fieldLabel: '备注',
                                xtype: 'textarea',
                                name: 'remark',
                                colspan: 2,
                                height: 52,
                                width: 950,
                                value: this.record.get("remark")
                            },
                            {
                                xtype: 'imageshowpanel',
                                store: store,
                                margin: '0 10 10 60',
                                colspan: 2,
                                path: configs.AccountTaskPath,
                                width: 890,
                            },

                            {
                                xtype: 'fieldset',
                                collapsible: true,
                                title: '新增附件',
                                collapsed: true,
                                margin: '0 10 10 60 ',
                                colspan: 2,
                                width: 890,
                                layout: 'fit',
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
                handler: 'onEditTaskOK'
            }, {
                text: '取消',
                handler: "onClose"

            }]
        }];

        this.callParent();

    }
});