Ext.define('TianZun.view.citizenservice.citizenevent.EventInfoQuick', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventInfoQuick',
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



        //当快速上报时，取出内勤人员和分组组长
        var nqzzname;
        var zzphone;
        Ext.Ajax.request({
            url: "api/CitizenEvent/GetQuickReportUsers?wfsid=" + me.record.get('wfsid'),
            method: 'get',
            async: false,
            success: function (response) {
                if (response.responseText != null) {
                    var jsonstr = JSON.parse(response.responseText);
                    nqzzname = jsonstr.nqname + ':' + jsonstr.nqphone + ',' + jsonstr.zzname + ':' + jsonstr.zzphone;
                    zzphone = jsonstr.nqphone == "" ? "暂无工作号" : jsonstr.nqphone + ',' + jsonstr.zzphone == "" ? "暂无工作号" : jsonstr.zzphone;

                }
            }
        })

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
                                       fieldLabel: '选择中队',
                                       xtype: 'combo',
                                       editable: false,
                                       hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                       store: Ext.create('TianZun.store.sys.UnitSquadron', {
                                           proxy: {
                                               type: 'ajax',
                                               method: "Get",
                                               url: configs.WebApi + 'api/Unit/GetUnitsSquadron?unittypeid=2',
                                           }
                                       }),
                                       name: 'middleteam',
                                       valueField: 'ID',
                                       displayField: 'Name',
                                       allowBlank: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                       colspan: 1,
                                       listeners: {
                                           'change': function () {
                                               var cyCombo = me.down('combo[name=dealperson]');
                                               cyCombo.clearValue();
                                               cyStore = Ext.create('TianZun.store.sys.UserUnitType');
                                               cyStore.getProxy().url = 'api/User/GetUsersPersonnelList?unitid=' + this.getValue() + '&roleid=' + roleid;
                                               cyCombo.bindStore(cyStore, false);
                                               cyStore.load();

                                               var chargeCombo = me.down('combo[name=chargeman]');
                                               chargeCombo.clearValue();
                                               chargeStore = Ext.create('TianZun.store.sys.UserUnitType');
                                               chargeStore.getProxy().url = 'api/User/GetUsersPersonnelList?unitid=' + this.getValue() + '&roleid=18';
                                               chargeCombo.bindStore(chargeStore, false);
                                               chargeStore.load();
                                           }
                                       }
                                   },
                                    {
                                        id: 'ACSmallTypeID_Add',
                                        xtype: 'combo',
                                        fieldLabel: '在编人员',
                                        name: 'dealperson',
                                        valueField: 'ID',
                                        allowBlank: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        editable: false,
                                        hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        colspan: 1,
                                        displayField: 'DisplayName',
                                    },
                                    {
                                        fieldLabel: '组长处理',
                                        xtype: 'combo',
                                        editable: false,
                                        hidden: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                        colspan: 1,
                                        name: 'chargeman',
                                        valueField: 'ID',
                                        displayField: 'DisplayName',
                                        allowBlank: (this.record.get('wfdid') == '2017021410240001' && dType == 2) ? false : true,
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>处理方式',
                                        name: 'dealtype',
                                        xtype: 'radiogroup',
                                        hidden: ((this.record.get('wfdid') == '2017021410240003' && dType == 1) || this.record.get('wfdid') == '2017021410240001') ? true : false,
                                        width: 400,
                                        items: [
                                            {
                                                boxLabel: '教育劝导',
                                                name: 'dealtype',
                                                hideValue: 1,
                                                checked: ((me.record.get('processmode') != null && me.record.get('processmode') == '教育劝导') || (me.record.get('processmode') == '' && me.record.get('wfdid') == '2017021410240003')) ? true : false,
                                                hidden: (me.record.get('wfdid') == '2017021410240003' && dType == 2 && ValueInArr($.cookie('ROLE_IDS').split(','), 3, 1)) ? true : false,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240004,教育劝导',
                                            },
                                            {
                                                boxLabel: '建议立案',
                                                name: 'dealtype',
                                                hideValue: 2,
                                                checked: (me.record.get('processmode') != null && me.record.get('processmode') == '建议立案') ? true : false,
                                                hidden: (me.record.get('wfdid') == '2017021410240003' && dType == 2 && ValueInArr($.cookie('ROLE_IDS').split(','), 3, 1)) ? true : false,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240004,建议立案'
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'dealtype',
                                                hideValue: 3,
                                                hidden: (me.record.get('wfdid') == '2017021410240003' && dType == 2 && $.cookie('ROLE_IDS').indexOf('18') >= 0) ? true : false,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240001'
                                            }
                                        ],
                                        listeners: {
                                            afterrender: function (obj) {
                                                if (me.record.get('wfdid') == '2017021410240003' && dType == 2 && ValueInArr($.cookie('ROLE_IDS').split(','), 3, 1)) {
                                                    me.down('radiogroup[name=dealtype]').colspan = 3;
                                                    obj.down('radio[hideValue=3]').setValue(true);
                                                    obj.down('radio[hideValue=3]').setWidth(100);
                                                    obj.setWidth(150);

                                                }
                                            },
                                            'change': function (obj) {
                                                if (obj.lastValue.dealtype == '2017021410240004,教育劝导' || obj.lastValue.dealtype == '2017021410240004,建议立案') {
                                                    me.down('radiogroup[name=dealtype]').colspan = 1;
                                                    me.down('button[name=btnSubmit]').setText('提交处理');
                                                    me.down('textarea[name=suggest]').setFieldLabel("处理意见");
                                                    me.down('radiogroup[name=myd]').show();
                                                    me.down('fieldset[name=fieldsetInfoAfter]').show();
                                                } else {
                                                    me.down('radiogroup[name=dealtype]').colspan = 3;
                                                    me.down('button[name=btnSubmit]').setText('提交回退');
                                                    me.down('textarea[name=suggest]').setFieldLabel("回退意见");
                                                    me.down('radiogroup[name=myd]').hide();
                                                    me.down('fieldset[name=fieldsetInfoAfter]').hide();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>满意度',
                                        name: 'myd',
                                        xtype: 'radiogroup',
                                        hidden: ((this.record.get('wfdid') == '2017021410240003' && dType == 1) || (me.record.get('wfdid') == '2017021410240003' && dType == 2 && ValueInArr($.cookie('ROLE_IDS').split(','), 3, 1)) || this.record.get('wfdid') == '2017021410240001') ? true : false,
                                        colspan: (this.record.get('wfdid') == '2017021410240003' && dType == 2) ? 3 : 2,
                                        width: 330,
                                        margin: '0 0 0 50',
                                        items: [
                                            {
                                                boxLabel: '满意',
                                                hideValue: 1,
                                                name: 'myd',
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '满意',
                                            },
                                            {
                                                boxLabel: '一般',
                                                hideValue: 2,
                                                name: 'myd',
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
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
                                                width: 80,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
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
                                                boxLabel: '回退',
                                                name: 'controlcheck',
                                                inputValue: '2017021410240004'
                                            }
                                        ],
                                    },
                                    {
                                        fieldLabel: (this.record.get('wfdid') == '2017021410240004' || this.record.get('wfdid') == '2017021410240005') ? '审核意见' : this.record.get('wfdid') == '2017021410240001' ? '派遣意见' : '处理意见',
                                        name: 'suggest',
                                        xtype: 'textarea',
                                        colspan: 3,
                                        height: 30,
                                        hidden: dType == 2 ? false : true,
                                        width: '100%',
                                    },
                                     {
                                         xtype: 'checkbox',
                                         margin: '10 0 0 20',
                                         name: 'message',
                                         boxLabel: "短信提醒",
                                         colspan: 3,
                                         //hidden: me.record.get('wfdid') == '2017021410240004' ? false : true,
                                         width: 600,
                                         checked: true,
                                     },
                                     {
                                         xtype: 'hidden',
                                         name: 'phone',
                                         value: zzphone
                                     },
                                    //{
                                    //    fieldLabel: '处理人员',
                                    //    name: 'dealpersonshow',
                                    //    xtype: 'textfield',
                                    //    hidden: me.record.get('wfdid') == '2017021410240004' ? false : true,
                                    //    colspan: 3,
                                    //    readOnly: true,
                                    //    value: nqzzname
                                    //},
                                    {
                                        xtype: 'fieldset',
                                        name: 'fieldsetInfoAfter',
                                        collapsible: true,
                                        colspan: 3,
                                        width: '97%',
                                        hidden: (me.record.get('wfdid') == '2017021410240003' && dType == 2 && $.cookie('ROLE_IDS').indexOf('18') >= 0) ? false : true,
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
                            store: Ext.create('TianZun.store.citizenservice.EventAllHistory', {
                                proxy: { extraParams: { wfsid: me.record.get('wfsid') } }
                            })
                        }
                    ]
                }

            }],

            buttons: [{
                name: 'btnSubmit',
                hidden: dType == 1 ? true : false,
                text: '提交',
                handler: 'onDispatchOK'
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