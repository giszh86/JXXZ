Ext.define('TianZun.controller.qwmanager.PatrolLog', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.patrolLog',
    requires: [
        'TianZun.view.qwmanager.inspectionlog.InspectionLogQuery',
    ],

    //查询
    onqueryable: function (obj, e) {
        
        var win = this.getView().child('inspectionLogQuery');
        if (!win) {
            win = Ext.create('widget.inspectionLogQuery');
            this.getView().add(win);
        }
        win.show();
    },
    //查询成功
    onsubmit: function (obj,e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var unitid = form.getForm().findField("unitid").getValue();
        var username = form.getForm().findField("username").getValue();
        //var reporttime = form.getForm().findField("reporttime").getValue();
        var checkid = form.getForm().findField("checkid").getValue();
        var stime = form.getForm().findField("stime").getValue();
        var etime = form.getForm().findField("etime").getValue();
        //var isfound = form.getForm().findField("isfound").getValue();
        var filters = [];
        if ($.trim(unitid) != null && $.trim(unitid) != "") {
            filters.push({ property: "unitid", value: $.trim(unitid) });
        };
        if ($.trim(username) != null && $.trim(username) != "") {
            filters.push({ property: "username", value: $.trim(username) });
        };
        //if ($.trim(reporttime) != null && $.trim(reporttime) != "") {
        //    filters.push({ property: "reporttime", value: $.trim(reporttime) });
        //};
        if ($.trim(checkid) != null && $.trim(checkid) != "") {
            filters.push({ property: "checkid", value: $.trim(checkid) });
        };
        if ($.trim(stime) != null && $.trim(stime) != "") {
            filters.push({ property: "stime", value: stime });
        }
        if ($.trim(etime) != null && $.trim(etime) != "") {
            filters.push({ property: "etime", value: etime });
        }
        //if ($.trim(isfound) != null && $.trim(isfound) != "") {
        //    filters.push({ property: "isfound", value: $.trim(isfound) });
        //};
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //取消
    onclose: function (obj) {
        var win = obj.up('window');
        win.close();
    },
    //清空
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=xcpanel]').child('grid');
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