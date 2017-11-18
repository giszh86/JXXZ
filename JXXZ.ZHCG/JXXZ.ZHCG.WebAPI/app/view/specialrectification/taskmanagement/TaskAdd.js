Ext.define('TianZun.view.specialrectification.taskmanagement.TaskAdd', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.Taskadd',
    title: '发起任务',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.legalcasemanager.IllegalCaseUpcoming');
        this.items = [{
            xtype: 'tabpanel',
            border: false,
            plain: true,
            bodyBorder: false,
            layout:'fit',
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
                        allowBlank:false,
                        margin: '20 0 10 0',
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>任务类型',
                        name: 'tasktype',
                        xtype: 'combo',
                        allowBlank: false,
                        store: Ext.create('TianZun.store.citizenservice.PunishType'),
                        valueField: 'ID',
                        displayField: 'Name',
                        editable:false,
                        margin: '20 0 10 0',
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>紧急程度',
                        name: 'level',
                        margin: '20 0 10 0',
                        xtype: 'radiogroup',
                        allowBlank: false,
                        width:300,
                        items: [
                            {
                                boxLabel: '一般',
                                name: 'level',
                                inputValue: 1,
                                checked: true,
                            },
                            
                            {
                                boxLabel: '紧急',
                                name: 'level',
                                inputValue: 2,
                            },
                            {
                                boxLabel: '特急',
                                name: 'level',
                                inputValue: 3,
                            },
                        ],
                    },
                   
                    {
                        fieldLabel: '<span style="color:red">*</span>任务期限',
                        xtype: 'combo',
                        name: 'term',
                        margin: '0 0 10 0',
                        store:Ext.create('Ext.data.Store',{data:[
                            { ID: 1, Name: '短期' },
                            { ID: 2, Name: '长期' },
                        ]}),
                        valueField: 'ID',
                        displayField: 'Name',
                        allowBlank: false,
                        editable: false,
                        margin: '0 0 10 0',
                        listeners: {
                            change: function (obj) {
                                if (obj.getValue() == 1) {
                                    me.down('datetimefield[name=starttime]').show();
                                    me.down('datetimefield[name=endtime]').show();
                                    obj.colspan = 1;
                                } else {
                                    me.down('datetimefield[name=starttime]').hide();
                                    me.down('datetimefield[name=endtime]').hide();
                                    obj.colspan = 3;
                                }
                            }
                        }
                    },
                    {
                        fieldLabel: '任务开始时间',
                        xtype: 'datetimefield',
                        margin: '0 0 10 0',
                        name: 'starttime',
                        margin: '0 0 10 0',
                        editable: false,
                        format: 'Y-m-d H:i:s',
                    },
                    {
                        fieldLabel: '任务结束时间',
                        xtype: 'datetimefield',
                        margin: '0 0 10 0',
                        name: 'endtime',
                        margin: '0 0 10 0',
                        editable: false,
                        format: 'Y-m-d H:i:s',
                    },
                    {
                        fieldLabel: '任务区域',
                        xtype: 'textarea',
                        colspan: 3,
                        margin: '0 0 10 0',
                        width: '100%',
                        height:40,
                        name: 'region',
                        margin: '0 0 10 0',
                    },
                    {
                        fieldLabel: '任务说明',
                        xtype: 'textarea',
                        colspan: 3,
                        margin: '0 0 10 0',
                        name: 'taskexplain',
                        width: '100%',
                        height:40,
                        margin: '0 0 10 0',
                    },
                    {
                        id: 'EVENT_COORDINATE_ID',
                        name: 'grometry',
                        xtype: 'textfield',
                        fieldLabel: '地理位置',
                        colspan: 3,
                        width:'100%',
                        autoShow: true,
                        listeners: {
                            render: function (p) {
                                p.getEl().on('click', function (p) {
                                    CreateAarcgisMap('EVENT_COORDINATE_ID', '整治任务坐标', 3, 3, this.component.getValue());
                                });
                            },
                        }
                    
                    },
                    {
                        fieldLabel: '发起人',
                        xtype: 'textfield',
                        readOnly:true,
                        margin: '0 0 10 0',
                        value:$.cookie('USER_NAME'),
                    },
                    {
                        fieldLabel: '发起时间',
                        xtype: 'datetimefield',
                        name: 'fqtime',
                        margin: '0 0 10 0',
                        colspan: 2,
                        margin: '0 0 10 0',
                        editable: false,
                        format: 'Y-m-d H:i:s',
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>行动中队',
                        name: 'xdzdValue',
                        xtype: 'tagfield',
                        margin: '0 0 10 0',
                        store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { extraParams: { unittypeid: 2 } } }),
                        valueField: 'ID',
                        displayField: 'Name',
                        allowBlank: false,
                        colspan: 3,
                        height: 70,
                        width: '100%',
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
                        margin: '0 0 10 0',
                    },                    
                    ]
                },
                {
                    xtype: 'fieldset',
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
                }]
            }],
            buttons: [
            {
                text: '发起任务',
                handler:'onStartOK',
            },            
            {
                text: '取消',
                handler: 'onClose',
            }]
        }]
        this.callParent();
    }
})