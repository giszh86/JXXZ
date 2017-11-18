Ext.define('TianZun.controller.qwmanager.Checkin', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.checkin',
    requires: [
        'TianZun.view.qwmanager.checkin.CheckinQuery',
    ],
    //查询
    onqueryable: function (obj, e) {
        var win = this.getView().child('CheckinQuery');
        if (!win) {
            win = Ext.create('widget.checkinQuery');
            this.getView().add(win);
        }
        win.show();
    },
    //查询成功
    onsubmit: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();

        var unitid = form.getForm().findField("sszd").getValue();
        var displayname = form.getForm().findField("displayname").getValue();
        var taskstarttime = form.getForm().findField("taskstarttime").getValue();
        var qdzt = form.getForm().findField("stime").getValue();
        var qtzt = form.getForm().findField("etime").getValue();
        var filters = [];
        if ($.trim(unitid) != null && $.trim(unitid) != "") {
            filters.push({ property: "unitid", value: unitid });
        }
        if ($.trim(displayname) != null && $.trim(displayname) != "") {
            filters.push({ property: "displayname", value: displayname });
        }
        if ($.trim(taskstarttime) != null && $.trim(taskstarttime) != "") {
            filters.push({ property: "taskstarttime", value: taskstarttime });
        }
        if (typeof qdzt == "number") {
            filters.push({ property: "qdzt", value: qdzt });
        }

        if (typeof qtzt == "number") {
            filters.push({ property: "qtzt", value: qtzt });
        }
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
        var grid = this.getView().down('panel[name=qdpanel]').child('grid');
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