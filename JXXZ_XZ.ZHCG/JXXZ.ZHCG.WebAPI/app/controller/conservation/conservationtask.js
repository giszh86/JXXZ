Ext.define('TianZun.controller.conservation.conservationtask', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.conservationtask',
    requires: [
        'TianZun.view.conservation.conservationtask.TaskAdd',
        'TianZun.view.conservation.conservationtask.TaskInfo',
        'TianZun.view.conservation.conservationtask.TaskQuery',
        'TianZun.view.conservation.conservationtask.TaskDealWith',
        'TianZun.view.conservation.conservationtask.TaskReview',
        'TianZun.view.conservation.conservationtask.TaskSend',
    ],
    //巡查上报
    onAddyh: function (button, e) {
        var win = Ext.create('widget.taskAdd');
        this.getView().add(win);
        win.show();
    },

    onAddOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        //formData['foundtime'] = formData['foundtime1'] + ' ' + formData['foundtime2'];
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/YhTask/AddYhTask',
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

    //查询
    onQueryyh: function (obj, e) {
        var win = this.getView().child("TaskQuery");
        if (!win) {
            win = Ext.create('widget.taskQuery');
            this.getView().add(win);
        }
        win.show();
    },
    //查询成功
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        //var wfdname = form.getForm().findField("wfdname").getValue();
        var yhcompany = form.getForm().findField("companyname").getValue();
        var yhcontract = form.getForm().findField("contractname").getValue();
        var wtsource = form.getForm().findField("wtlyname").getValue();
        var wtaddress = form.getForm().findField("wtaddress").getValue();

        var filters = [];
        //if ($.trim(wfdname) != null && $.trim(wfdname) != "") {
        //    filters.push({ property: "wfdname", value: $.trim(wfdname) });
        //}
        if ($.trim(yhcompany) != null && $.trim(yhcompany) != "") {
            filters.push({ property: "yhcompany", value: $.trim(yhcompany) });
        }
        if ($.trim(yhcontract) != null && $.trim(yhcontract) != "") {
            filters.push({ property: "yhcontract", value: $.trim(yhcontract) });
        }
        if ($.trim(wtsource) != null && $.trim(wtsource) != "") {
            filters.push({ property: "wtsource", value: $.trim(wtsource) });
        }
        if ($.trim(wtaddress) != null && $.trim(wtaddress) != "") {
            filters.push({ property: "wtaddress", value: $.trim(wtaddress) });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //查看
    onLook: function (obj, e) {
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
            url: "/api/YhTask/GetYHTaskModel?wfsid=" + record.get('wfsid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var js = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.taskInfo', { record: js });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: '错误提示',
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    })
                }
            }
        })
    },
    onDealWith: function (obj, e) {
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
            url: "/api/YhTask/GetYHTaskModel?wfsid=" + record.get('wfsid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var js = JSON.parse(jqXHR.responseText);
                    if (record.get('wfdid') == "2017040610570002")
                        var win = Ext.create('widget.taskSend', { record: js });
                    else if (record.get('wfdid') == "2017040610570003")
                        var win = Ext.create('widget.taskDealWith', { record: js });
                    else if (record.get('wfdid') == "2017040610570004")
                        var win = Ext.create('widget.taskReview', { record: js });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: '错误提示',
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    })
                }
            }
        })
    },

    //派遣
    onSendOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        formData['nextwfdid'] = "2017040610570003";
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/YhTask/YHTaskFlowLink',
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
    //处理
    onDealWithOk: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        formData['nextwfdid'] = formData['zptype'];
        if (!form.isValid()) {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/YhTask/YHTaskFlowLink',
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

    onReviewOk: function (obj, e) {

       
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();

        if (formData['zptype'] == "gd") {
            formData['nextwfdid'] = "2017040610570005";
            formData['nextwfuserids'] = "";
        } else if (formData['zptype'] == "ht") {
            formData['nextwfdid'] = "2017040610570003";
            formData['nextwfuserids'] = "0";
        } else if (formData['zptype'] == "cxpq") {
            formData['nextwfdid'] = "2017040610570003";
            formData['nextwfuserids'] = formData['nextuserid'];
        }
       
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/YhTask/YHTaskFlowLink',
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

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.close();
    },

    onEmpty: function (button) {
        var panelTitle = this.getView().down('tabpanel').activeTab.title;
        var panelName = panelTitle == '待办养护任务' ? 'todoPanel' : panelTitle == '已办养护任务' ? 'finishPanel' : 'allPanel';
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

})