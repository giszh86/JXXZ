Ext.define('TianZun.view.legalcasemanager.casemanager.SimpleCaseAdd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpleCaseAdd',
    layout: 'fit',

    requires: [
        'TianZun.controller.legalcasemanager.SimpleCase',
    ],
    controller: 'simpleCase',

    margin: '20 0 0 0',
    id: 'changePanel',
    name: 'changePanel',
    width: '76%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

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
                                html: '<label style="font-size:16px;margin-left:15px;">案件信息登记(<b style="color:red;">*</b>必填)<label>',
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
                                        name: 'cswfsid',
                                        value: me.recordsource == null ? null : me.recordsource,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'tzcsid',
                                        value: me.recordcaseid == null ? null : me.recordcaseid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'simpleid',
                                        value: me.record == null ? null : me.record.get('simpleid')
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'dwfsasid',
                                        value: me.record == null ? null : me.record.get('dwfsasid')
                                    },
                                    {
                                        name: 'cfjdsbh',
                                        margin: '10 0 10 10',
                                        allowBlank: false,
                                        fieldLabel: '<span style="color:red">*</span>处罚决定书编号',
                                        value: me.record == null ? null : me.record.get('cfjdsbh')
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
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record != null) {
                                                    obj.setValue(me.record.get('casetypeid'));
                                                    obj.getStore().load();
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
                                        fieldLabel: '<span style="color:red">*</span>案件名称',
                                        name: 'casename',
                                        allowBlank: false,
                                        margin: '10 0 10 10',
                                        width: '94.5%',
                                        colspan: 2,
                                        value: me.record == null ? null : me.record.get('casename')
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
                                        width: '94.5%',
                                        value: me.record == null ? null : me.record.get('qlsxid'),
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
                                        value: me.record == null ? null : me.record.get('qlsx')
                                    },
                                    {
                                        fieldLabel: '案由',
                                        name: 'casereason',
                                        margin: '10 0 10 10',
                                        width: '94.5%',
                                        colspan: 2,
                                        value: me.record == null ? null : me.record.get('casereason')
                                    },
                                    {
                                        margin: '10 0 10 10',
                                        name: 'fromcasesource',
                                        fieldLabel: '案源',
                                        colspan: 2,
                                        width: '94.5%',
                                        editable: false,
                                        value: me.recordsource != null ? me.recordsource : me.record == null ? null : me.record.get('fromcasesource'),
                                        listeners: {
                                            render: function (obj) {
                                                if (me.recordsource == null)
                                                    obj.getEl().on('click', 'onCaseSource');
                                            }
                                        }
                                    },
                                    {
                                        name: 'caseaddress',
                                        margin: '10 0 10 10',
                                        allowBlank: false,
                                        fieldLabel: '<span style="color:red">*</span>案发地址',
                                        value: me.record == null ? (me.recordaddress == null ? null : me.recordaddress) : me.record.get('caseaddress'),
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
                                        value: me.record == null ? (me.recordtime == null ? null : new Date(Date.parse(Ext.Date.parse(me.recordtime, 'Y-m-d H:i:s')))) : Ext.Date.format(new Date(me.record.get('sitedatetime')), 'Y-m-d H:i:s'),
                                    },
                                    {
                                        name: 'grometry',
                                        id: 'EVENT_COORDINATE_ID',
                                        fieldLabel: '地理位置',
                                        colspan: 2,
                                        autoShow: true,
                                        margin: '10 0 10 10',
                                        width: '95%',
                                        value: me.record == null ? null : me.record.get('geographical84'),
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
                                        name: 'persontype',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 10',
                                        colspan: 2,
                                        allowBlank: false,
                                        width: 300,
                                        items: [
                                            {
                                                boxLabel: '自然人',
                                                name: 'persontype',
                                                inputValue: 'type_zrr',
                                            },
                                            {
                                                boxLabel: '单位',
                                                name: 'persontype',
                                                inputValue: 'type_dw',
                                            },
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record != null) {
                                                    if (me.record.get('persontype') == 'type_zrr')
                                                        obj.down('radio[inputValue=type_zrr]').setValue(true);
                                                    else
                                                        obj.down('radio[inputValue=type_dw]').setValue(true);
                                                } else
                                                    obj.down('radio[inputValue=type_zrr]').setValue(true);
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
                                                }
                                            }
                                        },
                                    },
                                    {
                                        name: 'p_name',
                                        fieldLabel: '姓名',
                                        xtype: 'textfield',
                                        margin: '10 0 10 10',
                                        value: me.record == null ? null : me.record.get('p_name'),
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
                                                checked: me.record == null ? true : me.record.get('p_sex') == '男' ? true : false,
                                            },
                                            {
                                                boxLabel: '女',
                                                name: 'p_sex',
                                                inputValue: '女',
                                                checked: me.record == null ? false : me.record.get('p_sex') == '女' ? true : false,
                                            },
                                        ],
                                    },
                                    {
                                        name: 'f_name',
                                        fieldLabel: '单位名称',
                                        xtype: 'textfield',
                                        margin: '10 0 10 10',
                                        hidden: true,
                                        value: me.record == null ? null : me.record.get('f_name'),
                                    },
                                    {
                                        name: 'f_dbr',
                                        fieldLabel: '法定代表人',
                                        xtype: 'textfield',
                                        margin: '10 0 10 0',
                                        hidden: true,
                                        value: me.record == null ? null : me.record.get('f_dbr'),
                                    },
                                    {
                                        fieldLabel: '证件类型',
                                        xtype: 'combo',
                                        id: 'ID_Type',
                                        name: 'f_cardtype',
                                        margin: '10 0 10 10',
                                        store: Ext.create('TianZun.store.sys.Dictionary', {
                                            proxy: { extraParams: { zd_type: me.record == null ? 'type_zrr' : me.record.get('persontype') == 'type_zrr' ? 'type_zrr' : 'type_dw' } }
                                        }),
                                        valueField: 'zd_id',
                                        displayField: 'zd_name',
                                        editable: false,
                                        value: me.record == null ? null : me.record.get('f_cardtype'),
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record != null && me.record.get('f_cardtype') != null) {
                                                    obj.setValue(me.record.get('f_cardtype'));
                                                    obj.getStore().reload();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        name: 'f_card',
                                        fieldLabel: '证件号',
                                        margin: '10 0 10 0',
                                        value: me.record == null ? null : me.record.get('f_card'),
                                    },
                                    {
                                        name: 'contactphone',
                                        fieldLabel: '联系电话',
                                        margin: '10 0 10 10',
                                        xtype: 'textfield',
                                        value: me.record == null ? null : me.record.get('contactphone'),
                                    },
                                    {
                                        name: 'contactaddress',
                                        fieldLabel: '联系地址',
                                        margin: '10 0 10 0',
                                        xtype: 'textfield',
                                        value: me.record == null ? null : me.record.get('contactaddress'),
                                    },
                                    {
                                        name: 'f_wtr',
                                        fieldLabel: '受委托人',
                                        margin: '10 0 10 10',
                                        hidden: true,
                                        xtype: 'textfield',
                                        value: me.record == null ? null : me.record.get('f_wtr'),
                                    },
                                    {
                                        name: 'f_cardnum',
                                        fieldLabel: '身份证号',
                                        margin: '10 0 10 0',
                                        hidden: true,
                                        xtype: 'textfield',
                                        value: me.record == null ? null : me.record.get('f_cardnum'),
                                    },
                                    {
                                        name: 'flfg',
                                        fieldLabel: '法律法规',
                                        margin: '10 0 10 10',
                                        xtype: 'textarea',
                                        colspan: 2,
                                        width: '94.5%',
                                        readOnly: true,
                                        value: me.record == null ? null : me.record.get('flfg'),
                                    },
                                    {
                                        name: 'clyj',
                                        fieldLabel: '裁量依据',
                                        margin: '10 0 10 10',
                                        xtype: 'textarea',
                                        colspan: 2,
                                        width: '94.5%',
                                        height: 80,
                                        readOnly: true,
                                        value: me.record == null ? null : me.record.get('clyj'),
                                    },
                                    {
                                        name: 'wfqx',
                                        fieldLabel: '违法情形',
                                        margin: '10 0 10 10',
                                        xtype: 'textarea',
                                        colspan: 2,
                                        width: '94.5%',
                                        height: 80,
                                        readOnly: true,
                                        value: me.record == null ? null : me.record.get('wfqx'),
                                    },
                                    {
                                        name: 'cf',
                                        fieldLabel: '处罚结果',
                                        margin: '10 0 10 10',
                                        xtype: 'textarea',
                                        colspan: 2,
                                        width: '94.5%',
                                        readOnly: true,
                                        height: 50,
                                        value: me.record == null ? null : me.record.get('cf'),
                                    },
                                    {
                                        border: false,
                                        xtype: 'panel',
                                        colspan: 2,
                                        width: '94.5%',
                                        margin: '10 0 10 10',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'numberfield',
                                                hideTrigger: true,
                                                decimalPrecision: 4,
                                                fieldLabel: '占地面积',
                                                name: 'zdmj',
                                                width: 239,
                                                minValue: 0,
                                                value: me.record == null ? null : me.record.get('zdmj')
                                            },
                                            {
                                                xtype: 'numberfield',
                                                hideTrigger: true,
                                                decimalPrecision: 4,
                                                fieldLabel: '耕地面积',
                                                name: 'gdmj',
                                                width: 239,
                                                minValue: 0,
                                                value: me.record == null ? null : me.record.get('gdmj')
                                            },
                                            {
                                                xtype: 'numberfield',
                                                hideTrigger: true,
                                                decimalPrecision: 4,
                                                fieldLabel: '国土建筑面积',
                                                name: 'gtjzmj',
                                                width: 239,
                                                minValue: 0,
                                                value: me.record == null ? null : me.record.get('gtjzmj')
                                            },
                                            {
                                                xtype: 'numberfield',
                                                hideTrigger: true,
                                                decimalPrecision: 4,
                                                fieldLabel: '规划建筑面积',
                                                name: 'ghjzmj',
                                                width: 239,
                                                minValue: 0,
                                                value: me.record == null ? null : me.record.get('ghjzmj')
                                            }
                                        ]
                                    },
                                    {
                                        name: 'casecontent',
                                        fieldLabel: '<span style="color:red">*</span>案情描述',
                                        margin: '10 0 10 10',
                                        xtype: 'textarea',
                                        colspan: 2,
                                        width: '95%',
                                        allowBlank: false,
                                        value: me.record == null ? null : me.record.get('casecontent'),
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>缴款方式',
                                        name: 'jktype',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 10',
                                        colspan: 2,
                                        width: 300,
                                        allowBlank: false,
                                        items: [
                                            {
                                                boxLabel: '当场缴费',
                                                name: 'jktype',
                                                inputValue: '当场缴费',
                                            },
                                            {
                                                boxLabel: '银行代缴',
                                                name: 'jktype',
                                                inputValue: '银行代缴',
                                            },
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record != null) {
                                                    if (me.record.get('jktype') == '当场缴费')
                                                        obj.down('radio[inputValue=当场缴费]').setValue(true);
                                                    else
                                                        obj.down('radio[inputValue=银行代缴]').setValue(true);
                                                } else
                                                    obj.down('radio[inputValue=当场缴费]').setValue(true);
                                            },
                                            change: function (obj) {
                                                if (obj.lastValue.jktype == '当场缴费') {
                                                    me.down('combo[name=bank_name]').hide();
                                                    me.down('combo[name=bank_account]').hide();
                                                    me.down('combo[name=bank_accountname]').hide();
                                                    //me.down('textfield[name=fk_money]').colspan = 1;

                                                } else {
                                                    me.down('combo[name=bank_name]').show();
                                                    me.down('combo[name=bank_account]').show();
                                                    me.down('combo[name=bank_accountname]').show();
                                                    //me.down('textfield[name=fk_money]').colspan = 2;
                                                }
                                            }
                                        },
                                    },
                                    {
                                        name: 'fk_money',
                                        fieldLabel: '<span style="color:red">*</span>罚款金额',
                                        margin: '10 0 10 10',
                                        colspan: 2,
                                        xtype: 'numberfield',
                                        hideTrigger:true,
                                        allowBlank: false,
                                        value: me.record == null ? null : me.record.get('fk_money'),
                                    },
                                    {
                                        fieldLabel: '缴款银行',
                                        xtype: 'combo',
                                        emptyText:'请选择',
                                        name: 'bank_name',
                                        margin: '10 0 10 10',
                                        store: Ext.create('TianZun.store.sys.Dictionary', {
                                            proxy: { extraParams: { zd_type: 'type_bank' } }
                                        }),
                                        valueField: 'zd_id',
                                        displayField: 'zd_name',
                                        editable: false,
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record != null && me.record.get('bank_name') != null) {
                                                    obj.setValue(me.record.get('bank_name'));
                                                    obj.getStore().reload();
                                                }
                                            },
                                            'change': function () {
                                                var cyCombo = Ext.getCmp('BankName');
                                                cyCombo.clearValue();
                                                cyStore = Ext.create('TianZun.store.legalcasemanager.SimpleDicData');
                                                cyStore.getProxy().url = 'api/SimpleCase/GeDictoryData?zd_type=type_bank&zd_id=' + this.getValue();
                                                cyCombo.bindStore(cyStore, false);
                                                if (me.record != null && me.record.get('bank_account') !=null)
                                                    cyCombo.setValue(me.record.get('bank_account'))
                                                cyStore.load();
                                            }
                                        },
                                    },
                                    {
                                        fieldLabel: '银行户名',
                                        xtype: 'combo',
                                        emptyText: '请选择',
                                        id: 'BankName',
                                        name: 'bank_account',
                                        margin: '10 0 10 10',
                                        valueField: 'zd_id',
                                        displayField: 'zd_name',
                                        editable: false,
                                        listeners: {
                                            'change': function () {
                                                var cyCombo = Ext.getCmp('BankAccount');
                                                cyCombo.clearValue();
                                                cyStore = Ext.create('TianZun.store.legalcasemanager.SimpleDicData');
                                                cyStore.getProxy().url = 'api/SimpleCase/GeDictoryData?zd_type=type_accountname&zd_id=' + this.getValue();
                                                cyCombo.bindStore(cyStore, false);
                                                if (me.record != null && me.record.get('bank_accountname')!=null)
                                                    cyCombo.setValue(me.record.get('bank_accountname'))
                                                cyStore.load();
                                            }
                                        },
                                    },
                                    {
                                        fieldLabel: '银行帐号',
                                        xtype: 'combo',
                                        emptyText: '请选择',
                                        id: 'BankAccount',
                                        name: 'bank_accountname',
                                        margin: '10 0 10 10',
                                        valueField: 'zd_id',
                                        displayField: 'zd_name',
                                        editable: false,
                                    },
                                    {
                                        name: 'zfr_name',
                                        fieldLabel: '<span style="color:red">*</span>执法人姓名',
                                        margin: '10 0 10 10',
                                        xtype: 'textfield',
                                        value: $.cookie('USER_NAME'),
                                        allowBlank: false,
                                        readOnly:true
                                    },
                                    {
                                        name: 'zf_card',
                                        fieldLabel: '<span style="color:red">*</span>执法证号',
                                        margin: '10 0 10 10',
                                        xtype: 'textfield',
                                        value: $.cookie('USER_CODE'),
                                        allowBlank: false,
                                        readOnly: true
                                    },
                                    {
                                        name: 'zf_time',
                                        fieldLabel: '<span style="color:red">*</span>执法时间',
                                        margin: '10 0 10 10',
                                        xtype: 'datefield',
                                        format: 'Y-m-d',
                                        editable: false,
                                        allowBlank: false,
                                        value: me.record == null ? null : Ext.Date.format(new Date(me.record.get('zf_time')), 'Y-m-d'),
                                    },
                                    {
                                        name: 'zf_address',
                                        fieldLabel: '<span style="color:red">*</span>执法地点',
                                        margin: '10 0 10 10',
                                        xtype: 'textfield',
                                        allowBlank: false,
                                        value: me.record == null ? null : me.record.get('zf_address'),
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
                                    text: '提交',
                                    width: 80,
                                    name: 'btnsubmit',
                                    handler: me.record == null ? 'onAddOK' : 'onEditOK',
                                }, {
                                    html: '<label style="color:#3892d4;">返回</label>',
                                    width: 80,
                                    name: 'btncancle',
                                    handler: 'onReturnList',
                                    style: 'background:white;',
                                }]
                            }
                        ],
                    }];

        this.callParent();
    }
})