Ext.define('TianZun.controller.uav.BasicinFormAtion', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicinFormAtion',
    requires: [
        'TianZun.view.uav.basicinformation.InformationAdd',
        'TianZun.view.uav.basicinformation.InformationQuery',
        'TianZun.view.uav.basicinformation.InformationEdit',
        'TianZun.view.uav.basicinformation.InformationDetail',
    ],
    //查询
    onQuery: function (obj, e)
    {
        var win = this.getView().child("informationQuery");
        if (!win)
        {
            win = Ext.create('widget.informationQuery');
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

        var ovanum = form.getForm().findField("ovanum").getValue();
        var ovaname = form.getForm().findField("ovaname").getValue();

        var filters = [];

        if ($.trim(ovanum) != null && $.trim(ovanum) != "")
        {
            filters.push({ property: "ovanum", value: $.trim(ovanum) });
        }
        if ($.trim(ovaname) != null && $.trim(ovaname) != "")
        {
            filters.push({ property: "ovaname", value: $.trim(ovaname) });
        }
       
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //新增
    onAdd: function (obj, e)
    {
        var win = Ext.create('widget.informationAdd');
        this.getView().add(win);
        win.show();
    },

    //添加-提交
    onAddOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        if (!form.isValid())
        {
            return;
        }
        form.submit({
            url: "api/basicinfo/AddApproveInf",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action)
            {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action)
            {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //删除
    onDelete: function (obj, e)
    {
        var grid = obj.up('grid');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn)
        {
            if (btn == "yes")
            {
                grid.mask();    //马赛克
                //判断是否可以删除
                PostAjax({
                    url: "/api/basicinfo/DeleteBasicInfo?ovaid=" + record.get('ovaid'),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
                        grid.unmask();
                        if (textStatus == "success")
                        {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else
                        {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        }
                    }
                });
            }
        });
    },

    //查看
    onDetail: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } 
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/basicinfo/GetBasicInfo?ovaid=" + record.get('ovaid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.informationDetail', { record: jsonstr, type: 1 });
                    asdf.getView().add(win);
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

    //编辑
    onEdit: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } 
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/basicinfo/GetBasicInfo?ovaid=" + record.get('ovaid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.informationEdit', { record: jsonstr, type: 1 });
                    asdf.getView().add(win);
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

    onEditOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        if (!form.isValid())
        {
            return;
        }
        form.submit({
            url: "api/basicinfo/EditBasicInfo",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action)
            {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action)
            {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //取消
    onClose: function (obj)
    {
        var win = obj.up('window');
        win.hide();
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
})