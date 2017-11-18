Ext.define('TianZun.controller.sys.User', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user',

    requires: [
        'TianZun.view.sys.AddUser',
        'TianZun.view.sys.EditUser',
        'TianZun.view.sys.QueryUser'
    ],

    onTreeRender: function (tree) {
        var me = this;
        var view = me.getView();
        var store = Ext.create('TianZun.store.sys.UnitTreeStore');
        var gridStore = this.getView().child('gridpanel').getStore();

        //权限控制
        var isAdd = false;
        var isEdit = false;
        var isDelete = false;

        $.each(configs.Permissions, function (key, item) {
            if (item.Code == "USER_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "USER_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "USER_FUNCTION_DELETE")
                isDelete = true;
            if (item.Code == "USER_DATA_CURR_SUB") {
                store.getProxy().url = configs.WebApi + "api/Unit/GetCurrentTreeUnits?unitID=" + $.cookie("UNIT_ID");
            }
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
            var firstChild = tree.getRootNode().getChildAt(0);
            tree.getSelectionModel().select(firstChild)

            var filter = [{
                property: "UnitID", value: firstChild.get('ID')
            }];

            gridStore.clearFilter(true);
            gridStore.filter(filter);
        });

        tree.bindStore(store);
        store.load();
    },

    onTreeItemClick: function (tree, record) {
        var gridStore = this.getView().child('gridpanel').getStore();

        var filter = [{
            property: "UnitID", value: record.get('ID')
        }];

        gridStore.clearFilter(true);
        gridStore.filter(filter);
    },

    onGridItemDbClick: function (grid, record) {
        var me = this;

        GetAjax({
            url: 'api/SysRoles/GetRolesByUserID?userID=' + record.get('ID'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var rolesData = jQuery.parseJSON(jqXHR.responseText);

                    var roleIDArr = [];
                    if (rolesData.length > 0) {
                        for (var i = 0; i < rolesData.length; i++) {
                            roleIDArr[i] = rolesData[i]["ID"];
                        }
                    }
                    var win = Ext.create('widget.userEdit', { record: record, roleIDArr: roleIDArr });
                    me.getView().add(win);

                    win.show();
                }
            }
        });
    },

    onQuery: function (button, e) {

        var win = this.getView().child("userQuery");

        if (!win) {
            win = Ext.create('widget.userQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (button, e) {
        var win = button.up('window');
        var form = win.down('form');

        var code = form.getForm().findField("Code").getValue();
        var displayName = form.getForm().findField("DisplayName").getValue();
        var userTypeID = form.getForm().findField("UserTypeID").getValue();

        var filter = [];

        if ($.trim(code) != null && $.trim(code) != "") {
            filter.push({ property: "Code", value: $.trim(code) });
        }

        if ($.trim(displayName) != null && $.trim(displayName) != "") {
            filter.push({ property: "DisplayName", value: $.trim(displayName) });
        }

        if (typeof userTypeID == "number") {
            filter.push({ property: "UserTypeID", value: userTypeID });
        }

        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];

        //filter.push({ property: "UnitID", value: record.get('ID') });

        var gridStore = this.getView().child('gridpanel').getStore();
        gridStore.clearFilter(true);
        gridStore.filter(filter);

        win.hide();
    },

    onAdd: function (button, e) {
        var tree = this.getView().child('treepanel');

        var sm = tree.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一个单位");
            return;
        }

        var record = sm.getSelection()[0];

        var win = Ext.create('widget.userAdd', { record: record });
        this.getView().add(win);

        win.show();
    },

    onAddOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();
        var password = $.trim(formData['Password']);
        var newPassword = $.trim(formData['newPassword']);

        if (password != newPassword) {
            Ext.Msg.alert("提示", "两次输入密码不一致，请重新输入！");
            return;
        }

        formData["LoginPwd"] = password;
        //win.mask("正在处理中,请稍候.....");

        form.submit({
            url: 'api/User/AddUser',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                //win.unmask();

                //if (textStatus == "success") {
                //    var result = jqXHR.responseText;

                //    if (result == 1) {
                //        grid.getSelectionModel().clearSelections();
                //        store.reload();
                //        win.close();
                //        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                //    } else if (result == 2) {
                //        Ext.Msg.alert("提示", "用户名已存在！");
                //    }
                //} else {
                //    Ext.Msg.alert("提示", "操作失败！");
                //}
                if (action.result.success == 1) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                } else if (action.result.success == 2) {
                    Ext.Msg.alert("提示", "用户名已存在！");
                }

            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
            }
        });
    },

    onEdit: function (button, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var unitid = [];
        unitid[0] = record.get('UnitID');
        GetAjax({
            url: 'api/SysRoles/GetRolesByUserID?userID=' + record.get('ID'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var rolesData = jQuery.parseJSON(jqXHR.responseText);

                    var roleIDArr = [];
                    if (rolesData.length > 0) {
                        for (var i = 0; i < rolesData.length; i++) {
                            roleIDArr[i] = rolesData[i]["ID"];
                        }
                    }
                    var win = Ext.create('widget.userEdit', { record: record, roleIDArr: roleIDArr, unitid: unitid });
                    me.getView().add(win);

                    win.show();
                }
            }
        });
    },

    onEditOK: function (button, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = button.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();
        var password = $.trim(formData['Password']);
        var newPassword = $.trim(formData['newPassword']);
        var unitarr = '', rolearr = '';
        var unitid = form.getForm().findField("UnitName").getValue();
        var r = /^\+?[1-9][0-9]*$/;
        if (r.test(unitid)) {
            Ext.getCmp('UnitID').setValue(unitid);
        }
        Ext.Array.each(formData['RoleIDArr'], function (value, key) {
            rolearr += value + ',';
        })
        //formData['UnitID'] = unitarr.substr(0, unitarr.length - 1);
        formData['RoleIDArr'] = rolearr.substr(0, rolearr.length - 1);
        if ((password != null || password != "")) {
            if (password != newPassword) {
                Ext.Msg.alert("提示", "两次输入密码不一致，请重新输入！");
                return;
            }

            formData["LoginPwd"] = password;
        }
        //alert(formData['UnitID']);
        //return;
        form.submit({
            url: 'api/User/EditUser',
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                //win.unmask();

                //if (textStatus == "success") {
                //    var result = jqXHR.responseText;

                //    if (result == 1) {
                //        grid.getSelectionModel().clearSelections();
                //        store.reload();
                //        win.close();
                //        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                //    } else if (result == 2) {
                //        Ext.Msg.alert("提示", "用户名已存在！");
                //    }
                //} else {
                //    Ext.Msg.alert("提示", "操作失败！");
                //}
                if (action.result.success == 1) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                } else if (action.result.success == 2) {
                    Ext.Msg.alert("提示", "用户名已存在！");
                }

            },
            failure: function (form, action) {
                Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
            }
        });
    },

    onDelete: function (obj, e) {
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        if (Number(record.get('ID')) == Number($.cookie("USER_ID"))) {
            Ext.Msg.alert("提示", "不可删除自己！");
            return;
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");

                PostAjax({
                    url: 'api/User/DeleteUser?id=' + record.get('ID'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();

                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
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
        button.up('form').reset();
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];
        var filter = [{

        }];
        filter.push({ property: "UnitID", value: record.get('ID') });

        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    }
});