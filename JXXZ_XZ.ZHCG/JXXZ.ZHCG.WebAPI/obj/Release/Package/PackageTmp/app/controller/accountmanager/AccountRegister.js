Ext.define('TianZun.controller.accountmanager.AccountRegister', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accountRegister',

    requires: [
        'TianZun.view.accountmanager.accountregister.AccountRegisterLook',
       'TianZun.view.accountmanager.accountregister.AccountRegisterEdit',
       'TianZun.view.accountmanager.accountregister.AccountRegisterQuery',
       'TianZun.view.accountmanager.accountregister.AccountRegisterAdd',
       'TianZun.view.accountmanager.accountregister.CitizenEventList'
    ],

    //查询
    onQuery: function (obj, e) {
        var win = this.getView().child("accountRegisterQuery");

        if (!win) {
            win = Ext.create('widget.accountRegisterQuery');
            this.getView().add(win);
        }

        win.show();
    },

    onAdd: function (obj, e) {
        var win = this.getView().child("accountRegisterAdd");

        if (!win) {
            win = Ext.create('widget.accountRegisterAdd');
            this.getView().add(win);
        }

        win.show();
    },

    onSelectEvent: function (obj, e) {
        var win = this.getView().child("citizenEventList");

        if (!win) {
            win = Ext.create('widget.citizenEventList');
            obj.up('accountRegisterAdd').add(win);
        }

        win.show();
    },
    //下载Word文档
    onDownLoad: function (obj, e) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var path = record.get('wordpath');
        if (path) {
            location.href = '/FileDownLoad.ashx?FilePath=' + configs.AccountRegisterWordPath + path + '&FileName=' + record.get('wordname');
        }
    },
    onRegisterQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var title = form.getForm().findField("title").getValue();
        var taskclassid = form.getForm().findField("taskclassid").getValue();
        var unitid = form.getForm().findField("unitid").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();

        var filters = [];

        if ($.trim(title) != null && $.trim(title) != "") {
            filters.push({ property: "title", value: $.trim(title) });
        }

        if ($.trim(taskclassid) != null && $.trim(taskclassid) != "") {
            filters.push({ property: "taskclassid", value: taskclassid });
        }

        if ($.trim(unitid) != null && $.trim(unitid) != "") {
            filters.push({ property: "unitid", value: unitid });
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

    onEventQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = win.down('grid').getStore();

        var eventtitle = form.getForm().findField("eventtitle").getValue();
        var sourceid = form.getForm().findField("sourceid").getValue();
        var eventaddress = form.getForm().findField("eventaddress").getValue();

        var filters = [];

        if ($.trim(eventtitle) != null && $.trim(eventtitle) != "") {
            filters.push({ property: "eventtitle", value: $.trim(eventtitle) });
        }
        else {
            filters.push({ property: "eventtitle", value: '' });
        }

        if ($.trim(sourceid) != null && $.trim(sourceid) != "") {
            filters.push({ property: "sourceid", value: sourceid });
        }
        else {
            filters.push({ property: "eventsource", value: '' });
        }

        if ($.trim(eventaddress) != null && $.trim(eventaddress) != "") {
            filters.push({ property: "eventaddress", value: eventaddress });
        }
        else {
            filters.push({ property: "eventaddress", value: '' });
        }

        store.clearFilter(true);
        store.filter(filters);
    },

    onCitizenEventSelectOK: function (obj, record) {
        var win = obj.up('window');
        var grid = obj.up('window').down('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        this.getView().down('fieldset[name=form2]').down('hidden[name=citizenid]').setValue(record.get('citizenid'));
        this.getView().down('fieldset[name=form2]').down('textfield[name=title]').setValue(record.get('eventtitle'));
        this.getView().down('fieldset[name=form2]').down('datefield[name=registertime]').setValue(Ext.util.Format.date(record.get('foundtime'), "Y-m-d"));
        this.getView().down('fieldset[name=form2]').down('textfield[name=address]').setValue(record.get('eventaddress'));
        this.getView().down('fieldset[name=form2]').down('textfield[name=people]').setValue(record.get('complainant'));
        this.getView().down('fieldset[name=form2]').down('textfield[name=taskclassid]').setValue(record.get('srid'));
        this.getView().down('fieldset[name=form2]').down('textfield[name=content]').setValue(record.get('eventcontent'));
        if (this.getView().down('form[name=tabform]').down('imageshowpanel')) {
            this.getView().down('form[name=tabform]').down('imageshowpanel').destroy();
        }
        this.getView().down('form[name=tabform]').add({
            xtype: 'imageshowpanel',
            store: Ext.create('TianZun.store.accountmanager.accountregister.EventImageStore', { proxy: { type: 'ajax', extraParams: { citizenid: record.get('citizenid') } } }),
            margin: '0 10 10 20',
            colspan: 3,
            path: configs.CitizenServiceOriginalPath,
            width: '96%',

        }
);



        win.close();
        return false;
    },

    onLook: function (obj, record) {
        var grid = obj.up('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.accountRegisterLook', { record: record });
        this.getView().add(win);
        win.show();
    },

    onAddRegisterOK: function (button, e) {
        var win = button.up('window');
        var form = win.down('tabpanel').getActiveTab();
        var grid = this.getView().down('panel[name=visitTab]').child('grid[name=right]');
        var tree = this.getView().down('panel[name=visitTab]').child('Panel[name=treePanel]');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        var combo = this.getView().down('panel[name=visitTab]').down('combo');
        //var tree = this.getView().down('panel[name=visitTab]').down('treepanel');
        //var selectNode = tree.getSelectionModel();
        //var Node;
        //if (selectNode != null) {
        //    Node = selectNode.getSelection();
        //}
        form.submit({
            url: "api/AccountRegister/AddAccountRegister",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                combo.fireEvent('change', combo);
                //alert(Node)
                //if (Node != null && Node != "" && Node != undefined) {
                //    tree.expandNode(Node[0]);
                //    tree.expandAll();
                //}

                grid.getSelectionModel().clearSelections();
                store.reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action) {
                // win.unmask();
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    onAddRegisterEditOK: function (button, e) {
        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('panel[name=visitTab]').child('grid[name=right]');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }

        form.submit({
            url: "api/AccountRegister/EditAccountRegister",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                grid.getSelectionModel().clearSelections();
                store.reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action) {
                // win.unmask();
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    onEdit: function (button, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];
        var win = Ext.create('widget.accountRegisterEdit', { record: record });
        this.getView().add(win);
        win.show();
    },

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
        win.hide();
    },

    onEmptyEvent: function (button) {
        var grid = button.up('window').down('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();

    }
});