Ext.define('TianZun.view.legalcasemanager.documents.WSSMJ', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.WSSMJ',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var documentIndexCode = panel.down('documentIndexCode');
        documentIndexCode.down('radio[inputValue=2]').hide();
        documentIndexCode.down('radio[inputValue=3]').hide();
        documentIndexCode.down('radio[inputValue=1]').setValue(true);

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
                                name: 'wsmc',
                                margin: '10 0 10 0',
                                fieldLabel: '文书名称',
                                width: '100%',
                                colspan: 2,
                                value: me.record == null ? null : me.record.wsmc
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
                                minHeight: 200,
                                margin: '0 0 10 0'
                            },                             
                        ],
                    }
                ]
            }
        ]

        this.callParent();
    }
})