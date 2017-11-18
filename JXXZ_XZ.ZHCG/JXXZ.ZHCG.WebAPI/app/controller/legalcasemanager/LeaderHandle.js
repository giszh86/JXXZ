Ext.define('TianZun.controller.legalcasemanager.leaderHandle', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.leaderHandle',
    requires: [
        'TianZun.view.legalcasemanager.leaderhandle.LeaderHandleQuery',
        'TianZun.view.legalcasemanager.leaderhandle.LeaderHandleOpinion',
        'TianZun.view.legalcasemanager.leaderhandle.HisLeader',
    ],

    //查询
    onQueryld: function (obj, e) {
        var win = this.getView().child("leaderHandleQuery");

        if (!win) {
            win = Ext.create('widget.leaderHandleQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var casebh = form.getForm().findField("casebh").getValue();
        var casereason = form.getForm().findField("casereason").getValue();
        var sourceid = form.getForm().findField("sourceid").getValue();
        var wfdid = form.getForm().findField("wfdid").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        var casetypeid = form.getForm().findField("casetypeid").getValue();
        var dealname = form.getForm().findField("dealname").getValue();

        var filters = [];

        if ($.trim(casebh) != null && $.trim(casebh) != "") {
            filters.push({ property: "casebh", value: casebh });
        }

        if ($.trim(casereason) != null && $.trim(casereason) != "") {
            filters.push({ property: "casereason", value: casereason });
        }

        if (typeof sourceid == "number") {
            filters.push({ property: "sourceid", value: sourceid });
        }

        if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
            filters.push({ property: "wfdid", value: wfdid });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }        

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        if ($.trim(casetypeid) != null && $.trim(casetypeid) != "") {
            filters.push({ property: "casetypeid", value: casetypeid });
        }

        if ($.trim(dealname) != null && $.trim(dealname) != "") {
            filters.push({ property: "dealname", value: dealname });
        }


        FilterStore(store, filters);

        win.hide();
    },

    //取消
    onclose: function (obj) {
        var win = obj.up("window");
        win.close();
    },
    //督办
    onSupervise: function (obj, e) {
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        if ($.cookie("ROLE_IDS").indexOf(5)>0) {
            var win = Ext.create('widget.LeaderHandleOpinion', { record: record });
            this.getView().add(win);
            win.show();
        }
        else {
            Ext.Msg.alert("提示", "只有领导才能进行督办");
            return;
        }
    },
    onSupOk: function (button, e) {
        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }

        var formData = form.getValues();

        if (formData['message'] != undefined && formData['message'] == "on") {
            formData['isSendMsg'] = 1;
        }
        else {
            formData['isSendMsg'] = 0;
        }

        PostAjax({
            url: 'api/Leadersupervise/AddLeadersupervise',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    // win.unmask();
                    Ext.Msg.show(
                    {
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        });
    },
    onLookOld: function (obj, e) {
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        var isdb = record.get("supid");
        if (isdb =="已督办") {
            var win = Ext.create('widget.hisLeader', { record: record });
            this.getView().add(win);
            win.show();
        }
        else {
            Ext.Msg.alert("提示", "该案件暂未督办");
        }
    },

    //查看事件详情
    LookCaseDetail: function (obj) {
        var grid = obj.up('grid');
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条数据");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条数据");
            return;
        }
        var record = sm.getSelection()[0];
        
        //获取详情
        Ext.Ajax.request({
            url: "/api/CommonCase/GetCaseModel?wfsid=" + record.get('wfsid'),
            method: 'get',
            scope: this,
            async: false,
            success: function (response) {
                var jsonstr = Ext.decode(response.responseText);
                var recordbaseinfo = jsonstr;
                var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseLeft', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 0 });
                var addpage = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseHandler', { record: record, recordbaseinfo: recordbaseinfo, ishandle: 0 });
                content.down('panel[name=commonLeftPanel]').add(addpage);
                var view = Ext.ComponentQuery.query('viewport')[0];
                var panel = view.items.getAt(3)
                content.region = 'center';
                view.add(content);
                view.remove(panel)
            }
        });
    },

    //查询条件置空
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
        win.close();
    },

    //返回到列表页面
    onReturnList: function (button) {
        var content = Ext.create('TianZun.view.legalcasemanager.casesource.CaseSourceList');
        var view = Ext.ComponentQuery.query('viewport')[0];
        var panel = view.items.getAt(3)
        view.remove(panel)
        content.region = 'center';
        view.add(content);
        if (button.tabtitle == '已处理案源')
            content.down('tabpanel').setActiveTab(1);
        else if (button.tabtitle == '全部案源')
            content.down('tabpanel').setActiveTab(2);
    }
})