Ext.define('TianZun.controller.conservation.conservationlog', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.conservationlog',
    requires: [
        'TianZun.view.conservation.conservationlog.LogAdd',
        'TianZun.view.conservation.conservationlog.LogInfo',
        'TianZun.view.conservation.conservationlog.LogQuery',
    ],

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("logQuery");
        if (!win) {
            win = Ext.create('widget.logQuery');
            this.getView().add(win);
        }
        win.show();
    },
    //查询提交
    onQueryOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var yhcontract = form.getForm().findField("yhcontract").getValue();
        var createtimefrom = form.getForm().findField("createtimefrom").getValue();
        var createtimeto = form.getForm().findField("createtimeto").getValue();
        
        var filters = [];

        if ($.trim(yhcontract) != null && $.trim(yhcontract) != "")
        {
            filters.push({ property: "yhcontract", value: $.trim(yhcontract) });
        }

        if ($.trim(createtimefrom) != null && $.trim(createtimefrom) != "")
        {
            filters.push({ property: "createtimefrom", value: createtimefrom });
        }
        if ($.trim(createtimeto) != null && $.trim(createtimeto) != "")
        {
            filters.push({ property: "createtimeto", value: createtimeto });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    //查看详情
    onDetail: function (obj, e) {
        var grid = obj.up('grid');
        var me = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2)
        {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/YhLog/GetYhLogModel?yhlogid=" + record.get('yhlogid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.logInfo', { record: jsonstr, type: 1 });
                    me.getView().add(win);
                    win.show();
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //巡查上报
    onAdd: function (button, e) {
        var win = Ext.create('widget.logAdd');
        this.getView().add(win);
        win.show();
    },

    //添加-提交
    onAddOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        if (!form.isValid())
        {
            return;
        }
        form.submit({
            url: "api/YhLog/AddLog",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action) {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //清空
    onEmpty: function (button)
    {  
        button.up('form').reset();
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var store = grid.getStore();
        var filter = [{}];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
});