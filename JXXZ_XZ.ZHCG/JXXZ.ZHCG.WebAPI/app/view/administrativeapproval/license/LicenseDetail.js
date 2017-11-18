Ext.define('TianZun.view.administrativeapproval.license.LicenseDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.licenseDetail',
    title: '行政许可查看',
    layout: 'fit',
    requires: [
'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function () {
        var me = this;
        var store = Ext.create('TianZun.store.administrativeapproval.GetFileUpload', { proxy: { type: 'ajax', extraParams: { id: this.record.licensingid, type: 2 } } });
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
                    title: '基础信息',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 75,
                        margin: '0 0 10 0',
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: '100%',
                    },
                    items: [{
                        xtype: 'hidden',
                        name: 'createuserid',
                        value: $.cookie("USER_ID"),
                    }, {
                        fieldLabel: '<span style="color:red">*</span>审批事项',
                        name: 'xksx',
                        value: this.record.xksx,
                        displayField: 'xksx',
                    },
                    {
                        fieldLabel: '<span style="color:red">*</span>审批号',
                        name: 'sph',
                        xtype: 'displayfield',
                        readOnly: true,
                        editable: false,
                        value: this.record.sph,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>审批类型',
                        name: 'splx',
                        xtype: 'displayfield',
                        editable: false,
                        value: this.record.splxname,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>地  址',
                        name: 'b_address',
                        colspan: 3,
                        editable: false,
                        value: this.record.b_address,

                    }, {
                        fieldLabel: '事项描述',
                        name: 'sxmx',
                        colspan: 3,
                        editable: false,
                        value: this.record.sxmx,
                    }]
                }, {
                    xtype: 'fieldset',
                    collapsible: true,
                    margin: '20 0 0 0',
                    title: '申请者/申请者对象信息',
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 75,
                        margin: '0 0 10 0',
                    },
                    defaults: {
                        xtype: 'displayfield',
                        width: '100%'
                    },
                    items: [{
                        fieldLabel: '<span style="color:red">*</span>申请人',
                        name: 'sqr',
                        allowBlank: false,
                        value: this.record.sqr,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>证件类型',
                        name: 'cardtype',
                        allowBlank: false,
                        value: this.record.cardtypename,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>证件号',
                        name: 'card',
                        allowBlank: false,
                        value: this.record.card,
                    }, {
                        fieldLabel: '<span style="color:red">*</span>联系电话',
                        name: 'contactphone',
                        allowBlank: false,
                        value: this.record.contactphone,
                    }, {
                        fieldLabel: '地&nbsp;&nbsp;址',
                        name: 's_address',
                        value: this.record.s_address,
                        colspan: 2,
                    }]
                },
                    {
                        xtype: 'fieldset',
                        collapsible: true,
                        title: '处理信息',
                        margin: '20 0 0 0',
                        layout: {
                            type: 'table',
                            columns: 3,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75,
                            margin: '0 0 10 0',
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 312
                        },
                        items: [{
                            fieldLabel: '<span style="color:red">*</span>可处理时间',
                            name: 'processtime_start',
                            allowBlank: false,
                            xtype: 'displayfield',
                            colspan: 3,
                            width:600,
                            value: Ext.util.Format.date(this.record.processtime_start, 'Y-m-d') + " 至 " + Ext.util.Format.date(this.record.processtime_end, 'Y-m-d'),
                        },
                        {
                            fieldLabel: '处理描述',
                            name: 'processcontent',
                            xtype: 'displayfield',
                            colspan: 3,
                            height: 30,
                            value: this.record.processcontent,
                            width: '100%',
                        }, {
                            fieldLabel: '处理地点',
                            name: 'processaddress',
                            colspan: 3,
                            xtype: 'displayfield',
                            allowBlank: false,
                            value: this.record.processaddress,
                            width: '100%',
                        }, {
                            id: 'EVENT_COORDINATE_ID',
                            name: 'geography',
                            xtype: 'textfield',
                            fieldLabel: '地理位置',
                            width: '100%',
                            colspan: 3,
                            autoShow: true,
                            value: this.record.geography,
                            listeners: {
                                render: function (p) {
                                    p.getEl().on('click', function (p) {
                                        CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 0, 1, this.component.getValue());
                                    });
                                },
                            }
                        },
                        ]
                    }, {
                        xtype: 'imageshowpanel',
                        store: store,
                        titleNew: '附件',
                        path: configs.ApprovalPath,
                        colspan: 3,
                        width: '97%',
                    }, {
                        fieldLabel: '处理意见:',
                        name: 'shopinion',
                        allowBlank: false,
                        xtype: 'displayfield',
                        colspan: 3,
                        height: 30,
                        labelWidth: 60,
                        margin: '20 0 10 20',
                        value: this.record.shopinion,
                        width: '97%',
                    }
            ], buttons: [{
                text: '确定',
                handler: 'onClose'
            }]
        }]
        this.callParent();
    }
});