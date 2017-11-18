Ext.define('TianZun.view.administrativeapproval.approval.ApprovalDeal', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalDeal',
    title: '监管编辑',
    layout: 'fit',

    initComponent: function () {
        var store = Ext.create('Ext.data.Store', {
            data: [
                { a: 1, b: 2, c: 3, d: 4 },
                { a: 1, b: 2, c: 3, d: 4 },
            ]
        });
        var AdviceStore = Ext.create('TianZun.store.administrativeapproval.Approval.AdviceListStore');
        AdviceStore.getProxy().url = 'api/Approval/GetAdviceList?pviguid=' + this.record.get('pviguid');
        var TransformLogStore = Ext.create('TianZun.store.administrativeapproval.Approval.TransformLogListStore');
        TransformLogStore.getProxy().url = 'api/Approval/GetTransformLogList?pviguid=' + this.record.get('pviguid');
        this.items = [{
            xtype: 'form',
            border: false,
            autoScroll: true,
            bodyPadding: 10,
            width: 1000,
            items: [{
                xtype: 'tabpanel',
                border: false,
                plain: true,
                bodyBorder: false,
                items: [{
                    layout: 'fit',
                    border: false,
                    title: '待审批',
                    xtype: 'panel',
                    name: '',
                    items: [{
                        xtype: 'form',
                        border: false,
                        bodyPadding: 10,
                        width: 1000,
                        overflowY: 'auto',
                        items: [{
                            xtype: 'fieldset',
                            collapsible: false,
                            title: '办件基础信息',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'table',
                                columns: 3,
                            },
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 105,
                                margin: '0 0 10 0',
                            },
                            defaults: {
                                xtype: 'displayfield',
                                width: '100%',
                            },
                            items: [{
                                fieldLabel: '审批事项',
                                name: 'processversionName',
                                value: this.record.get('projectname'),
                            }, {
                                fieldLabel: '事件编码',
                                name: 'row_id',
                                xtype: 'displayfield',
                                value: this.record.get('row_id'),
                            }, {
                                fieldLabel: '申报号',
                                name: 'flowsn',
                                xtype: 'displayfield',
                                value: this.record.get('flowsn'),
                            },  {
                                fieldLabel: '审批类型',
                                name: 'tasktype',
                                xtype: 'displayfield',
                                value: this.record.get('tasktype'),
                            },
                            {
                                fieldLabel: '事项描述',
                                name: 'taskcaseguid',
                                xtype: 'displayfield',
                                colspan: 2,
                                value: this.record.get('taskcaseguid'),
                            }, {
                                fieldLabel: '地址',
                                name: 'address',
                                colspan: 2,
                                xtype: 'displayfield',
                                value: this.record.get('address'),
                            }, ]
                        }, {
                            xtype: 'fieldset',
                            collapsible: false,
                            title: '申请者/申请者对象信息',
                            margin: '20 0 0 0',
                            layout: {
                                type: 'table',
                                columns: 3,
                            },
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 105,
                                margin: '0 0 10 0',
                            },
                            defaults: {
                                xtype: 'displayfield',
                                width: '100%',
                            },
                            items: [{
                                fieldLabel: '申请单位名称',
                                name: 'applyername',
                                value: this.record.get('applyername'),
                            }, {
                                fieldLabel: '法定代表人',
                                name: 'legal',
                                xtype: 'displayfield',
                                value: this.record.get('legal'),
                            }, {
                                fieldLabel: '证件类型',
                                name: 'certtype',
                                xtype: 'displayfield',
                                value: this.record.get('certtype'),
                            }, {
                                fieldLabel: '证件号',
                                name: 'certnum',
                                allowBlank: false,
                                value: this.record.get('certnum'),
                            }, {
                                fieldLabel: '邮编',
                                name: 'contactpostcode',
                                colspan:2,
                                xtype: 'displayfield',
                                value: this.record.get('contactpostcode'),
                            }, {
                                fieldLabel: '联系地址',
                                name: 'address',
                                colspan:3,
                                xtype: 'displayfield',
                                value: this.record.get('address'),
                            }, ]
                        }, {
                            xtype: 'fieldset',
                            collapsible: false,
                            title: '联系人/代理人信息',
                            margin: '20 0 0 0',
                            layout: {
                                type: 'table',
                                columns: 3,
                            },
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 105,
                                margin: '0 0 10 0',
                            },
                            defaults: {
                                xtype: 'displayfield',
                                width: '100%',
                            },
                            items: [{
                                fieldLabel: '姓名',
                                name: 'contactperson',
                                allowBlank: false,
                                value: this.record.get('contactperson'),
                            }, {
                                fieldLabel: '手机',
                                name: 'contactmobile',
                                xtype: 'displayfield',
                                value: this.record.get('contactmobile'),
                            }, {
                                fieldLabel: '电话号码',
                                name: 'contactphone',
                                xtype: 'displayfield',
                                value: this.record.get('contactphone'),
                            },{
                                fieldLabel: '备注',
                                name: 'remark',
                                xtype: 'displayfield',
                                value: this.record.get('remark'),
                            }, ]
                        }, {
                            xtype: 'fieldset',
                            collapsible: false,
                            title: '项目办理信息',
                            margin: '20 0 0 0',
                            layout: {
                                type: 'table',
                                columns: 3,
                            },
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 105,
                                margin: '0 0 10 0',
                            },
                            defaults: {
                                xtype: 'displayfield',
                                width: '100%',
                            },
                            items: [{
                                fieldLabel: '办理部门',
                                name: 'windowname',
                                value: this.record.get('windowname'),
                            }, {
                                fieldLabel: '收件人',
                                name: 'receiveusername',
                                value: this.record.get('receiveusername'),
                            }, {
                                fieldLabel: '办件申请时间',
                                name: 'receivedate',
                                xtype: 'displayfield',
                                value: this.record.get('receivedate'),
                            }, {
                                fieldLabel: '处理时间',
                                name: 'acceptuserdate',
                                value: this.record.get('acceptuserdate'),
                            }, {
                                fieldLabel: '办件承诺期限(天)',
                                name: 'promise_day',
                                xtype: 'displayfield',
                                value: this.record.get('promise_day'),
                            }, {
                                fieldLabel: '承诺办结时间',
                                name: 'promiseenddate',
                                xtype: 'displayfield',
                                value: this.record.get('promiseenddate'),
                            }, {
                                fieldLabel: '承诺期限单位',
                                xtype: 'displayfield',
                                name: 'windowname',
                                value: this.result.windowname,
                            }, {
                                fieldLabel: '实际办结时间',
                                name: 'banjiedate',
                                colspan:2,
                                xtype: 'displayfield',
                                value: this.result.banjiedate,
                            }, ]
                        },
                        {
                            fieldLabel: '选择中队',
                            labelAlign: 'right',
                            colspan: 3,
                            margin: '20 0 0 0',
                            allowBlank: false,
                            xtype: 'combo',
                            store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { type: 'ajax', extraParams: { unittypeid: 2 } } }),
                            displayField: 'Name',
                            valueField: 'ID',
                            name: "TypeArrZD",
                            editable: false,
                        },
                        {
                            fieldLabel: '派遣意见',
                            name: 'splx',
                            labelAlign: 'right',
                            colspan: 3,
                            margin: '10 0 0 0',
                            allowBlank: false,
                            xtype: 'textarea',
                            height: 30,
                            width:940,
                        },
                        ], buttons: [{
                            text: '提交',
                            handler: 'onClose'
                        }, {
                            text: '取消',
                            handler: 'onClose'
                        }]
                    }]
                },{
                    layout: 'fit',
                    border: false,
                    title: '意见列表',
                    name: '',
                    items: [
                        {
                            xtype: 'grid',
                            columnLines: true,
                            store: AdviceStore,
                            columns: [
                                    { header: '活动名称', dataIndex: 'activityname', flex: 1 },
                                    { header: '意见类型', dataIndex: 'opinion', flex: 1 },
                                    { header: '意见发表者', dataIndex: 'operatorfordisplayname', flex: 1 },
                                    { header: '环节处理时间', dataIndex: 'operationdate', flex: 1 },
                                    { header: '环节附件', dataIndex: 'resultattachclientguid', flex: 1 },
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }
                    ], buttons: [{
                        text: '返回',
                        handler: 'onClose'
                    }]
                }, {
                    layout: 'fit',
                    border: false,
                    title: '流转日志',
                    name: '',
                    items: [
                        {
                            xtype: 'grid',
                            columnLines: true,
                            store: TransformLogStore,
                            columns: [
                                    { header: '办理人', dataIndex: 'acceptusername ', flex: 1 },
                                    { header: '操作', dataIndex: 'activityname', flex: 1 },
                                    { header: '接受人', dataIndex: 'receiveusername', flex: 1 },
                                    { header: '时间', dataIndex: 'receivedate', flex: 1 },
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }
                    ], buttons: [{
                        text: '返回',
                        handler: 'onClose'
                    }]
                }, {
                    layout: 'fit',
                    border: false,
                    title: '办结信息',
                    name: '',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            bodyPadding: 10,
                            width: 1000,
                            overflowY: 'auto',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    collapsible: false,
                                    title: '办结信息',
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
                                    items: [
                                       {
                                           fieldLabel: '审批结果',
                                           name: 'opinion',
                                           xtype: 'displayfield',
                                           value: this.result.opinion,
                                       },
                                       {
                                           fieldLabel: '办结日期',
                                           name: 'banwandate',
                                           xtype: 'displayfield',
                                           renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                           value: this.result.banwandate,
                                       },
                                       {
                                           fieldLabel: '办结时间',
                                           name: 'banjiedate',
                                           xtype: 'displayfield',
                                           renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                           value: this.result.banjiedate,
                                       },
                                       {
                                           fieldLabel: '办结人姓名',
                                           name: 'banjieusername',
                                           xtype: 'displayfield',
                                           value: this.result.banjieusername,
                                       },
                                       {
                                           fieldLabel: '办结单位',
                                           name: 'banjieuserguid',
                                           xtype: 'displayfield',
                                           value: this.result.banjieuserguid,
                                       },
                                    ]
                                },
                            ]
                        },
                    ], buttons: [{
                        text: '返回',
                        handler: 'onClose'
                    }]
                }, ], 
            }],
        }, ]
        this.callParent();
    }
});