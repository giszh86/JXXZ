Ext.define('TianZun.controller.lowlyingmanager.LowlyingTask', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lowlyingTask',

    requires: [
       'TianZun.view.lowlying.lowlyingmanagement.LowlyingEdit',
       'TianZun.view.lowlying.lowlyingmanagement.LowlyingLook',
       'TianZun.view.lowlying.lowlyingmanagement.LowlyingQuery',
    ],

    //详情
    onDetail: function (obj, record) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/LowLying/GetLowLyingModel?id=" + record.get('id'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.lowlyingLook', { record: record });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });

    },

    onAddOK: function (obj, record) {

        var grid = this.getView().down('tabpanel').getActiveTab().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        var formData = form.getValues();

        if (!form.isValid()) {
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        GetAjax({
            url: "/api/LowLying/EditLowLying?id=" + formData['id'] + "&bjljz=" + formData['bjljz'],
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    onEdit: function (obj, record) {
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
        var win = Ext.create('widget.lowlyingEdit', { record: record });
        this.getView().add(win);
        win.show();
    },

    onQuery: function (obj, e) {
        var win = this.getView().child("lowlyingQuery");

        if (!win) {
            win = Ext.create('widget.lowlyingQuery');
            this.getView().add(win);
        }

        win.show();
    },

    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var win = button.up('window');
    },

    onHide: function (button) {
        var win = button.up('window');
        win.hide();
    }

});