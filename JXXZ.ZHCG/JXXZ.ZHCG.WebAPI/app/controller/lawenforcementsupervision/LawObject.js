Ext.define('TianZun.controller.lawenforcementsupervision.LawObject', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lawObject',
    requires: [
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectAddStore',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectEditStore',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectInfoStore',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectQueryStore',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectAddHawkers',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectEditHawkers',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectInfoHawkers',
        'TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectQueryHawkers'
    ],

    //新增沿街店家
    onAdddj: function (obj, e)
    {
        var win = this.getView().child("widget.lawObjectAddStore");
        if (!win)
        {
            win = Ext.create('widget.lawObjectAddStore');
            this.getView().add(win);
        }
        win.show();
    },
    //新增沿街店家提交
    onsubmitdj: function (obj, e)
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
            url: "api/LawObject/AddStreetShop",
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

    //编辑店家信息
    onEditdj: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
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
            url: "/api/LawObject/GetStreetShopsInf?zfdx_shopid=" + record.get('zfdx_shopid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {

                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectEditStore', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },
    //编辑店家信息提交
    onEditOKdj: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');

        form.submit({
            url: "api/LawObject/ModifyStreetShopInf",
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

    //店家详情
    onLookdj: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
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
            url: "/api/LawObject/GetStreetShopsInf?zfdx_shopid=" + record.get('zfdx_shopid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('TianZun.view.lawenforcementsupervision.lawenforcementobject.LawObjectInfoStore', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },
    //店家查询
    onQuerydj: function (obj, e)
    {
        var win = this.getView().child("lawObjectQueryStore");
        if (!win)
        {
            win = Ext.create('widget.lawObjectQueryStore');
            this.getView().add(win);
        }
        win.show();
    },
    //店家删除
    onDeltedj: function (obj, e)
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
                PostAjax({
                    url: "/api/LawObject/DeleteStreetShopsInf?zfdx_shopid=" + record.get('zfdx_shopid'),
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
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },
    //店家加入黑名单
    onblacklistdj: function (obj, e)
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

        Ext.Msg.confirm("提示", "您确定要将其设为黑名单吗？", function (btn)
        {
            if (btn == "yes")
            {
                grid.mask();    //马赛克
                PostAjax({
                    url: "/api/LawObject/AddStoreInBlackList?zfdx_shopid=" + record.get('zfdx_shopid'),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
                        grid.unmask();
                        if (textStatus == "success")
                        {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        }
                        else
                        {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },
    //查询提交
    onQuerydjOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var shopname = form.getForm().findField("shopname").getValue();
        var person = form.getForm().findField("person").getValue();
        var address = form.getForm().findField("address").getValue();
        var filters = [];

        if ($.trim(shopname) != null && $.trim(shopname) != "")
        {
            filters.push({ property: "shopname", value: $.trim(shopname) });
        }

        if ($.trim(person) != null && $.trim(person) != "")
        {
            filters.push({ property: "person", value: person });
        }


        if ($.trim(address) != null && $.trim(address) != "")
        {
            filters.push({ property: "address", value: address });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //解除黑名单
    onRemoveBlackList: function (obj, e)
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

        Ext.Msg.confirm("提示", "您确定要将其解除黑名单吗？", function (btn)
        {
            if (btn == "yes")
            {
                grid.mask();    //马赛克
                PostAjax({
                    url: "/api/LawObject/RemoveStoreInBlackList?zfdx_shopid=" + record.get('zfdx_shopid'),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
                        grid.unmask();
                        if (textStatus == "success")
                        {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        }
                        else
                        {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },

    //新增小摊小贩
    onAddxf: function (obj, e)
    {
        var win = this.getView().child("widget.lawObjectAddHawkers");
        if (!win)
        {
            win = Ext.create('widget.lawObjectAddHawkers');
            this.getView().add(win);
        }
        win.show();
    },
    //新增小摊小贩提交
    onsubmitxf: function (obj, e)
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
            url: "api/LawObject/AddHawker",
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
    //编辑小摊小贩信息
    onEditxf: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
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
            url: "/api/LawObject/GetHawkerInf?zfdx_shopid=" + record.get('zfdx_shopid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var js = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.lawObjectEditHawkers', { record: js });
                    asdf.getView().add(win);
                    win.show();
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },
    //编辑小摊小贩信息提交
    onSubmitxf: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');

        form.submit({
            url: "api/LawObject/Editxf",
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
    //查看小摊小贩信息
    onLookxf: function (obj, e)
    {
        var grid = obj.up('grid');
        var asdf = this;
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
            url: "/api/LawObject/GetHawkerInf?zfdx_shopid=" + record.get('zfdx_shopid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {

                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.lawObjectInfoHawkers', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },
    //查询小摊小贩
    onQueryxf: function (obj, e)
    {
        var win = this.getView().child("lawObjectQueryHawkers");
        if (!win)
        {
            win = Ext.create('widget.lawObjectQueryHawkers');
            this.getView().add(win);
        }
        win.show();
    },
    //查询提交
    onQueryxfOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var person = form.getForm().findField("person").getValue();
        var hawkertype = form.getForm().findField("hawkertype").getValue();
        var contactphone = form.getForm().findField("contactphone").getValue();
        var filters = [];

        if ($.trim(person) != null && $.trim(person) != "")
        {
            filters.push({ property: "person", value: person });
        }


        if ($.trim(hawkertype) != null && $.trim(hawkertype) != "")
        {
            filters.push({ property: "hawkertype", value: hawkertype });
        }
        if ($.trim(contactphone) != null && $.trim(contactphone) != "")
        {
            filters.push({ property: "contactphone", value: contactphone });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //取消
    onclose: function (obj)
    {
        var win = obj.up('window');
        win.close();
    },
    onclosexf: function (obj)
    {
        var win = obj.up('window');
        win.close();
    },
    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=todoPanel]').child('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
})