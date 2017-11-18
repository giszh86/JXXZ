Ext.define('TianZun.view.legalcasemanager.documents.FKSJPZ', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FKSJPZ',
    width: '100%',
    height: '100%',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;
        
        //添加文书时获取文书编号
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        var caseid = me.caseid != null ? me.caseid : panel.caseid != null ? panel.caseid : panel.record.get('caseid') != null ? panel.record.get('caseid') : null;
        var wsbh;
        var tablename = panel.title.indexOf('一般案件') >= 0 ? 'case_cases' : panel.title.indexOf('简易案件') >= 0 ? 'case_simplecases' : 'case_casesources';

        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseReasonNumber?caseid=" + caseid + "&tablename=" + tablename,
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                if (response.responseText != 'null')
                    wsbh = Ext.decode(response.responseText).casebh;
                else
                    wsbh = '';
            }
        });

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
                                name: 'wsbh',
                                margin: '10 0 10 0',
                                fieldLabel: '文书编号',
                                width: '100%',
                                colspan: 2,
                                readOnly:true,
                                value: me.record == null ? wsbh : me.record.wsbh
                            },
                            {
                                name: 'bcfr',
                                margin: '10 0 10 0',
                                fieldLabel: '被处罚人',
                                width: '100%',
                                value: me.record == null ? null : me.record.bcfr
                            },
                            {
                                name: 'fkpjbh',
                                margin: '10 0 10 0',
                                fieldLabel: '罚款票据编号',
                                width: '100%',
                                value: me.record == null ? null : me.record.fkpjbh
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