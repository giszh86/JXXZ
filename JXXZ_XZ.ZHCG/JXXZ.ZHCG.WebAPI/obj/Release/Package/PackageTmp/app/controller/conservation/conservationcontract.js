Ext.define('TianZun.controller.conservation.conservationcontract', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.conservationcontract',
    requires: [
        'TianZun.view.conservation.conservationcontract.ContractAdd',
        'TianZun.view.conservation.conservationcontract.ContractEdit',
        'TianZun.view.conservation.conservationcontract.ContractInfo',
        'TianZun.view.conservation.conservationcontract.ContractQuery',
    ],

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("contractQuery");
        if (!win) {
            win = Ext.create('widget.contractQuery');
            this.getView().add(win);
        }
        win.show();
    },

    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var contractname = form.getForm().findField("contractname").getValue();
        var contractnum = form.getForm().findField("contractnum").getValue();
        var contracttype = form.getForm().findField("contracttype").getValue();
        var starttime = form.getForm().findField("starttime").getValue();
        var endtime = form.getForm().findField("endtime").getValue();
        var signdate = form.getForm().findField("signdate").getValue();
        var filters = [];

        if ($.trim(contractname) != null && $.trim(contractname) != "") {
            filters.push({ property: "contractname", value: $.trim(contractname) });
        }

        if ($.trim(contractnum) != null && $.trim(contractnum) != "") {
            filters.push({ property: "contractnum", value: contractnum });
        }


        if ($.trim(contracttype) != null && $.trim(contracttype) != "") {
            filters.push({ property: "contracttype", value: contracttype });
        }

        if ($.trim(endtime) != null && $.trim(endtime) != "") {
            filters.push({ property: "endtime", value: endtime });
        }
        if ($.trim(starttime) != null && $.trim(starttime) != "") {
            filters.push({ property: "starttime", value: starttime });
        }
        if ($.trim(signdate) != null && $.trim(signdate) != "") {
            filters.push({ property: "signdate", value: signdate });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //编辑
    onEdit: function (obj, e) {
        var grid = obj.up('grid');
        var me = this;
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
            url: "/api/Contract/GetContractModel?contractid=" + record.get('contractid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.contractEdit', { record: jsonstr, type: 1 });
                    me.getView().add(win);
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
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Contract/GetContractModel?contractid=" + record.get('contractid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.contractInfo', { record: jsonstr, type: 1 });
                    me.getView().add(win);
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

    //巡查上报
    onAdd: function (button, e) {
        var win = Ext.create('widget.contractAdd');
        this.getView().add(win);
        win.show();
    },

    onAddOk: function (obj,e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        if (!form.isValid())
        {
            return;
        }
        if (new Date(formData['endtime']) < new Date(formData['starttime']))
        {
            Ext.Msg.alert('提示', '结束时间不得早于开始时间!');
            return;
        }
        if (formData['signdate'] > formData['starttime'])
        {
            Ext.Msg.alert('提示', '签订时间不得晚于开始时间!');
            return;
        }
        form.submit({
            url: "api/Contract/AddContract",
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

    //删除
    onDelete: function (obj, e) {
        var grid = obj.up('grid');
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
                //判断是否可以删除
                PostAjax({
                    url: "/api/Contract/IsContractAssociated?contractid=" + record.get('contractid'),
                    complete: function (response)
                    {
                        grid.unmask();
                        var str = response.responseText;
                        if (str = "0")
                        {
                            PostAjax({
                                url: "/api/Contract/DeleteContractInf?contractid=" + record.get('contractid'),
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
                        else
                        {
                            grid.unmask();
                            Ext.Msg.alert("提示", "当前养护合同与其他项目有关联，不能删除！");
                        }
                    },
                });
            }
        });
    },

    //编辑
    onEditOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();

        form.submit({
            url: "api/Contract/ModifyContractInf",
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
                    msg: "非常抱歉！" + "保存数据时发生错误！<br/>错误信息：" + action.response.status
                });
            }
        });
    },
    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid')
        var store = grid.getStore();
        var filter = [{}];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    }
});