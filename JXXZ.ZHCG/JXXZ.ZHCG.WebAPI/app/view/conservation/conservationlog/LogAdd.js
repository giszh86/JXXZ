Ext.define('TianZun.view.conservation.conservationlog.LogAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.logAdd',
    title: '添加巡查日志',
    layout: 'fit',
    initComponent: function () {
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
                    title: '巡查日志',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 95,
                        margin: '10 10 10 0',
                    },
                    defaults: {
                        xtype: 'textfield',
                        width:280,
                        allowBlank: false,
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'createuserid',
                        value: $.cookie("USER_ID"),
                    },
                    {
                        xtype: 'hidden',
                        name: 'createusername',
                        value: $.cookie("USER_NAME"),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>养护合同名称',
                        xtype: 'combo',
                        colspan: 3,
                        name: 'yhcontract',
                        store: Ext.create('TianZun.store.conservation.HTSourceList'),
                        displayField: 'Name',
                        valueField: 'ID',
                        width:'79%',
                        editable: false,
                        allowBlank: false,
                    }, {
                        fieldLabel: '填报人',
                        name: 'createusername',
                        width: 200,
                        editable: false,
                        value: $.cookie("USER_NAME"),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>巡查日期',
                        name: 'patroltime',
                        xtype: 'datefield',
                        width: 280,
                        format: 'Y-m-d',
                        editable: false,
                        allowBlank: false,
                        value: Ext.util.Format.date(new Date(), "Y-m-d"),
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        width: 700,
                        colspan:1,
                        items: [
                            //{
                            //    xtype: 'box',
                            //    html: '<span style="color:red">*</span>填报时间:',
                            //    margin: '10 0 0 15',
                            //    width: 65,
                            //    editable: false,
                            //},
                            //{
                            //    xtype: 'datefield',
                            //    allowBlank: false,
                            //    format: 'Y-m-d',
                            //    name: 'writedate',
                            //    width: 130,
                            //    editable: false,
                            //    value: Ext.util.Format.date(new Date(), "Y-m-d"),
                            //},
                            //{
                            //    xtype: 'timefield',
                            //    name: 'writetime',
                            //    allowBlank: false,
                            //    format: 'H:i',
                            //    increment: 10,
                            //    width: 80,
                            //    editable: false,
                            //    value: Ext.util.Format.date(new Date(), "H:i"),
                            //},
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'createtime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>填报时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                                value: Ext.util.Format.date(new Date(), "Y-m-d H:i:s"),
                            },
                        ]
                    }, {
                        fieldLabel: '巡查说明',
                        name: 'patrolexplain',
                        xtype: 'textarea',
                        height: 30,
                        colspan: 3,
                        width: '79%',
                        allowBlank: true,
                    },
                   {
                       xtype: 'fieldset',
                       collapsible: true,
                       title: '上传附件',
                       colspan: 3,
                       width: '79%',
                       id: 'sc',
                       layout: 'fit',
                       items: [],
                       afterRender: function () {
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
                               post_params: { 'path': configs.YhLogOriginalPath },
                               width: 500,
                               height: 200,
                           })
                       }
                   },
                    ]
                }
            ], buttons: [{
                text: '提交',
                handler: 'onAddOK'
            },
            {
                text: '取消',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});