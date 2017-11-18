Ext.define('TianZun.view.legalcasemanager.documents.DocumentCommoncaseDispose', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.documentCommoncaseDispose',
    layout: 'fit',

    border: false,
    bodyBorder: false,
    initComponent: function () {
        var me = this;

        //下一步处理方式
        if (me.record != null) {            
            var nextdata = [];
            var strnextunit = '', strnextrole = '';
            var nowdata = me.record.get('process');
            var backperson, firstperson, secondperson;

            var isInRoleids = $.cookie('ROLE_IDS').match(new RegExp(configs.KYRoleid, 'g'));
            var isInWF = configs.KYLookWorkFlow.indexOf(nowdata.wfdid);          
            if (isInRoleids != null && isInWF >= 0) {
                nextdata.push({ nextid: nowdata.wfdid, nextname: '回复' });
                nextdata.push({ nextid: nowdata.nextwfdidname[0].nextid, nextname: '回退' });                
                backperson = '执法人员,role';
            } else {
                if (nowdata.nextwfdidname.length == 1 || nowdata.wfdid == '2017030613500022') {
                    nextdata.push({ nextid: nowdata.nextwfdidname[0].nextid, nextname: '下一步' });
                } else if (nowdata.wfdid == '2017030613500026') {
                    nextdata.push({ nextid: nowdata.nextwfdidname[1].nextid, nextname: '结案' });
                    nextdata.push({ nextid: nowdata.nextwfdidname[0].nextid, nextname: '回退' });
                }
                else {
                    nextdata.push({ nextid: nowdata.nextwfdidname[1].nextid, nextname: '下一步' });
                    nextdata.push({ nextid: nowdata.nextwfdidname[0].nextid, nextname: '回退' });
                }

                //下一步处理人
                if (nowdata.nextwfdidname.length == 1) {
                    firstperson = getNextUserData(nowdata, 0);
                } else if (nowdata.nextwfdidname.length == 3) {
                    backperson = getNextUserData(nowdata, 0);
                    firstperson = getNextUserData(nowdata, 1);
                    secondperson = getNextUserData(nowdata, 2);
                } else if (nowdata.wfdid == '2017030613500022') {
                    firstperson = getNextUserData(nowdata, 0);
                    secondperson = getNextUserData(nowdata, 1);
                } else {
                    backperson = getNextUserData(nowdata, 0);
                    firstperson = getNextUserData(nowdata, 1);
                }
                if (backperson != null && backperson != '')
                    backperson = backperson.substr(1, backperson.length - 1);
                if (firstperson != null && firstperson != '')
                    firstperson = firstperson.substr(1, firstperson.length - 1);
                if (secondperson != null && secondperson != '')
                    secondperson = secondperson.substr(1, secondperson.length - 1);
            }
        } else {
            var nextdata = [];
            var nowdata = { wfdid: '2017030613500001' };
            nextdata.push({ nextid: '2017030613500002', nextname: '下一步' });
            firstperson = '中队长,role';

            //是否回退案件
            var isht = '新增';
            var htpage = Ext.ComponentQuery.query('viewport')[0].items.getAt(3);
            var htwfsid = htpage.wfsid != null ? htpage.wfsid : (htpage.record !=null? htpage.record.get('wfsid'):null);
            if (htwfsid != null) {
                Ext.Ajax.request({
                    url: "/api/CommonCase/GetWFSANumber?wfsid=" + htwfsid,
                    method: 'get',
                    scope: this,
                    async: false,
                    success: function (response) {
                        isht = parseInt(response.responseText) > 2 ? '回退' : '新增';
                    }
                });
            }
        }

        this.items = [
            {
                xtype: 'form',
                width: '100%',
                border: false,
                overflowY: 'auto',
                items: [
                    {
                        xtype: 'box',
                        width: '100%',
                        height: 60,
                        style: 'line-height:60px;border:1px solid #bbb;border-bottom: none;',
                        colspan: 2,
                        html: '<label style="font-size:16px;margin-left:15px;">处理信息(<b style="color:red;">*</b>必填)<label>',
                    },
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'table',
                            columns: 2,
                        },
                        fieldDefaults: {
                            labelAlign: 'right',
                            labelWidth: 75
                        },
                        defaults: {
                            xtype: 'textfield',
                            width: 400
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name: 'userid',
                                value: $.cookie('USER_ID'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'username',
                                value: $.cookie('USER_NAME'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'wfdid',
                                value: nowdata.wfdid,
                            },
                            {
                                xtype: 'hidden',
                                name: 'wfsid',
                                value: me.record == null ? me.wfsid : me.record.get('wfsid'),
                            },

                            {
                                xtype: 'hidden',
                                name: 'wfsaid',
                                value: me.record == null ? me.wfsaid : me.record.get('wfsaid'),
                            },
                            {
                                xtype: 'hidden',
                                name: 'discaseid',
                                value: me.record != null ? me.record.get('caseid') : me.caseid != null?me.caseid:null,
                            },
                            {
                                xtype: 'hidden',
                                name: 'isreuserid',
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: '<b style="color:red;">*</b>处理意见',
                                name: 'content',
                                width: '100%',
                                height: 80,
                                margin: '20 0 0 0',
                                colspan: 2,
                                allowBlank: false,
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<b style="color:red;">*</b>处理方式',
                                id: 'nextwfdid',
                                name: 'nextwfdid',
                                valueField: 'nextid',
                                displayField: 'nextname',
                                store: Ext.create('Ext.data.Store', { data: nextdata }),
                                allowBlank: false,
                                editable: false,
                                width: '100%',
                                margin: '10 0 0 0',
                                listeners: {
                                    afterrender: function (obj) {
                                        setTimeout(function () {
                                            obj.getStore().load({
                                                callback: function (records, operation, success) {
                                                    obj.setValue(records[0].get('nextid'));
                                                }
                                            });
                                        }, 200);
                                    },
                                    change: function (obj, record) {
                                        var middleteam = obj.up('commonCaseHandler').down('combo[name=middleteam]');

                                        if (me.down('hidden[name=discaseid]').getValue() != '' || (middleteam != null && middleteam.getValue() != null)) {
                                            //获取时效期限
                                            Ext.Ajax.request({
                                                url: configs.WebApi + 'api/Prescription/GetTermByWFDID?wfdid=' + obj.getValue(),
                                                method: 'get',
                                                scope: this,
                                                //async: false,
                                                success: function (response) {
                                                    var jsondata = JSON.parse(response.responseText);
                                                    datestr = jsondata.term;
                                                    me.down('datetimefield[name=endtime]').setValue(Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.HOUR, datestr));
                                                }
                                            })


                                            var changeid = 1, changenextwfdid, IsUnitOrRole, UnitOrRoleValue, cyStore;
                                            if (nowdata.wfdid == '2017030613500005') {
                                                changenextwfdid = Ext.getCmp('ajdx').getValue().ajdx;
                                                changeid = changenextwfdid == '2017030613500006' ? 1 : 2;
                                            }
                                            if (nowdata.wfdid == '2017030613500015') {
                                                changenextwfdid = Ext.getCmp('dsryj').getValue().dsryj;
                                                changeid = changenextwfdid == '2017030613500016' ? 1 : 2;
                                            }
                                            if (nowdata.wfdid == '2017030613500026' && obj.getRawValue() == '结案') {
                                                me.down('combo[name=dealuserid]').hide();
                                                me.down('combo[name=dealuserid]').allowBlank = true;
                                                me.down('textfield[name=redealuserid]').show();
                                                me.down('hidden[name=isreuserid]').setValue(1);
                                            } else {
                                                me.down('textfield[name=redealuserid]').hide();
                                                me.down('combo[name=dealuserid]').allowBlank = false;
                                                me.down('combo[name=dealuserid]').show();
                                                me.down('hidden[name=isreuserid]').setValue(0);
                                            }
                                            if (obj.getRawValue() == '回退') {
                                                UnitOrRoleValue = backperson.split(',')[0];
                                                IsUnitOrRole = backperson.split(',')[1];
                                            } else if (obj.getRawValue() == '下一步' && changeid == 1) {
                                                UnitOrRoleValue = firstperson.split(',')[0];
                                                IsUnitOrRole = firstperson.split(',')[1];
                                            } else if (obj.getRawValue() == '下一步' && changeid == 2) {
                                                UnitOrRoleValue = secondperson.split(',')[0];
                                                IsUnitOrRole = secondperson.split(',')[1];
                                            }
                                            if (obj.getRawValue() == '回复') {
                                                me.down('combo[name=dealuserid]').hide();
                                                me.down('button[name=btnsubmit]').hide();
                                                me.down('combo[name=dealuserid]').allowBlank = true;
                                                me.down('textfield[name=redealuserid]').show();
                                                me.down('button[name=btnreply]').show();
                                                me.down('hidden[name=isreuserid]').setValue(1);
                                            } else if (obj.getRawValue() == '回退') {
                                                me.down('textfield[name=redealuserid]').hide();
                                                me.down('button[name=btnreply]').hide();
                                                me.down('combo[name=dealuserid]').allowBlank = false;
                                                me.down('combo[name=dealuserid]').show();
                                                me.down('button[name=btnsubmit]').show();
                                                me.down('hidden[name=isreuserid]').setValue(0);
                                            }
                                            var cyCombo = obj.up().down('combo[name=dealuserid]');
                                            cyCombo.clearValue();
                                            if (IsUnitOrRole == 'unit') {
                                                cyStore = Ext.create('TianZun.store.sys.UnitNameStore');
                                                cyStore.getProxy().url = 'api/User/GetUsersListUnit?unitname=' + UnitOrRoleValue;
                                            } else {
                                                if (UnitOrRoleValue == '执法人员') {
                                                    cyStore = Ext.create('Ext.data.Store', {
                                                        data: [
                                                            { ID: me.recordbaseinfo.zbuserid, DisplayName: me.recordbaseinfo.zbusername },
                                                            { ID: me.recordbaseinfo.xbuserid, DisplayName: me.recordbaseinfo.xbusername },
                                                        ]
                                                    });
                                                } else {
                                                    cyStore = Ext.create('TianZun.store.sys.RoleNameStore');
                                                    cyStore.getProxy().url = 'api/User/GetUsersListRole?rolename=' + UnitOrRoleValue + '&&unitid=' + (middleteam!=null?middleteam.getValue():0);
                                                }
                                            }

                                            cyCombo.bindStore(cyStore, false);                                            
                                            cyStore.load({
                                                callback: function (records, operation, success) {
                                                    if (records[0] != null) {
                                                        cyCombo.setValue(records[0].get('ID'));
                                                        //短信提醒
                                                        Ext.Ajax.request({
                                                            url: 'api/User/GetUserById?userid=' + cyCombo.getValue(),
                                                            method: 'get',
                                                            async: false,
                                                            success: function (response) {
                                                                jsonstr = Ext.decode(response.responseText);
                                                            }
                                                        });
                                                        var phone = "暂无工作号";
                                                        var flag = false;
                                                        if (jsonstr != null && jsonstr.phone != null && jsonstr.phone != "") {
                                                            phone = jsonstr.phone;
                                                            flag = true;
                                                        }
                                                        me.down('checkbox[name=message]').boxLabel = "短信提醒  （" + cyCombo.getRawValue() + "：" + phone + "）";
                                                        me.down('hidden[name=phone]').setValue(flag == true ? phone : '');
                                                        me.down('checkbox[name=message]').getEl().down('.x-form-cb-label').update(me.down('checkbox[name=message]').boxLabel);
                                                    }
                                                }
                                            });
                                        } else {
                                            Ext.Msg.alert("提示", "请选择处理中队!");
                                            obj.clearValue();
                                            return;
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '<b style="color:red;">*</b>处理人',
                                name: 'dealuserid',
                                valueField: 'ID',
                                displayField: 'DisplayName',
                                allowBlank: false,
                                editable: false,
                                width: '100%',
                                margin: '10 0 0 0'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b style="color:red;">*</b>处理人',
                                name: 'redealuserid',
                                editable: false,
                                hidden: true,
                                width: '100%',
                                margin: '10 0 0 0',
                                value: $.cookie('USER_NAME'),
                            },
                            {
                                xtype: 'panel',
                                margin: '10 0 0 0',
                                width: '100%',
                                layout: 'hbox',
                                border: false,
                                colspan: 2,
                                items: [
                                    {
                                        xtype: 'label',
                                        html: '<b style="color:red;">*</b>处理期限:',
                                        width: '6.5%',
                                        margin: '0 0 0 15',
                                    },
                                    {
                                        xtype: 'datefield',
                                        name: 'starttime',
                                        width: '44%',
                                        allowBlank: false,
                                        editable: false,
                                        readOnly:true,
                                        format: 'Y-m-d H:i:s',
                                        value: nowdata.wfdid == '2017030613500001' ? new Date(Ext.Date.now()) : new Date(me.recordbaseinfo.lastdealtime),
                                    },
                                    {
                                        xtype: 'label',
                                        text: '至',
                                        width: '3.5%',
                                        margin: '4 0 10 20',
                                    },
                                    {
                                        xtype: 'datetimefield',
                                        border: false,
                                        name: 'endtime',
                                        width: '46%',
                                        editable: false,
                                        allowBlank: false,
                                        format: 'Y-m-d H:i:s',
                                        //value: Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.HOUR, datestr),
                                    },
                                ]
                            },
                            {
                                xtype: 'checkbox',
                                margin: '0 0 20 90',
                                name: 'message',
                                colspan: 2,
                                boxLabel: "短信提醒  （" + "）",
                                width: 280,
                                checked: true,
                            },
                             {
                                     xtype: 'hidden',
                                     name: 'phone',
                             },
                             {
                                 xtype: 'hidden',
                                 name: 'casename',
                                 value: me.recordbaseinfo==null?"":me.recordbaseinfo.casename,
                             },
                        ]

                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        width: '100%',
                        buttonAlign: 'center',
                        style: 'background-color:none;',
                        buttons: [{
                            text: '提交',
                            width: 80,
                            name: 'btnsubmit',
                            handler: nowdata.wfdid != '2017030613500001' ? 'onHandleFlowOK' : isht == '新增' ? 'onAddOK' : 'onHandleFlowOK',
                        }, {
                            text: '回复',
                            width: 80,
                            hidden:true,
                            name: 'btnreply',
                            handler: 'onReply',
                        },
                        {
                            html: '<label style="color:#3892d4;">返回</label>',
                            width: 80,
                            name: 'btncancle',
                            handler: 'onReturnList',
                            style: 'background:white;',
                        }]
                    },
                ],
            }
        ]

        this.callParent();
    }
})

function getNextUserData(nowdata, i) {
    var strperson;
    var strreplace = nowdata.nextwfdidname[i];
    if (strreplace.nextunitid != null && strreplace.nextunitid != '') {
        strperson = nowdata.nextwfdidname[i].nextunitid;
        strperson += 'unit';
    }
    if (strreplace.nextroleid != null && strreplace.nextroleid != '') {
        strperson = nowdata.nextwfdidname[i].nextroleid;
        strperson += 'role';
    }
    return strperson;
}