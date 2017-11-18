Ext.define('TianZun.controller.sys.UnitType', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.unitType',

    requires: [
        'TianZun.view.sys.UnitTypeAdd',
        'TianZun.view.sys.UnitTypeEdit'
    ],

    onRender: function (obj, eOpts) {
        var me = this;
        var view = me.getView();

        var isAdd = false;
        var isEdit = false;
        var isDelete = false;

        $.each(configs.Permissions, function (key, item) {
            if (item.Code == "UNIT_TYPE_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "UNIT_TYPE_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "UNIT_TYPE_FUNCTION_DELETE")
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

        var win = Ext.create('widget.unitTypeAdd');
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

        grid.mask();    //马赛克
        PostAjax({
            url: 'api/UnitType/AddUnitType',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

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
        var win = Ext.create('widget.unitTypeEdit', { record: record });
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

        var win = Ext.create('widget.unitTypeEdit', { record: record });
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

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/UnitType/EditUnitType',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

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
                grid.mask();    //马赛克

                PostAjax({
                    url: 'api/UnitType/DeleteUnitType?id=' + record.get('ID'),
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