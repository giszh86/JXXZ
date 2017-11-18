Ext.define('TianZun.controller.conservation.conservationunit', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.conservationunit',
    requires: [
        'TianZun.view.conservation.conservationunit.UnitAdd',
        'TianZun.view.conservation.conservationunit.UnitInfo',
        'TianZun.view.conservation.conservationunit.UnitQuery',
        'TianZun.view.conservation.conservationunit.UnitEdit',
    ],


    //查询
    onQuery: function (obj, e) {

        var win = this.getView().child("UnitQuery");
        if (!win) {
            win = Ext.create('widget.unitQuery');
            this.getView().add(win);
        }
        win.show();
    },
    onQueryOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var companyname = form.getForm().findField("companyname").getValue();
        var companytype = form.getForm().findField("companytype").getValue();
        var address = form.getForm().findField("address").getValue();
        //alert(companyname + "---" + companytype + "---" + address);
        var filters = [];

        if ($.trim(companyname) != null && $.trim(companyname) != "") {
            filters.push({ property: "companyname", value: $.trim(companyname) });
        }
        if ($.trim(companytype) != null && $.trim(companytype) != "") {
            filters.push({ property: "companytype", value: companytype });
        }
        if ($.trim(address) != null && $.trim(address) != "") {
            filters.push({ property: "address", value: address });
        }

      

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //巡查上报
    onAdd: function (button, e) {
        var win = Ext.create('widget.unitAdd');
        this.getView().add(win);
        win.show();
    },
    //上报
    onAddOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/Company/AddConserbation',
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

    //编辑
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
        GetAjax({
            url: "/api/Company/GetConserbationModel?companyid=" + record.get('companyid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.unitEdit', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        tiele: '错误提示',
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    })
                }
            }
        })
    },
    onEditOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/Company/EditConserbation',
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
                GetAjax({
                    url: "api/Company/DeleteConserbation?companyid=" + record.get('companyid'),
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
                                msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！"
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