Ext.define('TianZun.view.legalcasemanager.casesource.CaseSourceAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.caseSourceAdd',
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
                overflowY:'auto',
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
                                name: 'userid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>案件来源',
                                xtype: 'combo',
                                name: 'sourceid',
                                margin: '10 0 10 10',
                                store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                                valueField: 'id',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                            },
                            {
                                name: 'contact',
                                margin: '10 0 10 0',
                                fieldLabel: '联系人',
                            },
                            {
                                name: 'contactphone',
                                margin: '10 0 10 10',
                                fieldLabel: '联系电话',
                            },
                            {
                                name: 'contactaddress',
                                margin: '10 0 10 0',
                                fieldLabel: '联系地址',
                            },
                            {
                                name: 'wfxwfsdz',
                                fieldLabel: '违法行为发生地',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                            },
                            {
                                name: 'cluecontent',
                                fieldLabel: '<span style="color:red">*</span>线索内容',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                                allowBlank: false,
                            },
                            {
                                name: 'processopinion',
                                fieldLabel: '<span style="color:red">*</span>处理意见',
                                xtype: 'textarea',
                                margin: '10 0 10 10',
                                width: '95%',
                                height: 20,
                                colspan: 2,
                                allowBlank: false,
                            },
                            {
                                name: 'notetaker',
                                fieldLabel: '<span style="color:red">*</span>记录人',
                                margin: '10 0 10 10',
                                value: $.cookie('USER_NAME'),
                                allowBlank: false,
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'notetime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>记录时间',
                                margin: '10 0 10 10',
                                format:'Y-m-d H:i:s'
                            },
                            {
                                xtype: 'radiogroup',
                                fieldLabel: '操作',
                                margin: '10 0 10 10',
                                name: 'status',
                                items: [
                                    {
                                        boxLabel: '暂存',
                                        name: 'status',
                                        inputValue: '3',
                                        checked: true,
                                    },
                                    {
                                        boxLabel: '立案',
                                        name: 'status',
                                        inputValue: '1',

                                    },
                                    {
                                        boxLabel: '不予立案',
                                        name: 'status',
                                        inputValue: '2'
                                    },
                                    {
                                        boxLabel: '移交',
                                        name: 'status',
                                        inputValue: '4'
                                    },
                                ],
                                listeners: {
                                    change: function (obj) {
                                        if (obj.lastValue.status == '1') {
                                            me.down('combo[name=casetype]').allowBlank = false;
                                            me.down('combo[name=yjdwid]').allowBlank = true;
                                            me.down('combo[name=casetype]').show();
                                            me.down('combo[name=yjdwid]').hide();
                                        }
                                        else if (obj.lastValue.status == '4') {
                                            me.down('combo[name=casetype]').allowBlank = true;
                                            me.down('combo[name=yjdwid]').allowBlank = false;
                                            me.down('combo[name=yjdwid]').show();
                                            me.down('combo[name=casetype]').hide();
                                        }
                                        else {
                                            me.down('combo[name=casetype]').allowBlank = true;
                                            me.down('combo[name=yjdwid]').allowBlank = true;
                                            me.down('combo[name=yjdwid]').hide();
                                            me.down('combo[name=casetype]').hide();
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
                                    render: function (obj) {
                                        obj.hide();
                                    }
                                }
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
                                    render: function (obj) {
                                        obj.hide();
                                    }
                                }
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
                            text: '确定',
                            width: 80,
                            name: 'btnsubmit',
                            handler: 'onAddOK',
                        }, {
                            html: '<label style="color:#3892d4;">返回</label>',
                            width: 80,
                            name: 'btncancle',
                            handler: 'onReturnList',
                            style: 'background:white;',
                        }]
                    },
                ],

            }
        ]
        this.callParent();

    }
})