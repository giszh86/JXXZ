Ext.define('TianZun.view.legalcasemanager.casemanager.CommonCaseAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.commonCaseAdd',
    layout: 'fit',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        var wsbh;
        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseDocumentNumberByUnitId?unitid=" + $.cookie('UNIT_ID'),
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                wsbh = Ext.decode(response.responseText);
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
                        xtype: 'box',
                        width: '100%',
                        height: 60,
                        style: 'line-height:60px;border:1px solid #bbb;border-bottom: none;',
                        colspan: 2,
                        html: '<label style="font-size:16px;margin-left:15px;">基本信息(<b style="color:red;">*</b>必填)<label>',
                    },
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
                                name: 'userid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'dwfsasid',
                                value: me.record == null ? null : me.record.dwfsasid,
                            },
                            {
                                xtype: 'hidden',
                                name: 'issave',
                                value: 1,
                            },
                            {
                                xtype: 'hidden',
                                name: 'cswfsid',
                                value: me.recordsource == null ? (me.record == null ? null : (me.record.cswfsid == null ? null : me.record.cswfsid)) : me.recordsource,
                            },
                            {
                                xtype: 'hidden',
                                name: 'tzcsid',
                                value: me.recordcaseid == null ? null : me.recordcaseid,
                            },
                            {
                                xtype: 'hidden',
                                name: 'caseid',
                                value: me.record == null ? null : me.record.caseid,
                            },
                            {
                                xtype: 'hidden',
                                name: 'savewfsid',
                                value: me.record == null ? null : me.record.wfsid,
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                width:460,
                                border: false,
                                items: [
                                    {
                                        name: 'casebh',
                                        margin: '10 0 10 10',
                                        xtype: 'textfield',
                                        labelWidth: 100,
                                        width: me.record == null?395:450,
                                        allowBlank: false,
                                        readOnly: true,
                                        fieldLabel: '<span style="color:red">*</span>立案编号',
                                        value: me.record == null ? wsbh : me.record.casebh,
                                    },
                                    {
                                        xtype: 'button',
                                        text: '刷新',
                                        hidden:me.record == null?false:true,
                                        margin:'10 0 0 10',
                                        handler: 'onReflush'
                                    }
                                ]
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>案件类型',
                                xtype: 'combo',
                                name: 'casetypeid',
                                margin: '10 0 10 0',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: 'type_case' } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                allowBlank: false,
                                value: me.record == null ? null : me.record.casetypeid,
                                listeners: {
                                    render: function () {
                                        this.getStore().load();
                                    }
                                }
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>案件名称',
                                name: 'casename',
                                allowBlank: false,
                                margin: '10 0 10 10',
                                width: '96%',
                                colspan:2,
                                value: me.record == null ? null : me.record.casename
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>权力事项',
                                name: 'qlsxid',
                                xtype: 'combobox',
                                store: Ext.create('TianZun.store.legalcasemanager.CaseSourceInherit'),
                                typeAhead: true,
                                queryMode: 'remote',
                                queryParam: 'powername',
                                //triggerAction: 'query',
                                enableKeyEvents: true,
                                minChars: 1,
                                displayField: 'powername',
                                valueField: 'powerid',
                                margin: '10 0 10 10',
                                allowBlank: false,
                                colspan: 2,
                                width: '96%',
                                value: me.record == null ? null : me.record.qlsxid,
                                listeners: {
                                    render: function () {
                                        this.getStore().load();
                                    },
                                    select: function (combo, record, index) {
                                        me.down('hidden[name=qlsx]').setValue(record.get('powername'));
                                        me.down('textarea[name=flfg]').setValue(record.get('flfg'));
                                        me.down('textarea[name=clyj]').setValue(record.get('clyj'));
                                        me.down('textarea[name=wfqx]').setValue(record.get('wfqx'));
                                        me.down('textarea[name=cf]').setValue(record.get('cf'));
                                    }
                                }
                            },
                            {
                                xtype: 'hidden',
                                name: 'qlsx',
                                value: me.record == null ? null : me.record.qlsx
                            },
                            {
                                fieldLabel: '案由',
                                name: 'casereason',
                                margin: '10 0 10 10',
                                width: '96%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.casereason
                            },
                            {
                                margin: '10 0 10 10',
                                name: 'fromcasesource',
                                fieldLabel: '案源',
                                editable: false,
                                value: me.record == null ? (me.recordsource == null ? null : me.recordsource) : me.record.fromcasesource,
                                listeners: {
                                    render: function (obj) {
                                        if (me.recordsource == null)
                                            obj.getEl().on('click', 'onCaseSource');
                                    }
                                }
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>案件来源',
                                xtype: 'combo',
                                name: 'casesourceid',
                                margin: '10 0 10 0',
                                store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                                valueField: 'id',
                                displayField: 'name',
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    render: function () {
                                        if (me.record != null || me.recordtype != null) {
                                            var csid = me.record != null ? me.record.casesourceid : me.recordtype;
                                            this.setValue(csid);
                                            this.getStore().load();
                                        }
                                    },
                                    change: function () {
                                        me.down('hidden[name=casesourcename]').setValue(this.getRawValue());
                                    }
                                }
                            },
                            {
                                xtype: 'hidden',
                                name: 'casesourcename'
                            },
                            {
                                name: 'caseaddress',
                                margin: '10 0 10 10',
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>案发地址',
                                value: me.record == null ? (me.recordaddress == null ? null : me.recordaddress) : me.record.caseaddress,
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'sitedatetime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>案发时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                                value: me.record == null ? (me.recordtime == null ? null : new Date(Date.parse(Ext.Date.parse(me.recordtime, 'Y-m-d H:i:s')))) : new Date(Date.parse(Ext.Date.parse(me.record.sitedatetime, 'Y-m-d H:i:s'))),
                            },
                            {
                                name: 'grometry',
                                id: 'EVENT_COORDINATE_ID',
                                margin: '10 0 10 10',
                                fieldLabel: '地理位置',
                                width: '96.5%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.geographical84,
                                autoShow: true,
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '案件坐标', 1, 1, this.component.getValue());
                                        });
                                    },
                                }
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>当事人类型',
                                id: 'persontype',
                                name: 'persontype',
                                xtype: 'radiogroup',
                                margin: '10 0 10 10',
                                colspan: 2,
                                allowBlank: false,
                                width: 300,
                                items: [
                                    {
                                        boxLabel: '自然人',
                                        id: 'persontype1',
                                        name: 'persontype',
                                        inputValue: 'type_zrr',
                                        checked: true,
                                    },
                                    {
                                        boxLabel: '单位',
                                        id: 'persontype2',
                                        name: 'persontype',
                                        inputValue: 'type_dw',
                                    },
                                ],
                                listeners: {
                                    afterrender: function (obj) {
                                        if (me.record != null && me.record.persontype != null) {
                                            if (me.record.persontype == 'type_zrr') {
                                                Ext.getCmp('persontype1').setValue(true);
                                                Ext.getCmp('persontype2').setValue(false);
                                            }
                                            if (me.record.persontype == 'type_dw') {
                                                Ext.getCmp('persontype1').setValue(false);
                                                Ext.getCmp('persontype2').setValue(true);
                                            }
                                            obj.fireEvent('change', this);
                                        }
                                    },
                                    change: function (obj) {
                                        if (obj.lastValue.persontype == 'type_zrr') {
                                            me.down('textfield[name=f_name]').hide();
                                            me.down('textfield[name=f_dbr]').hide();
                                            me.down('textfield[name=f_wtr]').hide();
                                            me.down('textfield[name=f_cardnum]').hide();

                                            me.down('textfield[name=p_name]').show();
                                            me.down('radiogroup[name=p_sex]').show();

                                            var cyCombo = Ext.getCmp('ID_Type');
                                            cyCombo.clearValue();
                                            cyStore = Ext.create('TianZun.store.sys.Dictionary');
                                            cyStore.getProxy().url = 'api/SimpleCase/GeDictoryType?zd_type=type_zrr';
                                            cyCombo.bindStore(cyStore, false);
                                            cyStore.load();
                                            if (me.record != null)
                                                cyCombo.setValue(me.record.f_cardtype);
                                        } else {
                                            me.down('textfield[name=f_name]').show();
                                            me.down('textfield[name=f_dbr]').show();
                                            me.down('textfield[name=f_wtr]').show();
                                            me.down('textfield[name=f_cardnum]').show();

                                            me.down('textfield[name=p_name]').hide();
                                            me.down('radiogroup[name=p_sex]').hide();

                                            var cyCombo = Ext.getCmp('ID_Type');
                                            cyCombo.clearValue();
                                            cyStore = Ext.create('TianZun.store.legalcasemanager.SimpleDicData');
                                            cyStore.getProxy().url = 'api/SimpleCase/GeDictoryType?zd_type=type_dw';
                                            cyCombo.bindStore(cyStore, false);
                                            cyStore.load();
                                            if (me.record != null)
                                                cyCombo.setValue(me.record.f_cardtype);
                                        }
                                    }
                                },
                            },
                            {
                                name: 'p_name',
                                fieldLabel: '姓名',
                                xtype: 'textfield',
                                margin: '10 0 10 10',
                                value: me.record == null ? null : me.record.p_name,
                            },
                            {
                                fieldLabel: '性别',
                                name: 'p_sex',
                                xtype: 'radiogroup',
                                margin: '10 0 10 0',
                                width: 250,
                                items: [
                                    {
                                        boxLabel: '男',
                                        name: 'p_sex',
                                        inputValue: '男',
                                        checked: me.record == null ? true : me.record.p_sex=='男'?true:false,
                                    },
                                    {
                                        boxLabel: '女',
                                        name: 'p_sex',
                                        inputValue: '女',
                                        checked: me.record == null ? false : me.record.p_sex == '女' ? true : false,
                                    },
                                ]
                            },
                            {
                                name: 'f_name',
                                fieldLabel: '单位名称',
                                xtype: 'textfield',
                                margin: '10 0 10 10',
                                hidden: true,
                                value: me.record == null ? null : me.record.f_name,
                            },
                            {
                                name: 'f_dbr',
                                fieldLabel: '法定代表人',
                                xtype: 'textfield',
                                margin: '10 0 10 0',
                                hidden: true,
                                value: me.record == null ? null : me.record.f_dbr,
                            },
                            {
                                fieldLabel: '证件类型',
                                xtype: 'combo',
                                id: 'ID_Type',
                                name: 'f_cardtype',
                                margin: '10 0 10 10',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: 'type_zrr' } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                            },
                            {
                                name: 'f_card',
                                fieldLabel: '证件号',
                                margin: '10 0 10 0',
                                value: me.record == null ? null : me.record.f_card,
                            },
                            {
                                name: 'contactphone',
                                fieldLabel: '联系电话',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                value: me.record == null ? null : me.record.contactphone,
                            },
                            {
                                name: 'contactaddress',
                                fieldLabel: '联系地址',
                                margin: '10 0 10 0',
                                xtype: 'textfield',
                                value: me.record == null ? null : me.record.contactaddress,
                            },
                            {
                                name: 'f_wtr',
                                fieldLabel: '受委托人',
                                margin: '10 0 10 10',
                                hidden: true,
                                xtype: 'textfield',
                                value: me.record == null ? null : me.record.f_wtr,
                            },
                            {
                                name: 'f_cardnum',
                                fieldLabel: '身份证号',
                                margin: '10 0 10 0',
                                hidden: true,
                                xtype: 'textfield',
                                value: me.record == null ? null : me.record.f_cardnum,
                            },
                            {
                                name: 'flfg',
                                labelSeparator: '',
                                fieldLabel: '法律法规:<div style="color:red;">(供参考)</div>',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '96.5%',
                                readOnly:true,
                                value: me.record == null ? null : me.record.flfg,
                            },
                            {
                                name: 'clyj',
                                labelSeparator: '',
                                fieldLabel: '裁量依据:<div style="color:red;">(供参考)</div>',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '96.5%',
                                height:80,
                                readOnly: true,
                                value: me.record == null ? null : me.record.clyj,
                            },
                            {
                                name: 'wfqx',
                                labelSeparator: '',
                                fieldLabel: '违法情形:<div style="color:red;">(供参考)</div>',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '96.5%',
                                height: 80,
                                readOnly: true,
                                value: me.record == null ? null : me.record.wfqx,
                            },
                            {
                                name: 'cf',
                                labelSeparator: '',
                                fieldLabel: '处罚结果:<div style="color:red;">(供参考)</div>',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '96.5%',
                                readOnly: true,
                                height: 50,
                                value: me.record == null ? null : me.record.cf,
                            },
                            {
                                border: false,
                                xtype: 'panel',
                                colspan: 2,
                                width:'96.5%',
                                margin: '10 0 10 10',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision:4,
                                        fieldLabel: '占地面积',
                                        name: 'zdmj',
                                        width: 239,
                                        minValue: 0,
                                        value: me.record == null ? null : me.record.zdmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '耕地面积',
                                        name: 'gdmj',
                                        width: 239,
                                        minValue: 0,
                                        value: me.record == null ? null : me.record.gdmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '国土建筑面积',
                                        name: 'gtjzmj',
                                        width: 239,
                                        minValue: 0,
                                        value: me.record == null ? null : me.record.gtjzmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '规划建筑面积',
                                        name: 'ghjzmj',
                                        width: 239,
                                        minValue: 0,
                                        value: me.record == null ? null : me.record.ghjzmj
                                    }
                                ]
                            },
                            {
                                name: 'casecontent',
                                fieldLabel: '<span style="color:red">*</span>案情描述',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '96.5%',
                                allowBlank: false,
                                value: me.record == null ? null : me.record.casecontent,
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>主办中队',
                                labelAlign: 'right',
                                labelWidth: 75,
                                allowBlank:false,
                                margin: '0 0 10 35',
                                id: 'middleteam',
                                name: 'middleteam',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                    proxy: { extraParams: { unittypeid: 2 } }
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                readOnly: configs.TOWNID == null ? false : true,
                                listeners: {
                                    render: function (obj) {
                                        if (me.record != null) {
                                            obj.setValue(me.record.sszd);
                                            obj.getStore().load();
                                        } else if (configs.TOWNID != null) {
                                            obj.setValue(configs.TOWNID);
                                            obj.getStore().load();
                                        }
                                    },
                                    change: function (obj) {
                                        var nextwfdid = obj.up('commonCaseHandler').down('combo[name=nextwfdid]');
                                        if (nextwfdid)
                                            nextwfdid.clearValue();

                                        var cyCombo1 = obj.up().down('combo[name=zbuser]');
                                        cyCombo1.clearValue();
                                        cyStore = Ext.create('TianZun.store.sys.UserStore', { proxy: { extraParams: { UnitID: this.getValue() } } });
                                        cyCombo1.bindStore(cyStore, false);
                                        cyStore.load();
                                        if (me.record != null ) {
                                            cyCombo1.setValue(me.record.zbuserid);
                                        }
                                    },
                                },
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>主办队员',
                                labelAlign: 'right',
                                labelWidth: 70,
                                margin: '0 0 10 0',
                                id: 'zbuser',
                                name: 'zbuser',
                                valueField: 'ID',
                                displayField: 'DisplayName',
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    change: function (obj) {
                                        obj.up().down('hidden[name=zbuserid]').setValue(this.getValue());
                                        if (!isNaN(obj.getRawValue()))
                                            obj.setValue('');
                                    },
                                },
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>协办中队',
                                labelAlign: 'right',
                                labelWidth: 75,
                                allowBlank: false,
                                margin: '0 0 10 35',
                                id: 'xbmiddleteam',
                                name: 'ssxbzd',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                    proxy: { extraParams: { unittypeid: 2 } }
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                readOnly: configs.TOWNID == null ? false : true,
                                listeners: {
                                    render: function (obj) {
                                        if (me.record != null) {
                                            obj.setValue(me.record.ssxbzd);
                                            obj.getStore().load();
                                        } else if (configs.TOWNID != null) {
                                            obj.setValue(configs.TOWNID);
                                            obj.getStore().load();
                                        }
                                    },

                                    change: function (obj) {
                                        var cyCombo2 = obj.up().down('combo[name=xbuser]');
                                        cyCombo2.clearValue();
                                        cyStore = Ext.create('TianZun.store.sys.UserStoreCC', { proxy: { extraParams: { UnitID: this.getValue() } } });
                                        cyCombo2.bindStore(cyStore, false);
                                        cyStore.load();
                                        if (me.record != null) {
                                            cyCombo2.setValue(me.record.xbuserid);
                                        }
                                    },
                                },
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>协办队员',
                                labelAlign: 'right',
                                labelWidth: 70,
                                id: 'xbuser',
                                name: 'xbuser',
                                valueField: 'ID',
                                displayField: 'DisplayName',
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    change: function (obj) {
                                        obj.up().down('hidden[name=xbuserid]').setValue(this.getValue());
                                        if (!isNaN(obj.getRawValue()))
                                            obj.setValue('');
                                    },
                                },
                            },
                            {
                                xtype: 'hidden',
                                name: 'zbuserid',
                            },
                            {
                                xtype: 'hidden',
                                name: 'xbuserid',
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
                            name: 'btnsubmit',
                            handler: 'onAddOK',
                        }, {
                            html: '<label style="color:#3892d4;">返回</label>',
                            width: 80,
                            name: 'btncancle',
                            handler: 'onReturnList',
                            style: 'background:white;',
                        }]
                    }
                ]
            }]

        this.callParent();
    }
})