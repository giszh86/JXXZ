Ext.define('TianZun.view.administrativeapproval.bags.BagsAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.bagsAdd',
    title: '行政审批管理 -> 门前三包 -> 添加门前三包',
    layout: 'fit',
    initComponent: function () {
        var me = this;
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
                    width: '98%',
                },
                items: [{
                    xtype: 'hidden',
                    name: 'createuserid',
                    value: $.cookie("USER_ID"),
                }, {
                    fieldLabel: '<span style="color:red">*</span>店家名称',
                    name: 'storename',
                    colspan: 2,
                    margin:'10 0 10 0',
                    allowBlank: false,
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
                }, {
                    fieldLabel: '<span style="color:red">*</span>负责人',
                    name: 'person',
                    allowBlank: false,
                }, {
                    fieldLabel: '<span style="color:red">*</span>证件号',
                    name: 'card',
                    allowBlank: false,
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
                    fieldLabel: '<span style="color:red">*</span>地址',
                    name: 'address',
                    colspan: 3,
                    allowBlank: false,
                    width: '99.5%',
                }, {
                    id: 'EVENT_COORDINATE_ID',
                    name: 'geography',
                    xtype: 'textfield',
                    fieldLabel: '地理位置',
                    width: '99.5%',
                    colspan: 3,
                    autoShow: true,
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
                    width: '98.5%',
                }, {
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
                            post_params: { 'path': configs.ThreeBagsPath },
                            width: 500,
                            height: 200,
                        })
                    }
                }, ]
            }], buttons: [{
                text: '提交',
                handler: 'onAddOK'
            }, {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});