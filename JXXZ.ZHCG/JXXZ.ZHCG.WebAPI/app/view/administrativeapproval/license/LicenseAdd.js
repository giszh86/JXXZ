Ext.define('TianZun.view.administrativeapproval.license.LicenseAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.licenseAdd',
    title: '审批信息添加',
    layout: 'fit',
    config: { imgArray: "cccc" },
    initComponent: function () {
        var me = this;
        var i = 1;
        var imgList = me.imgArray = [];
        var roleid = 3;

        for (var i = 0; i < 6; i++) {
            imgList.push({ "ID": null, "Name": null, "Type": null, "sys64": null });
        }
        var sph = Math.floor(Math.random() * 10000);

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
                    margin: '20 0 0 0',
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
                        allowBlank: false,
                        width: 310,
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'createuserid',
                        value: $.cookie("USER_ID"),
                    }, {
                        fieldLabel: '<span style="color:red">*</span>审批事项',
                        name: 'xksx',
                        allowBlank: false,
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>审批号',
                        name: 'sph',
                        xtype: 'displayfield',
                        allowBlank: false,
                        value: Ext.util.Format.date(new Date(), "Ymd") + sph,//年月日+四位随机数
                        
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
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>地  址',
                        name: 'b_address',
                        allowBlank: false,
                        colspan: 3,
                        width:'100%',
                    }, {
                        fieldLabel: '<span style="color:red">*</span>事项描述',
                        name: 'sxmx',
                        colspan: 3,
                        width: '100%',
                        allowBlank: false,
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
                        xtype: 'textfield',
                        width: 310,
                    },
                    items: [{
                        fieldLabel: '<span style="color:red">*</span>申请人',
                        name: 'sqr',
                        allowBlank: false,
                        //value:$.cookie('USER_NAME')
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
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>证件号',
                        name: 'card',
                        allowBlank: false,
                        validator: function (v)
                        {
                            var certtype = me.down('combo[name=cardtype]').getValue();
                            //身份证
                            var IDCard = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
                            //军官证
                            var CertOfOfficers = /^[a-zA-Z0-9]{7,21}$/;
                            //护照
                            var passport = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
                            if (certtype == 1&&v!=null)
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
                        minValue: 0,
                        allowDecimals: false,
                        allowBlank: false,
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
                        colspan: 2,
                        width:'100%',
                    }]
                },
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '处理信息',
                        margin: '20 0 20 0',
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
                            width: 310
                        },
                        items: [{
                            fieldLabel: '<span style="color:red">*</span>可处理时间',
                            name: 'processtime_start',
                            allowBlank: false,
                            labelWidth: 80,
                            format: 'Y-m-d H:i:s',
                            editable: false,
                            xtype: 'datetimefield',
                            //altFormats: "Y/m/d|Ymd|Y-m-d",
                        }, {
                            fieldLabel: '<span style="color:red">*</span>至',
                            name: 'processtime_end',
                            colspan: 2,
                            labelWidth: 30,
                            format: 'Y-m-d H:i:s',
                            xtype: 'datetimefield',
                            margin:'-10px 0 0 -600',
                            editable: false,
                            allowBlank: false,
                            altFormats: "Y/m/d|Ymd|Y-m-d",
                        },
                         //{
                         //    xtype: 'datetimefield',
                         //    border: false,
                         //    name: 'foundtime',
                         //    editable: false,
                         //    allowBlank: false,
                         //    fieldLabel: '<span style="color:red">*</span>发现时间',
                         //    margin: '10 0 10 0',
                         //    format: 'Y-m-d H:i:s',
                         //},
                        {
                            fieldLabel: '处理描述',
                            name: 'processcontent',
                            xtype: 'textarea',
                            colspan: 3,
                            height: 30,
                            width: '100%',
                        }, {
                            fieldLabel: '处理地点',
                            name: 'processaddress',
                            colspan: 3,
                            width: '100%',
                        },
                        {
                            id: 'EVENT_COORDINATE_ID',
                            name: 'geography',
                            xtype: 'textfield',
                            fieldLabel: '地理位置',
                            width: '100%',
                            colspan: 3,
                            autoShow: true,
                            listeners: {
                                render: function (p) {
                                    p.getEl().on('click', function (p) {
                                        CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 1, 1, this.component.getValue());
                                    });
                                },
                            }
                        }
                        , {
                            xtype: 'fieldset',
                            collapsible: true,
                            //collapsed: true,
                            title: '上传附件',
                            colspan: 3,
                            width: '98%',
                            id: 'sc',
                            layout: 'fit',
                            items: [],
                            afterRender: function ()
                            {
                                Ext.getCmp('sc').add({
                                    xtype: 'uploadpanel',
                                    border: false,
                                    //title: 'UploadPanel for extjs 4.0',
                                    addFileBtnText: '选择文件...',
                                    uploadBtnText: '上传',
                                    removeBtnText: '移除所有',
                                    cancelBtnText: '取消上传',
                                    file_size_limit: 10000,//MB
                                    upload_url: 'api/Common/UploadFile',
                                    post_params: { 'path': configs.ApprovalPath },
                                    width: 500,
                                    height: 200,
                                })
                            }
                        }, ]
                    },
            ], buttons: [{
                text: '提交',
                handler: 'onAddOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    },
    GetTestValue: function () {
        return this.imgArray;
    }
});