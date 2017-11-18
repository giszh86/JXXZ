Ext.define('TianZun.view.administrativeapproval.approval.ApprovalTeamAssigned', {
    extend: 'TianZun.ux.Window',
    alias: 'widget.approvalTeamAssigned',
    title: '中队派遣',
    layout: 'fit',

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
        //用来存储中队信息
        var units = [];

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
                        items: [
                            {
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

                                ],
                            },
                        ]
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
                                                value: this.result == null ? "" : this.result.opinion,
                                            },
                                            {
                                                fieldLabel: '办结日期',
                                                name: 'banwandate',
                                                xtype: 'displayfield',
                                                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                                value: this.result == null ? "" : this.result.banwandate,
                                            },
                                            {
                                                fieldLabel: '办结时间',
                                                name: 'banjiedate',
                                                xtype: 'displayfield',
                                                renderer: Ext.util.Format.dateRenderer('H:i:s'),
                                                value: this.result == null ? "" : this.result.banjiedate,
                                            },
                                            {
                                                fieldLabel: '办结人姓名',
                                                name: 'banjieusername',
                                                xtype: 'displayfield',
                                                value: this.result == null ? "" : this.result.banjieusername,
                                            },
                                            {
                                                fieldLabel: '办结人用户标识',
                                                name: 'banjieuserguid',
                                                xtype: 'displayfield',
                                                labelWidth: 100,
                                                value: this.result == null ? "" : this.result.banjieuserguid,
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
                                title: '行政许可科办件派遣',
                                xtype: 'fieldset',
                                name: '',
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
                                                fieldLabel: '选择中队',
                                                xtype: 'combo',
                                                margin: '10 0 0 0',
                                                labelAlign: 'right',
                                                editable: false,
                                                //allowBlank: false,
                                                width: 280,
                                                store: Ext.create('TianZun.store.sys.UnitSquadron', { proxy: { type: 'ajax', extraParams: { unittypeid: 2 } } }),
                                                name: 'middleteam',
                                                valueField: 'ID',
                                                displayField: 'Name',
                                                listeners: {
                                                    'change': function ()
                                                    {
                                                        var cyCombo = Ext.getCmp('ACSmallTypeID_Add');
                                                        cyCombo.clearValue();
                                                        cyStore = Ext.create('TianZun.store.sys.UserUnitType');
                                                        cyStore.getProxy().url = 'api/User/GetUsersPersonnelList?unitid=' + this.getValue() + '&roleid=3';
                                                        cyCombo.bindStore(cyStore, false);
                                                        cyStore.load();
                                                    }
                                                }
                                            },
                                            {
                                                id: 'ACSmallTypeID_Add',
                                                xtype: 'combo',
                                                margin: '10 0 0 0',
                                                fieldLabel: '处理人',
                                                labelAlign: 'right',
                                                name: 'nextuserid',
                                                valueField: 'ID',
                                                editable: false,
                                                //allowBlank: false,
                                                width: 280,
                                                displayField: 'DisplayName',
                                            },
                                            {
                                                xtype: 'button',
                                                text: '添加',
                                                margin: '10 0 0 20',
                                                width: 100,
                                                listeners: {
                                                    click: function (obj)
                                                    {
                                                        if (me.down('combo[name=nextuserid]').value != null)
                                                        {
                                                            //第一个的时候，末尾不加"、"
                                                            if (me.down('displayfield[name=dealusername]').value == null)
                                                            {
                                                                me.down('displayfield[name=dealusername]').setValue(me.down('combo[name=nextuserid]').rawValue);
                                                                me.down('hidden[name=hidedealusername]').setValue(me.down('combo[name=nextuserid]').value);
                                                                dataarr.push(me.down('combo[name=nextuserid]').value);

                                                                Ext.Ajax.request({
                                                                    url: 'api/User/GetUserById?userid=' + me.down('combo[name=nextuserid]').value,
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
                                                                dataname.push(me.down('combo[name=nextuserid]').rawValue + "：" + phone);
                                                                if (flag)
                                                                {
                                                                    //存储不为空的手机号
                                                                    numbers.push(phone);
                                                                }
                                                                //存储中队信息
                                                                units.push(me.down('combo[name=middleteam]').value);
                                                            }
                                                            //从第二个开始，拼接"、"
                                                            else if (me.down('combo[name=nextuserid]') != null)
                                                            {
                                                                //判断是否选择相同人员
                                                                if (dataarr.indexOf(me.down('combo[name=nextuserid]').value) < 0)
                                                                {
                                                                    //判断同一中队是否有多个内勤
                                                                    if (units.indexOf(me.down('combo[name=middleteam]').value) < 0)
                                                                    {
                                                                        me.down('displayfield[name=dealusername]').setValue(me.down('displayfield[name=dealusername]').value + "、" + me.down('combo[name=nextuserid]').rawValue);
                                                                        me.down('hidden[name=hidedealusername]').setValue(me.down('hidden[name=hidedealusername]').value + "," + me.down('combo[name=nextuserid]').value);
                                                                        dataarr.push(me.down('combo[name=nextuserid]').value);
                                                                        Ext.Ajax.request({
                                                                            url: 'api/User/GetUserById?userid=' + me.down('combo[name=nextuserid]').value,
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
                                                                        dataname.push("、" + me.down('combo[name=nextuserid]').rawValue + "：" + phone);
                                                                        if (flag)
                                                                        {
                                                                            //存储不为空的手机号
                                                                            numbers.push(phone);
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        Ext.Msg.alert("提示", "每个中队只能选择一个内勤人员！");
                                                                    }
                                                                }
                                                            }
                                                            if (me.down('combo[name=nextuserid]') != null)
                                                            {
                                                                var msg = "";
                                                                var phones = "";
                                                                for (var i = 0; i < dataname.length; i++)
                                                                {
                                                                    msg += (dataname[i]);
                                                                }
                                                                //去除页面显示的短信内容末尾的"、"
                                                                me.down('checkbox[name=message]').boxLabel = "短信提醒  （" + msg + "）";
                                                                for (var i = 0; i < numbers.length; i++)
                                                                {
                                                                    phones += (numbers[i]+",");
                                                                }
                                                                //去除传到后台手机号的末尾"、"
                                                                phones = phones.substring(0, phones.length - 1);
                                                                me.down('hidden[name=phone]').setValue(flag == true ? phones : '');
                                                                me.down('checkbox[name=message]').getEl().down('.x-form-cb-label').update(me.down('checkbox[name=message]').boxLabel);
                                                                me.down('checkbox[name=message]').show();
                                                            }
                                                            //清楚处理人员的下拉框中的内容
                                                            me.down('combo[name=middleteam]').setValue('');
                                                            me.down('combo[name=nextuserid]').setValue('');
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
                                        height:30,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: '处理人员',
                                                width: 335,
                                                allowBank:false,
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
                                                colspan:3,
                                                checked: true,
                                            },
                                            {
                                                xtype: 'hidden',
                                                name: 'phone',
                                            },
                                        ]
                                    },
                                    {
                                        layout: 'hbox',
                                        xtype: 'fieldcontainer',
                                        fieldLabel: '',
                                        colspan: 3,
                                        items: [
                                            {
                                                fieldLabel: '处理期限',
                                                name: 'xzxkstarttime',
                                                labelAlign: 'right',
                                                xtype: 'datefield',
                                                editable: false,
                                                allowBlank: false,
                                                format: 'Y-m-d',
                                                width: 280,
                                            },
                                            {
                                                fieldLabel: '至',
                                                name: 'xzxkendtime',
                                                labelAlign: 'right',
                                                editable: false,
                                                allowBlank: false,
                                                xtype: 'datefield',
                                                colspan: 2,
                                                format: 'Y-m-d',
                                                width: 280,
                                                listeners: {
                                                    change: function (obj)
                                                    {
                                                        xzxkstarttime = me.down('datefield[name=xzxkstarttime]');
                                                        xzxkendtime = me.down('datefield[name=xzxkendtime]');
                                                        if (xzxkstarttime.getValue() != null && xzxkendtime.getValue() != null && xzxkendtime.getValue() < xzxkstarttime.getValue())
                                                        {
                                                            Ext.Msg.alert('提示', '结束时间不能早于开始时间');
                                                            xzxkendtime.clearValue();
                                                            return false;
                                                        }
                                                    }
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        fieldLabel: '地点',
                                        name: 'xzxkaddress',
                                        labelAlign: 'right',
                                        colspan: 3,
                                        margin: '10 0 0 0',
                                        xtype: 'textfield',
                                        width: 920,
                                    },
                                    {
                                        fieldLabel: '内容',
                                        name: 'advice',
                                        labelAlign: 'right',
                                        colspan: 3,
                                        margin: '10 0 0 0',
                                        xtype: 'textarea',
                                        height: 30,
                                        width: 920,
                                    },
                                    {
                                        xtype: 'fieldset',
                                        collapsible: true,
                                        title: '上传附件',
                                        colspan: 3,
                                        width: 900,
                                        id: 'sc',
                                        margin: '10 0 20 20',
                                        layout: 'fit',
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
                                        name: 'wfdid',
                                        value: me.content == null ? "" : me.content.wfdid,
                                    },
                                    {
                                        xtype: 'hidden',
                                        name: 'nextwfdid',
                                        value: me.content == null ? "" : me.content.nextid,
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
                                        xtype: 'hidden',
                                        name: 'currentstage',
                                        value:'0',
                                    },
                                ],
                            },
                        ]
                    },
                ]
            }, ], buttons: [{
                text: '提交',
                handler: 'onSendOk'
            }, {
                text: '取消',
                handler: 'onClose'
            },

            ]
        }],
            this.callParent();
    }
});