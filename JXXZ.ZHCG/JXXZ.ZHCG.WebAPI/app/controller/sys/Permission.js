Ext.define('TianZun.controller.sys.Permission', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.permission',

    requires: [
        'TianZun.view.sys.PermissionAdd',
        'TianZun.view.sys.PermissionEdit',
        //'TianZun.view.um.PermissionQuery'
    ],

    onTreeRender: function (tree) {
        var me = this;
        var view = me.getView();
        var store = Ext.create('TianZun.store.sys.PermissionTreeStore');
        var gridStore = this.getView().child('gridpanel').getStore();

        //权限控制
        var isAdd = false;
        var isEdit = false;
        var isDelete = false;

        $.each(configs.Permissions, function (key, item) {
            if (item.Code == "PERMISSION_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "PERMISSION_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "PERMISSION_FUNCTION_DELETE")
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

        //初始化store
        store.on("load", function () {
            var filters = gridStore.getFilters();

            if (filters.length == 0) {
                var firstChild = tree.getRootNode().getChildAt(0);
                tree.getSelectionModel().select(firstChild)

                var filter = [{
                    property: "ParentCode", value: firstChild.get('Code')
                }];

                gridStore.clearFilter(true);
                gridStore.filter(filter);
            }
            else {
                var parentID = filters.get("ParentCode")._value;
                var child = tree.getRootNode().findChild("Code", parentID, true);
                tree.getSelectionModel().select(child);
            }
        });

        tree.bindStore(store);
        store.load();
    },

    onTreeItemClick: function (tree, record) {
        var gridStore = this.getView().child('gridpanel').getStore();

        var filter = [{
            property: "ParentCode", value: record.get('Code')
        }];

        gridStore.clearFilter(true);
        gridStore.filter(filter);
    },

    onGridItemDbClick: function (grid, record) {
        var win = Ext.create('widget.permissionEdit', { record: record });
        this.getView().add(win);

        win.show();
    },

    onAdd: function (obj, e) {
        var tree = this.getView().child('treepanel');

        var record = tree.getSelectionModel().getSelection()[0];

        var win = Ext.create('widget.permissionAdd', { record: record });
        this.getView().add(win);

        win.show();
    },

    onAddOK: function (obj, e) {
        var me = this;

        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/Permission/AddPermission',
            data: form.getValues(),
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();

                    var treeStore = me.getView().child('treepanel').getStore();
                    treeStore.reload();

                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.Msg.alert("提示", "操作失败！");
                }
            }
        });
    },

    onEdit: function (obj, e) {
        var grid = this.getView().child('gridpanel');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        var win = Ext.create('widget.permissionEdit', { record: record });
        this.getView().add(win);

        win.show();
    },

    onEditOK: function (obj, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/Permission/EditPermission',
            data: form.getValues(),
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();

                    var treeStore = me.getView().child('treepanel').getStore();
                    treeStore.reload();

                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.Msg.alert("提示", "操作失败！");
                }
            }
        });
    },

    onDelete: function (obj, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');
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
                    url: 'api/Permission/DeletePermission?code=' + record.get('Code'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();

                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();

                            var treeStore = me.getView().child('treepanel').getStore();
                            treeStore.reload();

                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else {
                            store.reload();
                            Ext.Msg.alert("提示", "操作失败！");
                        }
                    }
                });
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
    }
});