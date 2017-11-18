Ext.define('TianZun.view.legalcasemanager.documents.DCXWBL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.DCXWBL',
    width: '97.5%',
    height: '97.5%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        //添加文书时获取文书编号
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var caseid = me.caseid != null ? me.caseid : panel.caseid != null ? panel.caseid : panel.record.get('caseid') != null ? panel.record.get('caseid') : null;
        var createrecord;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null')
                    createrecord = Ext.decode(response.responseText);
                else
                    createrecord = null;
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
                                name: 'casereason',
                                xtype: 'textfield',
                                margin: '10 0 10 0',
                                colspan: 2,
                                width: '97.5%',
                                fieldLabel: '案件名称',
                                readOnly:true,
                                value: me.record == null ? (createrecord == null ? null : createrecord.casename) : me.record.casereason,
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                width: '97.5%',
                                margin: '10 0 10 0',
                                colspan:2,
                                border: false,
                                items: [
                                    {
                                        xtype: 'label',
                                        margin: '10 5 10 10',
                                        html: '调查(询问)时间:',
                                    },
                                    {
                                        xtype: 'datefield',
                                        margin: '10 0 10 0',
                                        width:350,
                                        name: 'dcdate',
                                        format: 'Y-m-d',
                                        editable: false,
                                        value: me.record == null ? null : me.record.dcdate
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 50',
                                        name: 'sdctime',
                                        format: 'H:i',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.sdctime
                                    },
                                    {
                                        xtype: 'label',
                                        margin:'10 20 10 20',
                                        html:'至',
                                    },
                                    {
                                        xtype: 'timefield',
                                        margin: '10 0 10 0',
                                        name: 'edctime',
                                        format: 'H:i',
                                        increment: 5,
                                        editable: false,
                                        value: me.record == null ? null : me.record.edctime
                                    },
                                ]
                            },
                            {
                                name: 'dcplace',
                                margin: '10 0 10 0',
                                fieldLabel: '调查(询问)地点',
                                width: '97.5%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.dcplace
                            },
                            {
                                name: 'bdcuser',
                                margin: '10 0 10 0',
                                fieldLabel: '被调查(询问)人',
                                value: me.record == null ? (createrecord == null ? null : (createrecord.persontype == 'type_zrr' ? createrecord.p_name : createrecord.f_name)) : me.record.bdcuser
                            },
                            {
                                name: 'sex',
                                margin: '10 0 10 0',
                                fieldLabel: '性别',
                                value: me.record == null ? (createrecord == null ? null : createrecord.p_sex) : me.record.sex
                            },
                            {
                                name: 'mz',
                                margin: '10 0 10 0',
                                fieldLabel: '民族',
                                value: me.record == null ? null : me.record.mz
                            },
                            {
                                name: 'sfz',
                                margin: '10 0 10 0',
                                fieldLabel: '身份证号码',
                                value: me.record == null ? (createrecord == null ? null : createrecord.f_card) : me.record.sfz
                            },
                            {
                                name: 'gzdw',
                                margin: '10 0 10 0',
                                fieldLabel: '工作单位',
                                value: me.record == null ? null : me.record.gzdw
                            },
                            {
                                name: 'zwzy',
                                margin: '10 0 10 0',
                                fieldLabel: '职务或职业',
                                value: me.record == null ? null : me.record.zwzy
                            },
                            {
                                name: 'phone',
                                margin: '10 0 10 0',
                                fieldLabel: '电话',
                                value: me.record == null ? (createrecord == null ? null : createrecord.contactphone) : me.record.phone
                            },
                            {
                                name: 'address',
                                margin: '10 0 10 0',
                                fieldLabel: '住址',
                                value: me.record == null ? (createrecord == null ? null : createrecord.contactaddress) : me.record.address
                            },
                            {
                                name: 'zipcode',
                                margin: '10 0 10 0',
                                fieldLabel: '邮编',
                                value: me.record == null ? null : me.record.zipcode
                            },
                            {
                                name: 'ybagx',
                                margin: '10 0 10 0',
                                fieldLabel: '与本案关系',
                                value: me.record == null ? null : me.record.ybagx
                            },
                            {
                                name: 'zdcxwr',
                                margin: '10 0 10 0',
                                fieldLabel: '调查(询问)人',
                                value: me.record == null ? null : me.record.zdcxwr
                            },
                            {
                                name: 'zzfzh',
                                margin: '10 0 10 0',
                                fieldLabel: '执法证号',
                                value: me.record == null ? null : me.record.zzfzh
                            },
                            {
                                name: 'xdcxwr',
                                margin: '10 0 10 0',
                                fieldLabel: '调查(询问)人',
                                value: me.record == null ? null : me.record.xdcxwr
                            },
                            {
                                name: 'xzfzh',
                                margin: '10 0 10 0',
                                fieldLabel: '执法证号',
                                value: me.record == null ? null : me.record.xzfzh
                            },
                            {
                                name: 'jlperson',
                                margin: '10 0 10 0',
                                fieldLabel: '记录人',
                                value: me.record == null ? null : me.record.jlperson
                            },
                            {
                                name: 'zcperson',
                                margin: '10 0 10 0',
                                fieldLabel: '在场人',
                                value: me.record == null ? null : me.record.zcperson
                            },
                            {
                                xtype: 'textarea',
                                name: 'sfqr',
                                fieldLabel: '确认过程记录',
                                width: '97.5%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 40,
                                value: me.record == null ? null : me.record.sfqr
                            },
                            {
                                xtype: 'textarea',
                                name: 'sftq',
                                fieldLabel: '违法行为',
                                width: '97.5%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 40,
                                value: me.record == null ? null : me.record.sftq
                            },
                            {
                                xtype: 'textarea',
                                name: 'sfhb',
                                fieldLabel: '询问内容',
                                width: '97.5%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 40,
                                value: me.record == null ? null : me.record.sfhb
                            },
                            {
                                xtype: 'textarea',
                                name: 'remark',
                                fieldLabel: '补充',
                                width: '97.5%',
                                colspan: 2,
                                margin: '10 0 10 0',
                                height: 40,
                                value: me.record == null ? null : me.record.remark
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})