Ext.define('TianZun.view.legalcasemanager.documents.ZLXQZGZLS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ZLXQZGZLS',
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
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综执责改') : wsbh;
                } else
                    wsbh = '';
            }
        });

        var wtms =
       '<br/><br/>达到有关法律法规规章和标准规定的要求。逾期不整改或达不到要求的，依法给予行政处罚；由此造成事故的，依法追究有关人员的责任。<br/>' +
        '如果不服本指令，可以依法在60日内向嘉兴市秀洲区人民政府或者嘉兴市综合行政执法局申请行政复议，或者在六个月内依法向嘉兴市秀洲区人民法院提起行政诉讼，但本指令不停止执行，法律另有规定的除外。<br/>';

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
                                name: 'wjbh',
                                margin: '10 0 10 0',
                                fieldLabel: '文书编号',
                                width: '100%',
                                colspan: 2,
                                readOnly: true,
                                value: me.record == null ? wsbh : me.record.wjbh
                            },
                            {
                                name: 'dsr',
                                margin: '10 0 10 0',
                                fieldLabel: '当事人',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.dsr
                            },
                             {
                                 xtype: 'htmleditor',
                                 name: 'wtms',
                                 border: false,
                                 fieldLabel: '问题描述',
                                 width: 800,
                                 colspan: 2,
                                 margin: '10 0 10 0',
                                 height: 180,
                                 value: me.record == null ? wtms : me.record.wtms,
                                 listeners: {
                                     render: function (obj) {
                                         obj.getToolbar().hide();
                                     }
                                 }
                             },
                            
                            {
                                name: 'zfdy1',
                                margin: '10 0 10 0',
                                fieldLabel: '执法人员1',
                                value: me.record == null ? null : me.record.zfdy1
                            },
                             {
                                 name: 'zfzh1',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法证号1',
                                 value: me.record == null ? null : me.record.zfzh1
                             },
                             {
                                 name: 'zfdy2',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法人员2',
                                 value: me.record == null ? null : me.record.zfdy2
                             },
                             {
                                 name: 'zfzh2',
                                 margin: '10 0 10 0',
                                 fieldLabel: '执法证号2',
                                 value: me.record == null ? null : me.record.zfzh2
                             },
                           
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})