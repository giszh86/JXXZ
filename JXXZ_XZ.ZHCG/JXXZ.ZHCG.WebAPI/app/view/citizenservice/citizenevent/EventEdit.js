Ext.define('TianZun.view.citizenservice.citizenevent.EventEdit', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.eventEdit',
    title: '市民事件编辑',
    modal: true,
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],
    maxHeight: 550,

    initComponent: function () {
        var me = this;
        var dType = this.type;
        var i = 1;
        roleid = 3;

        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            width: 1070,
            overflowY: 'auto',
            items: [
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '基础信息',

                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 300
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'userid',
                                value: $.cookie("USER_ID")
                            },
                            {
                                xtype: 'hidden',
                                name: 'officeuserid',
                                value: this.record.get('officeuserid')
                            },
                                {
                                    xtype: 'hidden',
                                    name: 'citizenid',
                                    value: this.record.get('citizenid')
                                },
                                {
                                    xtype: 'hidden',
                                    name: 'wfdid',
                                    value: this.record.get('wfdid')
                                },
                            {
                                xtype: 'hidden',
                                name: 'wfsid',
                                value: this.record.get('wfsid')
                            },
                            {
                                xtype: 'hidden',
                                name: 'wfsaid',
                                value: this.record.get('wfsaid')
                            },
                            {
                                xtype: 'hidden',
                                name: 'backperson',
                                value: this.record.get('nextuserid')
                            },
                            {
                                fieldLabel: '值班时间',
                                name: 'dutytime',
                                xtype: 'datefield',
                                allowBlank: false,
                                margin: '0 0 10 0',
                                value: this.record.get('dutytime'),
                                editable: true,
                                format: "Y-m-d",//日期的格式
                                altFormats: "Y/m/d|Ymd",
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件来源',
                                xtype: 'textfield',
                                readOnly: true,
                                name: 'eventSource',                                        
                                value: this.record.get("sourcename"),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件登记单编号',
                                labelWidth: 105,
                                readOnly: true,
                                name: 'eventWriteCode',
                                xtype: 'textfield',
                                value: this.record.get('eventid'),
                            },
                            {
                                fieldLabel: '投诉人',
                                name: 'complainant',
                                xtype: 'textfield',                                        
                                value: this.record.get('complainant'),
                            },
                            {
                                fieldLabel: '人数',
                                name: 'cnumber',
                                xtype: 'numberfield',
                                minValue: 1,
                                value: this.record.get('cnumber'),
                                hideTrigger: true
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'foundtime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>发现时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                                value: this.record.get('foundtime'),
                            },
                            {
                                fieldLabel: '联系电话',
                                name: 'contactphone',
                                xtype: 'textfield',                                        
                                value: this.record.get('contactphone'),
                            },
                            {
                                fieldLabel: '联系地址',
                                name: 'contactaddress',
                                xtype: 'textfield',
                                colspan: 2,
                                value: this.record.get('contactaddress'),
                            },
                            {
                                fieldLabel: '事件地址',
                                name: 'eventaddress',
                                xtype: 'textfield',
                                colspan: 3,
                                width: '100%',                                        
                                value: this.record.get('eventaddress'),
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件标题',
                                name: 'eventtitle',
                                xtype: 'textfield',
                                colspan: 3,
                                width: '100%',                                        
                                value: this.record.get("eventtitle")
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>事件内容',
                                name: 'eventcontent',
                                xtype: 'textarea',
                                colspan: 3,
                                height: 30,
                                width: '100%',                                        
                                value: this.record.get("eventcontent")
                            },
                            {
                                fieldLabel: '<span style="color:red">*</span>问题大类',
                                xtype: 'combo',
                                editable: false,
                                name: 'bigtypeid',
                                store: Ext.create('TianZun.store.citizenservice.BigQuestion'),
                                valueField: 'ID',
                                displayField: 'Name',
                                allowBlank: false,
                                listeners: {
                                    render: function (obj) {
                                        if (me.record.get("bigtypeid") != null) {
                                            obj.setValue(me.record.get("bigtypeid"));
                                            obj.getStore().load();
                                        }
                                    },
                                    change: function () {
                                        var cyCombo = Ext.getCmp('ACSmallTypeID');
                                        cyCombo.clearValue();
                                        cyStore = Ext.create('TianZun.store.citizenservice.BigQuestion');
                                        cyStore.getProxy().url = 'api/CitizenEvent/GetClassTypes?parentid=' + this.getValue();
                                        cyCombo.bindStore(cyStore, false);
                                        cyStore.load();
                                        if (me.record.get("smalltypeid") != null)
                                            cyCombo.setValue(me.record.get("smalltypeid"));
                                    }
                                }
                            },
                            {
                                id: 'ACSmallTypeID',
                                xtype: 'combo',
                                fieldLabel: '<span style="color:red">*</span>问题小类',
                                name: 'smalltypeid',
                                valueField: 'ID',
                                colspan: 1,
                                width: '94.7%',
                                editable: false,
                                displayField: 'Name',
                                allowBlank: false,
                                listeners: {
                                    change: function (obj) {
                                        if (!isNaN(obj.getRawValue()))
                                            obj.setValue('');
                                    },
                                },
                            },
                            {
                                xtype: 'datetimefield',
                                border: false,
                                name: 'limittime',
                                editable: false,
                                allowBlank: false,
                                fieldLabel: '<span style="color:red">*</span>限办时间',
                                margin: '10 0 10 0',
                                format: 'Y-m-d H:i:s',
                                value: this.record.get("limittime")
                            },
                            {
                                id: 'EVENT_COORDINATE_ID',
                                fieldLabel: '地理位置:',
                                name: 'grometry',
                                xtype: 'textfield',
                                colspan: 3,
                                value: this.record.get("grometry"),
                                width: '100%',
                                autoShow: true,
                                listeners: {
                                    render: function (p) {
                                        p.getEl().on('click', function (p) {
                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                                        });
                                    },
                                }
                            },
                            {
                                xtype: 'imageshowpanel',
                                store: Ext.create('TianZun.store.citizenservice.GetCitizenImages', {
                                    proxy: { extraParams: { citizenid: me.record.get('citizenid'), wfdid: '2017021410240010' } }
                                }),
                                margin: '0 0 10 0',
                                colspan: 3,
                                width: '97%',
                                path: configs.CitizenServiceOriginalPath,
                                tablename: 'wf_workflowspecificuserfiles',
                                wordname: 'fileid',
                                isedit:true,
                                listeners: {
                                    afterrender: function (obj) {
                                        obj.down('fieldset').setTitle('处理前的图片');
                                    }
                                }
                            },
                            {
                                xtype: 'fieldset',
                                name: 'fieldsetInfo',
                                collapsible: true,
                                colspan: 3,
                                width: '97%',
                                title: '图片信息',
                                listeners: {
                                    afterrender: function (obj) {
                                        obj.add({
                                            xtype: 'uploadpanel',
                                            border: false,
                                            addFileBtnText: '选择文件...',
                                            file_types: '*.jpg;*.png;*.bmp;*.gif;',
                                            uploadBtnText: '上传',
                                            removeBtnText: '移除所有',
                                            cancelBtnText: '取消上传',
                                            file_size_limit: 10000,//MB
                                            upload_url: 'api/Common/UploadFile',
                                            post_params: { 'path': configs.CitizenServiceOriginalPath },
                                            height: 200,
                                        });
                                    }
                                }
                            },
                        ]
                    },
            ],

            buttons: [{
                name: 'btnSubmit',
                hidden: dType == 1 ? true : false,
                text: '确定',
                handler: 'onEditOK'
            },
            {
                name: 'btnCancle',
                text: '返回',
                handler: 'onClose'
            }]

        }];

        this.callParent();
    },
});