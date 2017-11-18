Ext.define('TianZun.view.administrativeapproval.license.LicenseEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.licenseEdit',
    title: '行政审批编辑',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function ()
    {
        var store = Ext.create('TianZun.store.administrativeapproval.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.licensingid, type: 2 } } });
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 1000,
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基础信息',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 75,
                        margin: '0 0 10 0',
                    },
                    defaults: {
                        xtype: 'textfield',
                        width: '100%',
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'createuserid',
                        value: $.cookie("USER_ID"),
                    }, {
                        xtype: 'hidden',
                        name: 'licensingid',
                        value: this.record.licensingid
                    }, {
                        fieldLabel: '<span style="color:red">*</span>审批事项',
                        name: 'xksx',
                        allowBlank: false,
                        value: this.record.xksx
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>审批号',
                        name: 'sph',
                        allowBlank: false,
                        readOnly: true,
                        editable: false,
                        value: this.record.sph
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>审批类型',
                        xtype: 'combo',
                        editable: false,
                        allowBlank: false,
                        store: Ext.create('TianZun.store.sys.Dictionary', {
                            proxy: {
                                type: 'ajax',
                                method: "Get",
                                url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_splx',
                            }
                        }),
                        name: 'splx',
                        valueField: 'zd_id',
                        displayField: 'zd_name',
                        listeners: {
                            beforerender: function (obj)
                            {
                                obj.setValue(me.record.splx);
                                this.getStore().load();
                            },
                        },
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>地  址',
                        name: 'b_address',
                        allowBlank: false,
                        colspan: 3,
                        value: this.record.b_address

                    }, {
                        fieldLabel: '事项描述',
                        name: 'sxmx',
                        colspan: 3,
                        value: this.record.sxmx
                    }], buttons: [{
                        text: '提交',
                        handler: 'onEditOK'
                    }, {
                        text: '取消',
                        handler: 'onClose'
                    }]
                }, {
                    xtype: 'fieldset',
                    collapsible: true,
                    margin: '20 0 0 0',
                    title: '申请者/申请者对象信息',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 75,
                        margin: '0 0 10 0',
                    },
                    defaults: {
                        width: '100%',
                        xtype: 'textfield',
                    },
                    items: [{
                        fieldLabel: '<span style="color:red">*</span>申请人',
                        name: 'sqr',
                        allowBlank: false,
                        value: this.record.sqr
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>证件类型',
                        xtype: 'combo',
                        editable: false,
                        allowBlank: false,
                        store: Ext.create('TianZun.store.sys.Dictionary', {
                            proxy: {
                                type: 'ajax',
                                method: "Get",
                                url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_xzxk_zjlx',
                            }
                        }),
                        name: 'cardtype',
                        valueField: 'zd_id',
                        displayField: 'zd_name',
                        listeners: {
                            beforerender: function (obj)
                            {
                                obj.setValue(me.record.cardtype);
                                this.getStore().load();
                            },
                        },
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>证件号',
                        name: 'card',
                        allowBlank: false,
                        value: this.record.card,
                        validator: function (v)
                        {
                            var certtype = me.down('combo[name=cardtype]').getValue();
                            //身份证
                            var IDCard = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
                            //军官证
                            var CertOfOfficers = /^[a-zA-Z0-9]{7,21}$/;
                            //护照
                            var passport = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
                            if (certtype == 1 && v != null)
                            {
                                if (!IDCard.test(v))
                                {
                                    return "身份证格式有误，请核对！";
                                }
                                else
                                {
                                    return true;
                                }
                            }
                            if (certtype == 2 && v != null)
                            {
                                if (!CertOfOfficers.test(v))
                                {
                                    return "军官证格式有误，请核对！";
                                }
                                else
                                {
                                    return true;
                                }
                            }
                            if (certtype == 3 && v != null)
                            {
                                if (passport.test(v))
                                {
                                    return true;
                                }
                                else
                                {
                                    return "护照格式有误，请核对！";
                                }
                            }
                        }
                    }, {
                        fieldLabel: '<span style="color:red">*</span>联系电话',
                        name: 'contactphone',
                        allowBlank: false,
                        value: this.record.contactphone,
                        validator: function (v)
                        {
                            //手机号
                            var cell = /^1[34578]\d{9}$/;
                            //固定电话
                            var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                            if (v != null)
                            {
                                if (!(tel.test(v) || cell.test(v)))
                                {
                                    return "固定电话或手机号有误，请核对！";
                                }
                                else
                                {
                                    return true;
                                }
                            }
                        }
                    }, {
                        fieldLabel: '地&nbsp;&nbsp;址',
                        name: 's_address',
                        value: this.record.s_address,
                        colspan: 2,
                    }]
                },
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '处理信息',
                        margin: '20 0 20 0',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 100,
                            margin: '0 0 10 20',
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: '100%',
                        },
                        items: [{
                            layout: 'hbox',
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                            colspan: 2,
                            id: 'mycheckboxgroup',
                            items: [
                                {
                                    fieldLabel: '<span style="color:red">*</span>可处理时间',
                                    name: 'processtime_start',
                                    allowBlank: false,
                                    labelWidth: 80,
                                    format: 'Y-m-d H:i:s',
                                    xtype: 'datetimefield',
                                    editable: false,
                                    value: this.record.processtime_start
                                }, {
                                    fieldLabel: '<span style="color:red">*</span>至',
                                    labelWidth: 30,
                                    name: 'processtime_end',
                                    editable: false,
                                    format: 'Y-m-d H:i:s',
                                    xtype: 'datetimefield',
                                    allowBlank: false,
                                    margin: '0 20 0 0',
                                    value: this.record.processtime_end
                                },
                            ],
                        },
                        {
                            fieldLabel: '处理描述',
                            name: 'processcontent',
                            height: 30,
                            colspan: 2,
                            width: 939,
                            xtype: 'textarea',
                            value: this.record.processcontent
                        }, {
                            fieldLabel: '处理地点',
                            colspan: 2,
                            name: 'processaddress',
                            value: this.record.processaddress,
                            width: 939,
                        },
                        {
                            id: 'EVENT_COORDINATE_ID',
                            name: 'geography',
                            xtype: 'textfield',
                            fieldLabel: '地理位置',
                            width: 918,
                            colspan: 3,
                            autoShow: true,
                            listeners: {
                                render: function (p)
                                {
                                    p.getEl().on('click', function (p)
                                    {
                                        CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 1, 1, this.component.getValue());
                                    });
                                },
                            }
                        }, {
                            xtype: 'imageshowpanel',
                            store: store,
                            titleNew: '附件',
                            path: configs.ApprovalPath,
                            colspan: 3,
                            margin: '10 0 10 19 ',
                            width: 918,
                        },
                         {
                             xtype: 'fieldset',
                             collapsible: true,
                             title: '新增附件',
                             //collapsed: true,
                             margin: '10 0 10 19 ',
                             colspan: 2,
                             id: 'cnm',
                             layout: 'fit',
                             width: 918,
                             item: [],
                             afterRender: function (obj)
                             {
                                 Ext.getCmp('cnm').add({
                                     id: "cnm_up",
                                     xtype: 'uploadpanel',
                                     border: false,
                                     file_types: '*.*',
                                     addFileBtnText: '选择文件...',
                                     uploadBtnText: '上传',
                                     removeBtnText: '移除所有',
                                     cancelBtnText: '取消上传',
                                     file_size_limit: 10000,//MB
                                     upload_url: 'api/Common/UploadFile',
                                     post_params: { 'path': configs.ApprovalPath },
                                     height: 200,
                                 })
                             }

                         }, ]
                    }
            ], buttons: [{
                text: '提交',
                handler: 'onEditOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});