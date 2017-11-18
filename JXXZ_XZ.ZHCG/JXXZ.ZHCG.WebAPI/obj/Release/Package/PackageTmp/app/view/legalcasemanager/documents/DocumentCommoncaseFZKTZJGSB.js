Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseFZKTZJGSB', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseFZKTZJGSB',
    layout: 'fit',
    width: '100%',
    height: '100%',
    name: 'FZKTZJGSB',
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
                        columns: 2,
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
                            fieldLabel: '听证结果说明',
                            margin: '10 0 10 0',
                            labelAlign: 'right',
                            xtype: 'textarea',
                            name: 'tzjgsm',
                            colspan: 2,
                            width: '100%',
                            height: 100,
                            readOnly: me.ishandle == 0 ? true : false,
                            value: records == null ? null : records.tzjgsm
                        },
                        {
                            fieldLabel: '处理人',
                            xtype: 'textfield',
                            labelAlign: 'right',
                            labelWidth: 100,
                            name: 'tzclr',
                            width: '100%',
                            margin: '0 0 10 0',
                            readOnly: true,
                            value: $.cookie('USER_NAME')
                        },
                        {
                            fieldLabel: '处理时间',
                            xtype: 'datefield',
                            labelAlign: 'right',
                            labelWidth: 100,
                            name: 'tzcltime',
                            width: '100%',
                            margin: '0 0 10 0',
                            readOnly: true,
                            format: 'Y-m-d',
                            value: Ext.Date.format(new Date(), 'Y-m-d')
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