Ext.define('TianZun.controller.sys.UserType', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userType',

    requires: [
        'TianZun.view.sys.UserTypeAdd',
        'TianZun.view.sys.UserTypeEdit'
    ],

    onRender: function (obj, eOpts) {
        var me = this;
        var view = me.getView();

        var isAdd = false;
        var isEdit = false;
        var isDelete = false;

        $.each(configs.Permissions, function (key, item) {
            if (item.Code == "USER_TYPE_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "USER_TYPE_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "USER_TYPE_FUNCTION_DELETE")
                isDelete = true;
        })

        if (!isAdd) {
            view.down('[action=add]').hide();
        }
        if (!isEdit) {
            view.down('[action=edit]').hide();
        }
        if (!isDelete) {
            view.down('[action=delete]').hide();
        }

        var store = this.getView().getStore();
        store.clearFilter(true);
        store.reload();
    },

    onAdd: function (obj, e) {
        var grid = this.getView();

        var win = Ext.create('widget.userTypeAdd');
        this.getView().add(win);

        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView();
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();

        win.mask("正在处理中,请稍候.....");
        PostAjax({
            url: 'api/UserType/AddUserType',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                win.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                }
            }
        });
    },

    onItemDbClick: function (obj, record) {
        var me = this;
        var win = Ext.create('widget.userTypeEdit', { record: record });
        me.getView().add(win);

        win.show();
    },

    onEdit: function (obj, e) {
        var me = this;
        var grid = this.getView();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        var win = Ext.create('widget.userTypeEdit', { record: record });
        me.getView().add(win);

        win.show();
    },

    onEditOK: function (obj, e) {
        var grid = this.getView();
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();

        win.mask("正在处理中,请稍候.....");

        PostAjax({
            url: 'api/UserType/EditUserType',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                win.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                }
            }
        });
    },

    onDelete: function (obj, e) {
        var grid = this.getView();
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");

                PostAjax({
                    url: 'api/UserType/DeleteUserType?id=' + record.get('ID'),
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

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    }
});