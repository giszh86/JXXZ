Ext.define('TianZun.view.conservation.conservationunit.UnitAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitAdd',
    title: '新增公司',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bordorPadding: 10,

            width: 800,
            marfin:'30 0 0 0',
            items: [{
                xtype: 'fieldset',
                collapsible: true,
                title: '公司信息',
                margin: 10,
                layout: {
                    type: 'table',
                    columns: 3,
                },
                fieldDefaults: {
                    labelAlign: 'right',
                    margin:'10 0 0 0',
                    labelWidth: 75,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 250,
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID")
                },
                {
                    fieldLabel: '<span style="color:red">*</span>公司名称',
                    xtype: 'textfield',
                    name: 'companyname',
                    colspan: 3,
                    width: '100%',
                    allowBlank: false
                },
                {
                    fieldLabel: '法人',
                    xtype: 'textfield',
                    name: 'legal',
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系人',
                    xtype: 'textfield',
                    name: 'contact',
                    allowBlank: false
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    xtype: 'textfield',
                    name: 'mobilephone',
                    allowBlank: false,
                    validator: function (v) {
                        //手机号
                        var cell = /^1[34578]\d{9}$/;
                        if (v != null) {
                            if (!(cell.test(v))) {
                                return "手机号格式有误，请核对！";
                            }
                            else {
                                return true;
                            }
                        }
                    }
                },
                {
                    fieldLabel: '固定电话',
                    xtype: 'textfield',
                    name: 'telephone',
                    validator: function (v) {
                        //固定电话
                        var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                        if (v != null) {
                            if (!(tel.test(v))) {
                                return "固定电话格式有误，请核对！";
                            }
                            else {
                                return true;
                            }
                        }
                    }
                },
                {
                    fieldLabel: '传真号码',
                    xtype: 'textfield',
                    name: 'faxnumber',
                },
                {
                    fieldLabel: '电子邮箱',
                    xtype: 'textfield',
                    name: 'email',
                    validator: function (v) {
                        //邮箱格式
                        var emailreg = /^([a-zA-Z0-9])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])/;
                        if (!emailreg.test(v)) {
                            return "电子邮箱格式有误，请核对！";
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    fieldLabel: '公司类型',
                    xtype: 'combo',
                    editable: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhgs_gslx',
                        }
                    }),
                    name: 'companytype',
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    margin:'10 0 20 0'

                },
                {
                    fieldLabel: '联系地址',
                    xtype: 'textfield',
                    name: 'address',
                    colspan: 2,
                    width: '100%',
                    margin: '10 0 20 0'
                }
                ]
            },
            ],
            buttons: [{
                text: '提交',
                handler: 'onAddOk',
                name:'tj',
            },
            {
                text: '取消',
                name: 'qx',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }

})