Ext.define('TianZun.controller.legalcasemanager.DucumentTemplet', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ducumentTemplet',

    requires: [
       'TianZun.view.legalcasemanager.functionconfig.DucumentTempletAdd',
       'TianZun.view.legalcasemanager.functionconfig.DucumentTempletQuery',
    ],


    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("ducumentTempletQuery");

        if (!win) {
            win = Ext.create('widget.ducumentTempletQuery');
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
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();

        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(ddname) != null && $.trim(ddname) != "") {
            filters.push({ property: "ddname", value: ddname });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        FilterStore(store, filters);

        win.hide();
    },

    //新增文书模版
    onAdd: function (button, e) {
        var win = Ext.create('widget.ducumentTempletAdd');
        this.getView().add(win);
        win.show();
    },

    //确定添加文书模版
    onAddOK: function (button, e) {
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();

        if (form.isValid()) {
            form.submit({
                url: '/api/DucumentTemplet/AddDocumentTemplet',
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

    //下载文书模板
    onDownload: function (obj) {
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
        var filepath = record.get('ddpath');
        var url =  '/DocumentTemplate/秀洲区行政处罚文书模版/' + record.get('ddpath');
        window.location.href = url;
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