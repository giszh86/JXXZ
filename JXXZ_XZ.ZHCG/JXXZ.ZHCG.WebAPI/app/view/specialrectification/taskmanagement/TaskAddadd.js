Ext.define('TianZun.view.specialrectification.taskmanagement.TaskAddadd', {
    extend: 'Ext.Window',
    alias: 'widget.taskAddadd',
    title: '信息过程上报',
    modal:true,
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 800,
            overflowY: 'auto',
            fieldDefaults: {
                labelAlign: 'right',
            },
            items: [
            {
                xtype: 'hidden',
                name: 'createuserid',
                value: $.cookie("USER_ID")
            },
            {
                xtype: 'hidden',
                name: 'wfdid',
                value: me.record.get('wfdid')
            },
            {
                xtype: 'hidden',
                name: 'wfsid',
                value: me.record.get('wfsid')
            },
            {
                xtype: 'hidden',
                name: 'wfsaid',
                value: me.record.get('wfsaid')
            },
            {
                xtype: 'hidden',
                name: 'wfsuid',
                value: me.wfsuid
            },
            {
                fieldLabel: '所属中队',
                xtype: 'displayfield',
                name: 'code',
                value:$.cookie('UNIT_NAME'),
            },
            {
                fieldLabel: '行动说明',
                xtype: 'textarea',
                width: '100%',
                name: 'dealcontent',
            },
            {
                xtype: 'fieldset',
                collapsible: true,
                title: '上传附件',
                listeners: {
                    afterrender: function (obj) {
                        obj.add({
                            xtype: 'uploadpanel',
                            border: false,
                            addFileBtnText: '选择文件...',
                            uploadBtnText: '上传',
                            removeBtnText: '移除所有',
                            cancelBtnText: '取消上传',
                            file_size_limit: 10000,//MB
                            upload_url: 'api/Common/UploadFile',
                            post_params: { 'path': configs.SpecialTaskPath },
                            width: '100%',
                            height: 200,
                        });
                    }
                }
            }],
            buttons: [{
                text: '上报',
                handler: 'onReportOK',
            },
            {
                text: '返回',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }
})