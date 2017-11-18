Ext.define('TianZun.controller.citizenservice.VisitManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.visitManager',

    requires: [
       'TianZun.view.citizenservice.visitmanager.VisitAdd',
       'TianZun.view.citizenservice.citizenevent.EventAdd',
       'TianZun.view.citizenservice.visitmanager.VisitInfo',
       'TianZun.view.citizenservice.visitmanager.VisitEvent',
       'TianZun.view.citizenservice.visitmanager.VisitQuery',
    ],

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("visitQuery");

        if (!win) {
            win = Ext.create('widget.visitQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').down('grid').getStore();

        var eventtitle = form.getForm().findField("eventtitle").getValue();
        var respondents = form.getForm().findField("respondents").getValue();
        var contact = form.getForm().findField("contact").getValue();
        var returnvisit = form.getForm().findField("returnvisit").getValue();        
        var satisfaction = form.getForm().findField("satisfaction").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(eventtitle) != null && $.trim(eventtitle) != "") {
            filters.push({ property: "eventtitle", value: eventtitle });
        }

        if ($.trim(respondents) != null && $.trim(respondents) != "") {
            filters.push({ property: "respondents", value: respondents });
        }

        if ($.trim(contact) != null && $.trim(contact) != "") {
            filters.push({ property: "contact", value: contact });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        if (typeof returnvisit == "number") {
            filters.push({ property: "returnvisit", value: returnvisit });
        }

        if (typeof satisfaction == "number") {
            filters.push({ property: "satisfaction", value: satisfaction });
        }        

        FilterStore(store, filters);

        win.hide();
    },

    //事件查询
    onQueryEvent:function(button,e){
        var win = button.up('window');
        var form = win.down('form');
        var store = win.child('form').down('grid').getStore();
        
        var eventtitle = form.getForm().findField("eventtitle").getValue();
        var eventaddress = form.getForm().findField("eventaddress").getValue();
        var sourceid = form.getForm().findField("sourceid").getValue();

        var filters = [];

        if ($.trim(eventaddress) != null && $.trim(eventaddress) != "") {
            filters.push({ property: "eventaddress", value: $.trim(eventaddress) });
        }

        if ($.trim(eventtitle) != null && $.trim(eventtitle) != "") {
            filters.push({ property: "eventtitle", value: eventtitle });
        }

        if (typeof sourceid == "number") {
            filters.push({ property: "sourceid", value: sourceid });
        }

        store.clearFilter(true);
        store.filter(filters);
    },

    //回访登记
    onAdd: function (button, e) {
        var win = Ext.create('widget.visitAdd');
        this.getView().add(win);
        win.show();
    },

    //登记回访
    onAddVisitOK: function (button, e) {
        var grid = this.getView().down('panel[name=visitTab]').child('gridpanel');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var viewRecord = this.getView();
        
        if (form.isValid()) {            
            if (formData['visittime'] > getNowFormatDate()) {
                Ext.Msg.alert("提示", "回访时间不得大于当前时间");
                return;
            }

            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });            

            PostAjax({
                url: "/api/CizitenVisit/AddCizitenVisit",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        grid.getSelectionModel().clearSelections();
                        store.reload();
                        win.close();

                        //重新指派
                        if (formData["processmode"] == '2') {
                            var jsonRecord = JSON.parse(formData['eventrecord']);
                            var eventwin = Ext.create('widget.eventAdd');
                            viewRecord.add(eventwin);
                            eventwin.down('datefield[name=dutytime]').setValue(jsonRecord['dutytime']);
                            eventwin.down('textfield[name=eventid]').setValue(jsonRecord['eventid']);
                            eventwin.down('combo[name=sourceid]').setValue(jsonRecord['sourceid']);
                            eventwin.down('combo[name=sourceid]').getStore().reload();

                            eventwin.down('textfield[name=complainant]').setValue(jsonRecord['complainant']);
                            eventwin.down('textfield[name=cnumber]').setValue(jsonRecord['cnumber']);
                            eventwin.down('datefield[name=foundtime]').setValue(jsonRecord['foundtime'].split(' ')[0]);
                            eventwin.down('textfield[name=contactphone]').setValue(jsonRecord['contactphone']);
                            eventwin.down('textfield[name=contactaddress]').setValue(jsonRecord['contactaddress']);
                            eventwin.down('textfield[name=eventaddress]').setValue(jsonRecord['eventaddress']);

                            if (jsonRecord['sfzxzz'] == 1) {
                                Ext.getCmp('radioNo').setValue(false);
                                Ext.getCmp('radioYes').setValue(true);
                            }
                            else {
                                Ext.getCmp('radioYes').setValue(false);
                                Ext.getCmp('radioNo').setValue(true);
                            }

                            eventwin.down('combo[name=srid]').setValue(jsonRecord['srid']);
                            eventwin.down('combo[name=srid]').getStore().reload();

                            eventwin.down('textfield[name=eventtitle]').setValue(jsonRecord['eventtitle']);
                            eventwin.down('textarea[name=eventcontent]').setValue(jsonRecord['eventcontent']);

                            eventwin.down('combo[name=bigtypeid]').setValue(jsonRecord['bigtypeid']);
                            eventwin.down('combo[name=bigtypeid]').getStore().reload();

                            var cyCombo = eventwin.down('combo[name=smalltypeid]');
                            cyStore = Ext.create('TianZun.store.citizenservice.BigQuestion');
                            cyStore.getProxy().url = 'api/CitizenEvent/GetClassTypes?parentid=' + jsonRecord['bigtypeid'];
                            cyCombo.bindStore(cyStore, false);
                            cyCombo.setValue(jsonRecord['smalltypeid']);
                            cyCombo.getStore().reload();

                            eventwin.down('datefield[name=limittime]').setValue(jsonRecord['limittime'].split(' ')[0]);
                            eventwin.down('textfield[name=recorduser]').setValue(jsonRecord['recorduser']);
                            eventwin.down('textfield[name=grometry]').setValue(jsonRecord['grometry']);
                            eventwin.show();
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
        }
    },

    //关联相关市民事件
    onVisitEvent: function (button, e) {
        var win = Ext.create('widget.visitEvent');
        button.up('visitAdd').add(win);
        win.show();

        var w = win.getWidth();
        var h = win.getHeight();

        var x = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

        var y = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;

        win.setX((x - w) / 2);
        win.setY((y - h) / 4);
    },

    //关联市民事件标题
    onWrite:function(button,e){
        var win = button.up('window');
        var grid = win.down('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];

        this.getView().down('fieldset[name=visitwin]').down('hidden[name=citizenid]').setValue(record.get('citizenid'));
        this.getView().down('fieldset[name=visitwin]').down('textfield[name=eventTitle]').setValue(record.get('eventtitle'));
        this.getView().down('fieldset[name=visitwin]').down('textfield[name=respondents]').setValue(record.get('complainant'));
        this.getView().down('fieldset[name=visitwin]').down('textfield[name=contact]').setValue(record.get('contactphone'));
        this.getView().down('fieldset[name=visitwin]').down('hidden[name=eventrecord]').setValue(JSON.stringify(record.data));
        win.close();
    },

    //上报事件
    onAddOK: function (button, e) {        
        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();
        formData["ImgBase64s"] = win.GetTestValue();
        if (!form.isValid()) {
            return;
        }

        if (formData["zptype"] == '2017021410240002')//中队派遣
        {
            formData["nextperson"] = formData["dealperson"];
        }
        else if (formData["zptype"] == '2017021410240008')//领导审核
        {
            formData["nextperson"] = formData["middleteam"];
        }
        else if (formData["zptype"] == '2017021410240007')//协同单位
        {
            formData["nextperson"] = formData["dealperson"];
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
        var win = Ext.create('widget.visitInfo', { record: record });
        this.getView().add(win);
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
        button.up('form').reset();
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        button.up('window').close();
    },

    //回访登记--重置
    onReseat: function (button)
    {
        var win = button.up('window');
        button.up('form').reset();
        var grid = win.down('grid');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
    }
});