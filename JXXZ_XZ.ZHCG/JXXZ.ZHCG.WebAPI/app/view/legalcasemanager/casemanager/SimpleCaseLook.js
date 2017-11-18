Ext.define('TianZun.view.legalcasemanager.casemanager.SimpleCaseLook', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpleCaseLook',
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
                                name: 'contact',
                                margin: '10 0 10 10',
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>处罚决定书编号',
                                editable: false,
                                value: me.record.get('cfjdsbh'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>案件类型',
                                xtype: 'combo',
                                name: 'casetype',
                                margin: '10 0 10 0',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: 'type_case' } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly:true,
                                value: me.record.get('casetypeid'),
                                listeners: {
                                    render: function (combo) {
                                        this.getStore().load();
                                    }
                                },
                            },
                            {
                                margin: '10 0 10 10',
                                colspan: 2,
                                width: '94.5%',
                                allowBlank: false,
                                name: 'casename',
                                fieldLabel: '<span style="color:red">*</span>案件名称',
                                editable: false,
                                value: me.record.get('casename'),
                            },
                            {
                                margin: '10 0 10 10',
                                colspan: 2,
                                width: '94.5%',
                                allowBlank: false,
                                name: 'qlsx',
                                fieldLabel: '<span style="color:red">*</span>权力事项',
                                editable: false,
                                value: me.record.get('qlsx'),
                            },
                            {
                                margin: '10 0 10 10',
                                colspan: 2,
                                allowBlank: false,
                                name: 'displaycasesource',
                                fieldLabel: '<span style="color:red">*</span>案由',
                                editable: false,
                                width: '94.5%',
                                value: me.record.get('casereason'),
                            },
                            {
                                margin: '10 0 10 10',
                                name: 'fromcasesource',
                                fieldLabel: '案源',
                                colspan: 2,
                                editable: false,
                                width: '94.5%',
                                value: me.record.get('fromcasesource'),
                            },
                            {
                                name: 'contactphone',
                                margin: '10 0 10 10',
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>案发地址',
                                editable: false,
                                value: me.record.get('caseaddress'),
                            },
                            {
                                name: 'contactaddress',
                                margin: '10 0 10 0',
                                xtype: 'textfield',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>案发时间',
                                value: me.record.get('sitedatetime'),
                            },
                            {
                                name: 'grometry',
                                id: 'EVENT_COORDINATE_ID',
                                fieldLabel: '地理位置',
                                colspan: 2,
                                autoShow: true,
                                margin: '10 0 10 10',
                                width:'95%',
                                value: me.record == null ? null : me.record.get('geographical84'),
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '案件坐标', 0, 1, this.component.getValue());
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
                                        readOnly: true,
                                        inputValue: 'type_zrr',
                                    },
                                    {
                                        boxLabel: '单位',
                                        name: 'persontype',
                                        readOnly: true,
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
                                            me.down('textfield[name=dwname]').hide();
                                            me.down('textfield[name=fddbr]').hide();
                                            me.down('textfield[name=delegateperson]').hide();
                                            me.down('textfield[name=sfznumber]').hide();

                                            me.down('textfield[name=dsrname]').show();
                                            me.down('radiogroup[name=p_sex]').show();

                                            var cyCombo = Ext.getCmp('ID_Type');
                                            cyCombo.clearValue();
                                            cyStore = Ext.create('TianZun.store.sys.Dictionary');
                                            cyStore.getProxy().url = 'api/SimpleCase/GeDictoryType?zd_type=type_zrr';
                                            cyCombo.bindStore(cyStore, false);
                                            cyStore.load();
                                        } else {
                                            me.down('textfield[name=dwname]').show();
                                            me.down('textfield[name=fddbr]').show();
                                            me.down('textfield[name=delegateperson]').show();
                                            me.down('textfield[name=sfznumber]').show();

                                            me.down('textfield[name=dsrname]').hide();
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
                                name: 'dsrname',
                                fieldLabel: '姓名',
                                xtype: 'textfield',
                                margin: '10 0 10 10',
                                editable: false,
                                value: me.record.get('p_name'),
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
                                        readOnly:true,
                                        checked: me.record == null ? true : me.record.get('p_sex') == '男' ? true : false,
                                    },
                                    {
                                        boxLabel: '女',
                                        name: 'p_sex',
                                        inputValue: '女',
                                        readOnly: true,
                                        checked: me.record == null ? false : me.record.get('p_sex') == '女' ? true : false,
                                    },
                                ],
                            },
                            {
                                name: 'dwname',
                                fieldLabel: '单位名称',
                                xtype: 'textfield',
                                margin: '10 0 10 10',
                                editable: false,
                                hidden: true,
                                value: me.record.get('f_name'),
                            },
                            {
                                name: 'fddbr',
                                fieldLabel: '法定代表人',
                                xtype: 'textfield',
                                margin: '10 0 10 0',
                                editable: false,
                                hidden: true,
                                value: me.record.get('f_dbr'),
                            },
                            {
                                fieldLabel: '证件类型',
                                xtype: 'combo',
                                name: 'f_cardtype',
                                id:'ID_Type',
                                margin: '10 0 10 10',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: me.record == null ? 'type_zrr' : me.record.get('persontype') == 'type_zrr' ? 'type_zrr' : 'type_dw' } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly: true,
                                value: me.record == null ? null : me.record.get('f_cardtype'),
                                listeners: {
                                    render: function (obj) {
                                        if (me.record != null && me.record.get('f_cardtype') != null) {
                                            obj.setValue(me.record.get('f_cardtype'));
                                            obj.getStore().reload();
                                        }
                                    }
                                },
                            },
                            {
                                name: 'idnumber',
                                fieldLabel: '证件号',
                                margin: '10 0 10 0',
                                editable: false,
                                value: me.record.get('f_card'),
                            },
                            {
                                name: 'contactphone',
                                fieldLabel: '联系电话',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                value: me.record.get('contactphone'),
                            },
                            {
                                name: 'contactaddress',
                                fieldLabel: '联系地址',
                                margin: '10 0 10 0',
                                xtype: 'textfield',
                                editable: false,
                                value: me.record.get('contactaddress'),
                            },
                            {
                                name: 'delegateperson',
                                fieldLabel: '受委托人',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                hidden: true,
                                value: me.record.get('f_wtr'),
                            },
                            {
                                name: 'sfznumber',
                                fieldLabel: '身份证号',
                                margin: '10 0 10 0',
                                xtype: 'textfield',
                                editable: false,
                                hidden: true,
                                value: me.record.get('f_cardnum'),
                            },
                            {
                                name: 'flfg',
                                fieldLabel: '法律法规',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '94.5%',
                                readOnly: true,
                                value: me.record.get('flfg')
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
                                value: me.record.get('clyj')
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
                                value: me.record.get('wfqx')
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
                                value: me.record.get('cf')
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
                                        readOnly: true,
                                        name: 'zdmj',
                                        width: 239,
                                        value: me.record.get('zdmj')
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '耕地面积',
                                        readOnly: true,
                                        name: 'gdmj',
                                        width: 239,
                                        value: me.record.get('gdmj')
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '国土建筑面积',
                                        readOnly: true,
                                        name: 'gtjzmj',
                                        width: 239,
                                        value: me.record.get('gtjzmj')
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '规划建筑面积',
                                        readOnly: true,
                                        name: 'ghjzmj',
                                        width: 239,
                                        value: me.record.get('ghjzmj')
                                    }
                                ]
                            },
                            {
                                name: 'casrdescript',
                                fieldLabel: '案情描述',
                                margin: '10 0 10 10',
                                xtype: 'textarea',
                                colspan: 2,
                                width: '95%',
                                editable: false,
                                value: me.record.get('casecontent'),
                            },
                            {
                                fieldLabel: '缴款方式',
                                name: 'jktype',
                                xtype: 'textfield',
                                margin: '10 0 10 10',
                                colspan: 2,
                                width: 300,
                                value: me.record.get('jktype'),
                                editable: false,
                                listeners: {
                                    render: function (obj) {
                                        if (obj.value == '当场缴费') {
                                            me.down('combo[name=jybank]').hide();
                                            me.down('combo[name=bankid]').hide();
                                            me.down('combo[name=bankname]').hide();
                                            me.down('textfield[name=fkmoney]').colspan = 2;
                                        } else {
                                            me.down('combo[name=jybank]').show();
                                            me.down('combo[name=bankid]').show();
                                            me.down('combo[name=bankname]').show();
                                            me.down('textfield[name=fkmoney]').colspan = 1;
                                        }
                                    }
                                },
                            },
                            {
                                name: 'fkmoney',
                                fieldLabel: '罚款金额',
                                margin: '10 0 10 10',
                                colspan: 2,
                                xtype: 'textfield',
                                editable: false,
                                value: me.record.get('fk_money'),
                            },
                            {
                                fieldLabel: '缴款银行',
                                xtype: 'combo',
                                name: 'jybank',
                                margin: '10 0 10 0',
                                store: Ext.create('TianZun.store.sys.Dictionary', {
                                    proxy: { extraParams: { zd_type: 'type_bank' } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly: true,
                                allowBlank: false,
                                hidden: true,
                                value: me.record.get('bank_name'),
                                listeners: {
                                    render: function (combo) {
                                        this.getStore().load();
                                    }
                                },
                            },
                            {
                                fieldLabel: '银行户名',
                                xtype: 'combo',
                                name: 'bankid',
                                margin: '10 0 10 10',
                                store: Ext.create('TianZun.store.legalcasemanager.SimpleDicData', {
                                    proxy: { extraParams: { zd_type: 'type_bank', zd_id: me.record.get('bank_name') } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly: true,
                                allowBlank: false,
                                hidden: true,
                                value: me.record.get('bank_accountname'),
                                listeners: {
                                    render: function (combo) {
                                        this.getStore().load();
                                    }
                                },
                            },
                            {
                                fieldLabel: '银行帐号',
                                xtype: 'combo',
                                name: 'bankname',
                                margin: '10 0 10 10',
                                store: Ext.create('TianZun.store.legalcasemanager.SimpleDicData', {
                                    proxy: { extraParams: { zd_type: 'type_accountname', zd_id: me.record.get('bank_name') } }
                                }),
                                valueField: 'zd_id',
                                displayField: 'zd_name',
                                editable: false,
                                readOnly: true,
                                allowBlank: false,
                                hidden: true,
                                value: me.record.get('bank_account'),
                                listeners: {
                                    render: function (combo) {
                                        this.getStore().load();
                                    }
                                },
                            },
                            {
                                name: 'zfrname',
                                fieldLabel: '执法人姓名',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                value: $.cookie('USER_NAME'),
                            },
                            {
                                name: 'zfnumber',
                                fieldLabel: '执法证号',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                value: $.cookie('USER_CODE'),
                            },
                            {
                                name: 'zfrtime',
                                fieldLabel: '执法时间',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                value: me.record.get('zf_time'),
                            },
                            {
                                name: 'zfplace',
                                fieldLabel: '执法地点',
                                margin: '10 0 10 10',
                                xtype: 'textfield',
                                editable: false,
                                value: me.record.get('zf_address'),
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
                            html: '<label style="color:#3892d4;">返回</label>',
                            width: 80,
                            name: 'btncancle',
                            handler: 'onReturnList',
                            style: 'background:white;',
                            tabtitle: me.tabtitle,
                        }]
                    },
                ],
            },
        ]

        this.callParent();
    }
})