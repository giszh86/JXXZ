Ext.define('TianZun.view.legalcasemanager.documents.FKCJTZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FKCJTZS',
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
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综罚款催字') : wsbh;
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
                                fieldLabel: '文书编号',
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                readOnly: true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                name: 'dsr',
                                margin: '10 0 10 0',
                                fieldLabel: '当事人',
                                value: me.record == null ? null : me.record.dsr
                            },
                            {
                                name: 'xzcfjdsbh',
                                margin: '10 0 10 0',
                                fieldLabel: '决定书编号',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.xzcfjdsbh
                            },
                             {
                                 xtype: 'datefield',
                                 border: false,
                                 name: 'cfrq',
                                 editable: false,
                                 fieldLabel: '处罚日期',
                                 margin: '10 0 10 0',
                                 format: 'Y-m-d',
                                 width: '100%',
                                 value: me.record == null ? null : me.record.cfrq
                             },
                            {
                                xtype: 'datefield',
                                border: false,
                                name: 'gdjkrq',
                                editable: false,
                                fieldLabel: '规定缴款日期',
                                margin: '10 0 10 0',
                                format: 'Y-m-d',
                                value: me.record == null ? null : me.record.gdjkrq,
                                validator: function ()
                                {
                                    var cfrq = me.down("datefield[name=cfrq]").getValue();
                                    var gdjkrq = me.down("datefield[name=gdjkrq]").getValue();
                                    if (cfrq > gdjkrq)
                                    {
                                        return '处罚日期不得晚于规定的缴款日期!';
                                    }
                                    else
                                    {
                                        return true;
                                    }
                                }
                            },
                            {
                                name: 'yhzh',
                                margin: '10 0 10 0',
                                fieldLabel: '银行账号',
                                colspan: 2,
                                width: '100%',
                                value: me.record == null ? null : me.record.yhzh,
                                validator: function (v)
                                {
                                    //银行账号
                                    var accountnum = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/;
                                    if (!accountnum.test(v))
                                    {
                                        return "银行账号含有特殊字符，请核对！";
                                    }
                                    else
                                    {
                                        return true;
                                    }
                                }
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})