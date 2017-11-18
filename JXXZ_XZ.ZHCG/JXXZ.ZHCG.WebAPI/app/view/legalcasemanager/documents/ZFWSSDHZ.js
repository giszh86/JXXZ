Ext.define('TianZun.view.legalcasemanager.documents.ZFWSSDHZ', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ZFWSSDHZ',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        //添加文书时获取文书编号
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var caseid = me.caseid != null ? me.caseid : panel.caseid != null ? panel.caseid : panel.record.get('caseid') != null ? panel.record.get('caseid') : null;
        var wsbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null') {
                    wsbh = Ext.decode(response.responseText).casebh;
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综回证字') : wsbh;
                } else
                    wsbh = '';
            }
        });

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                items: [
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 100
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 450
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'edituserid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'dwfsasid',
                                value: me.dwfsasid == null ? null : me.dwfsasid,
                            },
                            {
                                name: 'ssdrmchxm',
                                margin: '10 0 10 0',
                                fieldLabel: '受送达人名称或姓名',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.ssdrmchxm
                            },
                            {
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                fieldLabel: '文书编号',
                                width: '100%',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                             {
                                 name: 'sdwsmcjwh',
                                 margin: '10 0 10 0',
                                 fieldLabel: '送达文书名称及文号',
                                 width: '100%',
                                 colspan: 2,
                                 value: me.record == null ? null : me.record.sdwsmcjwh
                             },
                             {
                                 xtype: 'datefield',
                                 border: false,
                                 name: 'sdrq',
                                 editable: false,
                                 fieldLabel: '送达日期',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d',
                                 width: '100%',
                                 value: me.record == null ? null : me.record.sdrq
                             },

                            {
                                name: 'sddd',
                                margin: '10 0 10 0',
                                fieldLabel: '送达地点',
                                width: '100%',
                                value: me.record == null ? null : me.record.sddd
                            },
                            {
                                name: 'sdfs',
                                margin: '10 0 10 0',
                                fieldLabel: '送达方式',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.sdfs
                            },
                            {
                                name: 'bz',
                                margin: '10 0 10 0',
                                fieldLabel: '备注',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.bz
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})