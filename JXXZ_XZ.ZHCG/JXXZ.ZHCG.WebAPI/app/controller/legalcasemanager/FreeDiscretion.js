Ext.define('TianZun.controller.legalcasemanager.FreeDiscretion', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.freeDiscretion',

    requires: [
        'TianZun.view.legalcasemanager.functionconfig.FreeDiscretionDetail',
        'TianZun.view.legalcasemanager.functionconfig.FreeDiscretionQuery',
    ],

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
        var win = this.getView().child("freeDiscretionDetail", { record: record });

        if (!win)
        {
            win = Ext.create('widget.freeDiscretionDetail', { record: record });
            this.getView().add(win);
        }

        win.show();
    },

    //查询
    onQuery: function (obj, e)
    {
        var win = this.getView().child("freeDiscretionQuery");
        if (!win)
        {
            win = Ext.create('widget.freeDiscretionQuery');
            this.getView().add(win);
        }
        win.show();
    },

    //查询提交
    onQueryOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('grid').getStore();
        var powername = form.getForm().findField("powername").getValue();
        var filters = [];

        if ($.trim(powername) != null && $.trim(powername) != "")
        {
            filters.push({ property: "powername", value: $.trim(powername) });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },

    //清空
    onEmpty: function (button)
    {
        button.up('form').reset();
        var grid = this.getView().down('grid')
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
    onClose: function (obj)
    {
        var win = obj.up('window');
        win.close();
    },
})