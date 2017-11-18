Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseHJWSJCB', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseHJWSJCB',
    layout: 'fit',
    width: '100%',
    name:'AJDCZJBG',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var records;
        Ext.Ajax.request({
            url: configs.WebApi + 'api/CommonCase/GetFlowSaveInfo?wfsaid=' + me.record.get('wfsaid') + '&type=0',
            method: 'get',
            async:false,
            success: function (response) {
                records = JSON.parse(response.responseText);
            }
        });

        this.items =
            {
                xtype: 'form',
                border: false,
                items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    margin:'10 0 10 0',
                    title: '<label style="font-size:16px;">基本信息(<b style="color:red;">*</b>必填)</label>',
                    layout: {
                        type: 'table',
                        columns: 2,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 75
                    },
                    defaults: {
                        xtype: 'textfield',
                        width: 450
                    },
                    items: [
                        {
                            xtype: 'hidden',
                            name: 'caseid',
                            value: me.recordbaseinfo.caseid,
                        },
                        {
                            xtype: 'hidden',
                            name: 'userid',
                            value: $.cookie('USER_ID'),
                        },
                        {
                            xtype: 'hidden',
                            name: 'wfsid',
                            value: me.record.get('wfsid'),
                        },
                        {
                            xtype: 'hidden',
                            name: 'wfdid',
                            value: me.record.get('wfdid')
                        },
                        {
                            margin: '10 0 10 0',
                            fieldLabel: '申请事项',
                            readOnly: true,
                            name:'sqsx',
                            hidden: (configs.GZSPBARR.indexOf(me.record.get('wfdid')) >= 0 || configs.CFJDSARR.indexOf(me.record.get('wfdid')) >= 0 || configs.QTSPSXARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                            colspan: 2,
                            width: '100%',
                            value: configs.GZSPBARR.indexOf(me.record.get('wfdid')) >= 0 ? '行政处罚事先告知' : configs.CFJDSARR.indexOf(me.record.get('wfdid')) >= 0?'行政处罚决定':'相关事项审批表'
                        },
                        {
                            margin: '10 0 10 0',
                            fieldLabel: '<span style="color:red">*</span>立案编号',
                            name:'casebh',
                            readOnly: true,
                            width:'100%',
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
                            margin: '10 0 10 0',
                            colspan: 2,
                            width: '100%',
                            readOnly: true,
                            name: 'casename',
                            fieldLabel: '<span style="color:red">*</span>案件名称',
                            value: me.recordbaseinfo.casename,
                        },
                        {
                            margin: '10 0 10 0',
                            colspan: 2,
                            width: '100%',
                            readOnly: true,
                            name: 'qlsx',
                            fieldLabel: '<span style="color:red">*</span>权力事项',
                            value: me.recordbaseinfo.qlsx,
                        },
                        {
                            margin: '10 0 10 0',                            
                            fieldLabel: '案由',
                            name:'casereason',
                            readOnly: true,
                            colspan: 2,
                            width: '100%',
                            value: me.recordbaseinfo.casereason,
                        },
                        {
                            fieldLabel: '<span style="color:red">*</span>案件来源',
                            xtype: 'combo',
                            name:'casesource',
                            margin: '10 0 10 0',
                            store: Ext.create('TianZun.store.legalcasemanager.CaseSource'),
                            valueField: 'id',
                            displayField: 'name',
                            readOnly: true,
                            value: me.recordbaseinfo.casesourceid,
                            listeners: {
                                render: function () {
                                    this.getStore().load();
                                }
                            }
                        },
                        {
                            margin: '10 0 10 0',
                            xtype: 'textfield',
                            readOnly: true,
                            name: 'sitedatetime',
                            fieldLabel: '<span style="color:red">*</span>案发时间',
                            value: me.recordbaseinfo.sitedatetime,
                        },
                        {
                            margin: '10 0 10 0',
                            fieldLabel: '<span style="color:red">*</span>案发地址',
                            readOnly: true,
                            colspan: 2,
                            value: me.recordbaseinfo.caseaddress,
                        },
                        {
                            id: 'EVENT_COORDINATE_ID',
                            xtype: 'textfield',
                            fieldLabel: '地理位置',
                            colspan: 2,
                            width: '90%',
                            autoShow: true,
                            editable: false,
                            value: me.recordbaseinfo.geographical84,
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
                            margin: '10 0 10 0',
                            colspan: 2,
                            width: 300,
                            items: [
                                {
                                    boxLabel: '自然人',
                                    name: 'persontype',
                                    inputValue: 'type_zrr',
                                    readOnly:true
                                },
                                {
                                    boxLabel: '单位',
                                    name: 'persontype',
                                    inputValue: 'type_dw',
                                    readOnly: true
                                },
                            ],
                            listeners: {
                                render: function (obj) {
                                    if (me.recordbaseinfo.persontype == 'type_zrr') {
                                        obj.down('radio[inputValue=type_zrr]').setValue(true);
                                        me.down('textfield[name=f_name]').hide();
                                        me.down('textfield[name=f_dbr]').hide();
                                        me.down('textfield[name=f_wtr]').hide();
                                        me.down('textfield[name=f_cardnum]').hide();

                                        me.down('textfield[name=p_name]').show();
                                        me.down('radiogroup[name=p_sex]').show();
                                    } else {
                                        obj.down('radio[inputValue=type_dw]').setValue(true);
                                        me.down('textfield[name=f_name]').show();
                                        me.down('textfield[name=f_dbr]').show();
                                        me.down('textfield[name=f_wtr]').show();
                                        me.down('textfield[name=f_cardnum]').show();

                                        me.down('textfield[name=p_name]').hide();
                                        me.down('radiogroup[name=p_sex]').hide();
                                    }
                                }
                            },
                        },
                        {
                            fieldLabel: '姓名',
                            xtype: 'textfield',
                            name: 'p_name',
                            margin: '10 0 10 0',
                            readOnly: true,
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
                                    readOnly:true,
                                    checked: me.recordbaseinfo.p_sex == '男' ? true : false,
                                },
                                {
                                    boxLabel: '女',
                                    name: 'p_sex',
                                    inputValue: '女',
                                    readOnly:true,
                                    checked: me.recordbaseinfo.p_sex == '女' ? true : false,
                                },
                            ],
                        },
                        {
                            fieldLabel: '单位名称',
                            xtype: 'textfield',
                            name: 'f_name',
                            margin: '10 0 10 0',
                            hidden: true,
                            readOnly: true,
                            value: me.recordbaseinfo.f_name,
                        },
                        {
                            fieldLabel: '法定代表人',
                            xtype: 'textfield',
                            name: 'f_dbr',
                            margin: '10 0 10 0',
                            hidden: true,
                            readOnly: true,
                            value: me.recordbaseinfo.f_dbr,
                        },
                        {
                            fieldLabel: '证件类型',
                            xtype: 'combo',
                            name: 'f_cardtype',
                            margin: '10 0 10 0',
                            store: Ext.create('TianZun.store.sys.Dictionary', {
                                proxy: { extraParams: { zd_type: me.recordbaseinfo.persontype } }
                            }),
                            valueField: 'zd_id',
                            displayField: 'zd_name',
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
                            readOnly: true,
                            value: me.recordbaseinfo.f_card,
                        },
                        {
                            fieldLabel: '联系电话',
                            name: 'contactphone',
                            margin: '10 0 10 0',
                            xtype: 'textfield',
                            readOnly: true,
                            value: me.recordbaseinfo.contactphone,
                        },
                        {
                            fieldLabel: '联系地址',
                            name: 'contactaddress',
                            margin: '10 0 10 0',
                            xtype: 'textfield',
                            readOnly: true,
                            value: me.recordbaseinfo.contactaddress,
                        },
                        {
                            fieldLabel: '受委托人',
                            margin: '10 0 10 0',
                            hidden: true,
                            name: 'f_wtr',
                            xtype: 'textfield',
                            readOnly: true,
                            value: me.recordbaseinfo.f_wtr,
                        },
                        {
                            fieldLabel: '身份证号',
                            margin: '10 0 10 0',
                            hidden: true,
                            name: 'f_cardnum',
                            xtype: 'textfield',
                            readOnly: true,
                            value: me.recordbaseinfo.f_cardnum,
                        },
                    ]},
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '<label style="font-size:16px;">案情描述</label>',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 450
                        },
                        items: [
                            {
                                border: false,
                                xtype: 'panel',
                                colspan: 2,
                                width: '100%',
                                margin: '10 0 10 0',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '占地面积',
                                        name: 'zdmj',
                                        width: 200,
                                        minValue: 0,
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        value: me.recordbaseinfo.zdmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '耕地面积',
                                        name: 'gdmj',
                                        width: 200,
                                        minValue: 0,
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        value: me.recordbaseinfo.gdmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '国土建筑面积',
                                        name: 'gtjzmj',
                                        labelWidth: 100,
                                        width: 250,
                                        minValue: 0,
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        value: me.recordbaseinfo.gtjzmj
                                    },
                                    {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        decimalPrecision: 4,
                                        fieldLabel: '规划建筑面积',
                                        name: 'ghjzmj',
                                        labelWidth: 100,
                                        width: 250,
                                        minValue: 0,
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        value: me.recordbaseinfo.ghjzmj
                                    }
                                ]
                            },
                            {
                                fieldLabel: '调查经过',
                                margin: '0 0 10 0',
                                name: 'dcjg',
                                colspan: 2,
                                width:'100%',
                                xtype: 'textfield',
                                hidden: configs.AJDCZJBGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle==1&&configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.dcjg == null ? null : records.dcjg
                            },
                            {
                                fieldLabel: '违法事实',
                                margin: '0 0 10 0',
                                xtype: 'textarea',
                                name:'wfss',
                                colspan: 2,
                                width: '100%',
                                height:40,
                                hidden: configs.AJDCZJBGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle == 1 && configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.wfss == null ? null : records.wfss
                            },
                            {
                                fieldLabel: '行政处罚决定书文号',
                                margin: '0 0 10 0',
                                xtype: 'textfield',
                                readOnly: true,
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                value: me.recordbaseinfo.casebh
                            },
                            {
                                fieldLabel: '立案时间',
                                margin: '0 0 10 0',
                                xtype: 'textfield',
                                readOnly: true,
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                value: me.recordbaseinfo.sitedatetime
                            },
                            {
                                fieldLabel: '简要案情及申请理由依据和内容',
                                margin: '0 0 10 0',
                                xtype: 'textarea',
                                name: 'jyaq',
                                colspan: 2,
                                width: '100%',
                                height: 60,
                                hidden: (configs.GZSPBARR.indexOf(me.record.get('wfdid')) >= 0 || configs.CFJDSARR.indexOf(me.record.get('wfdid')) >= 0 || configs.QTSPSXARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                readOnly: (me.ishandle==1&&configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.jyaq == null ? records.dcjg : records.jyaq
                            },
                            {
                                fieldLabel: '处罚类型',
                                margin: '0 0 10 0',
                                xtype: 'combo',
                                name: 'xzcftype',
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle==1&&configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                store: Ext.create('TianZun.store.legalcasemanager.HJWSCFType'),
                                displayField: 'name',
                                valueField: 'id',
                                listeners: {
                                    afterrender: function (obj) {
                                        var val = records == null ? 1 : records.xzcftype == null ? 1 : records.xzcftype;
                                        obj.setValue(val);
                                        obj.getStore().reload();
                                    },
                                    change: function (obj) {
                                        var type = obj.getValue();                                        
                                        var labelvalue = type == 1 ? '警告内容' : type == 2 ? '罚款金额' : type == 3 ? '罚没财务' : type == 4 ? '责令内容' : type == 5 ? '暂扣物品' : type == 6 ? '拆除面积' : '其他';
                                        var xzcfje = me.down('textfield[name=xzcfje]');
                                        xzcfje.setFieldLabel(labelvalue);
                                    }
                                }
                            },
                            {
                                fieldLabel: '警告内容',
                                margin: '0 0 10 0',
                                name: 'xzcfje',
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle==1&&configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.xzcfje == null ? null : records.xzcfje,
                                listeners: {
                                    afterrender: function (obj) {
                                        var type = me.down('combo[name=xzcftype]').getValue();
                                        var labelvalue = type == 1 ? '警告内容' : type == 2 ? '罚款金额' : type == 3 ? '罚没财务' : type == 4 ? '责令内容' : type == 5 ? '暂扣物品' : type == 6 ? '拆除面积' : '其他';
                                        obj.setFieldLabel(labelvalue);
                                    }
                                }
                            },
                            {
                                fieldLabel: '处罚内容',
                                margin: '0 0 10 0',
                                xtype: 'textarea',
                                name: 'xzcfnr',
                                colspan: 2,
                                width: '100%',
                                height: 60,
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle==1&&configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.xzcfnr == null ? null : records.xzcfnr
                            },
                            {
                                fieldLabel: '行政处罚执行方式及罚没财务的设置',
                                margin: '0 0 10 0',
                                xtype: 'textarea',
                                name: 'xzcffs',
                                colspan: 2,
                                width: '100%',
                                height: 60,
                                hidden: configs.AJJABGARR.indexOf(me.record.get('wfdid')) >= 0 ? false : true,
                                readOnly: (me.ishandle == 1 && configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true,
                                value: records == null ? null : records.xzcffs == null ? null : records.xzcffs
                            },
                            {
                                fieldLabel: '案件定性',
                                id: 'ajdx',
                                name: 'ajdx',
                                colspan: 2,
                                xtype: 'radiogroup',
                                margin: '0 0 10 0',                              
                                items: [
                                    {
                                        boxLabel: '一般案件',
                                        name: 'ajdx',
                                        inputValue: '2017030613500007',
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        checked: records == null ? true : records.ajdx == null?true: records.ajdx == '2017030613500007' ? true : false
                                    },
                                    {
                                        boxLabel: '重大案件',
                                        name: 'ajdx',
                                        inputValue: '2017030613500006',
                                        readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                        checked: records == null ? false : records.ajdx == null?false:records.ajdx == '2017030613500006' ? true : false
                                    },                                
                                ],
                            },
                            {
                                fieldLabel: '案件备注',
                                margin: '0 0 10 0',
                                xtype: 'textarea',
                                name: 'ajdxremark',
                                colspan:2,
                                width: '100%',
                                height:40,
                                readOnly: (me.ishandle == 1 && me.record.get('wfdid') == '2017030613500005') ? false : true,
                                value: records == null ? null : records.ajdxremark == null ? null : records.ajdxremark
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>主办中队',
                                name: 'middleteam',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                    proxy: { extraParams: { unittypeid: 2 } }
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                readOnly: true,
                                value: me.recordbaseinfo == null ? null : me.recordbaseinfo.sszd,
                                listeners: {
                                    render: function (obj) {
                                        obj.getStore().load();
                                    },
                                },
                            },
                            {
                                fieldLabel: '主办队员',
                                readOnly: true,
                                value: me.recordbaseinfo.zbusername,
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>协办中队',
                                name: 'xbmiddleteam',
                                store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                    proxy: { extraParams: { unittypeid: 2 } }
                                }),
                                valueField: 'ID',
                                displayField: 'Name',
                                readOnly: true,
                                value: me.recordbaseinfo == null ? null : me.recordbaseinfo.ssxbzd,
                                listeners: {
                                    render: function (obj) {
                                        obj.getStore().load();
                                    },
                                },
                            },
                            {
                                fieldLabel: '协办队员',
                                readOnly: true,
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
                        text: '暂存',
                        width: 80,
                        hidden: (me.ishandle == 1 && (configs.DYZJWSARR.indexOf(me.record.get('wfdid')) >= 0) ? false : true),
                        name: 'btnsubmit',
                        handler: 'onFlowSaveOK',
                    }, {
                        html: '<label style="color:#3892d4;">返回</label>',
                        width: 80,
                        name: 'btncancle',
                        handler: 'onReturnList',
                        style: 'background:white;',
                    }]
                }
                ]
            }
        this.callParent();

    }
})