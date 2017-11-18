Ext.define('TianZun.view.administrativeapproval.approval.ApprovalTeamerDealDetail', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalTeamerDealDetail',
    title: '审批信息详情',
    layout: 'fit',
    requires: [
        'TianZun.ux.ImageShowPanel',
    ],
    initComponent: function ()
    {
        var me = this;
        var AdviceStore = Ext.create('TianZun.store.administrativeapproval.Approval.AdviceListStore');
        AdviceStore.getProxy().url = 'api/Approval/GetAdviceList?pviguid=' + this.record.get('pviguid');
        var TransformLogStore = Ext.create('TianZun.store.administrativeapproval.Approval.TransformLogListStore');
        TransformLogStore.getProxy().url = 'api/Approval/GetTransformLogList?pviguid=' + this.record.get('pviguid');

        var filestore = Ext.create('TianZun.store.administrativeapproval.Approval.GetFileUpload', {
            proxy: {
                type: 'ajax',
                extraParams: {
                    wfsuid: me.content == null ? "0" : me.content.xzxkwfsuid
                }
            }
        });
        var filestore2 = Ext.create('TianZun.store.administrativeapproval.Approval.GetFileUpload', {
            proxy: {
                type: 'ajax',
                extraParams: {
                    wfsuid: me.content == null ? "0" : me.content.wfsuid
                }
            }
        });
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
                                },
                            ]
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
                                },
                            ]
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
                    bodyPadding: 10,
                    name: '',
                    items: [{
                        xtype: 'grid',
                        columnLines: true,
                        store: AdviceStore,
                        columns: [{
                            header: '活动名称',
                            dataIndex: 'activityname',
                            flex: 1
                        },
                            {
                                header: '意见类型',
                                dataIndex: 'opinion',
                                flex: 1
                            },
                            {
                                header: '意见发表者',
                                dataIndex: 'OperatorForDisplayName',
                                flex: 1
                            },
                            {
                                header: '环节处理时间',
                                dataIndex: 'OperationDate',
                                flex: 1
                            },
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true
                        },
                    }]
                },
                    {
                        layout: 'fit',
                        border: false,
                        title: '流转日志',
                        bodyPadding: 10,
                        name: '',
                        items: [{
                            xtype: 'grid',
                            columnLines: true,
                            store: TransformLogStore,
                            columns: [{
                                header: '办理人',
                                dataIndex: 'acceptusername',
                                flex: 1
                            },
                                {
                                    header: '操作',
                                    dataIndex: 'activityname',
                                    flex: 1
                                },
                                {
                                    header: '接受人',
                                    dataIndex: 'receiveusername',
                                    flex: 1
                                },
                                {
                                    header: '时间',
                                    dataIndex: 'receivedate',
                                    flex: 1
                                },
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            },
                        }]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '办结信息',
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
                                items: [{
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
                            }, ]
                        }, ]
                    },
                    {
                        layout: 'fit',
                        border: false,
                        title: '办件处理',
                        xtype: 'panel',
                        name: '',
                        items: [{
                            xtype: 'form',
                            name: 'rootform',
                            border: false,
                            bodyPadding: 10,
                            width: 1000,
                            overflowY: 'auto',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: '提示',
                                    name: 'NoFlowInfo',
                                    labelWidth:30,
                                    value: '当前审批没有流程处理信息！',
                                    colspan: 2,
                                    width: 920,
                                    padding: '30 0 30 0',
                                },
                                {
                                title: '行政许可科办件派遣',
                                xtype: 'fieldset',
                                name: 'xzkTeamAssigned',
                                id: 'xzkTeamAssigned',
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
                                items: [{
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
                                        width: 930,
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
                                                if (me.content !=null&& me.content.filelist.length == 0)
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
                            }, ],
                            listeners: {
                                render: function ()
                                {
                                    if (me.content != null)
                                    {
                                        var nqitem = '';
                                        var nqnodeal = '';
                                        var memeberitem = '';
                                        var membernodeal = '';
                                        var eachitem;
                                        var eachmemberitem;
                                        var sendmember;
                                        if (me.content.dispatchteamlist != null)
                                        {
                                            //循环加载多个内勤
                                            for (var i = 0; i < me.content.dispatchteamlist.length; i++)
                                            {
                                                eachitem = me.content.dispatchteamlist[i];

                                                //已经处理过的内勤
                                                nqitem = {
                                                    title: eachitem.nqunitname + '内勤派遣',
                                                    xtype: 'fieldset',
                                                    name: 'MidTeamAssigned' + i,
                                                    margin: '10 0 0 0',
                                                    collapsible: true,
                                                    autoScroll: true,
                                                    layout: {
                                                        type: 'table',
                                                        columns: 2,
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right',
                                                        labelWidth: 70,
                                                        margin: '10 0 0 0',
                                                    },
                                                    items: [{
                                                        xtype: 'displayfield',
                                                        fieldLabel: '派遣队员',
                                                        name: 'dispatchmember',
                                                        width: 920,
                                                        colspan: 2,
                                                        value: '',
                                                    },
                                                        {
                                                            xtype: 'displayfield',
                                                            fieldLabel: '派遣意见',
                                                            width: 920,
                                                            colspan: 2,
                                                            value: eachitem.nqadvice,
                                                        },
                                                        {
                                                            xtype: 'displayfield',
                                                            fieldLabel: '处理人',
                                                            width: 460,
                                                            colspan: 1,
                                                            value: eachitem.nqname,
                                                        },
                                                        {
                                                            xtype: 'displayfield',
                                                            fieldLabel: '处理时间',
                                                            width: 460,
                                                            colspan: 1,
                                                            value: Ext.util.Format.date(me.content == null ? "" : eachitem.nqdealtime, 'Y-m-d H:i:s'),
                                                        },
                                                    ],
                                                };
                                                //还未处理过的内勤
                                                nqnodeal = {
                                                    title: eachitem.nqunitname + '内勤派遣',
                                                    xtype: 'fieldset',
                                                    name: 'MidTeamAssigned' + i,
                                                    margin: '10 0 0 0',
                                                    collapsible: true,
                                                    collapsed: true,
                                                    layout: {
                                                        type: 'table',
                                                        columns: 2,
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right',
                                                        labelWidth: 70,
                                                        margin: '10 0 0 0',
                                                    },
                                                    items: [{
                                                        xtype: 'displayfield',
                                                        fieldLabel: '提示',
                                                        name: 'dispatchmember',
                                                        width: 920,
                                                        colspan: 2,
                                                        value: '当前内勤尚未开始派遣组员！',
                                                    }, ],
                                                };
                                                if (eachitem.nqstatus == 1)
                                                {
                                                    //显示内勤的派遣队员
                                                    //组员已处理
                                                    var tmpRead = '<img src="../../Images/images/已阅.png" style="width:16px; height:16px;position:absolute;right:1px;"/><span style="width:30px;padding-right:20px"></span>';
                                                    //组员未处理
                                                    var tmpNoRead = '<img src="../../Images/images/未.png" style="width:16px; height:16px;position:absolute;right:1px;"/><span style="width:30px;padding-right:20px"></span>';
                                                    sendmember = eachitem.sendmember;
                                                    //给内勤的派遣队员循环加载组员及显示处理情况
                                                    for (var k = 0; k < sendmember.length; k++)
                                                    {
                                                        if (sendmember[k].state == 1)
                                                        {
                                                            nqitem.items[0].value = nqitem.items[0].value + '<span style="position:relative">' + sendmember[k].name + tmpRead + '</span>';
                                                        } else
                                                        {
                                                            nqitem.items[0].value = nqitem.items[0].value + '<span style="position:relative">' + sendmember[k].name + tmpNoRead + '</span>';
                                                        }
                                                    }
                                                    if (eachitem.memberlist != null)
                                                    {
                                                        //加载每个内勤中的组员
                                                        for (var j = 0; j < eachitem.memberlist.length; j++)
                                                        {
                                                            eachmemberitem = eachitem.memberlist[j];
                                                            //组员处理过的
                                                            memeberitem = {
                                                                title: eachmemberitem.dyname + '处理',
                                                                name: 'TeamMemberDeal',
                                                                xtype: 'fieldset',
                                                                colspan: 2,
                                                                collapsible: true,
                                                                collapsed: true,
                                                                margin: '10 0 10 10',
                                                                width: 900,
                                                                layout: {
                                                                    type: 'table',
                                                                    columns: 2,
                                                                },
                                                                fieldDefaults: {
                                                                    labelAlign: 'right',
                                                                    labelWidth: 70,
                                                                },
                                                                defaults: {
                                                                    xtype: 'displayfield',
                                                                    width: 280,
                                                                },
                                                                items: [{
                                                                    fieldLabel: '处理意见',
                                                                    name: 'teamdealadvice',
                                                                    labelAlign: 'right',
                                                                    colspan: 2,
                                                                    xtype: 'displayfield',
                                                                    width: 880,
                                                                    value: eachmemberitem.dyadvice,
                                                                },
                                                                    {
                                                                        fieldLabel: '地理位置',
                                                                        name: 'geography',
                                                                        labelAlign: 'right',
                                                                        colspan: 2,
                                                                        xtype: 'textfield',
                                                                        width: 870,
                                                                        //id: 'EVENT_COORDINATE_ID',
                                                                        editable: false,
                                                                        value: eachmemberitem.dyaddress,
                                                                        listeners: {
                                                                            render: function (p)
                                                                            {
                                                                                p.getEl().on('click', function (p)
                                                                                {
                                                                                    CreateAarcgisMap('', '事件坐标', 0, 1, this.component.getValue());
                                                                                });
                                                                            },
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'imageshowpanel',
                                                                        titleNew: '附件',
                                                                        store: null,
                                                                        filelist: eachmemberitem.filelist == null ? '' : eachmemberitem.filelist,
                                                                        name: 'imageshowpanel1',
                                                                        path: configs.AdministratorApproval,
                                                                        colspan: 2,
                                                                        width: 870,
                                                                    },
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        fieldLabel: '处理人',
                                                                        name: 'unitofficename',
                                                                        width: 440,
                                                                        value: eachmemberitem.dyname,
                                                                    },
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        fieldLabel: '处理时间',
                                                                        name: 'createtime',
                                                                        width: 440,
                                                                        value: eachmemberitem.dydealtime,
                                                                    }
                                                                ]
                                                            };
                                                            //组员未处理过
                                                            membernodeal = {
                                                                title: eachmemberitem.dyname + '处理',
                                                                name: 'TeamMemberNoDeal',
                                                                xtype: 'fieldset',
                                                                colspan: 2,
                                                                collapsible: true,
                                                                collapsed: true,
                                                                margin: '10 0 10 10',
                                                                width: 900,
                                                                layout: {
                                                                    type: 'table',
                                                                    columns: 2,
                                                                },
                                                                fieldDefaults: {
                                                                    labelAlign: 'right',
                                                                    labelWidth: 70,
                                                                },
                                                                defaults: {
                                                                    xtype: 'displayfield',
                                                                    width: 280,
                                                                },
                                                                items: [{
                                                                    fieldLabel: '提示',
                                                                    name: 'teamdealadvice',
                                                                    labelAlign: 'right',
                                                                    colspan: 2,
                                                                    xtype: 'displayfield',
                                                                    width: 880,
                                                                    value: '当前组员尚未开始处理！',
                                                                }, ]
                                                            };
                                                            if (eachmemberitem.dystatus == 1)
                                                            {
                                                                //无附件时隐藏附件
                                                                if (eachmemberitem.filelist.length == 0)
                                                                {
                                                                    memeberitem.items.splice(2,1);
                                                                }
                                                                nqitem.items.push(memeberitem);
                                                            } else
                                                            {
                                                                nqitem.items.push(membernodeal);
                                                            }
                                                        }
                                                    }
                                                    //在行政科处理后面加载内勤
                                                    me.down('form[name=rootform]').add(nqitem);
                                                } else
                                                {
                                                    me.down('form[name=rootform]').add(nqnodeal);
                                                }
                                            }
                                        }
                                        //行政科归档部分
                                        var xzkonfile = {
                                            title: '行政许可科归档',
                                            name: 'Archive',
                                            xtype: 'fieldset',
                                            collapsible: true,
                                            margin: '10 0 0 0',
                                            layout: {
                                                type: 'table',
                                                columns: 2,
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right',
                                                labelWidth: 70,
                                            },
                                            defaults: {
                                                xtype: 'displayfield',
                                                width: 280,
                                            },
                                            items: [{
                                                fieldLabel: '处理意见',
                                                name: 'teamdealadvice',
                                                labelAlign: 'right',
                                                value: me.content == null ? "" : me.content.archiveadvice,
                                                colspan: 2,
                                                allowBlank: false,
                                                margin: '10 0 0 0',
                                                xtype: 'displayfield',
                                                width: 910,
                                            },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: '处理人',
                                                    name: 'unitofficename',
                                                    width: 460,
                                                    value: me.content == null ? "" : me.content.archivedealname,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    fieldLabel: '处理时间',
                                                    name: 'createtime',
                                                    width: 460,
                                                    value: Ext.util.Format.date(me.content == null ? "" : me.content.archivedealtime, 'Y-m-d H:i:s'),
                                                },
                                            ],
                                        };
                                        //在最后加载行政科归档部分
                                        if (me.content.archiveOnFileStatus == 1)
                                        {
                                            me.down('form[name=rootform]').add(xzkonfile);
                                        }
                                    }
                                }
                            }
                        }, ]
                    },
                ],
                listeners: {
                    render: function ()
                    {
                        if (me.content != null)
                        {
                            me.down("displayfield[name=NoFlowInfo]").hidden = true;
                        }
                        else
                        {
                            me.down("fieldset[name=xzkTeamAssigned]").hidden = true;
                        }
                    },
                }
            }],
            buttons: [{
                text: '返回',
                handler: 'onClose'
            },

            ]
        }, ]
        this.callParent();
    }
});