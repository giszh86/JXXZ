Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseXZCFJDS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseXZCFJDS',
    layout: 'fit',
    width: '100%',
    height: '100%',
    name: 'XZCFJDS',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var records;
        Ext.Ajax.request({
            url: configs.WebApi + 'api/CommonCase/GetFlowSaveInfo?wfsaid=' + me.record.get('wfsaid') + '&type=0',
            method: 'get',
            async: false,
            success: function (response) {
                records = JSON.parse(response.responseText);
            }
        });

        this.items =
            {
                xtype: 'form',
                border: false,
                items: [
                {
                    xtype: 'fieldset',
                    layout: {
                        type: 'table',
                        columns:2,
                    },
                    items: [
                        {
                            xtype: 'hidden',
                            name: 'caseid',
                            value: me.recordbaseinfo.caseid,
                        },
                        {
                            xtype: 'hidden',
                            name: 'userid',
                            value: $.cookie('USER_ID'),
                        },
                        {
                            xtype: 'hidden',
                            name: 'wfsid',
                            value: me.record.get('wfsid'),
                        },
                        {
                            xtype: 'hidden',
                            name: 'wfdid',
                            value: me.record.get('wfdid')
                        },
                        {
                            fieldLabel: '送达备注',
                            margin: '10 0 10 0',
                            labelAlign: 'right',
                            xtype: 'textarea',
                            name: 'sdremark',
                            colspan: 2,
                            width: '100%',
                            height: 100,
                            readOnly:me.ishandle==0?true:false,
                            value: records == null ? null : records.sdremark
                        },
                        {
                            fieldLabel: '当事人执行方式',
                            id: 'dsrzxfs',
                            name: 'dsrzxfs',
                            labelAlign: 'right',
                            xtype: 'radiogroup',
                            margin: '10 0 10 0',
                            width: 700,
                            colspan: 2,
                            items: [
                                {
                                    boxLabel: '当事人无异议',
                                    name: 'dsrzxfs',
                                    inputValue: '2017030613500023,1',
                                    width: 150,
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: (records == null || records.dsrzxfs == null) ? true : records.dsrzxfs == '2017030613500023,1' ? true : false
                                },
                                {
                                    boxLabel: '当事人对行政处罚决定书的内容提出异议',
                                    name: 'dsrzxfs',
                                    inputValue: '2017030613500027',
                                    width: 300,
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: records == null ? false : records.dsrzxfs == '2017030613500027' ? true : false
                                },
                                {
                                    boxLabel: '行政强制执行',
                                    name: 'dsrzxfs',
                                    inputValue: '2017030613500023,3',
                                    width: 150,
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: records == null ? false : records.dsrzxfs == '2017030613500023,3' ? true : false
                                },
                            ],
                        },
                        {
                            fieldLabel: '是否移交',
                            name: 'sfyj',
                            labelAlign: 'right',
                            xtype: 'radiogroup',
                            margin: '10 0 10 0',
                            width: '100%',
                            colspan: 2,
                            items: [
                                {
                                    boxLabel: '是',
                                    name: 'sfyj',
                                    inputValue: '1',
                                    width: 100,
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: (records == null || records.sfyj ==null) ? false : records.sfyj == '1' ? true : false
                                },
                                {
                                    boxLabel: '否',
                                    name: 'sfyj',
                                    inputValue: '0',
                                    width: 100,
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: (records == null || records.sfyj == null) ? true : records.sfyj == '0' ? true : false
                                },
                            ],
                            listeners: {
                                change: function (obj) {
                                    if (obj.getValue().sfyj == '1') {
                                        me.down('textfield[name=yjdw]').show();
                                        me.down('datefield[name=yjtime]').show();
                                    } else {
                                        me.down('textfield[name=yjdw]').hide();
                                        me.down('datefield[name=yjtime]').hide();
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: '移交单位',
                            xtype: 'combo',
                            labelAlign: 'right',
                            labelWidth: 100,
                            name: 'yjdw',
                            hidden:(records!=null && records.sfyj =='1')?false:true,
                            width: '100%',
                            margin: '0 0 10 0',
                            editable:false,
                            store: Ext.create('Ext.data.Store', {
                                data: [
                                    { id: '公安', name: '公安' },
                                    { id: '国资', name: '国资' },
                                    { id: '纪委', name: '纪委' },
                                    { id: '法院', name: '法院' },
                                ]
                            }),
                            valueField:'id',
                            displayField:'name',
                            readOnly: me.ishandle == 0 ? true : false,
                            listeners:{
                                afterrender:function(obj){
                                    if (records != null && records.yjdw != null)
                                    {
                                        obj.setValue(records.yjdw);
                                        obj.getStore().reload();
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: '移送时间',
                            xtype: 'datefield',
                            labelAlign: 'right',
                            labelWidth: 100,
                            name: 'yjtime',
                            hidden: (records != null && records.sfyj == '1') ? false : true,
                            width: '100%',
                            margin: '0 0 10 0',
                            editable: false,
                            format: 'Y-m-d',
                            readOnly: me.ishandle == 0 ? true : false,
                            value: records.yjtime == null ? new Date(Ext.Date.now()) : new Date(records.yjtime)
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
                        text: '暂存',
                        width: 80,
                        hidden: me.ishandle == 1 ? false : true,
                        name: 'btnsubmit',
                        handler: 'onFlowSaveOK',
                    }, {
                        html: '<label style="color:#3892d4;">返回</label>',
                        width: 80,
                        name: 'btncancle',
                        handler: 'onReturnList',
                        style: 'background:white;',
                    }]
                }
                ]
            }
        this.callParent();

    }
})