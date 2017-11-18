Ext.define('TianZun.controller.lawenforcementsupervision.CarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.carController',

    requires: [
       'TianZun.view.lawenforcementsupervision.basicinformation.CarAdd',
       'TianZun.view.lawenforcementsupervision.basicinformation.CarQuery',
       'TianZun.view.lawenforcementsupervision.basicinformation.CarEdit',
        'TianZun.view.lawenforcementsupervision.basicinformation.CarInfo',

    ],
    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("carQuery");

        if (!win) {
            win = Ext.create('widget.carQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var code = form.getForm().findField("code").getValue();
        var carnumber = form.getForm().findField("carnumber").getValue();
        var cartypeid = form.getForm().findField("cartypeid").getValue();
        var unitid = form.getForm().findField("unitid").getValue();
        var ssbc = form.getForm().findField("ssbc").getValue();

        var filters = [];

        if ($.trim(code) != null && $.trim(code) != "") {
            filters.push({ property: "code", value: $.trim(code) });
        }

        if ($.trim(carnumber) != null && $.trim(carnumber) != "") {
            filters.push({ property: "carnumber", value: carnumber });
        }


        if ($.trim(cartypeid) != null && $.trim(cartypeid) != "") {
            filters.push({ property: "cartypeid", value: cartypeid });
        }

        if ($.trim(unitid) != null && $.trim(unitid) != "") {
            filters.push({ property: "unitid", value: unitid });
        }

        if ($.trim(ssbc) != null && $.trim(ssbc) != "") {
            filters.push({ property: "ssbc", value: ssbc });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },



    onAdd: function (obj, e) {
        var win = Ext.create('widget.carAdd');
        this.getView().add(win);
        win.show();
    },
    onAddVisitOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        form.submit({
            url: 'api/Car/AddCar',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));

            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "车牌号或车辆编号相同,操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
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
            url: "/api/Car/GetCarInfo?carid=" + record.get('carid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.carEdit', { record: jsonstr, type: 1 });
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
            url: 'api/Car/EditCar',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "车牌号或车辆编号相同,操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
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
                    url: "/api/Car/DeleteCar?carid=" + record.get('carid'),
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
            url: "/api/Car/GetCarInfo?carid=" + record.get('carid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.carInfo', { record: jsonstr, type: 1 });
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
        win.close();
    },

    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=visitTab]').child('gridpanel');
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