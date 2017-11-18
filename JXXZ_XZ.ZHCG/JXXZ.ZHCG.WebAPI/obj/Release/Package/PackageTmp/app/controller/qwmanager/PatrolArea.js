Ext.define('TianZun.controller.qwmanager.PatrolArea', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.patrolArea',

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("patrolAreaQuery");

        if (!win) {
            win = Ext.create('TianZun.view.qwmanager.patrolarea.PatrolAreaQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var sszd = form.getForm().findField("sszd").getValue();
        var ssbc = form.getForm().findField("ssbc").getValue();
        var name = form.getForm().findField("name").getValue();
        var areatype = form.getForm().findField("areatype").getValue();

        var filters = [];

        if (typeof sszd == "number") {
            filters.push({ property: "sszd", value: sszd });
        }

        if (typeof ssbc == "number") {
            filters.push({ property: "ssbc", value: ssbc });
        }

        if ($.trim(name) != null && $.trim(name) != "") {
            filters.push({ property: "name", value: name });
        }

        if (typeof areatype == "number") {
            filters.push({ property: "areatype", value: areatype });
        }

        FilterStore(store, filters);

        win.hide();
    },

    //新增巡查区域
    onAdd: function (button, e) {
        var win = Ext.create('TianZun.view.qwmanager.patrolarea.PatrolAreaAdd');
        this.getView().add(win);
        win.show();
    },

    //确定巡查区域
    onAddOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();

        if (form.isValid()) {
            form.submit({
                url: '/api/PatrolArea/AddPatrolAreas',
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

    //编辑
    onEdit: function (obj, e) {
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

        var win = Ext.create('TianZun.view.qwmanager.patrolarea.PatrolAreaEdit', { record: record });
        this.getView().add(win);
        win.show();
    },

    //巡查区域编辑
    onEditOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();

        if (form.isValid()) {
            form.submit({
                url: '/api/PatrolArea/EditPatrolAreas',
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

    //删除巡查区域
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

                Ext.Msg.show({
                    title: '正在提交',
                    msg: '正在提交，请稍候...',
                });

                GetAjax({
                    url: "/api/PatrolArea/DeletePatrolAreas?patrolid="+record.get('patrolid'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        var result = JSON.parse(jqXHR.responseText);
                        if (result.success == true) {
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                        } else {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：数据已有关联的数据,无法删除"
                            }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        }
                    }
                });
            }
        })
    },

    //查看详情
    onDetail: function (obj, e) {
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

        var win = Ext.create('TianZun.view.qwmanager.patrolarea.PatrolAreaDetail', { record: record });
        this.getView().add(win);
        win.show();
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