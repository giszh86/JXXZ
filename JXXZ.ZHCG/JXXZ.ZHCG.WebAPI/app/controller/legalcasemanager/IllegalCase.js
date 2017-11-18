Ext.define('TianZun.controller.legalcasemanager.IllegalCase', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.illegalCase',

    requires: [
       'TianZun.view.legalcasemanager.casemanager.IllegalCaseQuery',
       'TianZun.view.legalcasemanager.casemanager.IllegalCaseLook',
        'TianZun.view.legalcasemanager.casemanager.IllegalCaseReview',
    ],




    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("illegalCaseQuery");

        if (!win) {
            win = Ext.create('widget.illegalCaseQuery');
            this.getView().add(win);
        }

        win.show();
    },
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var carnum = form.getForm().findField("car_num").getValue();
        var wtaddress = form.getForm().findField("wt_address").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        var cartype = form.getForm().findField("car_type").getValue();
        var cfjdsh = form.getForm().findField("cfjdsh").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(carnum) != null && $.trim(carnum) != "") {
            filters.push({ property: "carnum", value: $.trim(carnum) });
        }
        if ($.trim(wtaddress) != null && $.trim(wtaddress) != "") {
            filters.push({ property: "wtaddress", value: wtaddress });
        }


        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        if ($.trim(cartype) != null && $.trim(cartype) != "") {
            filters.push({ property: "cartype", value: cartype });
        }

        if ($.trim(cfjdsh) != null && $.trim(cfjdsh) != "") {
            filters.push({ property: "cfjdsh", value: cfjdsh });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
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
            url: "/api/Violated/GetcaseModel?wtid=" + record.get('wtid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.illegalCaseLook', { record: jsonstr, type: 1 });
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

    onDispatch: function (obj, e) {
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
            url: "/api/Violated/GetcaseModel?wtid=" + record.get('wtid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.illegalCaseReview', { record: jsonstr, type: 1 });
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

    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();

        form.submit({
            url: 'api/Violated/AddCaseSources',
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
        var panelName = panelTitle == '待办违停' ? 'todoPanel' : panelTitle == '已办违停' ? 'finishPanel' : 'allPanel';
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