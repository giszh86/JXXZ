Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDSRYJFK', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseDSRYJFK',
    layout: 'fit',
    width: '100%',
    height: '100%',
    name: 'DSRYJFK',
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
                    layout: 'vbox',
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
                            fieldLabel: '当事人意见反馈',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            name: 'dsrreplay',
                            colspan: 2,
                            width: '100%',
                            height: 100,
                            readOnly: me.ishandle == 0 ? true : false,
                            value: records == null ? null : records.dsrreplay
                        },
                        {
                            fieldLabel: '当事人意见',
                            id: 'dsryj',
                            name: 'dsryj',
                            labelAlign:'right',
                            xtype: 'radiogroup',
                            margin: '10 0 10 10',
                            width: '40%',
                            colspan: 2,
                            items: [
                                {
                                    boxLabel: '自己履行',
                                    name: 'dsryj',
                                    inputValue: '2017030613500017,1',
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: (records == null || records.dsryj == null) ? true : records.dsryj == '2017030613500017,1'?true:false
                                },
                                {
                                    boxLabel: '申诉申辩',
                                    name: 'dsryj',
                                    inputValue: '2017030613500017,2',
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: records == null ? false : records.dsryj == '2017030613500017,2' ? true : false
                                },
                                {
                                    boxLabel: '申请听证',
                                    name: 'dsryj',
                                    inputValue: '2017030613500016',
                                    readOnly: me.ishandle == 0 ? true : false,
                                    checked: records == null ? false : records.dsryj == '2017030613500016' ? true : false
                                },
                            ],
                            listeners: {
                                change: function (obj) {
                                    var checkedvalue = obj.getValue().dsryj;
                                    obj.up().down('datefield[name=cssbtime]').setValue('');
                                    if (checkedvalue == '2017030613500017,2') {
                                        obj.up().down('datefield[name=cssbtime]').show();
                                    } else {
                                        obj.up().down('datefield[name=cssbtime]').hide();
                                    }
                                }
                            },
                        },
                        {
                            fieldLabel: '陈诉申辩时间',
                            xtype:'datefield',
                            labelAlign: 'right',
                            labelWidth: 110,
                            name:'cssbtime',
                            width: 490,
                            colspan: 2,
                            margin: '0 0 10 0',
                            editable: false,
                            format: 'Y-m-d',
                            hidden: true,
                            readOnly: me.ishandle == 0 ? true : false,
                            value: records == null ? null : records.cssbtime
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
                        hidden:me.ishandle==1?false:true,
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