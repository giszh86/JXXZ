Ext.define('TianZun.view.administrativeapproval.approval.ApprovalTeamerAssigned', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalTeamerAssigned',
    title: '派遣队员',
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

        //全局变量存储短信
        var dataarr = [];
        var dataname = [];
        var numbers = [];

        var filestore = Ext.create('TianZun.store.administrativeapproval.Approval.GetFileUpload', { proxy: { type: 'ajax', extraParams: { wfsuid: me.content == null ? "0" : me.content.xzxkwfsuid } } });
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

                    {
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
                                        name: 'pviguid',
                                        value: this.record.get('pviguid'),
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
                                        collapsible: false,
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
                                        name: 'TeamViewerAssigned',
                                        collapsible: false,
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
                                                layout: 'hbox',
                                                xtype: 'fieldcontainer',
                                                fieldLabel: '',
                                                colspan: 3,
                                                items: [
                                                    {
                                                        fieldLabel: '选择班组',
                                                        xtype: 'combo',
                                                        store: Ext.create('Ext.data.Store',
                                                            {
                                                                proxy:
                                                                {
                                                                    type: 'ajax',
                                                                    extraParams: { parentid: $.cookie("UNIT_ID") },
                                                                    url: configs.WebApi + 'api/Approval/GetUnitsChild?unitid=' + $.cookie('UNIT_ID'),
                                                                }
                                                            }
                                                        ),
                                                        displayField: 'DisplayName',
                                                        valueField: 'ID',
                                                        name: "teamgroup",
                                                        margin: '10 0 10 0',
                                                        width: 335,
                                                        editable: false,
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: '添加',
                                                        margin: '10 0 0 20',
                                                        width: 100,
                                                        listeners:
                                                        {
                                                            click: function (obj)
                                                            {
                                                                //第一个的时候，末尾不加"、"
                                                                if (me.down('combo[name=teamgroup]').value != null)
                                                                {
                                                                    if (me.down('displayfield[name=dealusername]').value == null)
                                                                    {
                                                                        me.down('displayfield[name=dealusername]').setValue(me.down('combo[name=teamgroup]').rawValue);
                                                                        me.down('hidden[name=hidedealusername]').setValue(me.down('combo[name=teamgroup]').value);
                                                                        dataarr.push(me.down('combo[name=teamgroup]').value);

                                                                        Ext.Ajax.request({
                                                                            url: 'api/User/GetUserById?userid=' + me.down('combo[name=teamgroup]').value,
                                                                            method: 'get',
                                                                            async: false,
                                                                            success: function (response)
                                                                            {
                                                                                jsonstr = Ext.decode(response.responseText);
                                                                            }
                                                                        });
                                                                        var phone = "暂无工作号";
                                                                        var flag = false;
                                                                        if (jsonstr != null && jsonstr.phone != null && jsonstr.phone != "")
                                                                        {
                                                                            phone = jsonstr.phone;
                                                                            flag = true;
                                                                        }
                                                                        //拼接页面短信显示
                                                                        dataname.push(me.down('combo[name=teamgroup]').rawValue + "：" + phone);
                                                                        if (flag)
                                                                        {
                                                                            //存储不为空的手机号
                                                                            numbers.push(phone);
                                                                        }
                                                                    }
                                                                        //从第二个开始，拼接"、"
                                                                    else if (me.down('combo[name=teamgroup]') != null)
                                                                    {
                                                                        if (dataarr.indexOf(me.down('combo[name=teamgroup]').value) < 0)
                                                                        {
                                                                            me.down('displayfield[name=dealusername]').setValue(me.down('displayfield[name=dealusername]').value + "、" + me.down('combo[name=teamgroup]').rawValue);
                                                                            me.down('hidden[name=hidedealusername]').setValue(me.down('hidden[name=hidedealusername]').value + "," + me.down('combo[name=teamgroup]').value);
                                                                            dataarr.push(me.down('combo[name=teamgroup]').value);
                                                                            Ext.Ajax.request({
                                                                                url: 'api/User/GetUserById?userid=' + me.down('combo[name=teamgroup]').value,
                                                                                method: 'get',
                                                                                async: false,
                                                                                success: function (response)
                                                                                {
                                                                                    jsonstr = Ext.decode(response.responseText);
                                                                                }
                                                                            });
                                                                            var phone = "暂无工作号";
                                                                            var flag = false;
                                                                            if (jsonstr != null && jsonstr.phone != null && jsonstr.phone != "")
                                                                            {
                                                                                phone = jsonstr.phone;
                                                                                flag = true;
                                                                            }
                                                                            //拼接页面短信显示
                                                                            dataname.push(me.down('combo[name=teamgroup]').rawValue + "：" + phone);
                                                                            if (flag)
                                                                            {
                                                                                //存储不为空的手机号
                                                                                numbers.push(phone);
                                                                            }
                                                                        }
                                                                    }
                                                                   
                                                                    if (me.down('combo[name=teamgroup]') != null)
                                                                    {
                                                                        var msg = "";
                                                                        var phones = "";
                                                                        for (var i = 0; i < dataname.length; i++)
                                                                        {
                                                                            msg += (dataname[i]+"、");
                                                                        }
                                                                        //去除页面显示的短信内容末尾的"、"
                                                                        msg = msg.substring(0, msg.length - 1);
                                                                        me.down('checkbox[name=message]').boxLabel = "短信提醒  （" + msg + "）";
                                                                        for (var i = 0; i < numbers.length; i++)
                                                                        {
                                                                            phones += (numbers[i] + ",");
                                                                        }
                                                                        me.down('hidden[name=phone]').setValue(flag == true ? phones : '');
                                                                        me.down('checkbox[name=message]').getEl().down('.x-form-cb-label').update(me.down('checkbox[name=message]').boxLabel);
                                                                        me.down('checkbox[name=message]').show();
                                                                    }
                                                                    //清楚处理人员的下拉框中的内容
                                                                    me.down('combo[name=teamgroup]').setValue('');
                                                                }
                                                            }
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                layout: 'hbox',
                                                xtype: 'fieldcontainer',
                                                fieldLabel: '',
                                                colspan: 3,
                                                height: 30,
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        fieldLabel: '处理人员',
                                                        width: 335,
                                                        allowBank: false,
                                                        name: 'dealusername',
                                                        hidden:true,
                                                    },
                                                    {
                                                        xtype: 'hidden',
                                                        name: 'hidedealusername',
                                                    },
                                                    {
                                                        xtype: 'checkbox',
                                                        margin: '0 0 0 20',
                                                        name: 'message',
                                                        boxLabel: "短信提醒  （" + "）",
                                                        width: 920,
                                                        height: 30,
                                                        checked: true,
                                                    },
                                                    {
                                                        xtype: 'hidden',
                                                        name: 'phone',
                                                    },
                                                ]
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
                                            {
                                                fieldLabel: '派遣意见',
                                                name: 'advice',
                                                labelAlign: 'right',
                                                colspan: 3,
                                                margin: '10 0 20 0',
                                                xtype: 'textarea',
                                                height: 30,
                                                width: 920,
                                            },
                                        ],
                                    },
                                ]
                            },
                        ]
                    },
                ],
            }]
            , buttons: [{
                text: '提交',
                handler: 'onMideTeamDispatch'
            }, {
                text: '取消',
                handler: 'onClose'
            },

            ]
        }, ]
        this.callParent();
    }
});