Ext.define('TianZun.controller.administrativeapproval.LicenseManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.licenseManager',

    requires: [
       'TianZun.view.administrativeapproval.license.LicenseAdd',
       'TianZun.view.administrativeapproval.license.LicenseDeal',
       'TianZun.view.administrativeapproval.license.LicenseDetail',
       'TianZun.view.administrativeapproval.license.LicenseQuery',
       'TianZun.view.administrativeapproval.license.LicenseEdit',
    ],

    //添加审批信息
    onAdd: function (obj, e) {
        var win = this.getView().child("licenseAdd");

        if (!win) {
            win = Ext.create('widget.licenseAdd');
            this.getView().add(win);
        }

        win.show();
    },

    //添加-提交
    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        if (new Date(formData['processtime_start'])< new Date()) {
            Ext.Msg.alert('提示', '处理时间不得早于当前时间!');
            return;
        }
        if (formData['processtime_start'] > formData['processtime_end']) {
            Ext.Msg.alert('提示', '可处理开始时间不得晚于结束时间!');
            return;
        }
        formData["ImgBase64s"] = win.GetTestValue();

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: "api/License/AddApproveInf",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
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
    },

    //处理
    onDeal: function (obj, e) {
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
        var win = Ext.create('widget.licenseDeal', { record: record });
        this.getView().add(win);
        win.show();
    },

    //处理-提交
    onDealOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
       
        form.submit({
            url: "api/License/AddDealAdvice",
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

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("licenseQuery");

        if (!win) {
            win = Ext.create('widget.licenseQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var xksx = form.getForm().findField("xksx").getValue();
        var sqr = form.getForm().findField("sqr").getValue();
        var splx = form.getForm().findField("splx").getValue();
        var sph = form.getForm().findField("sph").getValue();
        //var createtime = form.getForm().findField("createtime").getValue();
        var filters = [];

        if ($.trim(xksx) != null && $.trim(xksx) != "") {
            filters.push({ property: "xksx", value: $.trim(xksx) });
        }

        if ($.trim(sqr) != null && $.trim(sqr) != "") {
            filters.push({ property: "sqr", value: sqr });
        }


        if ($.trim(splx) != null && $.trim(splx) != "") {
            filters.push({ property: "splx", value: splx });
        }

        if ($.trim(sph) != null && $.trim(sph) != "") {
            filters.push({ property: "sph", value: sph });
        }
        //if ($.trim(createtime) != null && $.trim(createtime) != "") {
        //    filters.push({ property: "createtime", value: createtime });
        //}

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
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
            url: "/api/License/GetApprovalInfo?licensingid=" + record.get('licensingid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.licenseDetail', { record: jsonstr, type: 1 });
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
            url: "/api/License/GetApprovalInfo?licensingid=" + record.get('licensingid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.licenseEdit', { record: jsonstr, type: 1 });
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
        if (new Date(formData['processtime_start']) < new Date()) {
            Ext.Msg.alert('提示', '处理时间不得晚于当前时间!');
            return;
        }
        if (formData['processtime_start'] > formData['processtime_end']) {
            Ext.Msg.alert('提示', '可处理开始时间不得晚于结束时间!');
            return;
        }
        form.submit({
            url: "api/License/ModifyApproveInf",
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

    //清空
    onEmpty: function (button) {
        var panelTitle = this.getView().down('tabpanel').activeTab.title;
        var panelName = panelTitle == '待审批' ? 'todoApprove' : panelTitle == '已审批' ? 'finishApprove' : 'allApprove';
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

    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    }
});