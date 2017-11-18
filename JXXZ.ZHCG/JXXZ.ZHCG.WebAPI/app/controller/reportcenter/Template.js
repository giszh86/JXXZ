Ext.define('TianZun.controller.reportcenter.Template', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.template',
    requires: [
        'TianZun.view.reportcenter.template.TemplateQuery',
        'TianZun.view.reportcenter.template.TemplateEnableMonth',
        'TianZun.view.reportcenter.template.TemplateEnableQuarter',
        'TianZun.view.reportcenter.template.TemplateEnableDay',
        'TianZun.view.reportcenter.template.TemplateEnableMonthEdit',
        'TianZun.view.reportcenter.template.TemplateEnableQuarterEdit',
        'TianZun.view.reportcenter.template.TemplateEnableDayEdit',
        'TianZun.view.reportcenter.template.TemplateEnableMonthDetail',
        'TianZun.view.reportcenter.template.TemplateEnableQuarterDetail',
        'TianZun.view.reportcenter.template.TemplateEnableDayDetail',
    ],
    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("TemplateQuery");
        if (!win) {
            win = Ext.create('widget.templateQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //查询提交
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();
        var reportname = form.getForm().findField("reportname").getValue();
        var filters = [];

        if ($.trim(reportname) != null && $.trim(reportname) != "") {
            filters.push({ property: "reportname", value: $.trim(reportname) });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //启用
    onQiyong: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        //待修改
        var record = sm.getSelection()[0];
        if (record.get("isenable") == 1) {
            Ext.Msg.alert("提示", "该模板已经启用");
            return;
        }
        var reportType = record.get("reporttype");
        var reportName = record.get("reportname");
        var win = this.getView().child("TemplateEnableMonth", { record: record });
        if (reportType == 2 || reportType == 3) {
            if (!win) {
                win = Ext.create('widget.templateEnableMonth', { record: record });
                this.getView().add(win);
            }
        }
        else if (reportType == 1) {
            win = this.getView().child("TemplateEnableDay", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableDay', { record: record });
                this.getView().add(win);
            }
        }
        else {
            win = this.getView().child("TemplateEnableQuarter", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableQuarter', { record: record });
                this.getView().add(win);
            }
        }
        win.show();
    },

    onQiyongOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var record = grid.getSelectionModel().getSelection()[0];
        var statistics = "";
        var date = new Date();
        var month = parseInt(date.getMonth()) + 1;
        var nowtime = date.getFullYear() + '-' + month + '-' + date.getDate() + " ";
        var Quarter = month / 3;
        if (month % 3 == 0) {
            Quarter = parseInt(month / 3);
        }
        else {
            Quarter = parseInt(month / 3 + 1);
        }
        statistics = ",";
        if (record.get("reporttype") == 2 || record.get("reporttype") == 4) {
            //处理复选框
            for (var i = 1; i <= 12; i++) {
                if (Ext.getCmp(i).getValue()) {
                    statistics += (i + ",");
                }
            }
            form.getForm().findField('statistics').setValue(statistics);
        }
        else if(record.get("reporttype") == 3){
            //处理复选框
            for (var i = 1; i <= 4; i++) {
                if (Ext.getCmp(i).getValue()) {
                    statistics += (i + ",");
                }
            }
            form.getForm().findField('statistics').setValue(statistics);
        }
        if (Ext.getCmp("disaggree").getValue()) {
            Ext.Msg.alert("提示", "请启用该模板！");
            return;
        }
        var formData = form.getValues();
        formData['endtime'] = formData['whattime'];
        $.ajax({
            url: "api/ReportCenter/EnableReport",
            method: 'POST',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    grid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！",
                    });
                }
            }
        })
    },

    //编辑
    onEdit: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        var reportType = record.get("reporttype");
        var win = this.getView().child("TemplateEnableMonthEdit");
        //待修改
        if (reportType == 2 || reportType == 4) {
            if (!win) {
                win = Ext.create('widget.templateEnableMonthEdit', { record: record });
                this.getView().add(win);
            }
        }
        else if (reportType == 1) {
            win = this.getView().child("TemplateEnableDayEdit", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableDayEdit', { record: record });
                this.getView().add(win);
            }
        }
        else {
            win = this.getView().child("TemplateEnableQuarterEdit", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableQuarterEdit', { record: record });
                this.getView().add(win);
            }
        }
        win.show();
    },

    //编辑提交成功
    onEditOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var record = grid.getSelectionModel().getSelection()[0];
        var statistics = "";
        var date = new Date();
        var month = parseInt(date.getMonth()) + 1;
        var nowtime = date.getFullYear() + '-' + month + '-' + date.getDate() + " ";
        var Quarter = month / 3;
        if (month % 3 == 0) {
            Quarter = parseInt(month / 3);
        }
        else {
            Quarter = parseInt(month / 3 + 1);
        }
        statistics = ",";
        if (record.get("reporttype") == 2 || record.get("reporttype") == 4) {
            //处理复选框
            for (var i = 1; i <= 12; i++) {
                if (Ext.getCmp(i).getValue()) {
                    statistics += (i + ",");
                }
            }
            form.getForm().findField('statistics').setValue(statistics);
        }
        else if (record.get("reporttype") == 3) {
            //处理复选框
            for (var i = 1; i <= 4; i++) {
                if (Ext.getCmp(i).getValue()) {
                    statistics += (i + ",");
                }
            }
            form.getForm().findField('statistics').setValue(statistics);
        }
        var formData = form.getValues();
        formData['endtime'] = formData['whattime'];
        $.ajax({
            url: "api/ReportCenter/EnableReport",
            method: 'POST',
            data: formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    grid.getStore().reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息："
                    });
                }
            }
        })
    },

    //查看
    onLook: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        //待修改
        var record = sm.getSelection()[0];
        var reportType = record.get("reporttype");
        var win = this.getView().child("TemplateEnableMonthDetail");
        if (reportType == 2 || reportType == 4) {
            if (!win) {
                win = Ext.create('widget.templateEnableMonthDetail', { record: record });
                this.getView().add(win);
            }
        }
        else if (reportType == 1) {
            win = this.getView().child("TemplateEnableDayDetail", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableDayDetail', { record: record });
                this.getView().add(win);
            }
        }
        else {
            win = this.getView().child("TemplateEnableQuarterDetail", { record: record });
            if (!win) {
                win = Ext.create('widget.templateEnableQuarterDetail', { record: record });
                this.getView().add(win);
            }
        }
        win.show();
    },

    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('grid');
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
    onclose: function (obj, e) {
        var win = obj.up('window');
        win.close();
    }
})