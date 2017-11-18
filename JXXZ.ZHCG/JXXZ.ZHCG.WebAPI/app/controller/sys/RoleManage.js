Ext.define('TianZun.controller.sys.RoleManage', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleManage',

    requires: [
        'TianZun.view.sys.RoleAdd',
        'TianZun.view.sys.RoleEdit',
        'TianZun.view.sys.RoleQuery'
    ],

    onRender: function (obj, eOpts) {
        var me = this;
        var view = me.getView();

        var isAdd = false;
        var isEdit = false;
        var isDelete = false;

        $.each(configs.Permissions, function (key, item) {
            if (item.Code == "ROLE_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "ROLE_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "ROLE_FUNCTION_DELETE")
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

    onQuery: function (obj, e) {
        var win = this.getView().child("roleQuery");

        if (!win) {
            win = Ext.create('widget.roleQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');

        var name = form.getForm().findField("Name").getValue();
        var isSystem = form.getForm().findField("IsSystem").getValue();

        var filter = [];

        if ($.trim(name) != null && $.trim(name) != "") {
            filter.push({ property: "Name", value: $.trim(name) });
        }

        if (typeof isSystem == "number") {
            filter.push({ property: "IsSystem", value: isSystem });
        }

        var store = this.getView().getStore();
        store.clearFilter(true);
        store.filter(filter);

        win.hide();
    },

    onAdd: function (obj, e) {
        var grid = this.getView();

        var win = Ext.create('widget.roleAdd');
        this.getView().add(win);

        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView();
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');
        win.mask();
        form.mask();

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();
        formData['PermissionCodeArr'] = form.getForm().findField("PermissionCodeArr").getValue();
        grid.mask();    //马赛克
        PostAjax({
            url: 'api/SysRoles/AddRole',
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

        GetAjax({
            url: 'api/Permission/GetPermissionsByRoleID?roleID=' + record.get('ID'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var permissionsData = jQuery.parseJSON(jqXHR.responseText);

                    var permissionCodeArr = [];
                    if (permissionsData.length > 0) {
                        for (var i = 0; i < permissionsData.length; i++) {
                            permissionCodeArr[i] = permissionsData[i]["Code"];
                        }
                    }

                    var win = Ext.create('widget.roleEdit', { record: record, permissionCodeArr: permissionCodeArr });
                    me.getView().add(win);

                    win.show();
                }
            }
        });
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

        GetAjax({
            url: 'api/Permission/GetPermissionsByRoleID?roleID=' + record.get('ID'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var permissionsData = jQuery.parseJSON(jqXHR.responseText);

                    var permissionCodeArr = [];
                    if (permissionsData.length > 0) {
                        for (var i = 0; i < permissionsData.length; i++) {
                            permissionCodeArr[i] = permissionsData[i]["Code"];
                        }
                    }

                    var win = Ext.create('widget.roleEdit', { record: record, permissionCodeArr: permissionCodeArr });
                    me.getView().add(win);

                    win.show();
                }
            }
        });
    },

    onEditOK: function (obj, e) {
        var grid = this.getView();
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');
        win.mask();
        form.mask();

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();
        formData['PermissionCodeArr'] = form.getForm().findField("PermissionCodeArr").getValue();

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/SysRoles/EditRole',
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

        if (record.get('IsSystem') == 1) {
            Ext.Msg.alert("提示", "不可删除系统内置角色！");
            return;
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask();    //马赛克

                PostAjax({
                    url: 'api/SysRoles/DeleteRole?id=' + record.get('ID'),
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
    },

    onHide: function (button) {
        button.up('form').reset();
        var store = this.getView().getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    }
});