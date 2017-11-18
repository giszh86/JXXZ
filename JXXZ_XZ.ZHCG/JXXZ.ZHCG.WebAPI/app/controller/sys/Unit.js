Ext.define('TianZun.controller.sys.Unit', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.unit',

    requires: [
        'TianZun.view.sys.UnitAdd',
        'TianZun.view.sys.UnitEdit',
        'TianZun.view.sys.UnitQuery'
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
            if (item.Code == "UNIT_FUNCTION_ADD")
                isAdd = true;
            if (item.Code == "UNIT_FUNCTION_EDIT")
                isEdit = true;
            if (item.Code == "UNIT_FUNCTION_DELETE")
                isDelete = true;
            if (item.Code == "UNIT_DATA_CURR_SUB") {
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
            var filters = gridStore.getFilters();

            if (filters.length == 0) {
                var firstChild = tree.getRootNode().getChildAt(0);
                tree.getSelectionModel().select(firstChild)

                var filter = [{
                    property: "ParentID", value: firstChild.get('ID')
                }];

                gridStore.clearFilter(true);
                gridStore.filter(filter);
            }
            else {
                var parentID = filters.get("ParentID")._value;
                var child = tree.getRootNode().findChild("ID", parentID, true);
                tree.getSelectionModel().select(child);
            }
        });

        tree.bindStore(store);
        store.load();
    },

    onTreeItemClick: function (tree, record) {
        var gridStore = this.getView().child('gridpanel').getStore();

        var filter = [{
            property: "ParentID", value: record.get('ID')
        }];

        gridStore.clearFilter(true);
        gridStore.filter(filter);
    },

    onGridItemDbClick: function (grid, record) {
        var win = Ext.create('widget.unitEdit', { record: record });
        this.getView().add(win);

        win.show();
    },

    onQuery: function (obj, e) {
        var win = this.getView().child("unitQuery");

        if (!win) {
            win = Ext.create('widget.unitQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onQueryOK: function (button, e) {
        var win = button.up('window');
        var form = win.down('form');

        var code = form.getForm().findField("Code").getValue();
        var name = form.getForm().findField("Name").getValue();
        var unitTypeID = form.getForm().findField("UnitTypeID").getValue();

        var filter = [];

        if ($.trim(code) != null && $.trim(code) != "") {
            filter.push({ property: "Code", value: $.trim(code) });
        }

        if ($.trim(name) != null && $.trim(name) != "") {
            filter.push({ property: "Name", value: $.trim(name) });
        }

        if (typeof unitTypeID == "number") {
            filter.push({ property: "UnitTypeID", value: unitTypeID });
        }

        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];

        filter.push({ property: "ParentID", value: record.get('ID') });

        var gridStore = this.getView().child('gridpanel').getStore();
        gridStore.clearFilter(true);
        gridStore.filter(filter);

        win.hide();
    },

    onAdd: function (obj, e) {
        var tree = this.getView().child('treepanel');

        var record = tree.getSelectionModel().getSelection()[0];

        var win = Ext.create('widget.unitAdd', { record: record });
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
            url: 'api/Unit/AddUnit',
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

        var win = Ext.create('widget.unitEdit', { record: record });
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
            url: 'api/Unit/EditUnit',
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
                    url: 'api/Unit/DeleteUnit?id=' + record.get('ID'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();

                        if (textStatus == "success") {

                            var result = jqXHR.responseText;

                            if (result == 1) {
                                grid.getSelectionModel().clearSelections();
                                store.reload();

                                var treeStore = me.getView().child('treepanel').getStore();
                                treeStore.reload();

                                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                            } else if (result == 2) {
                                Ext.Msg.alert("提示", "该单位存在下级单位，不可删除！");
                            } else if (result == 3) {
                                Ext.Msg.alert("提示", "该单位存在用户，不可以删除！");
                            }
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
        filter.push({ property: "ParentID", value: record.get('ID') });

        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    }
});