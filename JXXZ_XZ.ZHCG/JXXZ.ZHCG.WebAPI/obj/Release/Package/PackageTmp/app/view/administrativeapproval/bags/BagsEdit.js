Ext.define('TianZun.view.administrativeapproval.bags.BagsEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bagsEdit',
    title: '编辑',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.administrativeapproval.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.storeid, type: 1 } } });
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 1000,
            items: [{
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
                },
                defaults: {
                    xtype: 'textfield',
                    margin: '0 20 10 0',
                    width: '97.5%',
                },
                items: [
                    {
                    xtype: 'hidden',
                    name: 'storeid',
                    value: this.record.storeid
                }, {
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    name: 'storename',
                    colspan: 2,
                    margin: '10 0 10 0',
                    allowBlank: false,
                    value: this.record.storename,
                },
                {
                    fieldLabel: '<span style="color:red">*</span>店家类型',
                    xtype: 'combo',
                    editable: false,
                    allowBlank: false,
                    store: Ext.create('TianZun.store.sys.Dictionary', {
                        proxy: {
                            type: 'ajax',
                            method: "Get",
                            url: configs.WebApi + 'api/Dictionary/GetZdList?zd_type=type_djlx',
                        }
                    }),
                    name: 'storetype',
                    valueField: 'zd_id',
                    displayField: 'zd_name',
                    listeners: {
                        beforerender: function (obj) {
                            obj.setValue(me.record.storetype);
                            this.getStore().load();
                        },
                    },
                }, {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    name: 'person',
                    allowBlank: false,
                    value: this.record.person,
                }, {
                    fieldLabel: '证件号',
                    name: 'card',
                    value: this.record.card,
                    validator: function (v)
                    {
                        //判断是否包含特殊字符
                        //只通过包括字母和数字
                        var specialword = /[^0-9a-zA-Z]/g;
                        if (v != null)
                        {
                            if (specialword.test(v))
                            {
                                return "包括特殊字符，请核对！";
                            }
                            else
                            {
                                return true;
                            }
                        }
                    }
                }, {
                    fieldLabel: '联系电话',
                    name: 'contactphone',
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
                },
                
                {
                    fieldLabel: '<span style="color:red">*</span>地址',
                    name: 'address',
                    colspan: 3,
                    width: '98.8%',
                    allowBlank: false,
                    value: this.record.address,
                }, {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'geography',
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: '地理位置',
                    colspan: 3,
                    width: '98.9%',
                    autoShow: true,
                    value: this.record.geography,
                    listeners: {
                        render: function (p) {
                            p.getEl().on('click', function (p) {
                                CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 1, 1, this.component.getValue());
                            });
                        },
                    }
                }, {
                    fieldLabel: '备注:',
                    name: 'remark',
                    allowBlank: true,
                    xtype: 'textarea',
                    colspan: 3,
                    height: 30,
                    labelWidth: 60,
                    margin: '10 0 10 10',
                    width: '98%',
                    value: this.record.remark,
                }, {
                    xtype: 'imageshowpanel',
                    store: store,
                    titleNew: '附件',
                    path: configs.ThreeBagsPath,
                    colspan: 3,
                    margin: '10 0 10 10',
                    width: 918,
                }, {
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '新增附件',
                    //collapsed: true,
                    margin: '10 0 10 10',
                    colspan: 3,
                    id: 'cnm',
                    layout: 'fit',
                    width: '97%',
                    item: [],
                    afterRender: function (obj) {
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
                            post_params: { 'path': configs.ThreeBagsPath },
                            height: 200,
                        })
                    }

                }, ]
            }], buttons: [{
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