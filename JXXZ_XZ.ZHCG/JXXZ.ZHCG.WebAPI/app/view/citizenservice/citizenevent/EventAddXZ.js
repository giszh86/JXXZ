Ext.define('TianZun.view.citizenservice.citizenevent.EventAddXZ', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventAddXZ',
    modal: true,
    title: '市民事件上报',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var i = 1;
        var roleid = 3;

        this.items = [{
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
                            width: 314
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'userid',
                                value: $.cookie("USER_ID")
                            },
                            {
                                xtype: 'hidden',
                                name: 'autoid',
                            },
                          {
                              fieldLabel: '值班时间',
                              name: 'dutytime',
                              xtype: 'datefield',
                              allowBlank: false,
                              margin: '0 0 10 0',
                              value: new Date(),
                              editable: true,
                              format: "Y-m-d",
                              altFormats: "Y/m/d|Ymd",
                          },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件来源',
                                xtype: 'combo',
                                name: 'sourceid',
                                store: Ext.create('TianZun.store.citizenservice.EventSource'),
                                valueField: 'ID',
                                displayField: 'Name',
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    render: 'onReflush',
                                    change: function (obj) {
                                        var sjdjbh = me.down('textfield[name=eventid]');
                                        if (obj.getRawValue() == '24小时值班') {
                                            sjdjbh.setValue('秀洲执法[' + obj.autoyear + ']' + obj.auto24yearid + '号');
                                        } else if (obj.getRawValue() == '110应急联动') {
                                            sjdjbh.setValue('110应急联动[' + obj.autoyear + ']' + obj.auto110yearid + '号');
                                        } else if (obj.getRawValue() == '环境曝光台') {
                                            sjdjbh.setValue('啄木鸟工单' + obj.autoyear + obj.automonth + obj.autoday + obj.autohjpgtdayid);
                                        } else if (obj.getRawValue() == '夜间施工转报') {
                                            sjdjbh.setValue('夜间施工转报' + obj.autoyear + obj.automonth + obj.autoday + obj.autoyjsgzbdayid);
                                        } else if (obj.getRawValue() == '巡查发现') {
                                            sjdjbh.setValue('巡查发现' + obj.autoyear + obj.automonth + obj.autoday + obj.autoxcfxdayid);
                                        } else if (obj.getRawValue() == '其他') {
                                            sjdjbh.setValue('其他工单' + obj.autoyear + obj.automonth + obj.autoday + obj.autoqtdayid);
                                        } else if (obj.getRawValue() == '视频发现') {
                                            sjdjbh.setValue('视频发现' + obj.autoyear + obj.automonth + obj.autoday + obj.autospfxdayid);
                                        }
                                        else {
                                            sjdjbh.setValue('');
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
                                items: [
                                    {
                                        fieldLabel: '<span style="color:red">*</span>事件登记单编号',
                                        labelWidth: 100,
                                        width: 314,
                                        name: 'eventid',
                                        xtype: 'textfield',
                                        allowBlank: false,
                                    }
                                ]
                            },
                            {
                                fieldLabel: '投诉人',
                                name: 'complainant',
                                xtype: 'textfield',
                            },
                            {
                                fieldLabel: '人数',
                                name: 'cnumber',
                                xtype: 'numberfield',
                                minValue: 1,
                                value: 1,
                                hideTrigger: true
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'foundtime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>发现时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                            },
                            {
                                xtype: 'fieldset',
                                name: '',
                                border: false,
                                layout: 'table',
                                margin: '5 0 10 0',
                                width: '100%',
                                items: [
                                    {
                                        fieldLabel: '联系电话',
                                        name: 'contactphone',
                                        xtype: 'textfield',
                                        width: 250,
                                        labelAlign: 'right',
                                        labelWidth: 65
                                    },
                                    {
                                        xtype: 'button',
                                        text: '历史',
                                        handler: 'phoneQueryHistory',
                                        margin: '-5 0 0 10',
                                    }
                                ]
                            },
                            {
                                fieldLabel: '联系地址',
                                name: 'contactaddress',
                                xtype: 'textfield',
                            },
                            {
                                fieldLabel: '视频监控',
                                xtype: 'textfield',
                                name: 'monitorlist',
                                editable: false,
                                listeners: {
                                    render: function (obj) {
                                        obj.getEl().on('click', 'EventMonitorList');
                                    }
                                }
                            },
                            {
                                fieldLabel: '是否违建',
                                name: 'sfwj',
                                xtype: 'radiogroup',
                                items: [
                                    {
                                        boxLabel: '是',
                                        name: 'sfwj',
                                        inputValue: '1',
                                    },
                                    {
                                        boxLabel: '否',
                                        name: 'sfwj',
                                        inputValue: '0',
                                        checked: true,
                                    }
                                ]
                            },
                            {
                                fieldLabel: '专项整治',
                                name: 'sfzxzz',
                                xtype: 'radiogroup',
                                items: [
                                    {
                                        boxLabel: '是',
                                        id: 'radioYes',
                                        name: 'sfzxzz',
                                        inputValue: '1',
                                    },
                                    {
                                        boxLabel: '否',
                                        id: 'radioNo',
                                        name: 'sfzxzz',
                                        inputValue: '0',
                                        checked: true,
                                    }
                                ],
                                listeners: {
                                    'render': function (obj) {
                                        me.down('combo[name=srid]').disabled = true;
                                    },
                                    'change': function (obj) {
                                        if (obj.lastValue.sfzxzz == '1') {
                                            me.down('combo[name=srid]').disabled = false;
                                        } else {
                                            me.down('combo[name=srid]').clearValue();
                                            me.down('combo[name=srid]').disabled = true;
                                        }
                                    }
                                }
                            },
                            {
                                fieldLabel: '整治类型',
                                name: 'srid',
                                xtype: 'combo',
                                store: Ext.create('TianZun.store.citizenservice.PunishType'),
                                valueField: 'ID',
                                editable: false,
                                displayField: 'Name',
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件标题',
                                name: 'eventtitle',
                                xtype: 'textfield',
                                colspan: 3,
                                margin: '10 0 0 0',
                                allowBlank: false,
                                width: '96.3%',
                            },
                            {
                                fieldLabel: '事件地址',
                                name: 'eventaddress',
                                colspan: 3,
                                width: '96.3%',
                                margin: '10 0 0 0',
                                xtype: 'textfield',
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件内容',
                                name: 'eventcontent',
                                xtype: 'textarea',
                                margin: '10 0 10 0',
                                colspan: 3,
                                height: 30,
                                width: '96.3%',
                                allowBlank: false,
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>问题大类',
                                xtype: 'combo',
                                editable: false,
                                name: 'bigtypeid',
                                store: Ext.create('TianZun.store.citizenservice.BigQuestion'),
                                valueField: 'ID',
                                displayField: 'Name',
                                allowBlank: false,
                                listeners: {
                                    'change': function () {
                                        var cyCombo = Ext.getCmp('ACSmallTypeID');
                                        cyCombo.clearValue();
                                        cyStore = Ext.create('TianZun.store.citizenservice.BigQuestion');
                                        cyStore.getProxy().url = 'api/CitizenEvent/GetClassTypes?parentid=' + this.getValue();
                                        cyCombo.bindStore(cyStore, false);
                                        cyStore.load();
                                    }
                                }
                            },
                            {
                                id: 'ACSmallTypeID',
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>问题小类',
                                name: 'smalltypeid',
                                valueField: 'ID',
                                colspan: 2,
                                width: '94.7%',
                                editable: false,
                                displayField: 'Name',
                                allowBlank: false
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'limittime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>限办时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                            },
                            {
                                fieldLabel: '记录人',
                                name: 'recorduser',
                                xtype: 'textfield',
                                colspan: 2,
                                editable: false,
                                value: $.cookie('USER_NAME'),
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
                                    margin: '10 8 10 15'
                                },
                                {
                                    id: 'EVENT_COORDINATE_ID_ADD',
                                    name: 'grometry',
                                    xtype: 'textfield',
                                    margin: '10 0 0 0',
                                    colspan: 3,
                                    width: '91.2%',
                                    autoShow: true,
                                    listeners: {
                                        render: function (p) {
                                            p.getEl().on('click', function (p) {
                                                CreateAarcgisMap('EVENT_COORDINATE_ID_ADD', '事件坐标', 1, 1, this.component.getValue());
                                            });
                                        },
                                    }
                                }]
                            },
                            {
                                xtype: 'fieldset',
                                name: 'fieldsetInfo',
                                collapsible: true,
                                colspan: 3,
                                width: '97%',
                                title: '图片信息',
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
                                fieldLabel: '派遣方式',
                                name: 'xzassigntype',
                                xtype: 'radiogroup',
                                margin: '10 0 10 0',
                                colspan: 3,
                                width: '100%',
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
                                xtype: 'hidden',
                                name: 'xzid',
                                value: configs.TOWNID,
                            },
                            {
                                fieldLabel: '所在乡镇',
                                xtype: 'textfield',
                                editable: false,
                                name: 'middleteamdisplay',
                                value: configs.GETXZNAME(),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>选择队员',
                                id: 'ACSmallTypeID_Add',
                                xtype: 'combo',
                                editable: false,
                                allowBlank: false,
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
                                //listeners: {
                                //    select: 'changeShowInfoXZ'
                                //}
                            },
                            {
                                fieldLabel: '派遣意见',
                                name: 'suggest',
                                xtype: 'textarea',
                                colspan: 3,
                                margin: '10 0 10 0',
                                height: 30,
                                width: '96.5%'
                            },
                            // {
                            //     xtype: 'hidden',
                            //     name: 'phone',
                            // },
                            //  {
                            //      xtype: 'hidden',
                            //      name: 'phone1',
                            //  },

                            //{
                            //    xtype: 'checkbox',
                            //    margin: '10 0 0 20',
                            //    name: 'message',
                            //    boxLabel: "短信提醒  （" + "）",
                            //    colspan: 3,
                            //    width: 600,
                            //    checked: true,
                            //},
                        ]
                    }
            ],
            buttons: [{
                text: '提交上报',
                name: 'btnsubmit',
                handler: 'onAddOKXZ'
            },
            {
                text: '关闭',
                handler: 'onClose'
            }]
        }];

        this.callParent();

    },

});