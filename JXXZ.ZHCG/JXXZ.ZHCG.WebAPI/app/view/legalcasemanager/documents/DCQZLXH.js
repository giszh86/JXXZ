Ext.define('TianZun.view.legalcasemanager.documents.DCQZLXH', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DCQZLXH',
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
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综联字') : wsbh;
                } else
                    wsbh = '';
            }
        });

        var ajjbqk =
       '<br/><br/><br/>请贵局以书面方式，协助完成以下调查取证事项：<br/>' +
        '1、<br/>' +
        '2、<br/>' +
        '3、<br/>' +
        '盼复函。<br/>' +
        '附';

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
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                fieldLabel: '文书编号',
                                colspan: 2,
                                width: '100%',
                                readOnly: true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                name: 'qhbm',
                                margin: '10 0 10 0',
                                fieldLabel: '去函部门',
                                value: me.record == null ? null : me.record.qhbm
                            },
                           {
                               name: 'cbbm',
                               margin: '10 0 10 0',
                               fieldLabel: '承办部门',
                               value: me.record == null ? null : me.record.cbbm
                           },
                           {
                               name: 'lxdh',
                               margin: '10 0 10 0',
                               fieldLabel: '联系电话',
                               value: me.record == null ? null : me.record.lxdh
                           },
                            {
                                name: 'lxr',
                                margin: '10 0 10 0',
                                fieldLabel: '联系人',
                                value: me.record == null ? $.cookie("USER_NAME") : me.record.lxr
                            },
                            {
                                xtype: 'htmleditor',
                                name: 'ajjbqk',
                                border: false,
                                fieldLabel: '案件基本情况',
                                width: 800,
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 180,
                                value: me.record == null ? ajjbqk : me.record.ajjbqk,
                                listeners: {
                                    render: function (obj) {
                                        obj.getToolbar().hide();
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                border: false,
                                name: 'qhrq',
                                editable: false,
                                fieldLabel: '去函日期',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                value: me.record == null ? new Date() : me.record.qhrq
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})