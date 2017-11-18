Ext.define('TianZun.view.legalcasemanager.documents.XZCFSXGZS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XZCFSXGZS',
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
        var wsbh,dsr;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null') {
                    var model = Ext.decode(response.responseText);
                    wsbh = model.casebh;
                    dsr = model.p_name == '' ? model.f_name : model.p_name;
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综执法先告字') : wsbh;
                } else
                    wsbh = '';
            }
        });

        var gzszwmb =
        '<br /><br />根据《中华人民共和国行政处罚法》第三十一条、第三十二条的规定，如你（单位）对本机关上述认定的违法事实、处罚依据及处罚内容等有异议的，可在__年__月__日前（环保类案件有明文规定，陈述申辩期为7日）提出书面陈述、申辩意见，或到进行陈述、申辩。其中对你（单位）拟作出（符合听证条件的处罚种类、幅度）的行政处罚，符合听证条件，根据《中华人民共和国行政处罚法》第四十二条规定，你（单位）有要求举行听证的权利。如你（单位）要求举行听证，应当在收到本告知后3日内提出，逾期视为放弃听证权利。逾期不提供陈述、申辩意见，又不要求举行听证，本机关将依法作出行政处罚决定。';
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
                                name:'wsbh',
                                margin: '10 0 10 0',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                fieldLabel: '当事人',
                                name: 'dsr',
                                margin: '0 0 10 0',
                                colspan: 2,
                                value: me.record == null ? dsr : me.record.dsr
                            },
                            {
                                fieldLabel: '告知书正文',
                                xtype: 'htmleditor',
                                border:false,
                                name: 'gzszw',
                                width: 800,
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 200,
                                value: me.record == null ? gzszwmb : me.record.gzszw,
                                listeners: {
                                    render: function (obj) {
                                        obj.getToolbar().hide();
                                    }
                                }
                            },
                            {
                                fieldLabel: '单位地址',
                                name: 'dwdz',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dwdz
                            },
                            {
                                fieldLabel: '邮政编码',
                                name: 'yzbm',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.yzbm
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
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})