Ext.define('TianZun.controller.illegalconstruction.illegallybuilt', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.illegallybuilt',
    requires: [
        'TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltAdd',
        'TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltEdit',
        'TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltInfo',
        'TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltInfoinfo',
        'TianZun.view.illegalconstruction.illegallybuilt.IllegallyBuiltQuery',
    ],
    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("illegallyBuiltQuery");
        if (!win) {
            win = Ext.create('widget.illegallyBuiltQuery');
            this.getView().add(win);
        }
        win.show();
    },
    onQueryOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var wjholder = form.getForm().findField("wjholder").getValue();
        var contactphone = form.getForm().findField("contactphone").getValue();
        var address = form.getForm().findField("address").getValue();
        var process = form.getForm().findField("process").getValue();
        var isgd = form.getForm().findField("isgd").getValue();

        var filters = [];

        if ($.trim(wjholder) != null &&$.trim(wjholder) != "") {
            filters.push({ property: "wjholder", value: $.trim(wjholder) });
        };
        if ($.trim(contactphone) != null && $.trim(contactphone) != "") {
            filters.push({ property: "contactphone", value: $.trim(contactphone) });
        };
        if ($.trim(address) != null && $.trim(address) != "") {
            filters.push({ property: "address", value: $.trim(address) });
        };
        if ($.trim(process) != null && $.trim(process) != "") {
            filters.push({ property: "process", value: $.trim(process) });
        };
        if ($.trim(isgd) != null && $.trim(isgd) != "") {
            filters.push({ property: "isgd", value: $.trim(isgd) });
        };
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //上报
    onAdd: function (obj, e) {
        var win = Ext.create('widget.illegallyBuiltAdd');
        this.getView().add(win);
        win.show();
    },

    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        //formData["reporttime"] = formData["reporttime1"] + " " + formData["reporttime2"];
        //formData["foundtime"] = formData["foundtime1"] + " " + formData["foundtime2"];
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/IllegallyBuilt/AddWzjzs',
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

    onlookwj: function (obj, e) {
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
            url: "api/IllegallyBuilt/GetWzjzModel?wjid=" + record.get('wjid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.illegallyBuiltInfo', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });

    },
    onLook: function (obj, e) {

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
            url: "api/IllegallyBuilt/GetWzjzModel?wjid=" + record.get('wjid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.illegallyBuiltInfoinfo', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },
    //编辑
    onEdit: function (obj, e) {
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
            url: "api/IllegallyBuilt/GetWzjzModel?wjid=" + record.get('wjid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.illegallyBuiltEdit', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });

    },
    onEtidOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        //formData["reporttime"] = formData["reporttime1"] + " " + formData["reporttime2"];
        //formData["foundtime"] = formData["foundtime1"] + " " + formData["foundtime2"];
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/IllegallyBuilt/EditCqxm',
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

    onDelete: function (obj, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                var record = sm.getSelection()[0];
                var formData = new Object();

                Ext.Msg.show({
                    title: '正在提交',
                    msg: '正在提交，请稍候...',
                });

                PostAjax({
                    url: "api/IllegallyBuilt/DeleteWzjz?wjid=" + record.get('parentid'),
                    data: formData,
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        if (textStatus == "success") {
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            grid.getSelectionModel().clearSelections();
                            store.reload();
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
        })
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.close();
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
})