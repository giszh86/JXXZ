Ext.define('TianZun.view.citizenservice.citizenevent.EventInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventInfo',
    title: '市民事件详情',
    modal: true,
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],
    maxHeight: 550,

    initComponent: function () {
        var me = this;
        var dType = this.type;
        var i = 1;
        roleid = 3;

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [{
                layout: 'fit',
                border: false,
                title: '事件详情',
                items: [{
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    width: 1070,
                    overflowY: 'auto',
                    items: [
                            {
                                xtype: 'fieldset',
                                collapsible: true,
                                title: '基础信息',

                                layout: {
                                    type: 'table',
                                    columns: 3,
                                },
                                fieldDefaults: {
                                    labelAlign: 'right',
                                    labelWidth: 75
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    width: 300
                                },
                                items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'userid',
                                        value: $.cookie("USER_ID")
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'officeuserid',
                                        value: this.record.get('officeuserid')
                                    },
                                     {
                                         xtype: 'hidden',
                                         name: 'citizenid',
                                         value: this.record.get('citizenid')
                                     },
                                     {
                                         xtype: 'hidden',
                                         name: 'wfdid',
                                         value: this.record.get('wfdid')
                                     },
                                    {
                                        xtype: 'hidden',
                                        name: 'wfsid',
                                        value: this.record.get('wfsid')
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'wfsaid',
                                        value: this.record.get('wfsaid')
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'backperson',
                                        value: this.record.get('nextuserid')
                                    },
                                    {
                                        fieldLabel: '值班时间',
                                        name: 'duteTime',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('dutytime')
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件登记单编号',
                                        labelWidth: 105,
                                        name: 'eventWriteCode',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('eventid'),
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件来源',
                                        xtype: 'textfield',
                                        name: 'eventSource',
                                        readOnly: true,
                                        value: this.record.get("sourcename"),
                                    },
                                    {
                                        fieldLabel: '投诉人',
                                        name: 'TSPerson',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('complainant'),
                                    },
                                    {
                                        fieldLabel: '人数',
                                        name: 'personNumber',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('cnumber'),
                                    },
                                    {
                                        fieldLabel: '发现时间',
                                        name: 'foundTime',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('foundtime'),
                                    },
                                    {
                                        fieldLabel: '联系电话',
                                        name: 'phone',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('contactphone'),
                                    },
                                    {
                                        fieldLabel: '联系地址',
                                        name: 'address',
                                        xtype: 'textfield',
                                        colspan: 2,
                                        readOnly: true,
                                        value: this.record.get('contactaddress'),
                                    },
                                    {
                                        fieldLabel: '事件地址',
                                        name: 'eventAddress',
                                        xtype: 'textfield',
                                        colspan: 3,
                                        width: '100%',
                                        readOnly: true,
                                        value: this.record.get('eventaddress'),
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件标题',
                                        name: 'eventTitle',
                                        xtype: 'textfield',
                                        colspan: 3,
                                        width: '100%',
                                        readOnly: true,
                                        value: this.record.get("eventtitle")
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件内容',
                                        name: 'eventContent',
                                        xtype: 'textarea',
                                        colspan: 3,
                                        height: 30,
                                        width: '100%',
                                        readOnly: true,
                                        value: this.record.get("eventcontent")
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>问题大类',
                                        xtype: 'textfield',
                                        name: 'questionBig',
                                        readOnly: true,
                                        value: this.record.get("bigtypename")
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>问题小类',
                                        xtype: 'textfield',
                                        name: 'questionSmall',
                                        colspan: 2,
                                        width: '100%',
                                        readOnly: true,
                                        value: this.record.get("smalltypename")
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>限办时间',
                                        name: 'limitTime',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get("limittime")
                                    },
                                    {
                                        fieldLabel: '记录人',
                                        name: 'recordUser',
                                        xtype: 'textfield',
                                        colspan: 2,
                                        readOnly: true,
                                        value: this.record.get("recorduser")
                                    },
                                    {
                                        id: 'EVENT_COORDINATE_ID',
                                        fieldLabel: '地理位置:',
                                        name: 'grometry',
                                        xtype: 'textfield',
                                        colspan: 3,
                                        value: this.record.get("grometry"),
                                        width: '100%',
                                        autoShow: true,
                                        listeners: {
                                            render: function (p) {
                                                p.getEl().on('click', function (p) {
                                                    CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                                                });
                                            },
                                        }
                                    },
                                    {
                                        xtype: 'imageshowpanel',
                                        store: Ext.create('TianZun.store.citizenservice.GetCitizenImages', {
                                            proxy: { extraParams: { citizenid: me.record.get('citizenid'), wfdid: '2017021410240010' } }
                                        }),
                                        margin: '0 0 10 0',
                                        colspan: 3,
                                        width: '97%',
                                        path: configs.CitizenServiceOriginalPath,
                                        listeners: {
                                            afterrender: function (obj) {
                                                obj.down('fieldset').setTitle('处理前的图片');
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'imageshowpanel',
                                        hidden: (this.record.get('wfdid') == '2017021410240004' || this.record.get('wfdid') == '2017021410240005' || this.record.get('wfdid') == '2017021410240006') ? false : true,
                                        name: 'lookFieldsetInfoAfter',
                                        store: Ext.create('TianZun.store.citizenservice.GetCitizenImages', {
                                            proxy: { extraParams: { citizenid: me.record.get('citizenid'), wfdid: '2017021410240003,2017021410240007' } }
                                        }),
                                        margin: '0 0 10 0',
                                        colspan: 3,
                                        width: '97%',
                                        path: configs.CitizenServiceOriginalPath,
                                        listeners: {
                                            afterrender: function (obj) {
                                                obj.down('fieldset').setTitle('处理后的图片');
                                            }
                                        }
                                    },

                                    {
                                        fieldLabel: '<span style="color:red">*</span>是否延期',
                                        name: 'dealtypeqwe',
                                        xtype: 'radiogroup',
                                        hideLabels: false,
                                        hidden: ((this.record.get('wfdid') == '2017021410240002' || this.record.get('wfdid') == '2017021410240007') && dType == 2) ? false : true,
                                        width: 300,
                                        colspan: 3,
                                        items: [
                                            {
                                                boxLabel: '否',
                                                name: 'isextension',
                                                inputValue: '0',
                                                readOnly: me.record.get('isextension') == null ? false : true,
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '是',
                                                name: 'isextension',
                                                inputValue: '1',
                                                editable: me.record.get('isextension') == null ? false : true,
                                            },
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record.get('isextension') == '1') {
                                                    obj.down('radio[inputValue=0]').setValue(false);
                                                    obj.down('radio[inputValue=1]').setValue(true);
                                                }
                                            },
                                            'change': function (obj) {
                                                if (obj.lastValue.isextension == '1') {                                                    
                                                    if (me.record != null && me.record.get('isextension') == '1')
                                                        me.down('textarea[name=suggest]').show();
                                                    else
                                                        me.down('textarea[name=suggest]').hide();

                                                    me.down('radiogroup[name=dealtypeqwe]').colspan = 1;
                                                    me.down('textfield[name=extensiontime]').show();
                                                    me.down('textarea[name=extensioncontent]').show();

                                                    if (me.record.get('wfdid') == '2017021410240007') {
                                                        me.down('fieldset[name=fieldsetInfoAfter]').hide();
                                                        me.down('textfield[name=examineperson]').hide();
                                                    } else {
                                                        if (me.record.get('isextension') == null) {
                                                            me.down('combo[name=person]').hide();
                                                            me.down('radiogroup[name=pqtype]').hide();
                                                        }
                                                    }

                                                } else {
                                                    me.down('radiogroup[name=dealtypeqwe]').colspan = 3;
                                                    me.down('textfield[name=extensiontime]').hide();
                                                    me.down('textfield[name=extensiontime]').setValue("");
                                                    me.down('textarea[name=extensioncontent]').hide();
                                                    me.down('textarea[name=suggest]').show();

                                                    if (me.record.get('wfdid') == '2017021410240007') {
                                                        me.down('fieldset[name=fieldsetInfoAfter]').show();
                                                        me.down('textfield[name=examineperson]').show();
                                                    } else {
                                                        me.down('radiogroup[name=pqtype]').down('radio[boxLabel=下一步]').setValue(true);
                                                        me.down('radiogroup[name=pqtype]').down('radio[boxLabel=回退]').setValue(false);
                                                        me.down('combo[name=person]').show();
                                                        me.down('radiogroup[name=pqtype]').show();
                                                    }
                                                }
                                            }
                                        }
                                    },
                                     {
                                         fieldLabel: '延期期限(小时)',
                                         name: 'extensiontime',
                                         xtype: 'numberfield',
                                         minValue: 0,
                                         decimalPrecision: 0,
                                         hideTrigger: true,
                                         labelWidth: 105,
                                         colspan: 2,
                                         hidden: true,
                                         editable: me.record.get('extensiontime') == null ? true : false,
                                         value: me.record.get('extensiontime') == null ? null : me.record.get('extensiontime')
                                     },

                                     {
                                         fieldLabel: '延期意见',
                                         name: 'extensioncontent',
                                         xtype: 'textarea',
                                         colspan: 3,
                                         height: 30,
                                         hidden: true,
                                         width: '100%',
                                         editable: me.record.get('extensioncontent') == null ? true : false,
                                         value: me.record.get('extensioncontent') == null ? null : me.record.get('extensioncontent')
                                     },

                                    {
                                        fieldLabel: '审核结果',
                                        name: 'leadercheck',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 0',
                                        colspan: 3,
                                        hidden: (this.record.get('wfdid') == '2017021410240008' && dType == 2) ? false : true,
                                        hideLabels: false,
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                boxLabel: '同意',
                                                name: 'leadercheck',
                                                inputValue: '2017021410240001',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '不同意',
                                                name: 'leadercheck',
                                                inputValue: '2017021410240009'
                                            }
                                        ]
                                    },
                                    {
                                        fieldLabel: '指派方式',
                                        name: 'assigntype',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 0',
                                        width:400,
                                        colspan: 3,
                                        hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        hideLabels: false,
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                boxLabel: '指派中队',
                                                name: 'assigntype',
                                                inputValue: '2017021410240002',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '领导审核',
                                                name: 'assigntype',
                                                inputValue: '2017021410240008'
                                            },
                                            {
                                                boxLabel: '协同单位',
                                                name: 'assigntype',
                                                inputValue: '2017021410240007'
                                            },
                                            {
                                                boxLabel: '结束',
                                                name: 'assigntype',
                                                //hidden:true,
                                                inputValue: '2017021410240009',
                                                //listeners: {
                                                //    render: function (radioobj) {
                                                //        Ext.Ajax.request({
                                                //            url: configs.WebApi + 'api/CitizenEvent/GetOldList?wfsid=' + me.record.get('wfsid'),
                                                //            method: 'get',
                                                //            scope: this,
                                                //            success: function (response) {
                                                //                var datas = Ext.decode(response.responseText);
                                                //                if (datas.length > 1) {
                                                //                    radioobj.show();
                                                //                }
                                                //            }
                                                //        });
                                                //    }
                                                //}
                                            }
                                        ],
                                        listeners: {
                                            change: function (obj) {
                                                if (obj.getValue().assigntype == '2017021410240002') {
                                                    roleid = 3;
                                                    var cyCombo = me.down('combo[name=middleteam]');
                                                    cyCombo.clearValue();
                                                    cyStore = Ext.create('TianZun.store.sys.UnitSquadron');
                                                    cyStore.getProxy().url = 'api/Unit/GetUnitsSquadron?unittypeid=2';
                                                    cyCombo.bindStore(cyStore, false);
                                                    cyStore.load();
                                                    me.down('combo[name=middleteam]').setFieldLabel('选择中队');
                                                    me.down('combo[name=middleteam]').show();
                                                    me.down('combo[name=middleteam]').colspan = 1;
                                                    me.down('combo[name=middleperson]').show();
                                                    me.down('textarea[name=suggest]').setFieldLabel('派遣意见');
                                                    me.down('textarea[name=suggest]').show();
                                                    me.down('button[name=btnSubmit]').setText('提交上报').show();
                                                } else if (obj.lastValue.assigntype == '2017021410240008') {
                                                    var cyCombo = me.down('combo[name=middleteam]');
                                                    cyCombo.clearValue();
                                                    cyStore = Ext.create('TianZun.store.sys.UsersStaff');
                                                    cyStore.getProxy().url = 'api/User/GetUsersStaffList?roleid=5';
                                                    cyCombo.bindStore(cyStore, false);
                                                    cyStore.load();
                                                    me.down('combo[name=middleteam]').setFieldLabel('选择领导');
                                                    me.down('combo[name=middleteam]').show();
                                                    me.down('combo[name=middleteam]').colspan = 3;
                                                    me.down('combo[name=middleperson]').hide();
                                                    me.down('textarea[name=suggest]').setFieldLabel('派遣意见');
                                                    me.down('textarea[name=suggest]').show();
                                                    me.down('button[name=btnSubmit]').setText('提交审核').show();
                                                }else if (obj.getValue().assigntype == '2017021410240007') {
                                                    roleid = 6;
                                                    var cyCombo = me.down('combo[name=middleteam]');
                                                    cyCombo.clearValue();
                                                    cyStore = Ext.create('TianZun.store.sys.UnitSquadron');
                                                    cyStore.getProxy().url = 'api/Unit/GetUnitsSquadron?unittypeid=3&unittypeid2=5';
                                                    cyCombo.bindStore(cyStore, false);
                                                    cyStore.load();
                                                    me.down('combo[name=middleteam]').setFieldLabel('选择单位');
                                                    me.down('combo[name=middleteam]').show();
                                                    me.down('combo[name=middleteam]').colspan = 1;
                                                    me.down('combo[name=middleperson]').show();
                                                    me.down('textarea[name=suggest]').setFieldLabel('处理意见');
                                                    me.down('textarea[name=suggest]').show();
                                                    me.down('button[name=btnSubmit]').setText('提交处理').show();
                                                } else if (obj.getValue().assigntype == '2017021410240009') {
                                                    me.down('combo[name=middleteam]').hide();
                                                    me.down('combo[name=middleperson]').hide();
                                                    me.down('textarea[name=suggest]').hide();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '选择中队',
                                        xtype: 'combo',
                                        name: 'middleteam',
                                        hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        editable: false,
                                        store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                            proxy: {
                                                type: 'ajax',
                                                method: "Get",
                                                url: configs.WebApi + 'api/Unit/GetUnitsSquadron?unittypeid=2',
                                            }
                                        }),
                                        valueField: 'ID',
                                        displayField: 'Name',
                                        listeners: {
                                            'change': function () {
                                                var cyCombo = Ext.getCmp('ACSmallTypeID11');
                                                cyCombo.clearValue();
                                                cyStore = Ext.create('TianZun.store.sys.UserUnitType');
                                                cyStore.getProxy().url = 'api/User/GetUsersPersonnelList?unitid=' + this.getValue() + '&&roleid=' + roleid;
                                                cyCombo.bindStore(cyStore, false);
                                                cyStore.load();
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '派遣方式',
                                        name: 'pqtype',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 0',
                                        colspan: 3,
                                        hidden: ((this.record.get('wfdid') == '2017021410240002' || this.record.get('wfdid') == '2017021410240007') && dType == 2) ? false : true,
                                        hideLabels: false,
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                boxLabel: '下一步',
                                                name: 'pqtype',
                                                inputValue: me.record.get('wfdid') == '2017021410240002' ? '2017021410240003' : '2017021410240005',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'pqtype',
                                                inputValue: '2017021410240001'
                                            }
                                        ],
                                        listeners: {
                                            change: function (obj) {
                                                if (obj.getValue().pqtype == '2017021410240003') {
                                                    me.down('textarea[name=suggest]').setFieldLabel('处理意见');
                                                    me.down('combo[name=person]').show();
                                                } else {
                                                    me.down('textarea[name=suggest]').setFieldLabel('回退意见');
                                                    me.down('combo[name=person]').hide();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '选择队员',
                                        xtype: 'combo',
                                        editable: false,
                                        colspan: 3,
                                        name: 'person',
                                        store: Ext.create('TianZun.store.sys.UserUnitType', {
                                            proxy: {
                                                type: 'ajax',
                                                method: "Get",
                                                url: 'api/User/GetUsersPersonnelList?unitid=' + $.cookie("UNIT_ID") + '&roleid=4',
                                            },
                                        }),
                                        hidden: (this.record.get('wfdid') == '2017021410240002' && dType == 2) ? false : true,
                                        valueField: 'ID',
                                        displayField: 'DisplayName',
                                    },
                                    {
                                        id: 'ACSmallTypeID11',
                                        xtype: 'combo',
                                        fieldLabel: '处理人',
                                        name: 'middleperson',
                                        valueField: 'ID',
                                        displayField: 'DisplayName',
                                        hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        editable: false,
                                        colspan: 2,
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>处理方式',
                                        name: 'dealtype',
                                        xtype: 'radiogroup',
                                        hidden: (this.record.get('wfdid') == '2017021410240001' || this.record.get('wfdid') == '2017021410240002' || this.record.get('wfdid') == '2017021410240007' || this.record.get('wfdid') == '2017021410240008' || this.record.get('wfdid') == '2017021410240009' || (this.record.get('wfdid') == '2017021410240003' && dType == 1) || (this.record.get('wfdid') == '2017021410240005' && this.record.get('workflowtype') == '2017021410240007')) ? true : false,

                                        width: 400,
                                        items: [
                                            {
                                                boxLabel: '教育劝导',
                                                name: 'dealtype',
                                                hideValue: 1,
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: (me.record.get('wfdid') == '2017021410240005' && dType == 2) ? '2017021410240005' : '2017021410240004,教育劝导',
                                            },
                                            {
                                                boxLabel: '建议立案',
                                                name: 'dealtype',
                                                hideValue: 2,
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: (me.record.get('wfdid') == '2017021410240005' && dType == 2) ? '2017021410240005' : '2017021410240004,建议立案'
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'dealtype',
                                                hideValue: 3,
                                                hidden: me.record.get('wfdid') == '2017021410240005' ? true : false,
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: (me.record.get('wfdid') == '2017021410240003' && dType == 2) ? '2017021410240002,回退' : '2017021410240001'
                                            }
                                        ],
                                        listeners: {
                                            afterrender: function (obj) {
                                                if (me.record.get('processmode') == null && me.record.get('wfdid') != '2017021410240003')
                                                    obj.hide();
                                                else if (me.record.get('processmode') == '教育劝导')
                                                    obj.down('radio[hideValue=1]').setValue(true);
                                                else if (me.record.get('processmode') == '建议立案')
                                                    obj.down('radio[hideValue=2]').setValue(true);
                                                else if (me.record.get('processmode') == '回退')
                                                    obj.down('radio[hideValue=3]').setValue(true);
                                                else
                                                    obj.down('radio[hideValue=1]').setValue(true);
                                            },
                                            'change': function (obj) {
                                                if (obj.lastValue.dealtype == '2017021410240004,教育劝导' || obj.lastValue.dealtype == '2017021410240004,建议立案') {
                                                    if (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) {
                                                        me.down('radiogroup[name=dealtype]').colspan = 1;
                                                        me.down('button[name=btnSubmit]').setText('提交处理');
                                                        me.down('textarea[name=suggest]').setFieldLabel("处理意见");
                                                        me.down('radiogroup[name=myd]').show();
                                                        me.down('textfield[name=examineperson]').show();
                                                        me.down('fieldset[name=fieldsetInfoAfter]').show();
                                                    }
                                                } else {
                                                    if (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) {
                                                        me.down('radiogroup[name=dealtype]').colspan = 3;
                                                        me.down('button[name=btnSubmit]').setText('提交回退');
                                                        me.down('textarea[name=suggest]').setFieldLabel("回退意见");
                                                        me.down('radiogroup[name=myd]').hide();
                                                        me.down('textfield[name=examineperson]').hide();
                                                        me.down('fieldset[name=fieldsetInfoAfter]').hide();
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>满意度',
                                        name: 'myd',
                                        xtype: 'radiogroup',
                                        hidden: (this.record.get('wfdid') == '2017021410240001' || this.record.get('wfdid') == '2017021410240002' || this.record.get('wfdid') == '2017021410240007' || this.record.get('wfdid') == '2017021410240008' || this.record.get('wfdid') == '2017021410240009' || (this.record.get('wfdid') == '2017021410240003' && dType == 1) || (this.record.get('wfdid') == '2017021410240005' && this.record.get('workflowtype') == '2017021410240007')) ? true : false,
                                        colspan: (this.record.get('wfdid') == '2017021410240003' && dType == 2) ? 3 : 2,
                                        width: 350,
                                        margin: '0 0 0 50',
                                        items: [
                                            {
                                                boxLabel: '满意',
                                                hideValue: 1,
                                                name: 'myd',
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: '满意',
                                            },
                                            {
                                                boxLabel: '一般',
                                                hideValue: 2,
                                                name: 'myd',
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: '一般'
                                            },
                                            {
                                                boxLabel: '不满意',
                                                hideValue: 3,
                                                name: 'myd',
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '不满意'
                                            },
                                            {
                                                boxLabel: '无法联系',
                                                hideValue: 4,
                                                name: 'myd',
                                                width:80,
                                                readOnly: (dType == 2 && (me.record.get('wfdid') == '2017021410240003' || me.record.get('wfdid') == '2017021410240007')) ? false : true,
                                                inputValue: '无法联系',
                                            }
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                if (me.record.get('satisfaction') == null && me.record.get('wfdid') != '2017021410240003')
                                                    obj.hide();
                                                if (me.record.get('satisfaction') == '满意')
                                                    obj.down('radio[hideValue=1]').setValue(true);
                                                else if (me.record.get('satisfaction') == '一般')
                                                    obj.down('radio[hideValue=2]').setValue(true);
                                                else if (me.record.get('satisfaction') == '不满意')
                                                    obj.down('radio[hideValue=3]').setValue(true);
                                                else
                                                    obj.down('radio[hideValue=4]').setValue(true);
                                            }
                                        }
                                    },

                                    {
                                        fieldLabel: '审核结果',
                                        name: 'squadroncheck',
                                        xtype: 'radiogroup',
                                        hideLabels: false,
                                        hidden: (me.record.get('wfdid') == '2017021410240004' && dType == 2) ? false : true,
                                        colspan: 3,
                                        width: 400,
                                        items: [
                                            {
                                                boxLabel: '同意',
                                                name: 'squadroncheck',
                                                inputValue: '2017021410240005',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'squadroncheck',
                                                inputValue: '2017021410240003'
                                            }
                                        ],
                                    },
                                    {
                                        fieldLabel: '审核结果',
                                        name: 'controlcheck',
                                        xtype: 'radiogroup',
                                        hideLabels: false,
                                        hidden: (me.record.get('wfdid') == '2017021410240005' && dType == 2) ? false : true,
                                        colspan: 3,
                                        width: 400,
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                boxLabel: '归档',
                                                name: 'controlcheck',
                                                inputValue: '2017021410240006',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '重新派遣',
                                                name: 'controlcheck',
                                                inputValue: '2017021410240001'
                                            }
                                        ],
                                    },                                     
                                    {
                                        fieldLabel: (this.record.get('wfdid') == '2017021410240004' || this.record.get('wfdid') == '2017021410240005' || this.record.get('wfdid') == '2017021410240008') ? '审核意见' : '处理意见',
                                        name: 'suggest',
                                        xtype: 'textarea',
                                        colspan: 3,
                                        height: 30,
                                        hidden: dType == 2 ? false : true,
                                        width: '100%',
                                    },                                    
                                    {
                                        xtype: 'fieldset',
                                        name: 'fieldsetInfoAfter',
                                        collapsible: true,
                                        colspan: 3,
                                        width: '97%',
                                        hidden: ((this.record.get('wfdid') == '2017021410240003' || this.record.get('wfdid') == '2017021410240007') && dType == 2) ? false : true,
                                        title: '处理后图片',
                                        listeners: {
                                            afterrender: function (obj) {
                                                obj.add({
                                                    xtype: 'uploadpanel',
                                                    border: false,
                                                    addFileBtnText: '选择文件...',
                                                    file_types: '*.jpg;*.png;*.bmp;*.gif;',
                                                    uploadBtnText: '上传',
                                                    removeBtnText: '移除所有',
                                                    cancelBtnText: '取消上传',
                                                    file_size_limit: 10000,//MB
                                                    upload_url: 'api/Common/UploadFile',
                                                    post_params: { 'path': configs.CitizenServiceOriginalPath },
                                                    height: 200,
                                                });
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '提交审核',
                                        xtype: 'textfield',
                                        name: 'examineperson',
                                        readOnly: true,
                                        hidden: ((this.record.get('wfdid') == '2017021410240003' || this.record.get('wfdid') == '2017021410240007') && dType == 2) ? false : true,
                                        colspan: 3,
                                        value: this.record.get('wfdid') == '2017021410240007' ? '指挥中心' : this.record.get('nextusername')
                                    },
                                ]
                            },
                    ],
                }],
            },
            {
                layout: 'fit',
                border: false,
                title: '历史记录',
                items: {
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    width: 1000,
                    height: 550,
                    overflowY: 'auto',
                    items: [
                        {
                            xtype: 'grid',
                            multiSelect: true,
                            columnLines: true,
                            plugins: [
                                { ptype: 'cellediting', clicksToEdit: 1 }
                            ],
                            columns: [
                                    { header: '操作环节', dataIndex: 'wfdname', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                                    { header: '处理人', dataIndex: 'username', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                                    { header: '处理时间', dataIndex: 'dealtime', flex: 1, editor: { xtype: 'textfield', readOnly: true } },
                                    { header: '处理意见', dataIndex: 'content', flex: 2, editor: { xtype: 'textfield', readOnly: true } }
                            ],
                            store:  Ext.create('TianZun.store.citizenservice.EventAllHistory', {
                                proxy: { extraParams: { wfsid: me.record.get('wfsid') } }
                            })
                        }
                    ]
                },
            }],

            buttons: [{
                name: 'btnSubmit',
                hidden: dType == 1 ? true : false,
                text: '提交',
                handler: 'onDispatchOK'
            },
            {
                name: 'btnOrderSheet',
                hidden: me.record.get('wfdid') == '2017021410240006'?false:true,
                text: '事件交办单',
                citizenid: me.record.get('citizenid'),
                handler: 'onOrderSheet'
            },
            {
                name: 'btnCancle',
                text: dType == 1 ? '返回' : '取消',
                handler: 'onClose'
            }],
            listeners: {
                'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                    var contentGrid = newCard.down('grid');
                    var contentBar = newCard.down('pagingtoolbar');
                    if (newCard.title == "事件详情" && dType == 2) {
                        this.down('button[name=btnSubmit]').show();
                    } else {
                        this.down('button[name=btnSubmit]').hide();
                    }
                }
            },

        }];

        this.callParent();
    },
});