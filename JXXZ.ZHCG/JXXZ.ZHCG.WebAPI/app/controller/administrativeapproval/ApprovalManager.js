Ext.define('TianZun.controller.administrativeapproval.ApprovalManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approvalManager',

    requires: [
        'TianZun.view.administrativeapproval.approval.ApprovalQuery',
       'TianZun.view.administrativeapproval.approval.ApprovalTeamAssigned',
       'TianZun.view.administrativeapproval.approval.ApprovalTeamerAssigned',
       'TianZun.view.administrativeapproval.approval.ApprovalTeamerDeal',
       'TianZun.view.administrativeapproval.approval.ApprovalTeamerDealDetail',
       'TianZun.view.administrativeapproval.approval.ApprovalArchive',
    ],

    //处理
    onDeal: function (obj, e)
    {
        var me = this;
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        
        GetAjax({
            url: "api/Approval/GetBanjieList?pviguid=" + record.get('pviguid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    GetAjax({
                        url: "api/Approval/GetOnDealDetail?pviguid=" + record.get('pviguid') + '&userid=' + $.cookie("USER_ID"),
                        complete: function (jqXHR, textStatus, errorThrown)
                        {
                            if (textStatus == "success")
                            {
                                var resultstr = JSON.parse(jqXHR.responseText);
                                if (resultstr != null)
                                {
                                    if (resultstr.currentstage == '1')
                                    {
                                        win = Ext.create('widget.approvalTeamerAssigned', { record: record, result: jsonstr, content: resultstr });
                                        me.getView().add(win);
                                        win.show();
                                    }
                                    else if (resultstr.currentstage == '2')
                                    {
                                        win = Ext.create('widget.approvalTeamerDeal', { record: record, result: jsonstr, content: resultstr });
                                        me.getView().add(win);
                                        win.show();
                                    }
                                    else if (resultstr.currentstage == '3')
                                    {
                                        GetAjax({
                                            url: "api/Approval/GetFlowDetail?pviguid=" + record.get('pviguid') + '&userid=' + $.cookie("USER_ID"),
                                            complete: function (jqXHR, textStatus, errorThrown)
                                            {
                                                if (textStatus == "success")
                                                {
                                                    var resultstr = JSON.parse(jqXHR.responseText);
                                                    if (resultstr != null)
                                                    {
                                                        win = Ext.create('widget.approvalArchive', { record: record, result: jsonstr, content: resultstr });
                                                        me.getView().add(win);
                                                        win.show();
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    else
                                    {
                                        //未派遣查不到流程信息的时候显示行政科派遣页面
                                        if ($.cookie('ROLE_IDS').indexOf(14) >= 0)
                                        {
                                            win = Ext.create('widget.approvalTeamAssigned', { record: record, result: jsonstr, content: resultstr });
                                            me.getView().add(win);
                                            win.show();
                                        }
                                    }
                                }
                                else
                                {
                                    //未派遣查不到流程信息的时候显示行政科派遣页面
                                    if ($.cookie('ROLE_IDS').indexOf(14) >= 0)
                                    {
                                        win = Ext.create('widget.approvalTeamAssigned', { record: record, result: jsonstr, content: resultstr });
                                        me.getView().add(win);
                                        win.show();
                                    }
                                }
                            }
                        }
                    });
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


    //查看
    onDetail: function (obj, e)
    {
        var me = this;
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "api/Approval/GetBanjieList?pviguid=" + record.get('pviguid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    GetAjax({
                        url: "api/Approval/GetFlowDetail?pviguid=" + record.get('pviguid') + '&userid=' + $.cookie("USER_ID"),
                        complete: function (jqXHR, textStatus, errorThrown)
                        {
                            if (textStatus == "success")
                            {
                                var resultstr = JSON.parse(jqXHR.responseText);
                                var win = Ext.create('widget.approvalTeamerDealDetail', { record: record, result: jsonstr, content: resultstr });
                                me.getView().add(win);
                                win.show();
                            }
                        }
                    });
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

    //行政科派遣
    onSendOk: function (obj, e)
    {
        var me = this;
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid())
        {
            return;
        }
        if (formData['hidedealusername'] == "")
        {
            Ext.Msg.alert("提示", "请先选择处理人员");
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        if (formData['message'] != undefined && formData['message'] == "on") {
            formData['isSendMsg'] = 1;
        }
        else {
            formData['isSendMsg'] = 0;
        }
        PostAjax({
            url: "api/Approval/assignMidTeam",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //中队派遣
    onMideTeamDispatch:function(obj,e)
    {
        var me = this;
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid())
        {
            return;
        }
        if (formData['hidedealusername'] == "")
        {
            Ext.Msg.alert("提示", "请先选择处理人员");
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        if (formData['message'] != undefined && formData['message'] == "on")
        {
            formData['isSendMsg'] = 1;
        }
        else
        {
            formData['isSendMsg'] = 0;
        }
        PostAjax({
            url: "api/Approval/assignTeamber",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //班组成员处理
    onMemberDeal: function (obj, e)
    {
        var me = this;
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid())
        {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: "api/Approval/memberDeal",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //行政科进行归档
    onXzkOnFile:function(obj,e)
    {
        var me = this;
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid())
        {
            return;
        }
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: "api/Approval/xzkOnFile",
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("approvalQuery");

        if (!win) {
            win = Ext.create('widget.approvalQuery');
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

        var row_id = form.getForm().findField("row_id").getValue();
        var processversioninstancename = form.getForm().findField("processversioninstancename").getValue();
        var banjiedatefrom = form.getForm().findField("banjiedatefrom").getValue();
        var banjiedateto = form.getForm().findField("banjiedateto").getValue();
        var applyername = form.getForm().findField("applyername").getValue();
        var address = form.getForm().findField("address").getValue();

        var filters = [];

        if ($.trim(row_id) != null && $.trim(row_id) != "")
        {
            filters.push({ property: "row_id", value: row_id });
        }

        if ($.trim(processversioninstancename) != null && $.trim(processversioninstancename) != "")
        {
            filters.push({ property: "processversioninstancename", value: processversioninstancename });
        }

        if ($.trim(banjiedatefrom) != null && $.trim(banjiedatefrom) != "")
        {
            filters.push({ property: "banjiedatefrom", value: banjiedatefrom });
        }

        if ($.trim(banjiedateto) != null && $.trim(banjiedateto) != "")
        {
            filters.push({ property: "banjiedateto", value: banjiedateto });
        }

        if ($.trim(applyername) != null && $.trim(applyername) != "")
        {
            filters.push({ property: "applyername", value: applyername });
        }

        if ($.trim(address) != null && $.trim(address) != "")
        {
            filters.push({ property: "address", value: address });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //查询清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },

    //关闭
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    }
});