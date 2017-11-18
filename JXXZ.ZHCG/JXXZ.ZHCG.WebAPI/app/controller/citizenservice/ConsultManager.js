Ext.define('TianZun.controller.citizenservice.ConsultManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.consultManager',

    requires: [
       'TianZun.view.citizenservice.consultmanager.ConsultAdd',
       'TianZun.view.citizenservice.consultmanager.ConsultInfo',
       'TianZun.view.citizenservice.consultmanager.ConsultQuery',
    ],

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("consultQuery");

        if (!win) {
            win = Ext.create('widget.consultQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').down('grid').getStore();

        //var consultid = form.getForm().findField("consultid").getValue();
        var title = form.getForm().findField("title").getValue();
        var bigtypeid = form.getForm().findField("bigtypeid").getValue();
        var consultuser = form.getForm().findField("consultuser").getValue();
        var contact = form.getForm().findField("contact").getValue();
        //var createusername = form.getForm().findField("createusername").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        //if (typeof parseInt(consultid) == "number") {
        //    filters.push({ property: "consultid", value: consultid });
        //}

        if ($.trim(title) != null && $.trim(title) != "") {
            filters.push({ property: "title", value: title });
        }

        if (typeof bigtypeid == "number") {
            filters.push({ property: "bigtypeid", value: bigtypeid });
        }

        if ($.trim(consultuser) != null && $.trim(consultuser) != "") {
            filters.push({ property: "consultuser", value: consultuser });
        }

        if ($.trim(contact) != null && $.trim(contact) != "") {
            filters.push({ property: "contact", value: contact });
        }

        //if ($.trim(createusername) != null && $.trim(createusername) != "") {
        //    filters.push({ property: "createusername", value: createusername });
        //}

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }        

        FilterStore(store, filters);

        win.hide();
    },

    //上报事件页面
    onAdd: function (button, e) {
        var win = Ext.create('widget.consultAdd');
        this.getView().add(win);
        win.show();
    },
    //咨询登记
    onAddOK: function (button, e) {
        var grid = this.getView().down('panel[name=consultTab]').child('gridpanel');        
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        if (formData['visitTime'] > getNowFormatDate()) {
            Ext.Msg.alert("提示", "受理时间不得大于当前时间");
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: "/api/CitizenConsul/AddCizitenConsul",
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
        var win = Ext.create('widget.consultInfo', { record: record });
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
        var grid = this.getView().down('panel[name=consultTab]').child('gridpanel');
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