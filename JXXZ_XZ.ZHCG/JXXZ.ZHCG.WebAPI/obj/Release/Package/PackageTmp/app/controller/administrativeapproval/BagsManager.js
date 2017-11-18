Ext.define('TianZun.controller.administrativeapproval.BagsManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bagsManager',

    requires: [
       'TianZun.view.administrativeapproval.bags.BagsAdd',
       'TianZun.view.administrativeapproval.bags.BagsInfo',
       'TianZun.view.administrativeapproval.bags.BagsQuery',
       'TianZun.view.administrativeapproval.bags.BagsEdit',
    ],

    //添加门前三包信息
    onAdd: function (obj, e) {
        var win = this.getView().child("bagsAdd");

        if (!win) {
            win = Ext.create('widget.bagsAdd');
            this.getView().add(win);
        }
        win.show();
    },

    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        if (!form.isValid()) {
            return;
        }

        form.submit({
            url: "api/ThreeBags/AddThreeBagsInf",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action) {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //删除
    onDelete: function (obj,e) {
        var grid = obj.up('grid');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask();    //马赛克

                PostAjax({
                    url: "/api/ThreeBags/DeleteThreeBagsInf?storeid=" + record.get('storeid'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();

                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },

    //查看
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
            url: "/api/ThreeBags/GetThreeBagsInfo?storeid=" + record.get('storeid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.bagsInfo', { record: jsonstr, type: 1 });
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

    onDetailOK:function(obj,e){
        var win = obj.up('window');
        win.close();
    },

    onEdit: function (obj, e) {
        var asdf = this;
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
        GetAjax({
            url: "/api/ThreeBags/GetThreeBagsInfo?storeid=" + record.get('storeid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.bagsEdit', { record: jsonstr, type: 1 });
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

    //编辑
    onEditOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();

        form.submit({
            url: "api/ThreeBags/EditThreeBagsInf",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action) {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //搜索
    onQuery: function (obj, e) {
        var win = this.getView().child("bagsQuery");

        if (!win) {
            win = Ext.create('widget.bagsQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //搜索
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var storename = form.getForm().findField("storename").getValue();
        var storetype = form.getForm().findField("storetype").getValue();
        var contactphone = form.getForm().findField("contactphone").getValue();
        var address = form.getForm().findField("address").getValue();
        //var createtime = form.getForm().findField("createtime").getValue();
        var filters = [];

        if ($.trim(storename) != null && $.trim(storename) != "") {
            filters.push({ property: "storename", value: $.trim(storename) });
        }

        if ($.trim(storetype) != null && $.trim(storetype) != "") {
            filters.push({ property: "storetype", value: storetype });
        }


        if ($.trim(contactphone) != null && $.trim(contactphone) != "") {
            filters.push({ property: "contactphone", value: contactphone });
        }

        if ($.trim(address) != null && $.trim(address) != "") {
            filters.push({ property: "address", value: address });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=mqsb]').child('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },

    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    }

});