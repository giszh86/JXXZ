Ext.define('TianZun.view.citizenservice.citizenevent.EventReview', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventReview',
    title: '市民事件延期审核',
    layout: 'fit',
    config: { imgArray: "cccc" },

    initComponent: function () {
        var me = this;
        var dType = this.type;
        var i = 1;
        var imgList = me.imgArray = [];
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
                    width: 1000,
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
                                    labelWidth: 100
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    width: 287
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
                                        readOnly:true,
                                        value: this.record.get('dutytime')
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件登记单编号',
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
                                        readOnly: true,
                                        value: this.record.get('contactaddress'),
                                    },
                                    {
                                        fieldLabel: '事件地址',
                                        name: 'eventAddress',
                                        xtype: 'textfield',
                                        readOnly: true,
                                        value: this.record.get('eventaddress'),
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件标题',
                                        name: 'eventTitle',
                                        xtype: 'textfield',
                                        colspan: 3,
                                        readOnly: true,
                                        value: this.record.get("eventtitle")
                                    },
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件内容',
                                        name: 'eventContent',
                                        xtype: 'textfield',
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
                                        xtype: 'panel',
                                        border: false,
                                        bodyBorder: false,
                                        colspan: 3,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            align: 'left'
                                        },
                                        items: [{
                                            xtype: 'label',
                                            html: '地理位置:',
                                            margin: '10 8 10 40'
                                        },
                                        {
                                            id: 'EVENT_COORDINATE_ID',
                                            name: 'grometry',
                                            xtype: 'textfield',
                                            colspan: 3,
                                            value: this.record.get("grometry"),
                                            width: '90%',
                                            readOnly: true,
                                            autoShow: true,
                                            listeners: {
                                                render: function (p) {
                                                    p.getEl().on('click', function (p) {
                                                        CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                                                    });
                                                },
                                            }
                                        }]
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
                                        fieldLabel: '<span style="color:red">*</span>是否延期',
                                        name: 'dealtypeqwe',
                                        xtype: 'radiogroup',
                                        hideLabels: false,
                                        width: 300,
                                        colspan: 1,
                                        defaults: {
                                            flex: 1
                                        },
                                        layout: 'hbox',
                                        items: [
                                           {
                                               boxLabel: '否',
                                               id: 'mb1',
                                               name: 'isextension',
                                               inputValue: '0',
                                               readOnly:true
                                           },
                                            {
                                                boxLabel: '是',
                                                id: 'mb2',
                                                name: 'isextension',
                                                inputValue: '1',
                                                checked: true,
                                            },
                                        ],
                                        listeners: {
                                            'change': function (obj) {
                                                if (obj.lastValue.isextension == '1') {
                                                    me.down('radiogroup[name=dealtypeqwe]').colspan = 1;
                                                    me.down('textfield[name=extensiontime]').show();

                                                    me.down('textarea[name=suggest]').hide();
                                                    me.down('fieldset[name=fieldsetInfoAfter]').hide();
                                                    me.down('textfield[name=examineperson]').hide();
                                                } else {
                                                    me.down('radiogroup[name=dealtypeqwe]').colspan = 3;
                                                    me.down('textfield[name=extensiontime]').hide();
                                                    me.down('textfield[name=extensiontime]').setValue("");

                                                    me.down('textarea[name=suggest]').show();
                                                    me.down('fieldset[name=fieldsetInfoAfter]').show();
                                                    me.down('textfield[name=examineperson]').show();
                                                }
                                            }
                                        }
                                    },

                                     {
                                         fieldLabel: '延期期限(小时)',
                                         id: 'extensiontime',
                                         name: 'extensiontime',
                                         xtype: 'textfield',
                                         colspan: 2,
                                        // hidden: true,
                                         editable: false,
                                         value: this.record.get("extensiontime")
                                     },
                                       {
                                           fieldLabel: '延期意见',
                                           name: 'extensioncontent',
                                           xtype: 'textarea',
                                           colspan: 3,
                                           height: 30,
                                           width: '97%',
                                           editable: false,
                                           value: this.record.get("extensioncontent")
                                       },
                                     {
                                         fieldLabel: '<span style="color:red">*</span>是否同意',
                                         name: 'reviewexten',
                                         xtype: 'radiogroup',
                                         hideLabels: false,
                                         width: 300,
                                         colspan: 3,
                                         defaults: {
                                             flex: 1
                                         },
                                         layout: 'hbox',
                                         items: [
                                            {
                                                boxLabel: '否',
                                                name: 'reviewextension',
                                                inputValue: '0',
                                                checked: true,
                                            },
                                             {
                                                 boxLabel: '是',
                                                 name: 'reviewextension',
                                                 inputValue: '1',
                                             },
                                         ],
                                       
                                     },
                                     {
                                         fieldLabel: '延期审核意见',
                                         name: 'auditopinion',
                                         xtype: 'textarea',
                                         colspan: 3,
                                         height: 30,
                                         width: '97%',
                                         value: this.record.get("auditopinion")
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
                    items: [{
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',
                        name: 'fieldsetHistory',
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
                            width: 312
                        },
                    }]
                },

                listeners: {
                    render: function () {
                        var myMask = new Ext.LoadMask(this, { msg: "正在加载数据..." });
                        myMask.show();
                        var fieldset = me.down('fieldset[name=fieldsetHistory]');
                        Ext.Ajax.request({
                            url: configs.WebApi + 'api/CitizenEvent/GetOldList?wfsid=' + me.record.get('wfsid'),
                            method: 'get',
                            scope: this,
                            success: function (response) {

                                var datas = Ext.decode(response.responseText);
                                for (data in datas)  // json数组的最外层对象  
                                {
                                    Ext.each(datas[data], function (items) {
                                        Ext.each(items, function (item) {
                                            fieldset.add({
                                                fieldLabel: '操作环节',
                                                xtype: 'displayfield',
                                                value: item.wfdname,
                                            },
                                            {
                                                fieldLabel: '处理人',
                                                xtype: 'displayfield',
                                                value: item.username,
                                            },
                                            {
                                                fieldLabel: '处理时间',
                                                xtype: 'displayfield',
                                                value: item.dealtime,
                                            },
                                            {
                                                fieldLabel: '处理意见',
                                                xtype: 'displayfield',
                                                colspan: 3,
                                                width: '100%',
                                                margin: '-5 0 0 0',
                                                value: item.content,
                                            },
                                            {
                                                xtype: 'form',
                                                width: 950,
                                                height: 1,
                                                colspan: 3
                                            });
                                        });
                                    });
                                } myMask.hide();
                            }
                        });
                    }
                }

            }],

            buttons: [{
                name: 'btnSubmit',
                text: '提交',
                handler: 'onReviewOK'
            }, {
                name: 'btnCancle',
                text: '取消',
                handler: 'onClose'
            }],
            listeners: {
                'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                    var contentGrid = newCard.down('grid');//grid
                    var contentBar = newCard.down('pagingtoolbar')//bbar
                    if (newCard.title == "事件详情") {
                        this.down('button[name=btnSubmit]').show();
                        this.down('button[name=btnCancle]').setText('取消');
                    } else {
                        this.down('button[name=btnSubmit]').hide();
                        this.down('button[name=btnCancle]').setText('返回');
                    }
                }
            },

        }];

        this.callParent();
    },
});