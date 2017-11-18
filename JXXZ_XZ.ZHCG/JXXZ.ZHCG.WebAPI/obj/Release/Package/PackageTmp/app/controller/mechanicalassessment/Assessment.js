Ext.define('TianZun.controller.mechanicalassessment.Assessment', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assessment',
    requires: [
        'TianZun.view.mechanicalassessment.assessment.AssessmentQuery',
        'TianZun.view.mechanicalassessment.assessment.AssessmentAdd',
        'TianZun.view.mechanicalassessment.assessment.AssessmentInfo',
        'TianZun.view.mechanicalassessment.assessment.AssessmentEdit',
    ],
    //查询
    onQuery: function (obj, e)
    {
        var win = this.getView().child("AssessmentQuery");
        if (!win)
        {
            win = Ext.create('widget.assessmentQuery');
            this.getView().add(win);
        }
        win.show();
    },
    onQueryOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var contractname = form.getForm().findField("contractname").getValue();
        //var starttime = form.getForm().findField("starttime").getValue();
        //var endtime = form.getForm().findField("endtime").getValue();
        var companyname = form.getForm().findField("companyname").getValue();
        var filters = [];

        //if ($.trim(starttime) != null && $.trim(starttime) != "")
        //{
        //    filters.push({ property: "starttime", value: starttime });
        //}

        //if ($.trim(endtime) != null && $.trim(endtime) != "")
        //{
        //    filters.push({ property: "endtime", value: endtime });
        //}

        if ($.trim(companyname) != null && $.trim(companyname) != "")
        {
            filters.push({ property: "companyname", value: companyname });
        }

        if ($.trim(contractname) != null && $.trim(contractname) != "")
        {
            filters.push({ property: "contractname", value: contractname });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //添加
    onAdd: function (obj, e)
    {
        var win = this.getView().child("assessmentAdd");

        if (!win)
        {
            win = Ext.create('widget.assessmentAdd');
            this.getView().add(win);
        }

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
        if (formData['sumscore']>100)
        {
            Ext.Msg.alert('提示', '合计扣分已经超过100分，请确认后重新输入！');
            return;
        }
        var storeaa = win.down('grid').getStore();
        var dataarr = [];
        storeaa.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, storeaa)
        formData['scoresList'] = dataarr;
        for (var i = 0; i < dataarr.length;i++)
        {
            if (dataarr[i].deail.length == 0 || dataarr[i].deduct.length == 0 || dataarr[i].deductuserid.length == 0 || dataarr[i].examinetime.length == 0)
            {
                Ext.Msg.alert('提示', '请先将信息填写完整再提交！');
                return;
            }
        }
        var store = grid.getStore();
        var values = [];

        store.each(function (item, index, count) {
            values.push(item.get('contractid'))
        });
        var contractid = formData['contractid'];
        if (values.indexOf(contractid) >= 0)
        {
            Ext.Msg.alert('提示', '本月已添加当前养护合同机械考核，请重新选择！');
            return;
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: "api/MechanicalExam/AddMechExamList",
            method:'post',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getStore().reload();
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
    //详情
    onlook: function (obj, e)
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
            url: "/api/MechanicalExam/getMechExamInf?examineid=" + record.get('examineid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.assessmentInfo', { record: jsonstr });
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
        if (record.get('status') == 1)
        {
            Ext.Msg.alert("提示", "该考核已经发布，不能进行编辑!");
            return;
        }
        GetAjax({
            url: "/api/MechanicalExam/getMechExamInf?examineid=" + record.get('examineid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.assessmentEdit', { record: jsonstr });
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

    onEditOk:function(obj,e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();
        if (!form.isValid())
        {
            return;
        }
        if (formData['sumscore'] > 100)
        {
            Ext.Msg.alert('提示', '合计扣分已经超过100分，请确认后重新输入！');
            return;
        }
        var storeaa = win.down('grid').getStore();
        var dataarr = [];
        storeaa.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, storeaa)
        formData['scoresList'] = dataarr;
        for (var i = 0; i < dataarr.length; i++)
        {
            if (dataarr[i].deail.length == 0 || dataarr[i].deduct.length == 0 || dataarr[i].deductusername.length == 0 || dataarr[i].examinetime.length == 0)
            {
                Ext.Msg.alert('提示', '请先将信息填写完整再提交！');
                return;
            }
        }

        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: "api/MechanicalExam/EditMechExamInf",
            method: 'post',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success")
                {
                    grid.getStore().reload();
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

    //发布
    onRelease:function(obj,e)
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

        if (record.get('status') == 1)
        {
            Ext.Msg.alert("提示", "该考核已经发布!");
            return;
        }

        Ext.Msg.confirm("提示", "您确定要发布当前考核吗？", function (btn)
        {
            if (btn == "yes")
            {
                PostAjax({
                    url: "/api/MechanicalExam/ReleaseMechExam?examineid=" + record.get('examineid'),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
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

    //关闭
    onClose: function (obj)
    {
        var win = obj.up('window');
        win.close();
    },
})