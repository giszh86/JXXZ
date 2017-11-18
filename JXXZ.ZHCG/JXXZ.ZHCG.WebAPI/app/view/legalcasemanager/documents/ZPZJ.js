Ext.define('TianZun.view.legalcasemanager.documents.ZPZJ', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ZPZJ',
    layout: 'fit',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                overflowY: 'auto',
                items: [
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 100
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 450
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'edituserid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'dwfsasid',
                                value: me.dwfsasid == null ? null : me.dwfsasid,
                            },
                            {
                                fieldLabel: '说明反映的问题',
                                name: 'smfywt',
                                margin: '10 0 10 0',
                                colspan: 2,
                                value: me.record == null ? null : me.record.smfywt
                            },
                            {
                                fieldLabel: '拍摄地点',
                                name: 'psdd',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.psdd
                            },
                            {
                                fieldLabel: '拍摄人',
                                name: 'psr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.psr
                            },
                            {
                                fieldLabel: '当事人或见证人',
                                name: 'dsrhjzr',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.dsrhjzr
                            },
                            {
                                fieldLabel: '拍摄时间',
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                editable: false,
                                name: 'pssj',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.pssj
                            },
                            {
                                fieldLabel: '备注',
                                xtype: 'textarea',
                                name: 'remark',
                                width: '100%',
                                colspan: 2,
                                margin: '0 0 10 0',
                                height: 50,
                                value: me.record == null ? null : me.record.remark
                            },
                            {
                                xtype: 'uploadpanel',
                                file_types: '*.jpg;*.png;*.bmp;*.gif;',
                                addFileBtnText: '选择文件...',
                                uploadBtnText: '上传',
                                removeBtnText: '移除所有',
                                cancelBtnText: '取消上传',
                                file_size_limit: 10000,//MB
                                upload_url: 'api/Common/UploadFile',
                                post_params: { 'path': configs.LegalCasePath },
                                colspan: 2,
                                width: 850,
                                height: 200,
                                margin:'0 0 10 0'
                            },
                            {
                                fieldLabel: '执法人员',
                                name: 'zfry1',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfry1
                            },
                            {
                                fieldLabel: '执法证件',
                                name: 'zfzh1',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfzh1
                            },
                            {
                                fieldLabel: '执法人员',
                                name: 'zfry2',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfry2
                            },
                            {
                                fieldLabel: '执法证件',
                                name: 'zfzh2',
                                margin: '0 0 10 0',
                                value: me.record == null ? null : me.record.zfzh2
                            },
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})