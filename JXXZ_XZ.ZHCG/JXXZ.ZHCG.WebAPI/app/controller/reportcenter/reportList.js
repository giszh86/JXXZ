Ext.define('TianZun.controller.reportcenter.reportList', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportList',
    requires: [
        'TianZun.view.reportcenter.reportlist.ReportQuery',
        //秀洲区综合行政执法局土地执法案件情况分类统计报表          --Land---土地执法案件
        'TianZun.view.reportcenter.reportlist.XZlandLawCaseReport',

        //秀洲区综合行政执法局安全生产执法情况报表                  --Safety---安全生产    
        'TianZun.view.reportcenter.reportlist.XZSafetifyInProductionReport',

         //秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表    --Straw---秸秆
        'TianZun.view.reportcenter.reportlist.XZstrawAndWasteControlReport',

         //秀洲区综合行政执法局水行政执法情况报表                   --Water---水利               
        'TianZun.view.reportcenter.reportlist.XZlawInWaterReport',

         //秀洲区综合行政执法局中心工作开展情况报表                  --Center---执法局中心   
        'TianZun.view.reportcenter.reportlist.XZBureauCenterWorkReport',

        //秀洲区综合行政执法局规模养殖场执法管控情况报表              --Farm---养殖场  
        'TianZun.view.reportcenter.reportlist.XZscaleFarmsControlReport',

        //H7N9疫情(活禽交易)防控工作信息日报表                         --H7N7--疫情防控
        'TianZun.view.reportcenter.reportlist.XZH7N7controlWorkInfDailyReport',

        //特殊时期（互联网峰会）环境保障工作日报表                      --Special--
        'TianZun.view.reportcenter.reportlist.XZSpecialPeriodEnvirProtReport',

        //秀洲区综合行政执法局土地执法案件情况分类统计报表          --Land---土地执法案件半月报
        'TianZun.view.reportcenter.reportlist.XZlandLawCaseHalfMonthReport',

        'TianZun.view.reportcenter.reportlist.XZlandLawCaseReportDetail',
        'TianZun.view.reportcenter.reportlist.XZSafetifyInProductionReportDetail',
        'TianZun.view.reportcenter.reportlist.XZstrawAndWasteControlReportDetail',
        'TianZun.view.reportcenter.reportlist.XZscaleFarmsControlReportDetail',
        'TianZun.view.reportcenter.reportlist.XZlawInWaterReportDetail',
        'TianZun.view.reportcenter.reportlist.XZBureauCenterWorkReportDetail',
        'TianZun.view.reportcenter.reportlist.XZH7N7controlWorkInfDailyReportDetail',
        'TianZun.view.reportcenter.reportlist.XZSpecialPeriodEnvirProtReportDetail',
        'TianZun.view.reportcenter.reportlist.XZlandLawCaseHalfMonthReportDetail',

        //累计报表
        'TianZun.view.reportcenter.reportlist.XZSafetifyInProductionReportView',
        'TianZun.view.reportcenter.reportlist.XZstrawAndWasteControlReportView',
        'TianZun.view.reportcenter.reportlist.XZscaleFarmsControlReportView',
        'TianZun.view.reportcenter.reportlist.XZlawInWaterReportView',
        'TianZun.view.reportcenter.reportlist.XZBureauCenterWorkReportView',

    ],
    //查询
    onQuery: function (obj, e)
    {
        var win = this.getView().child("ReportQuery");
        var tab = this.getView().down('tabpanel').getActiveTab();
        var title = tab.title;
        if (!win)
        {
            win = Ext.create('widget.reportQuery', {title:title});
            this.getView().add(win);
        }
        win.show();
    },

    //查询提交
    onQueryOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();
        var reportname = form.getForm().findField("reportname").getValue();
        var reportdate = form.getForm().findField("reportdate").getValue();
        var filters = [];
        if (formData['reportyear'] != null)
        {
            var reportyear = formData['reportyear'];
            if ($.trim(reportyear) != null && $.trim(reportyear) != "") {
                filters.push({ property: "reportyear", value: $.trim(reportyear) });
            }
        }

        if ($.trim(reportname) != null && $.trim(reportname) != "")
        {
            filters.push({ property: "reportname", value: $.trim(reportname) });
        }
        if ($.trim(reportdate) != null && $.trim(reportdate) != "")
        {
            filters.push({ property: "reportdate", value: reportdate });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //清空
    onEmpty: function (button)
    {
        button.up('form').reset();
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid')
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
    //取消
    onClose: function (obj, e)
    {
        var win = obj.up('window');
        win.close();
    },
    //上报报表
    onAdddt: function (obj, e)
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
        var reportid = record.get("reportid");
        var reportArray = [
            '',
            'widget.XZlandLawCaseReport',
            'widget.XZSafetifyInProductionReport',
            'widget.XZstrawAndWasteControlReport',
            'widget.XZscaleFarmsControlReport',
            'widget.XZlawInWaterReport',
            'widget.XZBureauCenterWorkReport',
            'widget.XZH7N7controlWorkInfDailyReport',
            'widget.XZSpecialPeriodEnvirProtReport',
            'widget.XZlandLawCaseHalfMonthReport',
        ];
        var win;
        for (var i = 1; i <= reportArray.length - 1; i++)
        {
            if (reportid == i)
            {
                win = Ext.create(reportArray[reportid], { record: record });
                break;
            }
        }
        asdf.getView().add(win);
        win.show();
    },

    //查看报表
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
        var reportid = record.get("reportid");
        var reportArray = [
            '',
            'widget.XZlandLawCaseReportDetail',
            'widget.XZSafetifyInProductionReportDetail',
            'widget.XZstrawAndWasteControlReportDetail',
            'widget.XZscaleFarmsControlReportDetail',
            'widget.XZlawInWaterReportDetail',
            'widget.XZBureauCenterWorkReportDetail',
            'widget.XZH7N7controlWorkInfDailyReportDetail',
            'widget.XZSpecialPeriodEnvirProtReportDetail',
            'widget.XZlandLawCaseHalfMonthReportDetail',
        ];
        var win;
        for (var i = 1; i <= reportArray.length - 1; i++)
        {
            if (reportid == i)
            {
                win = Ext.create(reportArray[reportid], { record: record });
                break;
            }
        }
        asdf.getView().add(win);
        win.show();
    },

    //查看累计报表
    onAddUpView: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        var reportid = record.get("reportid");
        var win;
        switch (reportid)
        {
            case 2:
                win = Ext.create('widget.XZSafetifyInProductionReportView', { record: record });
                asdf.getView().add(win);
                win.show();
                break;
            case 3:
                win = Ext.create('widget.XZstrawAndWasteControlReportView', { record: record });
                asdf.getView().add(win);
                win.show();
                break;
            case 4:
                win = Ext.create('widget.XZscaleFarmsControlReportView', { record: record });
                asdf.getView().add(win);
                win.show();
                break;
            case 5:
                win = Ext.create('widget.XZlawInWaterReportView', { record: record });
                asdf.getView().add(win);
                win.show();
                break;
            case 6:
                win = Ext.create('widget.XZBureauCenterWorkReportView', { record: record });
                asdf.getView().add(win);
                win.show();
                break;
        }
    },

    //秀洲区综合行政执法局土地执法案件情况分类统计报表          --Land---土地执法案件
    onAddXZlandLawCaseOK: function (obj, e)
    {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var grid = win.down('grid');
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddLandLaw",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
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

    //秀洲区综合行政执法局安全生产执法情况报表                  --Safety---安全生产    
    onAddSafetifyInProductionOK: function (obj, e)
    {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var grid = win.down('grid');
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var store = grid.getStore();

        var form = win.down('form');
        var preparer = form.getForm().findField("preparer").getValue();
        var xzshuser = form.getForm().findField("xzshuser").getValue();
        var preparerphone = form.getForm().findField("preparerphone").getValue();

        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddSafetifyinProduction",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr , preparer: preparer, xzshuser: xzshuser, preparerphone: preparerphone,}),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });

    },

    //秀洲区综合行政执法局秸秆、城市垃圾露天焚烧执法管控情况报表    --Straw---秸秆
    onAddStrawAndWasteControlOK: function (obj, e)
    {
        var win = obj.up('window');
        //var remark = win.down('textarea[name=remark]').getValue();
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddStrawAndWasteControl",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },

    //秀洲区综合行政执法局水行政执法情况报表                   --Water---水利     
    onAddLawInWaterOk: function (obj, e)
    {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var form = win.down('form');
       
        var preparer = form.getForm().findField("preparer").getValue();
        var xzshuser = form.getForm().findField("xzshuser").getValue();
        var preparerphone = form.getForm().findField("preparerphone").getValue();

        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddLawInWater",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr, preparer: preparer, xzshuser: xzshuser, preparerphone: preparerphone, }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        });
    },

    //秀洲区综合行政执法局规模养殖场执法管控情况报表              --Farm---养殖场   
    onAddScaleFarmsControlOk: function (obj, e)
    {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddScaleFarmsControl",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
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

    //秀洲区综合行政执法局中心工作开展情况报表                  --Center---执法局中心   
    onAddBureauCenterWorkOk: function (obj, e)
    {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddBureauCenterWork",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！",
                    });
                }
            }
        });
    },

    //H7N9疫情(活禽交易)防控工作信息日报表                         --H7N7--疫情防控
    onAddH7N7ReportOK:function(obj,e)
    {
        var win = obj.up('window');
        //var remark = win.down('textarea[name=remark]').getValue();
        var remark = "";
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddH7N7Report",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), unittype: $.cookie("UNIT_TYPE"), remark: remark, unitname: $.cookie("UNIT_NAME"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！",
                    });
                }
            }
        });
    },
    //特殊时期（互联网峰会）环境保障工作日报表                      --Special--
    onAddSpecialReportOK: function (obj, e)
    {
        var win = obj.up('window');
        //var remark = win.down('textarea[name=remark]').getValue();
        var remark = "";
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var grid = win.down("grid");
        var store = grid.getStore();
        var form = win.down('form');
        var statisticsuser = form.getForm().findField("statisticsuser").getValue();
        var shuser = form.getForm().findField("shuser").getValue();
        var bzcslshdcqk = form.getForm().findField("bzcslshdcqk").getValue();
        var fxwtycljg = form.getForm().findField("fxwtycljg").getValue();
        var drjxyrdgzap = form.getForm().findField("drjxyrdgzap").getValue();
        var xysjcmxtjjsx = form.getForm().findField("xysjcmxtjjsx").getValue();
        var starttime = form.getForm().findField("starttime").getValue();
        var endtime = form.getForm().findField("endtime").getValue();
        var whattime = form.getForm().findField("endtime").getValue();

        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddSpecialReport",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), unittype: $.cookie("UNIT_TYPE"), remark: remark, unitname: $.cookie("UNIT_NAME"), json: dataarr ,statisticsuser: statisticsuser,
                shuser: shuser, bzcslshdcqk: bzcslshdcqk, fxwtycljg: fxwtycljg, drjxyrdgzap: drjxyrdgzap, xysjcmxtjjsx: xysjcmxtjjsx, starttime: starttime
            ,endtime:endtime,whattime:whattime}),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else
                {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！",
                    });
                }
            }
        });
    },

    //秀洲区综合行政执法局土地执法案件情况分类统计报表（半月报）          --Land---土地执法案件
    onAddXZlandLawCaseHalfMonthOK: function (obj, e) {
        var win = obj.up('window');
        var remark = win.down('textarea[name=remark]').getValue();
        var grid = win.down('grid');
        var tabgrid = this.getView().down('tabpanel').down('grid');
        var store = grid.getStore();
        var dataarr = [];
        store.each(function (obj) {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        $.ajax({
            url: "api/ReportCenter/AddLandLawHalfMonth",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({ userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), remark: remark, unittype: $.cookie("UNIT_TYPE"), unitname: $.cookie("UNIT_NAME"), json: dataarr }),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    grid.getStore().reload();
                    tabgrid.getStore().reload();
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

    //报表统计
    onStaticsReport: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var tmpgrid = win.down("grid");
        var sm = grid.getSelectionModel();

        var record = sm.getSelection()[0];
        var reportid = record.get("reportid");
        var reportdate = record.get("reportdate");
        var remark = "";
        if (form.getForm().findField("remark") != null)
        {
            remark = form.getForm().findField("remark").getValue();
        }

        var formData = form.getValues();
        var preparer = "";
        var shuser = "";
        var preparerphone = "";
        var bzcslshdcqk = "";
        var fxwtycljg = "";
        var drjxyrdgzap = "";
        var xysjcmxtjjsx = "";
        var starttime="";
        var endtime = "";
        var statisticsuser = "";
        if (reportid == 8)
        {
            statisticsuser = formData["statisticsuser"];
            shuser = formData["shuser"];
            bzcslshdcqk = formData["bzcslshdcqk"];
            fxwtycljg = formData["fxwtycljg"];
            drjxyrdgzap = formData["drjxyrdgzap"];
            xysjcmxtjjsx = formData["xysjcmxtjjsx"];
            starttime = formData["starttime"];
            endtime = formData["endtime"];
        }

        if (reportid == 2||reportid==5) {
            preparer = formData["preparer"];
            shuser = formData["xzshuser"];
            preparerphone = formData["preparerphone"];
        }

        var store = tmpgrid.getStore();
        var dataarr = [];
        store.each(function (obj)
        {
            dataarr.push(obj.getData());
        }, store)
        var json = JSON.stringify(dataarr);
        Ext.Msg.confirm("提示", "您确定要统计吗？", function (btn)
        {
            if (btn == "yes")
            {
                $.ajax({
                    url: "api/ReportCenter/StatisticalReport",
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        userid: $.cookie("USER_ID"), unitid: $.cookie("UNIT_ID"), unitname: $.cookie("UNIT_NAME"), unittype: $.cookie("UNIT_TYPE"), reportid: reportid, reportdate: reportdate,
                        preparer: preparer, shuser: shuser, preparerphone: preparerphone, bzcslshdcqk: bzcslshdcqk, fxwtycljg: fxwtycljg, drjxyrdgzap: drjxyrdgzap, xysjcmxtjjsx: xysjcmxtjjsx,
                        remark:remark,statisticsuser:statisticsuser,starttime:starttime,endtime:endtime,
                        json: dataarr
                    }),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
                        if (jqXHR.responseText == "success")
                        {
                            grid.getStore().reload();
                            win.close();
                            Ext.MessageBox.show({ title: "提示", msg: "统计成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        }
                        if (jqXHR.responseText == "failure")
                        {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "您不是行政许可科人员，不能进行报表统计",
                            });
                        }
                        if (jqXHR.responseText == "fault")
                        {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "统计失败,请先完成数据上报"
                            });
                        }
                        if (jqXHR.responseText == "warning")
                        {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "统计失败,请先将报表填报完整再统计"
                            });
                        }
                    }
                });
            }
        }
    )
    },

    //报表打印
    onPrint: function (obj, e)
    {

        var printcontent;
        var form = obj.up('form');
        //var year = form.down('hidden[name=pryyear]').getValue();
        //printcontent = '<b style="font-size:25px;margin-left:40%;">' + year + '年归类统计表</b>';

        //打印预览
        var grid = form.down('grid');
        printcontent = '2017年报表测试';
        PrintPreLook(grid, printcontent, 0, 1, '90%', '5%');
    },
})