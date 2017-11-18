Ext.define('TianZun.view.legalcasemanager.documents.DocumentIndexCode', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentIndexCode',
    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        this.items = [
            {
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: '100%',
                height: '100%',
                items: [{
                    xtype: 'panel',
                    name: 'panelAdd',
                    width: '100%',
                    margin: '10 0 0 0',
                    layout: 'vbox',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            name: 'fieldsetInfo',
                            layout: {
                                type: 'table',
                                columns: 5,
                            },
                            listeners: {
                                afterrender: function () {
                                    var owfsaid = me.wfsarecord.wfsaid == null ? me.wfsaid : me.wfsarecord.wfsaid;
                                    var oddid = me.wfsarecord.ddid == null ? me.wfsarecord.id : me.wfsarecord.ddid;
                                    var owfdid = me.ishandle == 0 ? '&phaseid=' + me.phaseid : '&wfdid=' + me.wfdid;
                                    Ext.Ajax.request({
                                        url: "/api/DucumentTemplet/GetWFSASList?wfsaid=" + owfsaid + "&ddid=" + oddid + owfdid,
                                        method: 'get',
                                        scope: this,
                                        success: function (response) {
                                            var jsonstr = Ext.decode(response.responseText);
                                                
                                            var fieldset = this.up().down('panel[name=fieldsetInfo]');
                                            if (jsonstr.length == 0) {
                                                fieldset.hide();
                                            }

                                            for (var i = 0; i < jsonstr.length; i++) {
                                                !function (i) {
                                                    fieldset.add(
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            width: 200,
                                                            margin: '10 0 10 0',
                                                            border: false,                                                            
                                                            items: [
                                                                {
                                                                    xtype: 'image',
                                                                    width: 49,
                                                                    height: 48,
                                                                    margin: '0 10 0 10',
                                                                    src: '../Images/images/PDF.png',
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'vbox',
                                                                    border: false,
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            border: false,
                                                                            margin:'5 0 0 0',
                                                                            html: '<div title="' + jsonstr[i].filename + '" style="width:120px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + jsonstr[i].filename + '</div>',
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            border: false,
                                                                            layout: 'hbox',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'panel',
                                                                                    border: false,
                                                                                    margin: '10 0 0 0',
                                                                                    html: jsonstr[i].createtime.substr(0, 10),
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    text: '查看',
                                                                                    margin: '5 0 0 10',
                                                                                    listeners: {
                                                                                        click: function (obj) {
                                                                                            var fieldsetInfoAfter = obj.up('form').down('panel[name=fieldsetInfoAfter]');
                                                                                            var framepanel = obj.up('form').down('documentCommoncasePDF');
                                                                                            var panelbutton = obj.up('form').down('panel[name=buttonPanel]');

                                                                                            if (me.ishandle == 1 && fieldsetInfoAfter != null)
                                                                                                fieldsetInfoAfter.destroy();
                                                                                            if (framepanel != null)
                                                                                                framepanel.destroy();
                                                                                            if (panelbutton != null)
                                                                                                panelbutton.hide();
                                                                                            framepanel = Ext.create('TianZun.view.legalcasemanager.documents.DocumentCommoncasePDF', { filename:jsonstr[i].filename,lastwordpath: jsonstr[i].lastwordpath, lastpdfpath: jsonstr[i].lastpdfpath, wfsarecord: jsonstr[i], ishandle: me.ishandle });
                                                                                            obj.up('panel[name=panelAdd]').add(framepanel);

                                                                                        }
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ],
                                                        }
                                                    );

                                                }(i);
                                            }

                                        }
                                    })                                        

                                },
                            },
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            collapsible: false,
                            title: '新增文书',
                            width: '100%',
                            margin: '10 0 10 0',
                            name: 'fieldsetInfoAfter',
                            items: [                                
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    border: false,
                                    style: 'border-bottom:1px solid #bbb',
                                    items: {
                                        xtype: 'radiogroup',
                                        fieldLabel: '操作方式',
                                        labelWidth: 70,
                                        width: '100%',
                                        margin: '10 0 10 20',
                                        name: 'actiontypeT',
                                        items: [
                                            {
                                                boxLabel: '上传扫描件',
                                                name: 'actiontypeT',
                                                inputValue: 1,
                                            },
                                            {
                                                boxLabel: '上传word文件',
                                                name: 'actiontypeT',
                                                inputValue: 2,
                                            },
                                            {
                                                boxLabel: '表单录入',
                                                name: 'actiontypeT',
                                                hidden: true,
                                                inputValue: 3,
                                            },
                                        ],
                                        listeners: {
                                            render: function (obj) {
                                                me.down('panel[name=fieldsetInfo]').show();
                                                if (me.wfsarecord.code != 'null' && me.wfsarecord.code != '') {
                                                    obj.down('checkbox[inputValue=3]').show();
                                                    obj.down('checkbox[inputValue=3]').setValue(true);
                                                }
                                            },
                                            change: function (obj) {
                                                var formcmp = obj.up().up();
                                                var form1 = formcmp.down('form[name=form1]');
                                                var form2 = formcmp.down('form[name=form2]');
                                                var form3 = formcmp.down('form[name=form3]');
                                                var upload = obj.up('panel[name=fieldsetInfoAfter]').down('uploadpanel');
                                                if (obj.lastValue.actiontypeT == 1) {
                                                    form2.hide();
                                                    form3.hide();
                                                    form1.show();
                                                    if (upload) 
                                                        upload.destroy();
                                                    form1.add(
                                                    {
                                                        xtype: 'uploadpanel',
                                                        border: false,
                                                        file_types: '*.jpg;*.png;*.bmp;*.gif;',
                                                        addFileBtnText: '选择文件...',
                                                        uploadBtnText: '上传',
                                                        removeBtnText: '移除所有',
                                                        cancelBtnText: '取消上传',
                                                        file_size_limit: 10000,//MB
                                                        upload_url: 'api/Common/UploadFile',
                                                        post_params: { 'path': configs.LegalCasePath },
                                                        width: 1000,
                                                        height: 200,
                                                    });
                                                }
                                                else if (obj.lastValue.actiontypeT == 2) {
                                                    form1.hide();
                                                    form3.hide();
                                                    form2.show();
                                                    if (upload) 
                                                        upload.destroy();
                                                    form2.add(
                                                    {
                                                        xtype: 'uploadpanel',
                                                        border: false,
                                                        file_types: '*.doc;*.docx',
                                                        addFileBtnText: '选择文件...',
                                                        uploadBtnText: '上传',
                                                        removeBtnText: '移除所有',
                                                        cancelBtnText: '取消上传',
                                                        file_size_limit: 10000,//MB
                                                        file_upload_limit: 1,
                                                        upload_url: 'api/Common/UploadFile',
                                                        post_params: { 'path': configs.LegalCasePath },
                                                        width: 1000,
                                                        height: 200,
                                                    });
                                                }
                                                else if (obj.lastValue.actiontypeT == 3) {
                                                    form1.hide();
                                                    form2.hide();
                                                    form3.show();
                                                    if (!form3.child(me.wfsarecord.code)) {
                                                        var content = Ext.create('TianZun.view.legalcasemanager.documents.' + me.wfsarecord.code + '', {caseid:me.caseid});
                                                        form3.add(content);
                                                    }

                                                }
                                            }
                                        },
                                    },
                                },
                                {
                                    xtype: 'form',
                                    name: 'form1',
                                    width: '100%',
                                    layout: 'vbox',
                                    border: false,
                                    items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'userid',
                                        value: $.cookie('USER_ID'),
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'wfsaid',
                                        value: me.wfsaid == null ? '' : me.wfsaid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'ddid',
                                        value: me.wfsarecord == null ? '' : me.wfsarecord.id,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'caseid',
                                        value: me.caseid == null ? '' : me.caseid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'actiontype',
                                        value:1,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'documentname',
                                        value: me.wfsarecord.name,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'sourcetable',
                                        value: me.sourcetable,
                                    }]
                                },
                                {
                                    xtype: 'form',
                                    name: 'form2',
                                    width: '100%',
                                    layout: 'fit',
                                    hidden: true,
                                    border: false,
                                    items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'userid',
                                        value: $.cookie('USER_ID'),
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'wfsaid',
                                        value: me.wfsaid == null ? '' : me.wfsaid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'ddid',
                                        value: me.wfsarecord == null ? '' : me.wfsarecord.id,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'caseid',
                                        value: me.caseid == null ? '' : me.caseid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'actiontype',
                                        value: 2,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'documentname',
                                        value: me.wfsarecord.name,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'sourcetable',
                                        value: me.sourcetable,
                                    }],
                                },
                                {
                                    xtype: 'form',
                                    name: 'form3',
                                    width: '100%',
                                    margin: '10 20 10 20',
                                    hidden: true,
                                    border: false,
                                    items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'userid',
                                        value: $.cookie('USER_ID'),
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'wfsaid',
                                        value: me.wfsaid == null ? '' : me.wfsaid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'ddid',
                                        value: me.wfsarecord == null ? '' : me.wfsarecord.id,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'caseid',
                                        value: me.caseid == null ? '' : me.caseid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'actiontype',
                                        value: 3,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'documentname',
                                        value: me.wfsarecord.name,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'sourcetable',
                                        value: me.sourcetable,
                                    }]
                                },
                            ],
                            listeners: {
                                afterrender: function (obj) {
                                    if (me.ishandle == 0)
                                        obj.hide();
                                }
                            },
                            tbar: [
                                '->',
                                {
                                    xtype: 'label',
                                    html: '<b style="font-size:18px;">' + me.wfsarecord.name + '</b>',
                                },
                                '->',
                            ],
                        },
                    ],
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    buttonAlign: 'center',
                    style: 'background-color:none;',
                    name: 'buttonPanel',
                    buttons: [{
                        text: '上传',
                        width: 80,
                        name: 'btnsubmit',
                        handler: 'addFileButtonOK',
                    },{
                        text: '编辑',
                        width: 80,
                        hidden:true,
                        name: 'btnedit',
                        handler: 'editFileButtonOK',
                    }, {
                        html: '<label style="color:#3892d4;">返回</label>',
                        width: 80,
                        name: 'btncancle',
                        handler: 'onReturnList',
                        style: 'background:white;',
                    }],
                    listeners: {
                        afterrender: function (obj) {
                            if (me.ishandle == 0)
                                obj.hide();
                        }
                    },
                }],
            }
        ]

        this.callParent();

    }
});