Ext.define('TianZun.view.uav.datamanagement.DataManagementAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.dataManagementAdd',
    title: '上传',
    layout: 'fit',
    initComponent: function () {
        var me = this;
        this.items= [{
            xtype: 'form',
            bordor: false,
            bodyPadding: 10,
            width: 585,
            overflowY: 'auto',
            layout: {
                type: 'table',
                columns: 2,
            },
            fieldDefaults: {
                labelAlign: "right",
                labelWidth: 100,
            },
            defaults: {
                xtype: 'textfield',
                width: 280
            },
            items: [
                {
                    xtype: 'hidden',
                    name:' userid',
                    value:$.cookie("USER_ID")
                },
            {
                fieldLabel: '<span style="color:red">*</span>设备名称',
                xtype: 'textfield',
                name: 'sbmc',
                margin:'0 0 0 -40',
                allowBlank: false,
            },
            {
                fieldLabel: '<span style="color:red">*</span>上传时间',
                xtype: 'textfield',
                margin:'0 0 0 -6',
                name: 'scsj',
                allowBlank: false,
            },
            {
                xtype: 'fieldset',
                collapsible: true,
                title: '上传附件',
                margin:'0 60 20 0',
                colspan: 2,
                width: '92%',
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
                        upload_url: 'api/AccountTask/AddAccountTask',
                        width: 500,
                        height: 200,
                    })
                }
            }],
            buttons: [
         {
             text: '提交',
             name: 'btnsubmit',
             handler: 'onAddcqOksjgl',
         },
          {
              text: '取消',
              name: 'cancel',
              handler: 'onclosesjgl',
          }
            ]
        }],
      
        this.callParent();
    }
    
})
