Ext.define('TianZun.view.legalcasemanager.casesource.CaseSourceLook', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseSourceLook',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.CaseSource',
    ],
    controller: 'caseSource',

    margin: '20 0 0 0',
    id: 'changePanel',
    name: 'changePanel',
    width: '76%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                overflowY: 'auto',
                items: [
                    {
                        xtype: 'box',
                        width: '100%',
                        height: 60,
                        style: 'line-height:60px;border:1px solid #bbb;border-bottom: none;',
                        colspan: 2,
                        html: '<label style="font-size:16px;margin-left:15px;">案源录入(<b style="color:red;">*</b>必填)<label>',
                    },
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 65
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 450
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'caseid',
                                value: me.record.get('caseid'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'wfsid',
                                value: me.record.get('wfsid'),
                            },
                            {
                                fieldLabel: '案件来源',
                                xtype: 'combo',
                                name: 'sourceid',
                                margin: '10 0 10 10',
                                editable: me.ishandle == 1 ? true : false,
                                readOnly: me.isedit == 1 ? true : me.ishandle == 1?false:true,
                                value: me.record.get('sourceid'),
                                store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                                valueField: 'id',
                                displayField: 'name',
                                listeners: {
                                    render: function (combo) {
                                        this.getStore().load();
                                    }
                                },
                            },
                            {
                                name: 'contact',
                                margin: '10 0 10 0',
                                fieldLabel: '联系人',
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('contact'),
                            },
                            {
                                name: 'contactphone',
                                margin: '10 0 10 10',
                                fieldLabel: '联系电话',
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('contactphone'),
                            },
                            {
                                name: 'contactaddress',
                                margin: '10 0 10 0',
                                fieldLabel: '联系地址',
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('contactaddress'),
                            },
                            {
                                name: 'wfxwfsdz',
                                fieldLabel: '违法行为发生地',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('wfxwfsdz'),
                            },
                            {
                                name: 'cluecontent',
                                fieldLabel: '线索内容',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('cluecontent'),
                            },
                            {
                                name: 'processopinion',
                                fieldLabel: '处理意见',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('processopinion'),
                            },
                            {
                                name: 'notetaker',
                                fieldLabel: '记录人',
                                margin: '10 0 10 10',
                                editable: me.ishandle == 1 ? true : false,
                                value: me.record.get('notetaker'),
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'notetime',
                                editable: me.ishandle == 1 ? true : false,
                                readOnly: me.isedit == 1 ? true : me.ishandle == 1 ? false : true,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>记录时间',
                                margin: '10 0 10 10',
                                value: me.record.get('notetime'),
                                format: 'Y-m-d H:i:s'
                            },
                            {
                                xtype: 'radiogroup',
                                fieldLabel: '操作',
                                margin: '10 0 10 10',
                                allowBlank:false,
                                name: 'status',
                                items: [
                                    {
                                        boxLabel: '暂存',
                                        name: 'status',
                                        inputValue: '3',
                                        readOnly: (me.ishandle != 1 || me.isedit == 1) ? true : false,
                                    },
                                    {
                                        boxLabel: '立案',
                                        name: 'status',
                                        inputValue: '1',
                                        readOnly: (me.ishandle != 1 || me.isedit == 1)?true:false,
                                    },
                                    {
                                        boxLabel: '不予立案',
                                        name: 'status',
                                        inputValue: '2',
                                        readOnly: (me.ishandle != 1 || me.isedit == 1) ? true : false,
                                    },
                                    {
                                        boxLabel: '移交',
                                        name: 'status',
                                        inputValue: '4',
                                        readOnly: (me.ishandle != 1 || me.isedit == 1) ? true : false,
                                    },
                                ],
                                value: me.record.get('status'),
                                listeners: {
                                    render: function (obj) {
                                        var status = me.record.get('status');
                                        obj.down('radio[inputValue=' + status + ']').setValue(true);
                                        if (me.ishandle != 1 || me.isedit == 1) {
                                            if (status == 1)
                                                obj.up().down('combo[name=casetype]').show();
                                            if (status == 4)
                                                obj.up().down('combo[name=yjdwid]').show();
                                        }
                                    },
                                    change: function (obj) {
                                        if (me.ishandle == 1) {
                                            if (obj.getValue().status == '1') {
                                                obj.up().down('combo[name=casetype]').allowBlank = false;
                                                obj.up().down('combo[name=yjdwid]').allowBlank = true;
                                                obj.up().down('combo[name=casetype]').show();
                                                obj.up().down('combo[name=yjdwid]').hide();
                                            }
                                            else if (obj.getValue().status == '4') {
                                                obj.up().down('combo[name=casetype]').allowBlank = true;
                                                obj.up().down('combo[name=yjdwid]').allowBlank = false;
                                                obj.up().down('combo[name=yjdwid]').show();
                                                obj.up().down('combo[name=casetype]').hide();
                                            }
                                            else {
                                                obj.up().down('combo[name=casetype]').allowBlank = true;
                                                obj.up().down('combo[name=yjdwid]').allowBlank = true;
                                                obj.up().down('combo[name=yjdwid]').hide();
                                                obj.up().down('combo[name=casetype]').hide();
                                            }
                                        }
                                    }
                                },
                            },
                            {
                                fieldLabel: '案件类型',
                                xtype: 'combo',
                                editable: false,
                                store: Ext.create('Ext.data.Store', {
                                    data: [
                                        { ID: '1', Name: '简易案件' },
                                        { ID: '2', Name: '一般案件' },
                                    ]
                                }),
                                name: 'casetype',
                                valueField: 'ID',
                                displayField: 'Name',
                                listeners: {
                                    afterrender: function (combo) {
                                        if (me.record.get('casetype') != null) {
                                            combo.getStore().load();
                                            combo.setValue(me.record.get('casetype'));
                                        }
                                        if (me.ishandle != 1) {
                                            combo.setReadOnly(true);
                                        }
                                        if (me.ishandle == 1 || me.record.get('status') != 1)
                                            combo.hide();
                                    }
                                },
                            },
                            {
                                fieldLabel: '移交单位',
                                xtype: 'combo',
                                editable: false,
                                store: Ext.create('TianZun.store.legalcasemanager.TransferUnit'),
                                name: 'yjdwid',
                                valueField: 'id',
                                displayField: 'name',
                                listeners: {
                                    afterrender: function (combo) {
                                        if (me.record.get('yjdwid') != null) {
                                            combo.getStore().load();
                                            combo.setValue(me.record.get('yjdwid'));
                                        }
                                        if (me.ishandle != 1) {
                                            combo.setReadOnly(true);
                                        }
                                        if (me.ishandle == 1 || me.record.get('status') != 4)
                                            combo.hide();
                                    }
                                },
                            },
                        ],

                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        width: '100%',
                        buttonAlign: 'center',
                        style: 'background-color:none;',
                        buttons: [{
                            text: '提交',
                            width: 80,
                            name: 'btnsubmit',
                            handler: 'onSubmitOK',
                            listeners: {
                                render: function (obj) {
                                    if (me.ishandle != 1 || me.isedit == 1) {
                                        obj.hide();
                                    }
                                }
                            }
                        }, {
                            html: '<label style="color:#3892d4;">返回</label>',
                            width: 80,
                            name: 'btncancle',
                            handler: 'onReturnList',
                            tabtitle:me.tabtitle,
                            style: 'background:white;',
                        }]
                    },
                ],
            },
        ]

        this.callParent();
    }
})