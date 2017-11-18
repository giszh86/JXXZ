Ext.define('TianZun.controller.qwmanager.SignArea', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.signArea',

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("signAreaQuery");

        if (!win) {
            win = Ext.create('TianZun.view.qwmanager.signarea.SignAreaQuery');
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

        FilterStore(store, filters);

        win.hide();
    },

    //新增签到区域
    onAdd: function (button, e) {
        var win = Ext.create('TianZun.view.qwmanager.signarea.SignAreaAdd');
        this.getView().add(win);
        win.show();
    },

    //确定签到区域
    onAddOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var viewRecord = this.getView();

        if (form.isValid()) {
            if (formData['start_stime'] > formData['start_etime']) {
                Ext.Msg.alert('提示', '签到开始时间不得晚于签到结束时间!');
                return;
            }
            if (formData['end_stime'] > formData['end_etime']) {
                Ext.Msg.alert('提示', '签退开始时间不得晚于签退结束时间!');
                return;
            }
            if (formData['start_etime'] > formData['end_stime']) {
                Ext.Msg.alert('提示', '签到结束时间不得晚于签退开始时间!');
                return;
            }

            form.submit({
                url: '/api/SignArea/AddSigninAreas',
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

        var win = Ext.create('TianZun.view.qwmanager.signarea.SignAreaEdit', { record: record });
        this.getView().add(win);
        win.show();
    },

    //编辑区域
    onEditOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var viewRecord = this.getView();

        if (form.isValid()) {
            if (formData['start_stime'] > formData['start_etime']) {
                Ext.Msg.alert('提示', '签到开始时间不得晚于签到结束时间!');
                return;
            }
            if (formData['end_stime'] > formData['end_etime']) {
                Ext.Msg.alert('提示', '签退开始时间不得晚于签退结束时间!');
                return;
            }
            if (formData['start_etime'] > formData['end_stime']) {
                Ext.Msg.alert('提示', '签到结束时间不得晚于签退开始时间!');
                return;
            }

            form.submit({
                url: '/api/SignArea/EditSigninAreas',
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

    //删除签到区域
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
                    url: "/api/SignArea/DeletePatrolAreas?signinareaid=" + record.get('signinareaid'),
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

        var win = Ext.create('TianZun.view.qwmanager.signarea.SignAreaDetail', { record: record });
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