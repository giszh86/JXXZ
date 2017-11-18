Ext.define('TianZun.controller.illegalconstruction.DemolitionList', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demolitionlist',
    requires: [
        'TianZun.view.illegalconstruction.demolition.DemolitionAdd',
        'TianZun.view.illegalconstruction.demolition.DemolitionEdit',
        'TianZun.view.illegalconstruction.demolition.DemolitionInfo',
        'TianZun.view.illegalconstruction.demolition.DemolitionQuery',
    ],
    //查询
    onQuerycq: function (obj, e) {
        var win = this.getView().child("demolitionQuery");
        if (!win) {
            win = Ext.create('widget.demolitionQuery');
            this.getView().add(win);
        }
        win.show();
    },
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var projectname = form.getForm().findField("projectname").getValue();
        var projectleader = form.getForm().findField("projectleader").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        var ssqy = form.getForm().findField("ssqy").getValue();

        var filters = [];

        if ($.trim(projectname) != null && $.trim(projectname) != "") {
            filters.push({ property: "projectname", value: $.trim(projectname) });
        }

        if ($.trim(projectleader) != null && $.trim(projectleader) != "") {
            filters.push({ property: "projectleader", value: projectleader });
        }


        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        if ($.trim(ssqy) != null && $.trim(ssqy) != "") {
            filters.push({ property: "ssqy", value: ssqy });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();

    },


    //上报
    onAddcq: function (obj, e) {
        var win = Ext.create('widget.demolitionAdd');
        this.getView().add(win);
        win.show();
    },
    onAddcqOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        form.submit({
            url: 'api/Demolition/AddCqxm',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            }
        });
    },


    onEditcq: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Demolition/GetCqxmModel?cqid=" + record.get('cqid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.demolitionEdit', { record: jsonstr, type: 1 });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },
    onEditOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        form.submit({
            url: 'api/Demolition/EditCqxm',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            }
        });
    },



    onDetail: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Demolition/GetCqxmModel?cqid=" + record.get('cqid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.demolitionInfo', { record: jsonstr, type: 1 });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });


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
        var grid = this.getView().down('panel[name=todoPanel]').child('gridpanel');
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