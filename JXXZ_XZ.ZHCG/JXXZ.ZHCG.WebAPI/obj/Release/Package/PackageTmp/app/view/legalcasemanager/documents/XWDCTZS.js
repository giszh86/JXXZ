Ext.define('TianZun.view.legalcasemanager.documents.XWDCTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XWDCTZS',
    layout: 'fit',
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
                if (response.responseText != 'null')
                    wsbh = Ext.decode(response.responseText).casebh;
                else
                    wsbh = '';
            }
        });

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                overflowY: 'auto',
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
                                fieldLabel: '文书编号',
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                fieldLabel: '当事人',
                                name: 'dsr',
                                colspan: 2,
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dsr
                            },
                            {
                                fieldLabel: '案发时间',
                                name: 'afsj',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.afsj
                            },
                            {
                                fieldLabel: '案发地点',
                                name: 'afdd',
                                margin: '0 0 10 0',                                
                                value: me.record == null ? null : me.record.afdd
                            },
                            {
                                fieldLabel: '调查询问时间',
                                name: 'dcxwsj',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dcxwsj
                            },
                            {
                                fieldLabel: '调查询问地点',
                                name: 'dcxwdd',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dcxwdd
                            },
                            {
                                fieldLabel: '违反的规定',
                                xtype: 'textarea',
                                name: 'wfgd',
                                width: '100%',
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 50,
                                value: me.record == null ? null : me.record.wfgd
                            },
                            {
                                xtype: 'checkboxgroup',
                                fieldLabel: '当事人需提交的材料',
                                name: 'tjcl',
                                width: '100%',
                                colspan: 2,
                                layout: 'vbox',
                                items: [
                                    {
                                        boxLabel: '身份证',
                                        name: 'clsfz',
                                        inputValue:'身份证'
                                    },
                                    {
                                        boxLabel: '营业执照',
                                        name: 'clyyzz',
                                        inputValue: '营业执照'
                                    },
                                    {
                                        boxLabel: '法定代表人身份证明或委托书',
                                        name: 'clsfzmhwts',
                                        inputValue: '法定代表人身份证明或委托书'
                                    },
                                    {
                                        boxLabel: '与本次调查有关的其他证明材料',
                                        name: 'clqtzm',
                                        inputValue: '与本次调查有关的其他证明材料'
                                    },
                                ]
                            },
                            {
                                fieldLabel: '联系人',
                                name: 'lxr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.lxr
                            },                            
                            {
                                fieldLabel: '联系电话',
                                name: 'lxdh',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.lxdh
                            },
                            {
                                fieldLabel: '联系地址',
                                name: 'lxdz',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.lxdz
                            },
                            {
                                fieldLabel: '发出日期',
                                name: 'fcrq',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.fcrq
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})