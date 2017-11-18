Ext.define('TianZun.controller.qwmanager.PoliceCenter', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.policeCenter',
    requires: [
        'TianZun.view.qwmanager.policecenter.PoliceCenterQuery',
        'TianZun.view.qwmanager.policecenter.PoliceCenterInfo',
    ],
    //取消
    onclose: function (obj) {
        var win = obj.up('window');
        win.close();
    },
    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("policeCenterQuery");
        if (!win) {
            win = Ext.create('widget.policeCenterQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').down('grid').getStore();

        var unitid = form.getForm().findField("unitid").getValue();
        var username = form.getForm().findField("username").getValue();
        var bjlx = form.getForm().findField("bjlx").getValue();
        var bjzt = form.getForm().findField("bjzt").getValue();
        var sszt = form.getForm().findField("sszt").getValue();
 
        var filters = [];

        if ($.trim(unitid) != null && $.trim(unitid) != "") {
            filters.push({ property: "unitid", value: unitid });
        }
        if ($.trim(username) != null && $.trim(username) != "") {
            filters.push({ property: "username", value: username });
        }

        if ($.trim(bjlx) != null && $.trim(bjlx) != "") {
            filters.push({ property: "bjlx", value: bjlx });
        }

        if ($.trim(bjzt) != null && $.trim(bjzt) != "") {
            filters.push({ property: "bjzt", value: bjzt });
        }

        if ($.trim(sszt) != null && $.trim(sszt) != "") {
            filters.push({ property: "sszt", value: sszt });
        }

        FilterStore(store, filters);
        win.hide();
    },

    //申诉审核
    sssh: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/AlarmDetail/GetAlarmDetailModel?id=" + record.get('id'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var js = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.policeCenterInfo', { record: js });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: '错误提示',
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！",
                    })
                }
            }

        })
    },

    onDetail: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        Ext.Msg.confirm("提示", "您确定要执行生效操作吗？", function (btn) {
            if (btn == "yes") {
                //Ext.Msg.alert("提示", "卧槽你居然点确定");
                GetAjax({
                    url: "/api/AlarmDetail/EditAlarmDetailReview?id=" + record.get('id')+"&type=1",
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        if (textStatus == "success") {
                            grid.getStore().reload();
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
        })

    },
    onDispatch: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        Ext.Msg.confirm("提示", "您确定要执行作废操作吗？", function (btn) {
            if (btn == "yes") {
                //Ext.Msg.alert("提示", "卧槽你居然点确定");
                GetAjax({
                    url: "/api/AlarmDetail/EditAlarmDetailReview?id=" + record.get('id') + "&type=2",
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        if (textStatus == "success") {
                            grid.getStore().reload();
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
        })
    },

    ondetermine: function (obj, e) {
        var grid = this.getView().down('panel[name=personPanel]').child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: "/api/AlarmDetail/EditAlarmDetailAppeals",
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

    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=personPanel]').child('gridpanel');
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