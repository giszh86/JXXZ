Ext.define('TianZun.controller.monitorproject.Monitorproject', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitorproject',
    requires: [
        'TianZun.view.monitorproject.MonitorItemDetail',
        'TianZun.view.monitorproject.MonitorItemAdd',
        'TianZun.view.monitorproject.MonitorItemEdit',
        'TianZun.view.monitorproject.MonitorProAdd',
        'TianZun.view.monitorproject.MonitorProDetail',
        'TianZun.view.monitorproject.MonitorProEdit',
        'TianZun.view.monitorproject.MonitorItemQuery',
    ],
   
    onTreeRender: function (tree)
    {
        var me = this;
        var view = me.getView();
        var treestore = Ext.create('TianZun.store.monitorproject.MonitorTreeStore');
        var gridStore = this.getView().child('gridpanel').getStore();

        //初始化store
        treestore.on("load", function ()
        {
            var firstChild = tree.getRootNode().getChildAt(0);
            tree.getSelectionModel().select(firstChild);
            gridStore.getProxy().url = "api/MonitorProject/GetMonitorTableList?unitid=" + firstChild.get('unitid') + '&&path=' + firstChild.get('path');
            gridStore.load();
        });
        tree.bindStore(treestore);
        treestore.load();
    },

    //监控专题树列表
    onTreeItemClick: function (tree, record)
    {   
        var gridStore = this.getView().child('gridpanel').getStore();
        gridStore.getProxy().url = "api/MonitorProject/GetMonitorTableList?unitid=" + record.get('unitid')+'&&path='+record.get('path');
        gridStore.reload();
    },

    //监控专题树双击
    onTreeItemDbClick:function(tree,record)
    {
        var me = this;
        var win = Ext.create('widget.monitorProEdit', { record: record });
        me.getView().add(win);
        win.show();
    },

    //查看监控专题
    onDetialPro: function (obj,e)
    {
        var tree = this.getView().child('treepanel');

        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];
        var me = this;
        GetAjax({
            url: 'api/MonitorProject/GetMonitorDetail?unitid=' + record.get('unitid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.monitorProDetail', { record: record });
                    me.getView().add(win);
                    win.show();
                }
            }
        });
    },

    //列表双击打开查询按钮
    onGridItemDbClick: function (grid, record)
    {
        var me = this;
        GetAjax({
            url: 'api/MonitorProject/GetGridItem?unitid=' + record.get('unitid') + '&&cameraid=' + record.get('cameraid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.monitorItemEdit', { record: record, result: jsonstr });
                    me.getView().add(win);
                    win.show();
                }
            }
        });
    },

    //监控专题修改
    onEditPro:function(obj,e)
    {
        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];
        var me = this;
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var win = Ext.create('widget.monitorProEdit', { record: record });
        this.getView().add(win);

        win.show();
    },

    onEditProOK: function (button, e)
    {
        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];

        var store = tree.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        form.submit({
            url: "api/MonitorProject/EditMonitorePro",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action)
            {
                tree.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action)
            {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //监控专题添加
    onAddRro: function (obj, e) {
        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];
        
        if (record.get('depth') == 3)
        {
            Ext.Msg.alert("提示", "该专题下不能进行添加");
            return;
        }
        var me = this;
        var win = Ext.create('widget.monitorProAdd', { record: record });
        this.getView().add(win);

        win.show();
    },

    onAddRroOK: function (button, e) {
        var tree = this.getView().child('treepanel');
        var sm = tree.getSelectionModel();
        var record = sm.getSelection()[0];
        
        var store = tree.getStore();
        var win = button.up('window');
        var form = win.down('form');
        if (record.childNodes.length > 0)
        {
            var num = record.childNodes.length - 1;
            var seq = record.childNodes[num].get('seq') + 1;
            if (!form.isValid())
            {
                return;
            }
            var formData = form.getValues();
            if (record.get('depth') == 1)
            {
                form.getForm().findField("parentid").setValue('0');
                form.getForm().findField("seq").setValue(seq);
                form.getForm().findField("path").setValue('/' + seq + '/');
            }
            else
            {
                var path = record.childNodes[num].get('path');
                var parentid = path.split('/')[1];
                form.getForm().findField("parentid").setValue(parentid);
                form.getForm().findField("seq").setValue(seq);
                form.getForm().findField("path").setValue('/' + parentid + '/' + seq + '/');
            }
        }
        else
        {
            if (record.get('depth') == 1)
            {
                form.getForm().findField("parentid").setValue('0');
                form.getForm().findField("seq").setValue('1');
                form.getForm().findField("path").setValue('/1/');
            }
            else
            {
                form.getForm().findField("seq").setValue('1');
                var pa = record.get('path');
                form.getForm().findField("parentid").setValue(pa.split('/')[1]);
                form.getForm().findField("path").setValue('/' + pa.split('/')[1]+ '/1/');
            }
        }
        form.submit({
            url: "api/MonitorProject/AddMonitorPro",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action) {
                tree.getStore().reload();
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
    },

    //监控专题删除
    onDeletePro:function(obj,e)
    {
        var grid = this.getView().child('treepanel');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
        if (record == null || record.length == 0 || record.get('depth') == 1)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        if (record.childNodes.length > 0)
        {
            Ext.Msg.alert("提示","请先删除下级监控专题！");
            return;
        }
        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                grid.mask();    //马赛克
                PostAjax({
                    url: "/api/MonitorProject/DeleteMonitorPro?unitid=" + record.get('unitid'),
                    complete: function (jqXHR, textStatus, errorThrown) {
                        grid.unmask();
                        if (jqXHR.responseText == "success")
                        {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.Msg.alert("提示","操作成功！", setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        }
                        else if (jqXHR.responseText == "failure")
                        {
                            store.reload();
                            Ext.Msg.alert( "提示", "请先删除此专题下的监控元素！" );
                        }
                    }
                });
            }
        });
    },

    //监控专题元素添加
    onAddItem: function (button, e)
    {
        var grid = this.getView().child('treepanel');
        var store = grid.getStore();

        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
       
        if (record.get('depth') == 1 || record.get('depth') == 2)
        {
            Ext.Msg.alert("提示", "请选择一条监控专题");
            return;
        }
        var win = Ext.create('widget.monitorItemAdd');
        this.getView().add(win);

        win.show();
    },

    //监控专题元素添加-确认
    onAddItemOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().child('treepanel');
        var store = grid.getStore();
        var sm = grid.getSelectionModel();
        var record = sm.getSelection()[0];
        var unitid = record.get('unitid');
        var records = Ext.getCmp("treeMenuId").getView().getChecked();
        var length = records.length;
        var units = [];
        var parentid='';
        var cameraid='';
        var childid = '';
        var temp;
        Ext.Array.each(records, function (rec)
        {
            if (rec.childNodes.length == 0 && rec.get('cameraid') != null && rec.get('cameraid').length > 0)
            {
                parentid = rec.get('parentid');
                cameraid += rec.get('cameraid')+',';
                childid += rec.get('parentid')+',';
            }
        });
        if (cameraid != null && cameraid.length>0)
        {
            temp = { childid: childid, unitid: unitid, cameraid: cameraid };
        }
        if (temp != undefined)
        {
            units.push(temp);
        }
        var json = JSON.stringify(units);
        if (units.length == 0)
        {
            Ext.Msg.alert("提示", "请选择具体的监控视频");
            return;
        }
        $.ajax({
            url: "api/MonitorProject/AddMonitorItem",
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                json: units
            }),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    grid.getStore().reload();
                    //tabgrid.getStore().reload();
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

    //监控专题元素编辑
    onEditItem: function (button, e)
    {
        var me = this;
        var grid = this.getView().child('gridpanel');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0)
        {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: 'api/MonitorProject/GetGridItem?unitid=' + record.get('unitid') + '&&cameraid=' + record.get('cameraid'),
            complete: function (jqXHR, textStatus, errorThrown)
            {
                if (textStatus == "success")
                {
                    var win = Ext.create('widget.monitorItemEdit', { record: record });
                    me.getView().add(win);
                    win.show();
                }
            }
        });
    },

    //监控专题元素编辑-确认
    onEditItemOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        if (!form.isValid())
        {
            return;
        }

        form.submit({
            url: "api/MonitorProject/EditMonitorItem",
            method: "POST",
            waitTitle: "正在提交",
            waitMsg: "正在提交，请稍候...",
            success: function (form, action)
            {
                grid.getStore().reload();
                win.close();
                Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
            },
            failure: function (form, action)
            {
                Ext.Msg.show(
                {
                    title: "错误提示",
                    icon: Ext.Msg.ERROR,
                    msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                });
            }
        });
    },

    //监控专题元素删除
    onDeleteItem: function (obj,e)
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

        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn)
        {
            if (btn == "yes")
            {
                grid.mask();    //马赛克
                PostAjax({
                    url: "/api/MonitorProject/DeleteMonitorItem?unitid=" + record.get('unitid') + '&&cameraid=' + record.get('cameraid'),
                    complete: function (jqXHR, textStatus, errorThrown)
                    {
                        grid.unmask();

                        if (textStatus == "success")
                        {
                            grid.getSelectionModel().clearSelections();
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                        } else
                        {
                            store.reload();
                            Ext.MessageBox.show({ title: "提示", msg: "操作失败！" });
                        }
                    }
                });
            }
        });
    },

    //监控专题元素查看
    onMonitorItemQuery: function (obj,e)
    {
        var win = Ext.create('widget.monitorItemQuery');
        this.getView().add(win);
        win.show();
    },
    onQueryItemOK: function (obj, e)
    {
        var win = obj.up('window');
        var form = win.down('form');
        var store = Ext.getCmp("treeMenuId").getView().getStore();
        var filters = [];
        var unitname = form.getForm().findField("unitname").getValue();
        
        if ($.trim(unitname) != null && $.trim(unitname) != "")
        {
            filters.push({ property: "unitname", value: unitname });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //关闭
    onClose: function (obj)
    {
        var win = obj.up('window');
        win.close();
    },

    //清空
    onEmpty: function (button)
    {
        button.up('form').reset();
        var grid = Ext.getCmp("treeMenuId").getView();
        var store = grid.getStore();
        var filter = [{}];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
})