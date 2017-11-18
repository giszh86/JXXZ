Ext.define('TianZun.controller.legalcasemanager.DocumentConfig', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.documentConfig',

    requires: [
       'TianZun.view.legalcasemanager.functionconfig.DocumentConfigQuery',
       'TianZun.view.legalcasemanager.functionconfig.DocumentConfigAdd',
       'TianZun.view.legalcasemanager.functionconfig.DocumentConfigEdit',
    ],


    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("documentConfigQuery");

        if (!win) {
            win = Ext.create('widget.documentConfigQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var ddname = form.getForm().findField("ddname").getValue();
        var wfdid = form.getForm().findField("wfdid").getValue();

        var filters = [];

        if ($.trim(ddname) != null && $.trim(ddname) != "") {
            filters.push({ property: "ddname", value: ddname });
        }

        if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
            filters.push({ property: "wfdid", value: wfdid });
        }

        FilterStore(store, filters);

        win.hide();
    },

    //新增文书配置
    onAdd: function (button, e) {
        var win = Ext.create('widget.documentConfigAdd');
        this.getView().add(win);
        win.show();
    },

    //确定文书配置
    onAddOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var viewRecord = this.getView();

        if (form.isValid()) {
            form.submit({
                url: '/api/DocumentConfig/AddWfdddrs',
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                }
            });
        }
    },

    //编辑文书配置
    onEdit: function (button, e) {
        var grid = this.getView().down('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.documentConfigEdit', { record: record });
        this.getView().add(win);
        win.show();
    },

    //修改文书配置
    onEditOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var viewRecord = this.getView();

        if (form.isValid()) {
            form.submit({
                url: '/api/DocumentConfig/ModifyWfdddrs',
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                }
            });
        }
    },

    //删除文书配置
    onDelete: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                var record = sm.getSelection()[0];
                var formData = new Object();
                formData['dwdid'] = record.get('dwdid');
                formData['ddid'] = record.get('ddid');
                formData['wfdid'] = record.get('wfdid');
                formData['isrequired'] = record.get('isrequired');
                formData['seq'] = record.get('seq');

                Ext.Msg.show({
                    title: '正在提交',
                    msg: '正在提交，请稍候...',
                });

                PostAjax({
                    url: "/api/DocumentConfig/DeleteWfdddrs",
                    data: formData,
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        if (textStatus == "success") {
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                        } else {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                            });
                        }
                    }
                });
            }
        })
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
        var grid = this.getView().down('gridpanel');
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