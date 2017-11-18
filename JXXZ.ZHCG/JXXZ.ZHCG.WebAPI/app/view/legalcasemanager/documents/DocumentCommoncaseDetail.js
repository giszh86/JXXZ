Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseDetail',
    layout: 'fit',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items =[
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
                            margin: '10 0 10 10',
                            allowBlank: false,
                            fieldLabel: '<span style="color:red">*</span>立案编号',
                            editable: false,
                            name: 'casebh',
                            value: me.recordbaseinfo.casebh,
                        },
                        {
                            fieldLabel: '<span style="color:red">*</span>案件类型',
                            xtype: 'combo',
                            margin: '10 0 10 0',
                            store: Ext.create('TianZun.store.sys.Dictionary', {
                                proxy: { extraParams: { zd_type: 'type_case' } }
                            }),
                            valueField: 'zd_id',
                            displayField: 'zd_name',
                            editable: false,
                            allowBlank: false,
                            readOnly: true,
                            value: me.recordbaseinfo.casetypeid,
                            listeners: {
                                render: function () {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            margin: '10 0 10 10',
                            colspan: 2,
                            width: '96.5%',
                            allowBlank: false,
                            name: 'casename',
                            fieldLabel: '<span style="color:red">*</span>案件名称',
                            editable: false,
                            value: me.recordbaseinfo.casename,
                        },
                        {
                            margin: '10 0 10 10',
                            colspan: 2,
                            width:'96.5%',
                            allowBlank: false,
                            name: 'qlsx',
                            fieldLabel: '<span style="color:red">*</span>权力事项',
                            editable: false,
                            value: me.recordbaseinfo.qlsx,
                        },
                        {
                            margin: '10 0 10 10',
                            colspan: 2,
                            width: '96.5%',
                            name: 'casereason',
                            fieldLabel: '案由',
                            editable: false,
                            value: me.recordbaseinfo.casereason,
                        },
                        {
                            margin: '10 0 10 10',
                            name: 'fromcasesource',
                            fieldLabel: '案源',
                            editable: false,
                            value: me.recordbaseinfo.fromcasesource,
                        },
                        {
                            fieldLabel: '<span style="color:red">*</span>案件来源',
                            xtype: 'combo',
                            margin: '10 0 10 10',
                            name:'casesource',
                            store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                            valueField: 'id',
                            displayField: 'name',
                            allowBlank: false,
                            editable: false,
                            readOnly: true,
                            value: me.recordbaseinfo.casesourceid,
                            listeners: {
                                render: function () {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            margin: '10 0 10 10',
                            allowBlank: false,
                            fieldLabel: '<span style="color:red">*</span>案发地址',
                            editable: false,
                            value: me.recordbaseinfo.caseaddress,
                        },
                        {
                            margin: '10 0 10 0',
                            xtype: 'textfield',
                            name: 'sitedatetime',
                            editable: false,
                            allowBlank: false,
                            fieldLabel: '<span style="color:red">*</span>案发时间',
                            value: me.recordbaseinfo.sitedatetime,
                        },
                        {
                            name: 'grometry',
                            id: 'EVENT_COORDINATE_ID',
                            margin: '10 0 10 10',
                            fieldLabel: '地理位置',
                            width: '96.5%',
                            colspan: 2,
                            value: me.recordbaseinfo.geographical84,
                            autoShow: true,
                            editable: false,
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
                                    id: 'persontype1',
                                    inputValue: 'type_zrr',
                                },
                                {
                                    boxLabel: '单位',
                                    name: 'persontype',
                                    readOnly: true,
                                    id: 'persontype2',
                                    inputValue: 'type_dw',
                                },
                            ],
                            listeners: {
                                afterrender: function (obj) {
                                    if (me.recordbaseinfo != null && me.recordbaseinfo.persontype != null) {
                                        if (me.recordbaseinfo.persontype == 'type_zrr') {
                                            Ext.getCmp('persontype1').setValue(true);
                                            Ext.getCmp('persontype2').setValue(false);
                                        }
                                        if (me.recordbaseinfo.persontype == 'type_dw') {
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
                                            cyCombo.setValue(me.recordbaseinfo.f_cardtype);
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
                                            cyCombo.setValue(me.recordbaseinfo.f_cardtype);
                                    }
                                }
                            },
                        },
                        {
                            fieldLabel: '姓名',
                            xtype: 'textfield',
                            name: 'p_name',
                            margin: '10 0 10 10',
                            editable: false,
                            value: me.recordbaseinfo.p_name,
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
                                    checked: me.recordbaseinfo == null ? true : me.recordbaseinfo.p_sex == '男' ? true : false,
                                },
                                {
                                    boxLabel: '女',
                                    name: 'p_sex',
                                    inputValue: '女',
                                    checked: me.recordbaseinfo == null ? false : me.recordbaseinfo.p_sex == '女' ? true : false,
                                },
                            ],
                        },
                        {
                            fieldLabel: '单位名称',
                            xtype: 'textfield',
                            name: 'f_name',
                            margin: '10 0 10 10',
                            hidden: true,
                            editable: false,
                            value: me.recordbaseinfo.f_name,
                        },
                        {
                            fieldLabel: '法定代表人',
                            xtype: 'textfield',
                            name: 'f_dbr',
                            margin: '10 0 10 0',
                            hidden: true,
                            editable: false,
                            value: me.recordbaseinfo.f_dbr,
                        },
                        {
                            fieldLabel: '证件类型',
                            xtype: 'combo',
                            id: 'ID_Type',
                            margin: '10 0 10 10',
                            name: 'f_cardtype',
                            store: Ext.create('TianZun.store.sys.Dictionary', {
                                proxy: { extraParams: { zd_type: 'type_zrr' } }
                            }),
                            valueField: 'zd_id',
                            displayField: 'zd_name',
                            editable: false,
                            readOnly: true,
                            value: me.recordbaseinfo.f_cardtype,
                            listeners: {
                                render: function () {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            fieldLabel: '证件号',
                            margin: '10 0 10 0',
                            name: 'f_card',
                            editable: false,
                            value: me.recordbaseinfo.f_card,
                        },
                        {
                            fieldLabel: '联系电话',
                            margin: '10 0 10 10',
                            name: 'contactphone',
                            xtype: 'textfield',
                            editable: false,
                            value: me.recordbaseinfo.contactphone,
                        },
                        {
                            fieldLabel: '联系地址',
                            margin: '10 0 10 0',
                            name: 'contactaddress',
                            xtype: 'textfield',
                            editable: false,
                            value: me.recordbaseinfo.contactaddress,
                        },
                        {
                            fieldLabel: '受委托人',
                            margin: '10 0 10 10',
                            hidden: true,
                            name: 'f_wtr',
                            xtype: 'textfield',
                            editable: false,
                            value: me.recordbaseinfo.f_wtr,
                        },
                        {
                            fieldLabel: '身份证号',
                            margin: '10 0 10 0',
                            hidden: true,
                            name: 'f_cardnum',
                            xtype: 'textfield',
                            editable: false,
                            value: me.recordbaseinfo.f_cardnum,
                        },
                        {
                            name: 'flfg',
                            fieldLabel: '法律法规',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            colspan: 2,
                            width: '96.5%',
                            readOnly: true,
                            value: me.recordbaseinfo.flfg,
                        },
                        {
                            name: 'clyj',
                            fieldLabel: '裁量依据',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            colspan: 2,
                            width: '96.5%',
                            height: 80,
                            readOnly: true,
                            value: me.recordbaseinfo.clyj,
                        },
                        {
                            name: 'wfqx',
                            fieldLabel: '违法情形',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            colspan: 2,
                            width: '96.5%',
                            height: 80,
                            readOnly: true,
                            value: me.recordbaseinfo.wfqx,
                        },
                        {
                            name: 'cf',
                            fieldLabel: '处罚结果',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            colspan: 2,
                            width: '96.5%',
                            readOnly: true,
                            height: 50,
                            value: me.recordbaseinfo.cf,
                        },
                        {
                            border: false,
                            xtype: 'panel',
                            colspan: 2,
                            width: '96.5%',
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
                                    value: me.recordbaseinfo.zdmj
                                },
                                {
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    decimalPrecision: 4,
                                    fieldLabel: '耕地面积',
                                    readOnly: true,
                                    name: 'gdmj',
                                    width: 239,
                                    value: me.recordbaseinfo.gdmj
                                },
                                {
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    decimalPrecision: 4,
                                    fieldLabel: '国土建筑面积',
                                    readOnly: true,
                                    name: 'gtjzmj',
                                    width: 239,
                                    value: me.recordbaseinfo.gtjzmj
                                },
                                {
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    decimalPrecision: 4,
                                    fieldLabel: '规划建筑面积',
                                    readOnly: true,
                                    name: 'ghjzmj',
                                    width: 239,
                                    value: me.recordbaseinfo.ghjzmj
                                }
                            ]
                        },
                        {
                            fieldLabel: '<span style="color:red">*</span>案情描述',
                            margin: '10 0 10 10',
                            xtype: 'textarea',
                            name: 'casecontent',
                            colspan: 2,
                            width: '96.5%',
                            allowBlank: false,
                            editable: false,
                            value: me.recordbaseinfo.casecontent,
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '<span style="color:red">*</span>主办中队',
                            labelAlign: 'right',
                            margin: '0 0 10 10',
                            name: 'middleteam',
                            store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                proxy: { extraParams: { unittypeid: 2 } }
                            }),
                            valueField: 'ID',
                            displayField: 'Name',
                            readOnly: true,
                            value:me.recordbaseinfo.sszd,
                            listeners: {
                                render: function (obj) {
                                    obj.getStore().load();
                                },
                            },
                        },
                        {
                            fieldLabel: '主办队员',
                            labelAlign: 'right',
                            width: 450,
                            margin: '0 0 10 10',
                            editable: false,
                            value: me.recordbaseinfo.zbusername,
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '<span style="color:red">*</span>协办中队',
                            labelAlign: 'right',
                            margin: '0 0 10 10',
                            name: 'xbmiddleteam',
                            store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                proxy: { extraParams: { unittypeid: 2 } }
                            }),
                            valueField: 'ID',
                            displayField: 'Name',
                            readOnly: true,
                            value: me.recordbaseinfo.ssxbzd,
                            listeners: {
                                render: function (obj) {
                                    obj.getStore().load();
                                },
                            },
                        },
                        {
                            fieldLabel: '协办队员',
                            labelAlign: 'right',
                            width: 450,
                            margin: '0 0 10 10',
                            editable: false,
                            value: me.recordbaseinfo.xbusername,
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
                        tabtitle: me.tabtitle,
                        style: 'background:white;',
                    }]
                }
                ]
            }]

        this.callParent();

    }
})