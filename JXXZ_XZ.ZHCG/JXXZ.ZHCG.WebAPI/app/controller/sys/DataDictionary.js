Ext.define('TianZun.controller.sys.DataDictionary', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataDictionary',
    requires: [
      'TianZun.view.sys.DataDictionaryAdd',
      'TianZun.view.sys.DataDictionaryEdit',
    ],

    onTreeRender: function (tree) {
        var thisview = this.getView();

        //方式一：页面上先加载出过滤后的数据，如果value不写死，可以load方法取出第一个
        //var store = Ext.create('TianZun.store.sys.DataDictionaryListStore');
        //var filter = [];
        //filter.push({ property: "type", value: 'case_type_car' });
        //thisview.child('gridpanel').getStore().filter(filter);

        //方式二：页面上先加载出全部数据，然后再次加载过滤后的数据
        tree.getStore().on("load", function (key, value) {
            tree.getEl().query('.x-grid-item')[0].click();
        });
        
    },
    
    //监控专题树列表
    onTreeItemClick: function (tree, record) {
      
        var gridStore = this.getView().child('gridpanel').getStore();
        var ddid = record.get('ddid');
        var zdid = record.get('zdid');
        var text = record.get('text');
        //alert(ddid + "----" + zdid + "----" + text);
        var a = ddid;
        var b = zdid;
        if (ddid == 'type_bank' && text != '银行类型') {
            a = 'type_accountname';
        } else if (ddid == 'type_accountname') {
            a = 'type_account';
        } else if (ddid == 'type_yhrw_wtdl' && text != '养护问题大类') {
            a = 'type_yhrw_wtxl';
        } else if (ddid == 'type_account' || ddid == 'type_yhrw_wtxl') {
           
        } else {
            b = "";
        }


        var filter = [];
        if ($.trim(a) != null && $.trim(a) != "") {
            filter.push({ property: "type", value: a });
        }
        if ($.trim(b) != null && $.trim(b) != "") {
            filter.push({ property: "zdid", value: b });
        }

        gridStore.clearFilter(true);
        gridStore.filter(filter);
    },



    onAdd: function (obj, e) {
        //var win = Ext.create('widget.dataDictionaryAdd');
        //this.getView().add(win);
        //win.show();

        var tree = this.getView().child('treepanel');
        if (tree.getSelectionModel().getSelection().length==0) {
            Ext.Msg.alert("提示", "请先选择左边字典类型！");
            return;
        }
        var record = tree.getSelectionModel().getSelection()[0];
       
        var ddid = record.get('ddid');
        var zdid = record.get('zdid');
        var text = record.get('text');
        var remark = record.get('remark');
        var length = 0;
        if (record.get('children') != null) {
            length = record.get('children').length;
        }
        var ifag = true;

        if (length == 0 || ddid == 'type_account' || ddid == 'type_yhrw_wtxl' ) {
            Ext.Msg.alert("提示", "该节点下不能添加数据！");
            return;
        } else {
            var a = ddid;
            var b = text;
            var c = zdid;
            if (ddid == 'type_bank' && text != '银行类型') {
                a = 'type_accountname';
            } else if (ddid == 'type_accountname') {
                a = 'type_account';
            } else if (ddid == 'type_yhrw_wtdl' && text != '养护问题大类') {
                a = 'type_yhrw_wtxl';
            }
            var win = Ext.create('widget.dataDictionaryAdd', { record: record, a: a, b: b, c: c });
            this.getView().add(win);
            win.show();
        }
    },

    onAddOK: function (obj, e) {
        var me = this;

        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/DataDictionary/AddDataDictionary',
            data: form.getValues(),
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();

                    var treeStore = me.getView().child('treepanel').getStore();
                    treeStore.reload();

                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.Msg.alert("提示", "操作失败！");
                }
            }
        });
    },

    onEdit: function (obj, e) {
        var grid = this.getView().child('gridpanel');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        var win = Ext.create('widget.dataDictionaryEdit', { record: record });
        this.getView().add(win);

        win.show();


    },

    onEditOK: function (obj, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();

        var win = obj.up('window');
        var form = win.down('form');

        if (!form.isValid()) {
            return;
        }

        grid.mask();    //马赛克

        PostAjax({
            url: 'api/DataDictionary/EditDataDictionary',
            data: form.getValues(),
            complete: function (jqXHR, textStatus, errorThrown) {
                grid.unmask();

                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();

                    var treeStore = me.getView().child('treepanel').getStore();
                    treeStore.reload();

                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                } else {
                    store.reload();
                    Ext.Msg.alert("提示", "操作失败！");
                }
            }
        });
    },


    onDelete: function (obj, e) {
        var me = this;
        var grid = this.getView().child('gridpanel');
        var store = grid.getStore();
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask("正在处理中,请稍候.....");

                PostAjax({
                    url: 'api/DataDictionary/DeleteDataDictionary?type=' + record.get('zd_type') + '&id=' + record.get('zd_id'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();
                        if (textStatus == "success") {
                            grid.getSelectionModel().clearSelections();
                            store.reload();

                            var treeStore = me.getView().child('treepanel').getStore();
                            treeStore.reload();

                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else {
                            store.reload();
                            Ext.Msg.alert("提示", "操作失败！");
                        }
                    }
                });
            }
        });
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.close();
    },

    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=todoPanel]').child('gridpanel');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
});