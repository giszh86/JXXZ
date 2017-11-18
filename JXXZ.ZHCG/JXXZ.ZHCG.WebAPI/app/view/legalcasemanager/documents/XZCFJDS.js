Ext.define('TianZun.view.legalcasemanager.documents.XZCFJDS', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XZCFJDS',
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
        var jsonstr, wsbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null') {
                    jsonstr = Ext.decode(response.responseText);
                    wsbh = jsonstr.casebh;
                    wsbh = wsbh.indexOf('秀综执立') >= 0 ? wsbh.replace('秀综执立', '秀综执罚决字') : wsbh;
                } else
                    wsbh = '';
            }
        });

        var jdsmb =
        '<br /><br />本决定书自送达之日起生效。<br />' +
        '被处罚人应当自收到本处罚决定书之日起十五日内，自行到农行秀洲支行各网点交纳罚款。收款单位全称：嘉兴市秀洲区非税收入管理中心征收专户，账号：193201010400725210000028001。逾期不缴纳，依据《中华人民共和国行政处罚法》第五十一条第一项规定，每日可以按罚款数额的3%加处罚款。<br />' +
        '被处罚人对本行政处罚决定不服，可在接到本行政处罚决定书之日起六十日内，向秀洲区人民政府或嘉兴市综合行政执法局申请行政复议；也可在收到本决定书之日起六个月内直接向秀洲区人民法院提起行政诉讼。<br />' +
        '逾期不申请行政复议，也不提起行政诉讼，又不履行行政处罚决定的，本机关将依法申请人民法院强制执行（如不可采取改正措施的违法建筑案件有自行强制执行权的可以写“申请秀洲区人民政府责成有关部门强制执行”）。';

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
                                xtype: 'hidden',
                                name: 'persontype',
                            },
                            {
                                fieldLabel: '文书编号',
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                colspan: 2,
                                readOnly: true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                fieldLabel: '当事人',
                                name: 'dsr',
                                margin: '0 0 10 0',
                                readOnly: true,
                                hidden:jsonstr == null ?false:jsonstr.persontype=='type_dw'?true:false,
                                value: jsonstr == null ? null : jsonstr.p_name
                            },
                            {
                                fieldLabel: '性别',
                                name: 'xb',
                                margin: '0 0 10 0',
                                readOnly: true,
                                hidden: jsonstr == null ? false : jsonstr.persontype == 'type_dw' ? true : false,
                                value: jsonstr == null ? null : jsonstr.p_sex
                            },
                            {
                                fieldLabel: '单位名称',
                                name: 'dwmc',
                                margin: '0 0 10 0',
                                readOnly: true,
                                hidden: jsonstr == null ? true : jsonstr.persontype == 'type_dw' ? false : true,
                                value: jsonstr == null ? null : jsonstr.f_name
                            },
                            {
                                fieldLabel: '法定代表人',
                                name: 'fsdbr',
                                margin: '0 0 10 0',
                                readOnly: true,
                                hidden: jsonstr == null ? true : jsonstr.persontype == 'type_dw' ? false : true,
                                value: jsonstr == null ? null : jsonstr.f_dbr
                            },
                            {
                                fieldLabel: '证件类型',
                                xtype: 'combo',
                                name: 'zjlxid',
                                margin: '0 0 10 0',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: jsonstr == null ? 'type_zrr' : jsonstr.persontype } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly:true,
                                listeners:{
                                    render: function (obj) {
                                        obj.setValue(jsonstr == null ? '' : jsonstr.f_cardtype);
                                        obj.getStore().reload();
                                    },
                                    change: function (obj) {
                                        me.down('hidden[name=zjlx]').setValue(obj.getRawValue())
                                    }
                                }
                            },
                            {
                                xtype: 'hidden',
                                name: 'zjlx',
                            },
                            {
                                fieldLabel: '证件号',
                                name: 'zjh',
                                margin: '0 0 10 0',
                                readOnly: true,
                                value: jsonstr == null ? null : jsonstr.f_card
                            },                          
                            {
                                fieldLabel: '地址',
                                name: 'address',
                                margin: '0 0 10 0',
                                colspan: 2,
                                width: '100%',
                                readOnly: true,
                                value: jsonstr == null ? null : jsonstr.contactaddress
                            },                            
                            {
                                fieldLabel: '决定书正文',
                                xtype: 'htmleditor',
                                border: false,
                                name: 'jdszw',
                                width: 900,
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 200,
                                value: me.record == null ? jdsmb : me.record.jdszw,
                                listeners: {
                                    render: function (obj) {
                                        obj.getToolbar().hide();
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