Ext.define('TianZun.view.accountmanager.accounttask.AccountTaskLook', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.accountTaskLook',
    title: '台帐任务信息',
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
                                name: 'userid',
                                value: $.cookie("USER_ID")
                            },
                             {
                                 xtype: 'hidden',
                                 name: 'tz_json',
                                 value: this.record.get("tz_json")
                             },
                            {
                                fieldLabel: '台帐任务名称<span style="color:red">*</span>',
                                xtype: 'textfield',
                                name: 'taskname',
                                allowBlank: false,
                                value: this.record.get("taskname"),
                                editable: false,
                                width: 590
                            },
                            {
                                fieldLabel: '任务所属年度<span style="color:red">*</span>',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.common.YearStore'),
                                displayField: 'Value',
                                valueField: 'Value',
                                name: "taskyear",
                                allowBlank: false,
                                value: this.record.get('taskyear'),
                                editable: false,
                                readOnly: true,
                                margin: '0 0 10 0',
                                width: '94%',
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
                                width: '98%',
                                value: this.record.get('ssrw'),
                                readOnly: true,
                            },
                            //{
                            //    xtype: 'tagfield',
                            //    fieldLabel: '任务分类<span style="color:red">*</span>',
                            //    store: Ext.create('TianZun.store.citizenservice.PunishType'),
                            //    displayField: 'Name',
                            //    valueField: 'ID',
                            //    name: "TypeArr",
                            //    allowBlank: false,
                            //    value: me.TypeArr,
                            //    labelAlign: 'right',
                            //    margin: '0 0 10 7.5',
                            //    colspan: 2,
                            //    height: 70,
                            //    width: 943,
                            //    readOnly: true,
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
                                             xtype: 'textfield',
                                             fieldLabel: '<span style="color:red">*</span>台帐类型',
                                             name: "tz_type",
                                             width: 260,
                                             allowBlank: false,
                                             value: this.record.get("tz_type"),
                                             editable: false,
                                             readOnly: true,
                                         },
                                        {
                                            xtype: 'panel',
                                            margin: '0 10 10 0',
                                            border: false,
                                            layout: 'hbox',
                                            colspan: 2,
                                            items: [
                                               {
                                                   xtype: 'label',
                                                   forId: 'myFieldId',
                                                   html: '<span style="color:red">*</span>任务期限',
                                                   margin: '15 0 10 10',
                                               },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'starttime',
                                                    margin: '10 0 10 10',
                                                    format: 'Y-m-d H:i',
                                                    value: this.record.get("starttime"),
                                                    readOnly: true,
                                                },

                                                 {
                                                     xtype: 'label',
                                                     forId: 'myFieldId',
                                                     html: '<span style="color:red">*</span>至',
                                                     margin: '15 0 10 0',
                                                 },
                                                 {
                                                     xtype: 'textfield',
                                                     name: 'endtime',
                                                     margin: '10 0 10 10',
                                                     format: 'Y-m-d H:i',
                                                     value: this.record.get("endtime"),
                                                     readOnly: true,
                                                 },
                                            ]

                                        },

                                    ]

                                },
                            {
                                fieldLabel: '所属中队',
                                xtype: 'textarea',
                                name: 'sszd',
                                colspan: 2,
                                height: 52,
                                width: '98%',
                                value: this.record.get('sszd'),
                                readOnly: true,
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
                                width: '98%',
                                value: this.record.get('remark'),
                                readOnly: true,
                            },
                            {
                                xtype: 'imageshowpanel',
                                store: store,
                                margin: '0 10 10 60',
                                colspan: 2,
                                path: configs.AccountTaskPath,
                                width: 860,
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