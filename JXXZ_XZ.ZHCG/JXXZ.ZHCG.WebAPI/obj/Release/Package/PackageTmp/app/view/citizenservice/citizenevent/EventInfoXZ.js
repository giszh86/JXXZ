Ext.define('TianZun.view.citizenservice.citizenevent.EventInfoXZ', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventInfoXZ',
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
                                        hidden: (this.record.get('wfdid') == '2017021410240004' || this.record.get('wfdid') == '2017021410240006') ? false : true,
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
                                        fieldLabel: '派遣方式',
                                        name: 'xzassigntype',
                                        xtype: 'radiogroup',
                                        margin: '10 0 10 0',
                                        colspan: 3,
                                        width: '100%',
                                        hidden: (me.record.get('wfdid') != '2017021410240002' || dType == 1) ? true : false,
                                        hideLabels: false,
                                        defaults: {
                                            flex: 1
                                        },
                                        layout: 'hbox',
                                        items: [
                                            {
                                                boxLabel: '队员处理',
                                                name: 'zptype',
                                                width: 100,
                                                inputValue: '2017021410240003',
                                                checked: true,
                                            },
                                            {
                                                boxLabel: '区指挥中心',
                                                name: 'zptype',
                                                width: 100,
                                                inputValue: '2017021410240001'
                                            }
                                        ],
                                        listeners: {
                                            change: function (obj) {
                                                if (obj.lastValue.zptype == '2017021410240003') {
                                                    me.down('textfield[name=middleteamdisplay]').show();
                                                    me.down('combo[name=dealperson]').show();
                                                    me.down('combo[name=dealperson]').allowBlank = false;
                                                    //me.down('checkbox[name=message]').show();
                                                    me.down('textarea[name=suggest]').setFieldLabel('派遣意见');
                                                } else {
                                                    me.down('textfield[name=middleteamdisplay]').hide();
                                                    me.down('combo[name=dealperson]').hide();
                                                    me.down('combo[name=dealperson]').allowBlank = true;
                                                    //me.down('checkbox[name=message]').hide();
                                                    me.down('textarea[name=suggest]').setFieldLabel('退回意见');
                                                }
                                            }
                                        }
                                    },
                                    {
                                        fieldLabel: '所在乡镇',
                                        xtype: 'textfield',
                                        editable: false,
                                        hidden: (me.record.get('wfdid') != '2017021410240002' || dType == 1) ? true : false,
                                        name: 'middleteamdisplay',
                                        value: configs.GETXZNAME(),
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>选择队员',
                                        id: 'ACSmallTypeID_Add',
                                        xtype: 'combo',
                                        editable: false,
                                        allowBlank: (me.record.get('wfdid') != '2017021410240002' || dType == 1) ? true : false,
                                        hidden: (me.record.get('wfdid') != '2017021410240002' || dType == 1) ? true : false,
                                        colspan: 2,
                                        name: 'dealperson',
                                        store: Ext.create('TianZun.store.sys.UserUnitType', {
                                            proxy: {
                                                type: 'ajax',
                                                method: "Get",
                                                url: 'api/User/GetUsersPersonnelList?unitid=' + configs.TOWNID + '&roleid=4',
                                            },
                                        }),
                                        valueField: 'ID',
                                        displayField: 'DisplayName',
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>处理方式',
                                        name: 'dealtype',
                                        xtype: 'radiogroup',
                                        hidden: (me.record.get('wfdid') == '2017021410240001' || me.record.get('wfdid') == '2017021410240002' || (me.record.get('wfdid') == '2017021410240003' && dType == 1)) ? true : false,
                                        width: 400,
                                        items: [
                                            {
                                                boxLabel: '教育劝导',
                                                name: 'dealtype',
                                                hideValue: 1,
                                                checked: ((me.record.get('processmode') != null && me.record.get('processmode') == '教育劝导') || (me.record.get('processmode') == '' && me.record.get('wfdid') == '2017021410240003')) ? true : false,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240004,教育劝导',
                                            },
                                            {
                                                boxLabel: '建议立案',
                                                name: 'dealtype',
                                                hideValue: 2,
                                                checked: (me.record.get('processmode') != null && me.record.get('processmode') == '建议立案') ? true : false,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240004,建议立案'
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'dealtype',
                                                hideValue: 3,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '2017021410240002'
                                            }
                                        ],
                                        listeners: {
                                            //afterrender: function (obj) {
                                            //    if (me.record.get('wfdid') == '2017021410240003' && dType == 2){
                                            //        me.down('radiogroup[name=dealtype]').colspan = 3;
                                            //        obj.down('radio[hideValue=3]').setValue(true);
                                            //        obj.down('radio[hideValue=3]').setWidth(100);
                                            //        obj.setWidth(150);
                                            //    }
                                            //},
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
                                        hidden: (me.record.get('wfdid') == '2017021410240001' || me.record.get('wfdid') == '2017021410240002' || (me.record.get('wfdid') == '2017021410240003' && dType == 1)) ? true : false,
                                        colspan: (this.record.get('wfdid') == '2017021410240003' && dType == 2) ? 3 : 2,
                                        width: 330,
                                        margin: '0 0 0 50',
                                        items: [
                                            {
                                                boxLabel: '满意',
                                                hideValue: 1,
                                                name: 'myd',
                                                width: 80,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '满意',
                                            },
                                            {
                                                boxLabel: '一般',
                                                hideValue: 2,
                                                name: 'myd',
                                                width: 80,
                                                readOnly: (dType == 2 && me.record.get('wfdid') == '2017021410240003') ? false : true,
                                                inputValue: '一般'
                                            },
                                            {
                                                boxLabel: '不满意',
                                                hideValue: 3,
                                                name: 'myd',
                                                width: 80,
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
                                        fieldLabel: '处理方式',
                                        name: 'squadroncheck',
                                        xtype: 'radiogroup',
                                        hideLabels: false,
                                        hidden: (me.record.get('wfdid') == '2017021410240004' && dType == 2) ? false : true,
                                        colspan: 3,
                                        width: 400,
                                        items: [
                                            {
                                                boxLabel: '归档',
                                                name: 'squadroncheck',
                                                inputValue: '2017021410240006',
                                            },
                                            {
                                                boxLabel: '回退',
                                                name: 'squadroncheck',
                                                inputValue: '2017021410240003'
                                            }
                                        ],
                                    },
                                    {
                                        fieldLabel: this.record.get('wfdid') == '2017021410240001' ? '派遣意见' : '处理意见',
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
                                        hidden: (me.record.get('wfdid') == '2017021410240003' && dType == 2) ? false : true,
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
                                    //{
                                    //    fieldLabel: '处理人员',
                                    //    name: 'dealpersonshow',
                                    //    xtype: 'textfield',
                                    //    hidden: me.record.get('wfdid') == '2017021410240004' ? false : true,
                                    //    colspan: 3,
                                    //    readOnly: true,
                                    //    value: nqzzname
                                    //},
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
                handler: 'onDispatchOKXZ'
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