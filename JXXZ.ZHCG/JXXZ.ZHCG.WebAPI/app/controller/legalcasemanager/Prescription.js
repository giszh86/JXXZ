Ext.define('TianZun.controller.legalcasemanager.Prescription', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescription',

    requires: [
       'TianZun.view.legalcasemanager.functionconfig.PrescriptionAdd',
       'TianZun.view.legalcasemanager.functionconfig.PrescriptionEdit',


    ],
   

    onAdd: function (obj, e) {
        var win = Ext.create('widget.prescriptionAdd');
        this.getView().add(win);
        win.show();
    },
    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();

        form.submit({
            url: 'api/Prescription/AddPrescrip',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败,当前环节已存在！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
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
        var win = Ext.create('widget.prescriptionEdit', { record: record, type: 2 });
        this.getView().add(win);
        win.show();
    },
    onEditOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();

        form.submit({
            url: 'api/Prescription/EditPrescrip',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败,当前环节已存在！" }, setTimeout(function () { Ext.Msg.hide(); }, 2000));
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