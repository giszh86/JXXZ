Ext.define('TianZun.view.conservation.conservationunit.UnitEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.unitEdit',
    title: '编辑养护单位',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            bordor: false,
            bordorPadding: 10,
            width: 800,
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
                    margin: '10 0 0 0',
                    labelWidth: 75,
                },
                defaults: {
                    xtype: 'textfield',
                    width: 250,
                },
                items: [
                    {
                        xtype: 'hidden',
                        name: 'createuserid',
                        value: $.cookie("USER_ID")
                    },
                     {
                         xtype: 'hidden',
                         name: 'companyid',
                         value: this.record.companyid,
                     },
                {
                    fieldLabel: '<span style="color:red">*</span>公司名称',
                    xtype: 'textfield',
                    name: 'companyname',
                    colspan: 3,
                    width: '100%',
                    allowBlank: false,
                    value: this.record.companyname,
                },
                {
                    fieldLabel: '法人',
                    xtype: 'textfield',
                    name: 'legal',
                    value: this.record.legal,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系人',
                    xtype: 'textfield',
                    name: 'contact',
                    allowBlank: false,
                    value: this.record.contact,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>联系电话',
                    xtype: 'textfield',
                    name: 'mobilephone',
                    allowBlank: false,
                    value: this.record.mobilephone,
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
                    value: this.record.telephone,
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
                    value: this.record.faxnumber,
                },
                {
                    fieldLabel: '电子邮箱',
                    xtype: 'textfield',
                    name: 'email',
                    value: this.record.email,
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
                    margin: '-3 0 0 0',
                    editable: false,
                    allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_yhgs_gslx',
                        }
                    }),
                    //value: this.record.companytype,
                    name: 'companytype',
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    listeners: {
                        beforerender: function (obj) {
                            obj.setValue(me.record.companytype);
                            this.getStore().load();
                        },

                    },
                },
               {
                   fieldLabel: '是否启用',
                   name: 'sfgd',
                   xtype: 'radiogroup',
                   margin:'10 0 0 0',
                   colspan: 2,
                   items: [
                       {
                           boxLabel: '是',
                           id: 'radioYes',
                           name: 'isenadle',
                           margin: '0 0 10 0',
                           inputValue: '1',
                       },
                       {
                           boxLabel: '否',
                           id: 'radioNo',
                           name: 'isenadle',
                           margin: '0 0 10 0',
                           inputValue: '0',
                           //checked: true,
                       }
                   ],
                   listeners: {
                       render: function (obj) {
                           if (me.record.isenadle == 1)
                               Ext.getCmp('radioYes').setValue(true);
                           else if (me.record.isenadle == 0)
                               Ext.getCmp('radioNo').setValue(true);

                       },
                   }
               },
                {
                    fieldLabel: '联系地址',
                    xtype: 'textfield',
                    margin: '0 0 20 0',
                    name: 'address',
                    colspan: 3,
                    width: '100%',
                    value: this.record.address,
                }
                ]
            },
            ],
            buttons: [{
                text: '提交',
                handler: 'onEditOk',
                name: 'tj',
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