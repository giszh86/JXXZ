Ext.define('TianZun.controller.accountmanager.AccountImage', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accountImage',

    requires: [
       'TianZun.view.accountmanager.accounttask.AccountTaskAdd',
       'TianZun.view.accountmanager.accounttask.AccountTaskEdit',
       'TianZun.view.accountmanager.accounttask.AccountTaskLook',
       'TianZun.view.accountmanager.accounttask.AccountTaskQuery'
    ],
    onFileItemDbClick: function (grid, record) {
        var imageWindow = new Ext.Window({
            layout: 'fit',
            items: [{
                xtype: 'image',
                src: '/GetPictureFile.ashx?PicPath=' + configs.CitizenServiceOriginalPath + record.get('filepath'),
                style: 'margin: 4; cursor: pointer;width:600px;height:600px; min-width:300px;min-height:300px;max-width: 800px; max-height: 600px',
            }]
        });
        imageWindow.show();
    },
    onCancel: function (grid, record) {
        var grid = this.getView().down('imageMonthList');
        grid.destroy();
        var gridtop = this.getView().down('panel[name=visitTab]').down("grid");
        var store = gridtop.getStore();
        store.reload();
        gridtop.show();
    },
    onFileCancel: function (grid, record) {
        var grid = this.getView().down('imageFileList');
        grid.destroy();
        var panel = this.getView().down('imageMonthList');
        var gridtop = panel.down("grid");
        var store = gridtop.getStore();
        store.reload();
        panel.show();
    },
    onMonthItemDbClick: function (grid, record) {
        var gridtop = this.getView().down('imageMonthList');
        gridtop.hide();
        var win = Ext.create('TianZun.view.accountmanager.accountimage.ImageFileList', { record: record });
        this.getView().down('panel[name=visitTab]').add(win);
        win.show();

    },
    onGridItemDbClick: function (grid, record) {
        var grid = this.getView().down('panel[name=visitTab]').down("grid");

        grid.hide();

        var win = Ext.create('TianZun.view.accountmanager.accountimage.ImageMonthList', { record: record });
        this.getView().down('panel[name=visitTab]').add(win);
        win.show();
        // var sm = grid.getSelectionModel();

        //var record = sm.getSelection()[0];


        // var win = Ext.create('widget.newsDeail', { record: record });
        //  this.getView().add(win);
        //win.show();
    },

    onLook: function (button, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        GetAjax({
            url: 'api/AccountTask/GetTaskClassByTaskID?TaskID=' + record.get('taskid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var typeData = jQuery.parseJSON(jqXHR.responseText);
                    var TypeArr = [];
                    $.each(typeData, function (i, item) {
                        TypeArr.push(item["classid"]);
                    });

                    var win = Ext.create('widget.accountTaskLook', { record: record, TypeArr: TypeArr });
                    me.getView().add(win);

                    win.show();
                }
            }
        });
    },

    onAdd: function (button, e) {
        var win = Ext.create('widget.accountTaskAdd');
        this.getView().add(win);
        win.show();
    },
    onAddTaskOK: function (button, e) {

        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('panel[name=visitTab]').child('grid');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        var formData = form.getValues();

        var starttime = formData['starttime'] + ' ' + formData['starttime1'];
        var endtime = formData['endtime'] + ' ' + formData['endtime1'];
        formData["starttime"] = starttime;
        formData["endtime"] = endtime;

        PostAjax({
            url: 'api/AccountTask/AddAccountTask',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    // win.unmask();
                    Ext.Msg.show(
                    {
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },
    onEdit: function (button, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        GetAjax({
            url: 'api/AccountTask/GetTaskClassByTaskID?TaskID=' + record.get('taskid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var typeData = jQuery.parseJSON(jqXHR.responseText);
                    var TypeArr = [];
                    $.each(typeData, function (i, item) {
                        TypeArr.push(item["classid"]);
                    });
                    var win = Ext.create('widget.accountTaskEdit', { record: record, TypeArr: TypeArr });
                    me.getView().add(win);
                    win.show();
                }
            }
        });
    },
    onEditTaskOK: function (button, e) {

        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('panel[name=visitTab]').child('grid');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        var formData = form.getValues();
        var starttime = formData['starttime'] + ' ' + formData['starttime1'];
        var endtime = formData['endtime'] + ' ' + formData['endtime1'];
        formData["starttime"] = starttime;
        formData["endtime"] = endtime;

        PostAjax({
            url: 'api/AccountTask/EditAccountTask',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                    win.close();

                } else {
                    // win.unmask();
                    Ext.Msg.show(
                    {
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },
    onQuery: function (obj, e) {
        var win = this.getView().child("AccountTaskQuery");
        if (!win) {
            win = Ext.create('widget.accountTaskQuery');
            this.getView().add(win);
        }
        win.show();
    },
    ontaskQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('panel[name=visitTab]').child('grid').getStore();

        var taskname = form.getForm().findField("taskname").getValue();
        var taskyear = form.getForm().findField("taskyear").getValue();
        var tz_type = form.getForm().findField("tz_type").getValue();
        var starttime = form.getForm().findField("starttime").getValue();

        var filters = [];

        if ($.trim(taskname) != null && $.trim(taskname) != "") {
            filters.push({ property: "taskname", value: $.trim(taskname) });
        }
        if ($.trim(taskyear) != null && $.trim(taskyear) != "") {
            filters.push({ property: "taskyear", value: $.trim(taskyear) });
        }
        if ($.trim(starttime) != null && $.trim(starttime) != "") {
            filters.push({ property: "starttime", value: starttime });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();

    }
});