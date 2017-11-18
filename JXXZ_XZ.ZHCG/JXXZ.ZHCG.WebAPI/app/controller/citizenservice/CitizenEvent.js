Ext.define('TianZun.controller.citizenservice.CitizenEvent', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.citizenEvent',

    requires: [
       'TianZun.view.citizenservice.citizenevent.EventAdd',
       'TianZun.view.citizenservice.citizenevent.EventAddXZ',
       'TianZun.view.citizenservice.citizenevent.EventInfo',
       'TianZun.view.citizenservice.citizenevent.EventInfoQuick',
       'TianZun.view.citizenservice.citizenevent.EventInfoXZ',
       'TianZun.view.citizenservice.citizenevent.EventQuery',
       'TianZun.view.citizenservice.citizenevent.EventHistory',
        'TianZun.view.citizenservice.citizenevent.EventReview',
        'TianZun.view.citizenservice.citizenevent.EventMonitorAdd',
        'TianZun.view.citizenservice.citizenevent.EventEdit'
    ],

    onRender: function () {
        
    },

    //单击流程事件
    cliclChangeFlow:function(obj,e){
        if (obj.selModel.selected.items.length > 0)
        {
            var panelTitle = obj.up('tabpanel').activeTab.title;
            var panelName = panelTitle == '待办事件' ? 'todoPanel' : panelTitle == '已办事件' ? 'finishPanel' : panelTitle == '事件中心' ? 'allPanel' : 'allPanelReview';
            var newFieldset = Ext.create('Ext.form.FieldSet', {
                collapsible: false,
                margin: '20 0 10 300',
                border: 0,
                name: 'todoFieldset',
                layout: {
                    type: 'table',
                    columns: 9,
                },
                items: [
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 100,
                        border: 0,                                    
                        items: [
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶事件上报.png',
                                name: 'flow1',
                                width: 80,
                                height: 80,
                            },
                            {
                                xtype: 'label',
                                text: '事件上报',
                                width: 80,
                                style: 'text-align:center;display: inline-block;',
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt1',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 100,
                        border: 0,
                        items: [
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶事件派遣.png',
                                name: 'flow2',
                                width: 80,
                                height: 80,
                            },
                            {
                                xtype: 'label',
                                text: '事件派遣',
                                width: 80,
                                style: 'text-align:center;display: inline-block;',
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt2',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 100,
                        border: 0,
                        items: [
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶事件处理.png',
                                name: 'flow3',
                                width: 80,
                                height: 80,
                            },
                            {
                                xtype: 'label',
                                text: '事件处理',
                                width: 80,
                                style: 'text-align:center;display: inline-block;',
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt3',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 100,
                        border: 0,
                        items: [
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶事件审核.png',
                                name: 'flow4',
                                width: 80,
                                height: 80,
                            },
                            {
                                xtype: 'label',
                                text: '事件审核',
                                width: 80,
                                style: 'text-align:center;display: inline-block;',
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt4',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 100,
                        border: 0,
                        items: [
                            {
                                xtype: 'image',
                                src: '../Images/images/灰阶事件归档.png',
                                name: 'flow5',
                                width: 80,
                                height: 80,
                            },
                            {
                                xtype: 'label',
                                text: '事件归档',
                                width: 80,
                                style: 'text-align:center;display: inline-block;',
                            }
                        ]
                    },
                ]
            });
            var todoFieldset = obj.up('tabpanel').down('panel[name=' + panelName + ']').down('fieldset[name=todoFieldset]');
            obj.up('tabpanel').down('panel[name=' + panelName + ']').remove(todoFieldset);
            obj.up('tabpanel').down('panel[name=' + panelName + ']').add(newFieldset);

            var grid = obj.up('grid');
            var sm = grid.getSelectionModel();
            var record = sm.getSelection()[0];
            var tachename = record.get('wfdname');
            var len = tachename.indexOf('上报') > -1 ? 1 : tachename.indexOf('派遣') > -1 ? 2 : tachename.indexOf('处理') > -1 ? 3 : tachename.indexOf('审核')>-1?4:5
            for (var i = 0; i < len; i++) {
                var srcstr = obj.up('tabpanel').down('image[name=flow' + (i + 1) + ']').src.replace('灰阶', '');
                if (i > 0)
                    obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=jt' + i + ']').getEl().dom.src = '../Images/images/箭头.png';
                obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=flow' + (i + 1) + ']').getEl().dom.src = srcstr;
                obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=flow' + (i + 1) + ']').on('click', this.aa);
            }
        }
    },

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("eventQuery");

        if (!win) {
            win = Ext.create('widget.eventQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var eventid = form.getForm().findField("eventid").getValue();
        var eventtitle = form.getForm().findField("eventtitle").getValue();
        var sourceid = form.getForm().findField("sourceid").getValue();
        var wfdid = form.getForm().findField("wfdname").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(eventid) != null && $.trim(eventid) != "") {
            filters.push({ property: "eventid", value: $.trim(eventid) });
        }

        if ($.trim(eventtitle) != null && $.trim(eventtitle) != "") {
            filters.push({ property: "eventtitle", value: eventtitle });
        }

        if (typeof sourceid == "number") {
            filters.push({ property: "sourceid", value: sourceid });
        }

        if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
            filters.push({ property: "wfdid", value: wfdid });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //电话查询历史上报事件
    phoneQueryHistory: function (button, e) {
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        if (formData["contactphone"] == null || formData["contactphone"] == "") {
            Ext.Msg.alert("提示", "未填写联系电话");
            return;
        }
        var win = Ext.create('widget.eventHistory', { contactphone: formData["contactphone"] });
        button.up('eventAdd').add(win);
        win.show();
    },

    //监控列表
    EventMonitorList: function (button, e) {
        var win = this.getView().down('window');
        var form = win.down('form');
        var formData = form.getValues();
        var win = Ext.create('widget.eventMonitorAdd', { contactphone: formData["contactphone"] });
        this.getView().down('eventAddXZ').add(win);
        win.show();
    },

    //同步视频监控信息
    onAddMonitorOK: function (button, e) {
        var win = button.up('window');
        if (!button.isleaf) {
            Ext.Msg.alert("提示", "请选择具体的监控视频");
            return;
        }
        this.getView().down('textfield[name=monitorlist]').setValue(button.monitoraddress+'的视频');
        this.getView().down('textfield[name=eventaddress]').setValue(button.monitoraddress);
        this.getView().down('textfield[name=grometry]').setValue(button.monitorgeomery);

        win.close();
    },

    //事件上报
    onAdd: function (button, e) {
        var win = Ext.create('widget.eventAdd');
        this.getView().add(win);
        win.show();
    },

    //刷新
    onReflush: function (button) {
        var win, formData;
        if (button != null) {
            win = button.up('window');
            formData = win.down('form').getValues();
        }

        var eventidcmp = win.down('combo[name=sourceid]');
        var dt = new Date();
        eventidcmp.autoyear = dt.getFullYear();
        eventidcmp.automonth = (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
        eventidcmp.autoday = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();

        Ext.Ajax.request({
            url: configs.WebApi + 'api/CitizenEvent/GetCitizenAutoID',
            method: 'get',
            scope: this,
            success: function (response) {
                var record = JSON.parse(response.responseText);

                //每天统计
                eventidcmp.autoid = record.AutoDayID + 1;
                var autoidstr = eventidcmp.autoid.toString();
                eventidcmp.autoid = autoidstr.length == 1 ? '00' + autoidstr : autoidstr.length == 2 ? '0' + autoidstr : autoidstr;

                //24小时每年统计
                eventidcmp.auto24yearid = record.Auto24YearID + 1;
                var auto24yearidstr = eventidcmp.auto24yearid.toString();
                eventidcmp.auto24yearid = auto24yearidstr.length == 1 ? '00' + auto24yearidstr : auto24yearidstr.length == 2 ? '0' + auto24yearidstr : auto24yearidstr;

                //110每年统计
                eventidcmp.auto110yearid = record.Auto110YearID + 1;
                var auto110yearidstr = eventidcmp.auto110yearid.toString();
                eventidcmp.auto110yearid = auto110yearidstr.length == 1 ? '00' + auto110yearidstr : auto110yearidstr.length == 2 ? '0' + auto110yearidstr : auto110yearidstr;

                //环境曝光台
                eventidcmp.autohjpgtdayid = record.AutoHJPGTDayID + 1;
                var autohjpgtdayidstr = eventidcmp.autohjpgtdayid.toString();
                eventidcmp.autohjpgtdayid = autohjpgtdayidstr.length == 1 ? '00' + autohjpgtdayidstr : autohjpgtdayidstr.length == 2 ? '0' + autohjpgtdayidstr : autohjpgtdayidstr;

                //夜间施工转报
                eventidcmp.autoyjsgzbdayid = record.AutoYJSGZBDayID + 1;
                var autoyjsgzbdayidstr = eventidcmp.autoyjsgzbdayid.toString();
                eventidcmp.autoyjsgzbdayid = autoyjsgzbdayidstr.length == 1 ? '00' + autoyjsgzbdayidstr : autoyjsgzbdayidstr.length == 2 ? '0' + autoyjsgzbdayidstr : autoyjsgzbdayidstr;

                //巡查发现
                eventidcmp.autoxcfxdayid = record.AutoXCFXDayID + 1;
                var autoxcfxdayidstr = eventidcmp.autoxcfxdayid.toString();
                eventidcmp.autoxcfxdayid = autoxcfxdayidstr.length == 1 ? '00' + autoxcfxdayidstr : autoxcfxdayidstr.length == 2 ? '0' + autoxcfxdayidstr : autoxcfxdayidstr;

                //其他
                eventidcmp.autoqtdayid = record.AutoQTDayID + 1;
                var autoqtdayidstr = eventidcmp.autoqtdayid.toString();
                eventidcmp.autoqtdayid = autoqtdayidstr.length == 1 ? '00' + autoqtdayidstr : autoqtdayidstr.length == 2 ? '0' + autoqtdayidstr : autoqtdayidstr;

                //视频发现
                eventidcmp.autospfxdayid = record.AutoSPFXDayID + 1;
                var autospfxdayidstr = eventidcmp.autospfxdayid.toString();
                eventidcmp.autospfxdayid = autospfxdayidstr.length == 1 ? '00' + autospfxdayidstr : autospfxdayidstr.length == 2 ? '0' + autospfxdayidstr : autospfxdayidstr;

                if (formData['sourceid'] != '')
                    eventidcmp.fireEvent('change', eventidcmp);
            }
        })

    },

    //上报事件
    onAddOK: function (button, e) {
        
        var grid = this.getView().down('tabpanel').getActiveTab().child('gridpanel');
        var store = grid.getStore();
        
        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        //Ext.Ajax.request({
        //    url: configs.WebApi + 'api/CitizenEvent/IsCitizenRepeat?eventid=' + formData['eventid'],
        //    method: 'get',
        //    scope: this,
        //    async:false,
        //    success: function (response) {
        //        if (response.responseText == 'true') {
        //            Ext.Msg.alert('提示', '事件登记单编号已重复,请点击刷新按钮!');
        //            return;
        //        }
        //    }
        //})

        if (formData['foundtime'] > formData['limittime']) {
            Ext.Msg.alert('提示', '发现时间不得晚于限办时间!');
            return;
        }
        if (formData["zptype"] == '2017021410240002')//中队派遣
        {
            this.getView().down('combo[name=middleteam]').allowBlank = false;
            this.getView().down('combo[name=dealperson]').allowBlank = false;
            this.getView().down('combo[name=chargeman]').allowBlank = true;
            formData["nextperson"] = formData["dealperson"];
        }
        else if (formData["zptype"] == '2017021410240008')//领导审核
        {
            this.getView().down('combo[name=middleteam]').allowBlank = false;
            this.getView().down('combo[name=dealperson]').allowBlank = true;
            this.getView().down('combo[name=chargeman]').allowBlank = true;
            formData["nextperson"] = formData["middleteam"];
        }
        else if (formData["zptype"] == '2017021410240007')//协同单位
        {
            this.getView().down('combo[name=middleteam]').allowBlank = false;
            this.getView().down('combo[name=dealperson]').allowBlank = false;
            this.getView().down('combo[name=chargeman]').allowBlank = true;
            formData["nextperson"] = formData["dealperson"];
        }
        else if (formData["zptype"] == '2017021410240003')//快速上报
        {
            this.getView().down('combo[name=middleteam]').allowBlank = false;
            this.getView().down('combo[name=dealperson]').allowBlank = false;
            this.getView().down('combo[name=chargeman]').allowBlank = false;
            formData["nextperson"] = formData["dealperson"] + ',' + formData["chargeman"];
        }

        if (!form.isValid()) {
            return;
        }        

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        
        PostAjax({
            url: "/api/CitizenEvent/AddCizitenEvent",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //乡镇事件上报
    onAddXZ: function (button, e) {
        var win = Ext.create('widget.eventAddXZ');
        this.getView().add(win);
        win.show();
    },

    //乡镇上报事件
    onAddOKXZ: function (button, e) {
        var grid = this.getView().down('tabpanel').getActiveTab().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        if (formData['foundtime'] > formData['limittime']) {
            Ext.Msg.alert('提示', '发现时间不得晚于限办时间!');
            return;
        }
        formData["nextperson"] = formData["dealperson"];

        if (!form.isValid()) {
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: "/api/CitizenEvent/AddCizitenEvent",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //查看
    onDetail: function (obj, record) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.eventInfo', { record: record, type: 1 });
        this.getView().add(win);
        win.show();
    },

    onLook: function (obj, record) {
        var eventHistory = obj.up('eventHistory');
        var grid = eventHistory.down('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.eventInfo', { record: record, type: 1 });
        eventHistory.add(win);
        win.show();
    },

    onReview: function (obj, record) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.eventReview', { record: record, type: 1 });
        this.getView().add(win);
        win.show();
    },

    onReviewOK: function (obj, record) {

        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var thisview = this.getView();

        form.submit({
            url: '/api/CitizenEvent/EditEventReview',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                thisview.down('tabpanel').getActiveTab().down('grid').getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            }
        });
    },

    //编辑
    onEdit: function (obj) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var thisview = this.getView();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        var win = Ext.create('widget.eventEdit', { record: record });
        thisview.add(win);
        win.show();
    },

    //确定编辑
    onEditOK: function (obj) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = obj.up('window');
        var form = win.down('form');
        var formData = form.getValues();

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: "/api/CitizenEvent/CizitenEventEdit",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //处理
    onDispatch: function (obj, record) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var thisview = this.getView();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        //判断该事件是否已处理
        GetAjax({
            url: "api/CitizenEvent/EventIsHandle?wfsaid=" + record.get('wfsaid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = Ext.decode(jqXHR.responseText);
                    if (!jsonstr) {
                        grid.getSelectionModel().clearSelections();
                        store.reload();
                        Ext.MessageBox.show({ title: "提示", msg: "事件已被处理！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        return false;
                    } else {
                        var win = Ext.create('widget.eventInfoXZ', { record: record, type: 2 });
                        thisview.add(win);
                        win.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });

        //如果帐号是指挥中心的人员，就判断该事件是否已处理
        //if ($.cookie('ROLE_IDS').indexOf('2') >= 0) {
        //    GetAjax({
        //        url: "api/CitizenEvent/EventIsHandle?wfsaid=" + record.get('wfsaid'),
        //        complete: function (jqXHR, textStatus, errorThrown) {
        //            if (textStatus == "success") {
        //                var jsonstr = Ext.decode(jqXHR.responseText);
        //                if (!jsonstr) {
        //                    grid.getSelectionModel().clearSelections();
        //                    store.reload();
        //                    Ext.MessageBox.show({ title: "提示", msg: "事件已被处理！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
        //                    return false;
        //                } else {
        //                    var win = Ext.create('widget.eventInfo', { record: record, type: 2 });
        //                    thisview.add(win);
        //                    win.show();
        //                }
        //            } else {
        //                Ext.Msg.show({
        //                    title: "错误提示",
        //                    icon: Ext.Msg.ERROR,
        //                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
        //                });
        //            }
        //        }
        //    });
        //} else {
        //    var win = Ext.create('widget.eventInfo', { record: record, type: 2 });
        //    thisview.add(win);
        //    win.show();
        //}
    },

    //提交事件流程
    onDispatchOK: function (button, e) {
        var grid = this.getView().down('panel[name=todoPanel]').child('gridpanel');
        var record = this.getView().down('window').record;

        var store = grid.getStore();
        var iswhichpagestr = this.getView().down('window').alias[0].split('.')[1];

        var win = button.up('window'); 
        var form = win.down('form');

        var formData = form.getValues();

        //当快速上报时，取出内勤人员和分组组长
        var usernq, userzz;
        if (iswhichpagestr == 'eventInfoQuick') {
            Ext.Ajax.request({
                url: "api/CitizenEvent/GetQuickReportUsers?wfsid=" + record.get('wfsid'),
                method:'get',
                async: false,
                success: function (response) {
                    var jsonstr = JSON.parse(response.responseText);
                    usernq = jsonstr.nq;
                    userzz = jsonstr.zz;
                }
            })
        }

        if (!form.isValid()) {
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        
        if (formData["wfdid"] == '2017021410240001')//指挥中心派遣
        {
            if (iswhichpagestr == 'eventInfo') {
                formData["nextwfdid"] = formData["assigntype"];
                formData["nextperson"] = formData["assigntype"] == '2017021410240009' ? null : formData["assigntype"] == '2017021410240008' ? formData["middleteam"] : formData["middleperson"];
            } else if (iswhichpagestr == 'eventInfoQuick') {
                formData["nextwfdid"] = '2017021410240003';
                formData["nextperson"] = formData["dealperson"] + ',' + formData["chargeman"];
            }
        }
        else if (formData["wfdid"] == '2017021410240002')//中队派遣
        {
            formData["nextwfdid"] = formData["pqtype"];
            formData["nextperson"] = formData["pqtype"] == '2017021410240001' ? '0' : formData["person"];
        }
        else if (formData["wfdid"] == '2017021410240003')//队员处理
        {
            formData["nextwfdid"] = formData["dealtype"].split(',')[0];
            formData["nextperson"] = (iswhichpagestr == 'eventInfoQuick' && $.cookie('ROLE_IDS').indexOf('18') >= 0) ? usernq : (iswhichpagestr == 'eventInfoQuick' && $.cookie('ROLE_IDS').indexOf('3') >= 0)?'0':formData["backperson"];
            formData["processmode"] = formData["dealtype"].split(',')[1];
            if (formData["processmode"] == '教育劝导' || formData["processmode"] == '建议立案')
                formData["satisfaction"] = formData["myd"];
        }
        else if (formData["wfdid"] == '2017021410240004')//中队长审核
        {
            formData["nextwfdid"] = formData["squadroncheck"];
            formData["nextperson"] = formData["nextwfdid"] == "2017021410240005" ? "0" : iswhichpagestr == 'eventInfo' ? formData["backperson"] : (usernq + ',' + userzz);
        }
        else if (formData["wfdid"] == '2017021410240005')//指挥中心审核
        {
            formData["nextwfdid"] = formData["controlcheck"];
            formData["nextperson"] = formData["nextwfdid"] == "2017021410240006" ? null : iswhichpagestr == 'eventInfo'?'0':usernq;
        }
        else if (formData["wfdid"] == '2017021410240007')//协同单位处理
        {
            formData["nextwfdid"] = formData["pqtype"];
            formData["nextperson"] = "0";
        }
        else if (formData["wfdid"] == '2017021410240008')//领导审核
        {
            formData["nextwfdid"] = formData["leadercheck"];
            formData["nextperson"] = formData["nextwfdid"] == "2017021410240001" ? "0" : null;
        }

        //延期后上报
        var eventpage = this.getView().down('eventInfo') == null ? this.getView().down('eventInfoQuick') : this.getView().down('eventInfo');
        if (eventpage.record.get('isextension') != null)
            formData["isextension"] = '0';

        if (formData["isextension"] == '1') {
            GetAjax({
                url: "api/CitizenEvent/EditExtension?citizenid=" + formData["citizenid"] + "&day=" + formData["extensiontime"] + "&extensioncontent=" + formData["extensioncontent"],
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        grid.getSelectionModel().clearSelections();
                        store.reload();
                        win.close();
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });

        } else {

            PostAjax({
                url: "/api/CitizenEvent/CizitenEventFlow",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        grid.getSelectionModel().clearSelections();
                        store.reload();
                        win.close();
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });
        }
    },

    //处理乡镇
    onDispatchXZ: function (obj, record) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var thisview = this.getView();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        //判断该事件是否已处理
        GetAjax({
            url: "api/CitizenEvent/EventIsHandle?wfsaid=" + record.get('wfsaid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = Ext.decode(jqXHR.responseText);
                    if (!jsonstr) {
                        grid.getSelectionModel().clearSelections();
                        store.reload();
                        Ext.MessageBox.show({ title: "提示", msg: "事件已被处理！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        return false;
                    } else {
                        var win = Ext.create('widget.eventInfoXZ', { record: record, type: 2 });
                        thisview.add(win);
                        win.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //提交事件流程乡镇
    onDispatchOKXZ: function (button, e) {
        var grid = this.getView().down('panel[name=todoPanel]').child('gridpanel');
        var record = this.getView().down('window').record;
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        if (!form.isValid()) {
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        if (formData["wfdid"] == '2017021410240002')//中队派遣
        {
            formData["nextwfdid"] = formData['zptype'];
            formData["nextperson"] = formData['zptype'] == '2017021410240003' ? formData["dealperson"] : '0';
        }
        else if (formData["wfdid"] == '2017021410240003')//队员处理
        {
            formData["nextwfdid"] = formData["dealtype"].split(',')[0];
            formData["nextperson"] = formData["backperson"];
            formData["processmode"] = formData["dealtype"].split(',')[1];
            if (formData["processmode"] == '教育劝导' || formData["processmode"] == '建议立案')
                formData["satisfaction"] = formData["myd"];
        }
        else if (formData["wfdid"] == '2017021410240004')//中队长审核
        {
            formData["nextwfdid"] = formData["squadroncheck"];
            formData["nextperson"] = formData["nextwfdid"] == "2017021410240006" ? null : formData["backperson"];
        }

        PostAjax({
            url: "/api/CitizenEvent/CizitenEventFlow",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //短信改变显示人员及号码
    changeShowInfo: function (obj, record) {
        var me = obj.up('eventAdd');
        var radiovalue = me.down('radiogroup[name=assigntype]').down('radio[checked=true]').inputValue;
        Ext.Ajax.request({
            url: 'api/User/GetUserById?userid=' + record.get('ID'),
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

        var ksclnamestr = radiovalue == '2017021410240003' ? me.down('combo[name=dealperson]').rawValue + ',' + me.down('combo[name=chargeman]').rawValue : '';
        ksclnamestr = (ksclnamestr.substr(0, 1) == ',' || ksclnamestr.substr(-1, 1) == ',') ? ksclnamestr.replace(',', '') : ksclnamestr;
        var usernamestr = (radiovalue == '2017021410240002' || radiovalue == '2017021410240007') ? me.down('combo[name=dealperson]').rawValue : radiovalue == '2017021410240008'?me.down('combo[name=middleteam]').rawValue:ksclnamestr;

        var usernostr = radiovalue == '2017021410240003' ? me.down('hidden[name=phone1]').getValue() + ',' + phone : phone;
        usernostr = usernostr.substr(0, 1) == ',' ? usernostr.replace(',', '') : usernostr;
        me.down('checkbox[name=message]').boxLabel = "短信提醒  （" + usernamestr + "：" + usernostr + "）";
        if (radiovalue == '2017021410240003')
            me.down('hidden[name=phone1]').setValue(flag == true ? phone : '');


        me.down('hidden[name=phone]').setValue(usernostr);

        me.down('checkbox[name=message]').getEl().down('.x-form-cb-label').update(me.down('checkbox[name=message]').boxLabel);
        me.down('checkbox[name=message]').show();
    },

    //短信改变显示人员及号码乡镇
    changeShowInfoXZ:function(obj, record) {
        var me = obj.up('eventAddXZ');
        Ext.Ajax.request({
            url: 'api/User/GetUserById?userid=' + record.get('ID'),
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

        var usernamestr = me.down('combo[name=dealperson]').rawValue;
        var usernostr = phone;
        me.down('checkbox[name=message]').boxLabel = "短信提醒  （" + usernamestr + "：" + usernostr + "）";
        me.down('hidden[name=phone]').setValue(usernostr);
        me.down('checkbox[name=message]').getEl().down('.x-form-cb-label').update(me.down('checkbox[name=message]').boxLabel);
        me.down('checkbox[name=message]').show();
    },

    //市民事件交办单
    onOrderSheet: function (button, e) {
        var win = Ext.create('TianZun.view.citizenservice.citizenevent.EventOrderSheet', { citizenid: button.citizenid });
        //this.getView().add(win);
        win.show();
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.hide();
    },

    onEmpty: function (button) {
        var panelTitle = this.getView().down('tabpanel').activeTab.title;
        var panelName = panelTitle == '待办事件' ? 'todoPanel' : panelTitle == '已办事件' ? 'finishPanel' : 'allPanel';
        button.up('form').reset();
        var grid = this.getView().down('panel[name=' + panelName + ']').child('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },

});