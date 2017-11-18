Ext.define('TianZun.controller.sys.BulletinBoard', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulletinBoard',

    requires: [
        'TianZun.view.sys.BulletinBoardAdd',
        'TianZun.view.sys.BulletinBoardQuery',
        'TianZun.view.sys.BulletinBoardEdit',
    ],

    onAdd: function (obj, e) {
        var win = this.getView().child("bulletinBoardAdd");

        if (!win) {
            win = Ext.create('widget.bulletinBoardAdd');
            this.getView().add(win);
        }
        win.show();
    },

    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        form.getValues().hidcontent = Nceditor.html();
        Ext.getCmp("hidcontent").setValue(Nceditor.html());
        if (!form.isValid()) {
            return;
        }
        form.submit({
            url: "api/BulletinBoard/AddBulletinBoard",
            method: "post",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
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
            url: "/api/BulletinBoard/ViewBulletinBoard?id=" + record.get('id'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.bulletinBoardEdit', { record: jsonstr});
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
        form.getValues().hidcontent = Nceditor.html();
        Ext.getCmp("hidcontent").setValue(Nceditor.html());
        if (!form.isValid()) {
            return;
        }
        form.submit({
            url: "api/BulletinBoard/EditBulletinBoard",
            method: "post",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
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

    onDelete: function (obj, e) {
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
                grid.mask();    
                PostAjax({
                    url: "/api/BulletinBoard/DeleteBulletinBoard?id=" + record.get('id'),
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

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("bulletinBoardQuery");

        if (!win) {
            win = Ext.create('widget.bulletinBoardQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //查询提交
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();
        var formData = form.getValues();


        var title = formData["title"];
        var createtimefrom = formData["createtimefrom"];
        var createtimeto = formData["createtimeto"];

        var filters = [];

        if ($.trim(title) != null && $.trim(title) != "") {
            filters.push({ property: "title", value: title });
        }

        if ($.trim(createtimefrom) != null && $.trim(createtimefrom) != "") {
            filters.push({ property: "createtimefrom", value: createtimefrom });
        }

        if ($.trim(createtimeto) != null && $.trim(createtimeto) != "") {
            filters.push({ property: "createtimeto", value: createtimeto });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //查询清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('grid');
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
})