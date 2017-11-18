Ext.define('TianZun.controller.specialrectification.Taskmanagement', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskmanagement',

    requires: [
       'TianZun.view.specialrectification.taskmanagement.TaskAdd',
    ],

    //单击流程事件
    cliclChangeFlow: function (obj, e) {
        if (obj.selModel.selected.items.length > 0) {
            var panelTitle = obj.up('tabpanel').activeTab.title;
            var panelName = panelTitle == '待办任务' ? 'todoPanel' : panelTitle == '已办任务' ? 'finishPanel' : 'allPanel';
            var newFieldset = Ext.create('Ext.form.FieldSet', {
                collapsible: false,
                margin: '20 0 10 300',
                border: 0,
                name: 'todoFieldset',
                layout: {
                    type: 'table',
                    columns: 9,
                },
                items: [
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 120,
                        bordor: 0,
                        items: [{
                            xtype: 'image',
                            src: '../Images/images/灰阶发起任务.png',
                            name: 'flow1',
                            width: 80,
                            height: 80
                        },
                        {
                            xtype: 'label',
                            text: '发起任务',
                            width: 80,
                            style: 'text-align:center;display: inline-block;',
                        }]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt1',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 120,
                        bordor: 0,
                        items: [{
                            xtype: 'image',
                            src: '../Images/images/灰阶启动任务.png',
                            name: 'flow2',
                            width: 80,
                            height: 80
                        },
                        {
                            xtype: 'label',
                            text: '启动任务',
                            width: 80,
                            style: 'text-align:center;display: inline-block;',
                        }]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt2',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 120,
                        bordor: 0,
                        items: [{
                            xtype: 'image',
                            src: '../Images/images/灰阶过程上报.png',
                            name: 'flow3',
                            width: 80,
                            height: 80
                        },
                        {
                            xtype: 'label',
                            text: '过程上报',
                            width: 80,
                            style: 'text-align:center;display: inline-block;',
                        }]
                    },
                    {
                        xtype: 'image',
                        src: '../Images/images/灰阶箭头.png',
                        margin: '0 10 0 10',
                        name: 'jt3',
                    },
                    {
                        xtype: 'panel',
                        width: 80,
                        height: 120,
                        bordor: 0,
                        items: [{
                            xtype: 'image',
                            src: '../Images/images/灰阶任务总结.png',
                            name: 'flow4',
                            width: 80,
                            height: 80
                        },
                        {
                            xtype: 'label',
                            text: '任务总结',
                            width: 80,
                            style: 'text-align:center;display: inline-block;',
                        }]
                    }
                ]
            });
            var todoFieldset = obj.up('tabpanel').down('panel[name=' + panelName + ']').down('fieldset[name=todoFieldset]');
            obj.up('tabpanel').down('panel[name=' + panelName + ']').remove(todoFieldset);
            obj.up('tabpanel').down('panel[name=' + panelName + ']').add(newFieldset);

            var grid = obj.up('grid');
            var sm = grid.getSelectionModel();
            var record = sm.getSelection()[0];
            var tachename = record.get('wfdname');
            var len = tachename.indexOf('专项整治启动') > -1 ? 1 : tachename.indexOf('专项整治处理') > -1 ? 2 : tachename.indexOf('专项整治总结') > -1 ? 3 : tachename.indexOf('结束') > -1 ? 4 : 5
            for (var i = 0; i < len; i++) {
                var srcstr = obj.up('tabpanel').down('image[name=flow' + (i + 1) + ']').src.replace('灰阶', '');
                if (i > 0)
                    obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=jt' + i + ']').getEl().dom.src = '../Images/images/箭头.png';
                obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=flow' + (i + 1) + ']').getEl().dom.src = srcstr;
                obj.up('tabpanel').down('panel[name=' + panelName + ']').down('image[name=flow' + (i + 1) + ']').on('click', this.aa);
            }
        }
    },

    //搜索
    onQuery: function (obj, e) {       
        var win = this.getView().child("taskQuery");
        
        if (!win) {
            win = Ext.create("TianZun.view.specialrectification.taskmanagement.TaskQuery");           
            this.getView().add(win);
        }
        win.show();
    },

    //搜索查询
    onQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var title = form.getForm().findField("title").getValue();
        var wfdid = form.getForm().findField("wfdid").getValue();
        var tasktype = form.getForm().findField("tasktype").getValue();
        var level = form.getForm().findField("level").getValue();
        var region = form.getForm().findField("region").getValue();
        var fqr = form.getForm().findField("fqr").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        if ($.trim(stime) != null && $.trim(stime) != "" && $.trim(etime) != null && $.trim(etime) != "" && stime > etime) {
            Ext.Msg.alert('提示', '开始时间不得晚于结束时间');
            return;
        }

        var filters = [];

        if ($.trim(title) != null && $.trim(title) != "") {
            filters.push({ property: "title", value: $.trim(title) });
        }

        if ($.trim(wfdid) != null && $.trim(wfdid) != "") {
            filters.push({ property: "wfdid", value: wfdid });
        }

        if (typeof tasktype == "number") {
            filters.push({ property: "tasktype", value: tasktype });
        }

        if ($.trim(level) != null && $.trim(level) != "") {
            filters.push({ property: "level", value: level });
        }

        if ($.trim(region) != null && $.trim(region) != "") {
            filters.push({ property: "region", value: region });
        }

        if ($.trim(fqr) != null && $.trim(fqr) != "") {
            filters.push({ property: "fqr", value: fqr });
        }

        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }

        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }

        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    
    //查看
    onDetail: function (obj, e) {
        var grid = obj.up('grid');
        if (grid.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (grid.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = grid.getSelection()[0];        

        var win = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskInfo', { record: record, ishandle: 0 });
        this.getView().add(win);
        win.show();
    },

    //处理
    onHandle: function (obj, e) {
        var grid = obj.up('grid');
        if (grid.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (grid.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = grid.getSelection()[0];

        if (record.get('term')==1 &record.get('seqnum') < 4 & new Date() > new Date(record.get('endtime'))) {
            PostAjax({
                url: "/api/SpecialTask/SpecialTaskEnd",
                data: { wfdid: record.get('wfdid'), wfsaid: record.get('wfsaid'), wfsid: record.get('wfsid'), userid: $.cookie('USER_ID') },
                async: false,
                complete: function (jqXHR, textStatus, errorThrown) {
                    if (textStatus == "success") {
                        grid.getStore().reload();
                        Ext.Msg.alert("提示", "该任务已经结束!");
                    }
                }
            });
        } else {
            var win = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskInfo', { record: record,ishandle:1 });
            this.getView().add(win);
            win.show();
        }
    },
    
    //新增
    onAdd: function (obj,e) {
        var win = Ext.create("TianZun.view.specialrectification.taskmanagement.TaskAdd");
        this.getView().add(win);
        win.show();
    },

    //发起任务
    onStartOK: function (obj) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();

        if (form.isValid()) {
            form.submit({
                url: "api/SpecialTask/AddSpecialTask",
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    grid.getSelectionModel().clearSelections();
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
        }
            
    },

    //启动任务
    onReloadOK: function (obj) {
        var win = obj.up('window');
        var form = win.down('form[name=qdrw]');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        var formData = form.getValues();

        if (form.isValid()) {
            form.submit({
                url: "api/SpecialTask/SpecialTaskFiring",
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    grid.getSelectionModel().clearSelections();
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
        }

    },

    //过程上报
    onReport: function (obj, e) {
        var record = obj.up('taskInfo').record;
        var win = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskAddadd', { record: record });
        obj.up('taskInfo').add(win);
        win.show();
    },


    //编辑过程上报
    onEditReport: function (obj) {
        var record = obj.up('taskInfo').record;
        var win = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskAddadd', { record: record,wfsuid:obj.wfsuid });
        obj.up('taskInfo').add(win);
        win.show();
    },

    //过程上报
    onReportOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid1 = this.getView().down('tabpanel').getActiveTab().down('grid');
        var grid2 = this.getView().down('taskInfo').down('grid');
        var formData = form.getValues();
        var win2 = this.getView().down('taskInfo');

        if (form.isValid()) {
            form.submit({
                url: "api/SpecialTask/SpecialTaskReply",
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    grid1.getSelectionModel().clearSelections();
                    grid1.getStore().reload();
                    grid2.getSelectionModel().clearSelections();
                    grid2.getStore().reload();
                    win.down('uploadpanel').store.removeAll();
                    win.close();
                    win2.close();
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
        }
    },

    //查看上报详情双击事件
    dblClickInfo: function (obj) {
        var win = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskUserReportInfo', { record: obj.getSelection()[0] });
        obj.up('taskInfo').add(win);
        win.show();
    },

    //进入总结
    onEnterSummarizeOK: function (obj) {
        var record = obj.up('taskInfo').record;
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');

        PostAjax({
            url: "/api/SpecialTask/SpecialTaskEnd",
            data: { wfdid: record.get('wfdid'), wfsaid: record.get('wfsaid'), wfsid: record.get('wfsid'),userid:$.cookie('USER_ID') },
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    grid.getSelectionModel().clearSelections();
                    grid.getStore().reload();
                    var tabpanel = obj.up('tabpanel');
                    tabpanel.down('button[name=btnEnterSummarize]').hide();
                    tabpanel.isenter = 'addupload';
                    tabpanel.down('form[name=rwzj]').down('hidden[name=wfsaid]').setValue(jsonstr.wfsaid);
                    tabpanel.tabBar.items.items[3].show();
                    tabpanel.setActiveTab(3);
                    tabpanel.down('button[name=btnSummarize]').show();
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

    //总结提交
    onSummarizeOK: function (obj) {
        var win = obj.up('window');
        var form = win.down('form[name=rwzj]');
        var grid = this.getView().down('tabpanel').getActiveTab().down('grid');
        if (form.isValid()) {
            form.submit({
                url: "api/SpecialTask/SpecialTaskSummarize",
                method: "POST",
                waitTitle: "正在提交",
                waitMsg: "正在提交，请稍候...",
                success: function (form, action) {
                    grid.getSelectionModel().clearSelections();
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
        }

    },

    //取消
    onClose: function (obj) {
        var win = obj.up("window");

        win.close();
    },

    //清空
    onEmpty: function (button) {
        var panel = this.getView().down('tabpanel').getActiveTab();
        button.up('form').reset();
        var grid = panel.child('gridpanel');
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