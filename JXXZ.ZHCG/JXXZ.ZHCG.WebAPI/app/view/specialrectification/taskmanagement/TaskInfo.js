Ext.define('TianZun.view.specialrectification.taskmanagement.TaskInfo', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.taskInfo',
    modal: true,
    title: '详情',
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;        

        var qdrwinfo;
        if (me.record.get('seqnum') > 2)
        {
            Ext.Ajax.request({
                url: configs.WebApi + 'api/SpecialTask/GetSpecialTaskWFInfo?start=0&limit=100&taskid=' + me.record.get('taskid') + '&wfdid=2017041214200002',
                method: 'get',
                scope: this,
                async:false,
                success: function (response) {
                    var records = JSON.parse(response.responseText);
                    qdrwinfo = records.Items[0];
                }
            })
        }

        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            items: [{
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: 1000,
                overflowY: 'auto',
                border: false,
                title: '发起任务',
                items: [{
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基础信息',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    defaults: {
                        xtype: 'textfield',
                        width: 300
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'fqr',
                        value: $.cookie("USER_ID")
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>任务标题',
                        xtype: 'textfield',
                        name: 'title',                        
                        margin: '20 0 10 0',
                        readOnly:true,
                        value: me.record.get('title'),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>任务类型',
                        name: 'tasktype',
                        xtype: 'combo',
                        store: Ext.create('TianZun.store.citizenservice.PunishType'),
                        valueField: 'ID',
                        displayField: 'Name',
                        margin: '20 0 10 0',
                        readOnly: true,
                        value: me.record.get('tasktype'),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>紧急程度',
                        name: 'level',
                        margin: '20 0 10 0',
                        xtype: 'radiogroup',
                        width: 300,
                        readOnly: true,
                        items: [
                            {
                                boxLabel: '一般',
                                name: 'level',
                                inputValue: 1,
                                readOnly: true,
                            },

                            {
                                boxLabel: '紧急',
                                name: 'level',
                                inputValue: 2,
                                readOnly: true,
                            },
                            {
                                boxLabel: '特急',
                                name: 'level',
                                inputValue: 3,
                                readOnly: true,
                            },
                        ],
                        listeners: {
                            render: function (obj) {
                                obj.down('radio[inputValue=' + me.record.get("level") + ']').setValue(true);
                            }
                        }
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>任务期限',
                        xtype: 'combo',
                        name: 'term',
                        colspan: me.record.get('term') == 1?1:3,
                        margin: '0 0 10 0',
                        store: Ext.create('Ext.data.Store', {
                            data: [
                                { ID: 1, Name: '短期' },
                                { ID: 2, Name: '长期' },
                            ]
                        }),
                        valueField: 'ID',
                        displayField: 'Name',
                        margin: '0 0 10 0',
                        readOnly: true,
                        value: me.record.get('term'),
                    },
                    {
                        fieldLabel: '任务开始时间',
                        xtype: 'datefield',
                        margin: '0 0 10 0',
                        name: 'starttime',
                        format: 'Y-m-d H:i:s',
                        readOnly: true,
                        hidden: me.record.get('term') == 1 ? false:true,
                        value: new Date(me.record.get('starttime')),
                    },
                    {
                        fieldLabel: '任务结束时间',
                        xtype: 'datefield',
                        margin: '0 0 10 0',
                        name: 'endtime',
                        format: 'Y-m-d H:i:s',
                        readOnly: true,
                        hidden: me.record.get('term') == 1 ? false : true,
                        value: new Date(me.record.get('endtime')),
                    },
                    {
                        fieldLabel: '任务区域',
                        xtype: 'textarea',
                        colspan: 3,
                        margin: '0 0 10 0',
                        width: '100%',
                        height: 40,
                        name: 'region',
                        readOnly: true,
                        value: me.record.get('region'),
                    },
                    {
                        fieldLabel: '任务说明',
                        xtype: 'textarea',
                        colspan: 3,
                        margin: '0 0 10 0',
                        name: 'taskexplain',
                        width: '100%',
                        height: 40,
                        readOnly: true,
                        value: me.record.get('taskexplain'),
                    },
                    {
                        id: 'EVENT_COORDINATE_ID',
                        name: 'grometry',
                        xtype: 'textfield',
                        fieldLabel: '地理位置',
                        colspan: 3,
                        width:'100%',
                        autoShow: true,
                        readOnly: true,
                        value: me.record.get('grometry'),
                        listeners: {
                            render: function (p) {
                                p.getEl().on('click', function (p) {
                                    CreateAarcgisMap('EVENT_COORDINATE_ID', '整治任务坐标', 0, 3, this.component.getValue());
                                });
                            },
                        }

                    },
                    {
                        fieldLabel: '发起人',
                        xtype: 'textfield',
                        readOnly: true,
                        margin: '0 0 10 0',
                        value: $.cookie('USER_NAME'),
                    },
                    {
                        fieldLabel: '发起时间',
                        xtype: 'datefield',
                        name: 'fqtime',
                        margin: '0 0 10 0',
                        colspan: 2,
                        margin: '0 0 10 0',
                        format: 'Y-m-d H:i:s',
                        readOnly: true,
                        value: new Date(me.record.get('fqtime')),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>行动中队',
                        name: 'xdzd',
                        xtype: 'tagfield',
                        margin: '0 0 10 0',
                        store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { extraParams: { unittypeid: 2 } } }),
                        valueField: 'ID',
                        displayField: 'Name',
                        colspan: 3,
                        height: 70,
                        width: '100%',
                        readOnly: true,
                        value: me.record.get('xdzd').split(','),
                        listeners: {
                            render: function (obj) {
                                obj.getStore().reload();
                            }
                        }
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>局领导审核',
                        xtype: 'combo',
                        store: Ext.create('TianZun.store.sys.UsersStaff', { proxy: { extraParams: { roleid: 5 } } }),
                        valueField: 'ID',
                        displayField: 'Name',
                        margin: '0 0 10 0',
                        colspan: 3,
                        editable: false,
                        name: 'leader',
                        readOnly: true,
                        value: me.record.get('leader'),
                        listeners: {
                            render: function (obj) {
                                obj.getStore().reload();
                            }
                        }
                    }]
                },
                {
                    xtype: 'imageshowpanel',
                    store: Ext.create('TianZun.store.lawenforcementsupervision.GetSpecialTaskImages', {
                        proxy: { extraParams: { taskid: me.record.get('taskid'), wfdid: '2017041214200001' } }
                    }),
                    margin: '0 10 10 0',
                    colspan: 3,
                    width: '100%',
                    path: configs.SpecialTaskPath,
                }]
            },
            {
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: 1000,
                overflowY: 'auto',
                border: false,
                title: '启动任务',
                name:'qdrw',
                hidden: ((me.ishandle == 1 && me.record.get('seqnum') >= 2) || (me.ishandle == 0 && me.record.get('seqnum') >= 3)) ? false : true,
                items: [{
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基础信息',
                    items: [{
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
                        name: 'xdzd',
                        value: me.record.get('xdzd')
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>启动意见',
                        name: 'nextwfdid',
                        margin: '0 0 10 0',
                        xtype: 'radiogroup',
                        width: 300,
                        labelAlign: 'right',
                        allowBlank:false,
                        items: [
                            {
                                boxLabel: '同意',
                                name: 'nextwfdid',
                                inputValue: '2017041214200003',
                                readOnly: me.record.get('seqnum') > 2 ? true : false,
                            },

                            {
                                boxLabel: '不同意',
                                name: 'nextwfdid',
                                inputValue: '2017041214200005',
                                readOnly: me.record.get('seqnum') > 2 ? true : false,
                            },
                        ],
                        listeners: {
                            render: function (obj) {
                                if (qdrwinfo != null && qdrwinfo.dealtype !=null)
                                    obj.down('radio[inputValue=' + qdrwinfo.dealtype + ']').setValue(true);
                            }
                        }
                    },
                    {
                        fieldLabel: '处理意见',
                        xtype: 'textarea',
                        labelAlign: 'right',
                        margin: '0 0 10 0',
                        width: '100%',
                        height: 40,
                        name: 'dealcontent',
                        readOnly: me.record.get('seqnum') > 2 ? true : false,
                        value: qdrwinfo == null ? '' : qdrwinfo.content,
                    },
                    ]
                }]
            },
            {
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: 1000,
                overflowY: 'auto',
                border: false,
                title: '过程上报',
                hidden: (me.record.get('seqnum') >= 3) ? false : true,
                layout: 'fit',
                items: [{
                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基础信息',
                    layout: 'vbox',
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: 300
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'userid',
                        value: $.cookie("USER_ID")
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>行动中队',
                        name: 'xdzd',
                        xtype: 'tagfield',
                        margin: '0 0 10 0',
                        border:false,
                        store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { extraParams: { unittypeid: 2 } } }),
                        valueField: 'ID',
                        displayField: 'Name',
                        colspan: 3,
                        width: '100%',
                        readOnly: true,
                        value: me.record.get('xdzd').split(','),
                        listeners: {
                            render: function (obj) {
                                obj.getStore().reload();
                            }
                        }
                    },
                    {
                        xtype: 'panel',
                        width: '100%',
                        margin:'0 0 10 0',
                        items: [{
                            xtype: 'grid',
                            layout: 'fit',
                            columnLines: true,
                            columns: [
                                    { header: '所属中队', dataIndex: 'unitname', flex: 1 },
                                    { header: '上报人', dataIndex: 'username', flex: 1 },
                                    { header: '上报时间', dataIndex: 'dealtime', flex: 1 },
                                    { header: '过程说明', dataIndex: 'content', flex: 1 },
                            ],
                            store: Ext.create('TianZun.store.lawenforcementsupervision.GetSpecialTaskWFList', {
                                proxy: { extraParams: { taskid: me.record.get('taskid'), wfdid: '2017041214200003' } }
                            }),
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                            listeners: {
                                itemdblclick: 'dblClickInfo',
                                afterrender: function (obj) {
                                    var useridarr = [];
                                    obj.getStore().each(function (value,key) {
                                        useridarr.push(value.get('userid'));
                                        if (value.get('userid') == $.cookie('USER_ID')) {
                                            obj.up('tabpanel').down('button[name=btnEditReport]').wfsuid = value.get('wfsuid');
                                        }
                                    }, obj)
                                    if (useridarr.indexOf(parseInt($.cookie('USER_ID'))) >= 0 && me.ishandle == 0 && me.record.get('seqnum') == 3) {
                                        obj.up('tabpanel').down('button[name=btnEditReport]').show();
                                    }
                                    else {
                                        obj.up('tabpanel').down('button[name=btnEditReport]').hide();
                                    }
                                }
                            }
                        }]

                    }, ]
                }]
            },
            {
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                width: 1000,
                overflowY: 'auto',
                border: false,
                title: '任务总结',
                name: 'rwzj',
                hidden: ((me.ishandle == 1 && me.record.get('seqnum') >= 4) || (me.ishandle == 0 && me.record.get('seqnum') >= 5)) ? false : true,
                items: [{

                    xtype: 'fieldset',
                    collapsible: true,
                    title: '基础信息',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: 300
                    },
                    items: [                    
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
                        name: 'xdzd',
                        value: me.record.get('xdzd')
                    },
                    {
                        xtype: 'hidden',
                        name: 'summaryuserid',
                        value: $.cookie('USER_ID'),
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>任务总结日期',
                        xtype: 'datefield',
                        allowBlank: false,
                        editable:false,
                        readOnly: ($.cookie('UNIT_ID') != '9' || me.record.get('seqnum')==5)?true:false,
                        format:'Y-m-d',
                        name: 'summarytime',
                        margin: '0 0 10 0',
                        value: me.record.get('summarytime') == null?null:new Date(me.record.get('summarytime'))
                    },                    
                    {
                        fieldLabel: '<span style="color:red">*</span>总结人',
                        xtype: 'textfield',
                        readOnly: true,
                        colspan: 2,
                        margin: '0 0 10 0',
                        value:$.cookie('USER_NAME')
                    },
                    {
                        fieldLabel: '任务总结概述',
                        xtype: 'textarea',
                        readOnly: ($.cookie('UNIT_ID') != '9' || me.record.get('seqnum') == 5) ? true : false,
                        colspan: 3,
                        width: '100%',
                        height: 40,
                        margin: '0 0 10 0',
                        name: 'summary',
                        value: me.record.get('summary')
                    },
                    {
                        fieldLabel: '任务行动结果',
                        xtype: 'textarea',
                        readOnly: ($.cookie('UNIT_ID') != '9' || me.record.get('seqnum') == 5) ? true : false,
                        colspan: 3,
                        width: '100%',
                        height: 40,
                        margin: '0 0 10 0',
                        name: 'results',
                        value: me.record.get('results')
                    },
                    {
                        fieldLabel: '经验总结',
                        xtype: 'textarea',
                        readOnly: ($.cookie('UNIT_ID') != '9' || me.record.get('seqnum') == 5) ? true : false,
                        colspan: 3,
                        width: '100%',
                        height: 40,
                        margin: '0 0 10 0',
                        name: 'experiences',
                        value: me.record.get('experiences')
                    },
                    ]
                }]
            }],
            listeners: {
                tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                    var uploadpanel = oldCard.down('uploadpanel');
                    if (uploadpanel)
                        uploadpanel.store.removeAll();
                    var fieldset = oldCard.down('fieldset[name=fs]');
                    if (fieldset)
                        fieldset.destroy();

                    if (me.ishandle == 1 && ((newCard.title == '启动任务' && me.record.get('seqnum') == 2) || (newCard.title == '任务总结' && me.record.get('seqnum') == 4 && $.cookie('UNIT_ID') == 9) || tabPanel.isenter != null)) {
                        fieldset = Ext.create('Ext.form.FieldSet', {
                            name: 'fs',
                            collapsible: true,
                            title: '上传附件',
                            margin: '0 0 10 10',
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
                        })
                        newCard.add(fieldset);
                    }

                    if (newCard.title == '启动任务' && me.record.get('seqnum') > 2 && newCard.down('imageshowpanel') == null) {
                        newCard.add({
                            xtype: 'imageshowpanel',
                            hidden: me.record.get('seqnum') > 2 ? false : true,
                            store: Ext.create('TianZun.store.lawenforcementsupervision.GetSpecialTaskImages', {
                                proxy: { extraParams: { taskid: me.record.get('taskid'), wfdid: '2017041214200002' } }
                            }),
                            margin: '0 10 10 0',
                            colspan: 3,
                            width: '100%',
                            path: configs.SpecialTaskPath,
                        });
                    }

                    if ((newCard.title == '任务总结' && newCard.down('imageshowpanel') == null) && (me.record.get('seqnum') > 4 || $.cookie('UNIT_ID') != 9)) {
                        newCard.add({
                            xtype: 'imageshowpanel',
                            hidden: me.record.get('seqnum') > 2 ? false : true,
                            store: Ext.create('TianZun.store.lawenforcementsupervision.GetSpecialTaskImages', {
                                proxy: { extraParams: { taskid: me.record.get('taskid'), wfdid: '2017041214200004' } }
                            }),
                            margin: '0 10 10 0',
                            colspan: 3,
                            width: '100%',
                            path: configs.SpecialTaskPath,
                        });
                    }
                }
            },
            buttons: [
            {
                text: '启动任务',
                name: 'btnReload',
                hidden: (me.ishandle == 1 && me.record.get('seqnum') == 2) ? false : true,
                handler: 'onReloadOK',
            },
            {
                text: '过程上报',
                name: 'btnReport',
                hidden: (me.ishandle == 1 && me.record.get('seqnum') == 3 && $.cookie('UNIT_ID') != '9') ? false : true,
                handler: 'onReport',
            },
            {
                text: '修改过程上报',
                name: 'btnEditReport',
                wfsuid:'',
                hidden: true,
                handler: 'onEditReport',
            },
            {
                text: '进入总结',
                name: 'btnEnterSummarize',
                hidden: (me.ishandle == 1 && me.record.get('seqnum') == 3 && $.cookie('UNIT_ID') == '9')?false:true,
                handler: 'onEnterSummarizeOK',
            },
            {
                text: '任务总结',
                name: 'btnSummarize',
                hidden: (me.ishandle == 1 && me.record.get('seqnum') == 4 && $.cookie('UNIT_ID') == '9') ? false : true,
                handler: 'onSummarizeOK',
            },
            {
                text: '取消',
                handler:'onClose',
            }]
        }]
        this.callParent();
    }
})