Ext.define('TianZun.view.administrativeapproval.approval.ApprovalTeamerDeal', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalTeamerDeal',
    title: '队员处理',
    layout: 'fit',

    initComponent: function ()
    {
        var me = this;
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
                items: [

                    , {
                        layout: 'fit',
                        border: false,
                        title: '基本信息',
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
                                    name: 'projectname',
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
                                }, {
                                    fieldLabel: '审批类型',
                                    name: 'processversioninstancename',
                                    xtype: 'displayfield',
                                    value: this.record.get('processversioninstancename'),
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
                                items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'createuserid',
                                        value: $.cookie("USER_ID")
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'syncrowguid',
                                        value: this.record.get('syncrowguid'),
                                    },
                                    {
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
                                        name: 'certname',
                                        xtype: 'displayfield',
                                        value: this.record.get('certname'),
                                    }, {
                                        fieldLabel: '证件号',
                                        name: 'certnum',
                                        allowBlank: false,
                                        value: this.record.get('certnum'),
                                    }, {
                                        fieldLabel: '邮编',
                                        name: 'contactpostcode',
                                        colspan: 2,
                                        xtype: 'displayfield',
                                        value: this.record.get('contactpostcode'),
                                    }, {
                                        fieldLabel: '联系地址',
                                        name: 'address',
                                        colspan: 3,
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
                                }, {
                                    fieldLabel: '备注',
                                    name: 'remark',
                                    colspan: 3,
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
                                    value: this.record.get('windowname'),
                                }, {
                                    fieldLabel: '实际办结时间',
                                    name: 'banjiedate',
                                    colspan: 2,
                                    xtype: 'displayfield',
                                    value: this.record.get('banjiedate'),
                                }, ]
                            },

                            ]
                        }]
                    }, {
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
                                    { header: '意见发表者', dataIndex: 'OperatorForDisplayName', flex: 1 },
                                    { header: '环节处理时间', dataIndex: 'OperationDate', flex: 1 },
                                ],
                                bbar: {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true
                                },
                            }
                        ]
                    },
                    {
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
                                    { header: '办理人', dataIndex: 'acceptusername', flex: 1 },
                                    { header: '操作', dataIndex: 'activityname', flex: 1 },
                                    { header: '接受人', dataIndex: 'receiveusername', flex: 1 },
                                    { header: '时间', dataIndex: 'receivedate', flex: 1 },
                                ],
                                bbar: {
                                    xtype: 'pagingtoolbar',
                                    displayInfo: true
                                },
                            }
                        ]
                    },
                    {
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
                                                value: this.result == null ? '' : this.result.opinion,
                                            },
                                            {
                                                fieldLabel: '办结日期',
                                                name: 'banwandate',
                                                xtype: 'displayfield',
                                                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                                value: this.result == null ? '' : this.result.banwandate,
                                            },
                                            {
                                                fieldLabel: '办结时间',
                                                name: 'banjiedate',
                                                xtype: 'displayfield',
                                                renderer: Ext.util.Format.dateRenderer('H:i:s'),
                                                value: this.result == null ? '' : this.result.banjiedate,
                                            },
                                            {
                                                fieldLabel: '办结人姓名',
                                                name: 'banjieusername',
                                                xtype: 'displayfield',
                                                value: this.result == null ? '' : this.result.banjieusername,
                                            },
                                            {
                                                fieldLabel: '办结人用户标识',
                                                name: 'banjieuserguid',
                                                xtype: 'displayfield',
                                                labelWidth: 100,
                                                value: this.result == null ? '' : this.result.banjieuserguid,
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '办件处理',
                        xtype: 'panel',
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
                                        title: '行政许可科办件派遣',
                                        xtype: 'fieldset',
                                        name: 'MidTeamAssigned',
                                        margin: '10 0 0 0',
                                        collapsible: true,
                                        layout: {
                                            type: 'table',
                                            columns: 2,
                                        },
                                        fieldDefaults: {
                                            labelAlign: 'right',
                                            labelWidth: 70,
                                            margin: '10 0 0 0',
                                        },
                                        items: [
                                            {
                                                fieldLabel: '处理期限',
                                                name: 'advice',
                                                labelAlign: 'right',
                                                margin: '10 0 0 0',
                                                xtype: 'displayfield',
                                                editable: false,
                                                allowBlank: false,
                                                width: 280,
                                                colspan: 2,
                                                value: Ext.util.Format.date(me.content == null ? "" : this.content.starttime, 'Y-m-d') + " 至 " + Ext.util.Format.date(me.content == null ? "" : this.content.endtime, 'Y-m-d'),
                                            },
                                            {
                                                fieldLabel: '地点',
                                                name: 'advice',
                                                labelAlign: 'right',
                                                margin: '10 0 0 0',
                                                xtype: 'displayfield',
                                                colspan: 2,
                                                width: 920,
                                                value: me.content == null ? "" : this.content.xzxkaddress,
                                            },
                                            {
                                                fieldLabel: '内容',
                                                name: 'advice',
                                                labelAlign: 'right',
                                                margin: '10 0 0 0',
                                                xtype: 'displayfield',
                                                colspan: 2,
                                                width: 920,
                                                value: me.content == null ? "" : this.content.xzxkcontent,
                                            },
                                            {
                                                xtype: 'imageshowpanel',
                                                titleNew: '附件',
                                                margin: '0 0 0 10',
                                                store: null,
                                                filelist: me.content == null ? "" : this.content.filelist,
                                                name: 'imageshowpanel2',
                                                path: configs.AdministratorApproval,
                                                colspan: 2,
                                                width: 900,
                                                listeners: {
                                                    render: function ()
                                                    {
                                                        if (me.content != null && me.content.filelist.length == 0)
                                                        {
                                                            me.down('imageshowpanel[name=imageshowpanel2]').hidden = true;
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '处理人',
                                                width: 460,
                                                value: me.content == null ? "" : this.content.xzxkdealname,
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '处理时间',
                                                width: 460,
                                                value: Ext.util.Format.date(me.content == null ? "" : this.content.xzxkdealtime, 'Y-m-d H:i:s'),
                                            },
                                        ],
                                    },
                                    {
                                        title: $.cookie("UNIT_NAME") + '内勤派遣',
                                        xtype: 'fieldset',
                                        name: 'MidTeamAssigned',
                                        margin: '10 0 0 0',
                                        collapsible: true,
                                        layout: {
                                            type: 'table',
                                            columns: 2,
                                        },
                                        fieldDefaults: {
                                            labelAlign: 'right',
                                            labelWidth: 70,
                                            margin: '10 0 0 0',
                                        },
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '派遣队员',
                                                name:'dispatchmember',
                                                width: 920,
                                                colspan: 2,
                                                value:'',
                                                listeners: {
                                                    render: function (obj)
                                                    {
                                                        if (me.content != null)
                                                        {
                                                            var dispatchmem = me.down('displayfield[name=dispatchmember]').getValue();
                                                            var tmpRead = '<img src="../../Images/images/已阅.png" style="width:16px; height:16px;position:absolute;right:1px;"/><span style="width:30px;padding-right:20px"></span>';
                                                            var tmpNoRead = '<img src="../../Images/images/未.png" style="width:16px; height:16px;position:absolute;right:1px;"/><span style="width:30px;padding-right:20px"></span>';
                                                            for (var i = 0; i < me.content.dispatchteamlist[0].sendmember.length;i++)
                                                            {
                                                                if (me.content.dispatchteamlist[0].sendmember[i].state == 1)
                                                                {
                                                                    dispatchmem = dispatchmem + '<span style="position:relative">' + me.content.dispatchteamlist[0].sendmember[i].name + tmpRead + '</span>';
                                                                }
                                                                else
                                                                {
                                                                    dispatchmem = dispatchmem + '<span style="position:relative">' + me.content.dispatchteamlist[0].sendmember[i].name + tmpNoRead + '</span>';
                                                                }
                                                            }
                                                            me.down('displayfield[name=dispatchmember]').setValue(dispatchmem);
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '派遣意见',
                                                width: 920,
                                                colspan: 2,
                                                value: me.content == null ? "" : me.content.dispatchteamlist[0].nqadvice,
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '处理人',
                                                width: 460,
                                                value: me.content.dispatchteamlist[0].nqname,
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '处理时间',
                                                width: 460,
                                                value: Ext.util.Format.date(me.content == null ? "" : this.content.dispatchteamlist[0].nqdealtime, 'Y-m-d H:i:s'),
                                            },
                                        ],
                                    },
                                    {
                                        title: $.cookie("USER_NAME")+'处理',
                                        name: 'TeamMemberDeal',
                                        xtype: 'fieldset',
                                        collapsible: true,
                                        margin: '10 0 0 0',
                                        layout: {
                                            type: 'table',
                                            columns: 3,
                                        },
                                        fieldDefaults: {
                                            labelAlign: 'right',
                                            labelWidth: 70,
                                        },
                                        items: [
                                            {
                                                id: 'EVENT_COORDINATE_ID',
                                                name: 'geography',
                                                xtype: 'textfield',
                                                labelAlign: 'right',
                                                fieldLabel: '地理位置',
                                                margin: '10 0 0 0',
                                                width: 920,
                                                colspan: 3,
                                                autoShow: true,
                                                listeners: {
                                                    render: function (p)
                                                    {
                                                        p.getEl().on('click', function (p)
                                                        {
                                                            CreateAarcgisMap('EVENT_COORDINATE_ID', '事件坐标', 1, 1, this.component.getValue());
                                                        });
                                                    },
                                                }
                                            },
                                            {
                                                fieldLabel: '监督意见',
                                                name: 'advice',
                                                labelAlign: 'right',
                                                colspan: 3,
                                                margin: '10 0 10 0',
                                                xtype: 'textarea',
                                                height: 30,
                                                width: 920,
                                            },
                                            {
                                                xtype: 'fieldset',
                                                collapsible: true,
                                                //collapsed: true,
                                                title: '上传附件',
                                                colspan: 3,
                                                width: 910,
                                                id: 'sc',
                                                layout: 'fit',
                                                margin: '0 0 20 10',
                                                items: [],
                                                afterRender: function ()
                                                {
                                                    Ext.getCmp('sc').add({
                                                        xtype: 'uploadpanel',
                                                        border: false,
                                                        addFileBtnText: '选择文件...',
                                                        uploadBtnText: '上传',
                                                        removeBtnText: '移除所有',
                                                        cancelBtnText: '取消上传',
                                                        file_size_limit: 10000,//MB
                                                        upload_url: 'api/Common/UploadFile',
                                                        post_params: { 'path': configs.AdministratorApproval },
                                                        width: 500,
                                                        height: 200,
                                                    })
                                                }
                                            },
                                            {
                                                xtype: 'hidden',
                                                name: 'pviguid',
                                                value: this.record.get('pviguid'),
                                            },
                                            {
                                                xtype: 'hidden',
                                                name: 'nextuserid',
                                                value: me.content == null ? "" : me.content.archivedealid,
                                            },
                                            {
                                                xtype: 'hidden',
                                                name: 'phone',
                                            },
                                            {
                                                //fieldLabel: '审批事项',
                                                xtype: 'hidden',
                                                name: 'projectname',
                                                value: this.record.get('projectname'),
                                            },
                                            {
                                                //fieldLabel: '申请单位名称',
                                                xtype: 'hidden',
                                                name: 'applyername',
                                                value: this.record.get('applyername'),
                                            },
                                        ],
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '地图信息',
                        name: '',
                        items: [
                            {
                                layout: 'fit',
                                autoShow: true,
                                modal: true,
                                margin: '10 10 20 10',
                                items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'location',
                                    }
                                ],
                                listeners: {
                                    render: function ()
                                    {
                                        CreateAarcgisMap('', '事件坐标', 1, 1, me.content.location != null ? me.content.location : '', this);
                                    }
                                }
                            },
                        ],
                    },
                ],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, eOpts)
                    {
                        var mapPanel = me.down('panel[name=mapPanel]');
                        if (newCard.title == "办件处理" && mapPanel != null)                        
                            mapPanel.destroy();
                        else if (newCard.title == "地图信息" && mapPanel == null)
                            newCard.addListener('render', CreateAarcgisMap('', '事件坐标', 1, 1, me.content.location != null ? me.content.location : '', newCard), this);
                    }
                }
            }], buttons: [{
                text: '提交',
                handler: 'onMemberDeal'
            }, {
                text: '取消',
                handler: 'onClose'
            },
            ]
        }, ]
        this.callParent();
    }
});