Ext.define('TianZun.controller.accountmanager.AccountTask', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accountTask',

    requires: [
       'TianZun.view.accountmanager.accounttask.AccountTaskAdd',
       'TianZun.view.accountmanager.accounttask.AccountTaskEdit',
       'TianZun.view.accountmanager.accounttask.AccountTaskLook',
       'TianZun.view.accountmanager.accounttask.AccountTaskQuery',
       'TianZun.view.accountmanager.accounttask.AccountUnit',
        'TianZun.view.accountmanager.accounttask.AccountUnitLook',
    ],
    onUnitAddOK: function (obj) {
        var grid = this.getView().child('accountUnit').down('grid');
        var store = grid.getStore();
        var dataarr = new Array();
        store.each(function (obj) {
            dataarr.push(obj.getData());
        }, store);
        var strJson = JSON.stringify(dataarr);

        var formUpAdd = this.getView().child('accountTaskAdd');
        if (formUpAdd) {
            var form = this.getView().child('accountTaskAdd').down('form');
            form.getForm().findField("tz_json").setValue(strJson);
        }
        //var formUpEdit = this.getView().child('accountTaskEdit');
        //if (formUpEdit) {
        //    var form = this.getView().child('accountTaskEdit').down('form');
        //    form.getForm().findField("tz_json").setValue(strJson);
        //}
        var win = obj.up('window');
        win.close();
    },
    SetCellImage: function (value, record) {
        if (value == 1) {
            return '<img src="../../Images/images/T绿.png" style=" width:16px; height:16px;"/>';
        }
        else {
            return '<img src="../../Images/images/T灰.png" style=" width:16px; height:16px;" />';
        }
    },
    onUnitLook: function (button, e) {
        var win = this.getView().child("accountUnit");
        var form;
        if (button.up('accountTaskEdit')) {
            form = button.up('accountTaskEdit').down('form');
        }
        else {
            form = button.up('accountTaskLook').down('form');
        }

        var formData = form.getValues();
        tz_json = formData['tz_json'];
        var storeZD = "[{ header: '', dataIndex: 'zd_name', width: 175 },";;
        var arrTypeZDText = form.down('textarea[name=sszd]').getValue().split(',');
        Ext.each(arrTypeZDText, function (rec) {
            storeZD += "{header: '" + rec + "', dataIndex: '" + rec + "', align: 'center', flex: 1,renderer: 'SetCellImage'},"
        });
        storeZD = storeZD.substring(0, storeZD.length - 1) + "]";
        if (!win) {
            win = Ext.create('widget.accountUnitLook', { record: tz_json, storeZD: storeZD });
            this.getView().add(win);
        }
        win.show();
    },
    onUnit: function (button, e) {
        var win = this.getView().child("accountUnit");
        var windowUpAdd = button.up('accountTaskAdd');
        var tz_json;
        var storeZD;
        if (windowUpAdd) {
            flag = 1;
            var form = button.up('accountTaskAdd').down('form');
            var formData = form.getValues();
            tz_json = formData['tz_json'];
            storeZD = formData['storeZD'];
        }
        //var windowUpEdit = button.up('accountTaskEdit');
        //if (windowUpEdit) {
        //    flag = 2;
        //    var form = button.up('accountTaskEdit').down('form');
        //    var arrTypeZDText = form.down('tagfield[name=TypeArrZD]').getRawValue().split(',');
        //    storeZD = "[{ header: '', dataIndex: 'zd_name', width: 175 },";
        //    Ext.each(arrTypeZDText, function (rec) {

        //        storeZD += "{header: '" + rec + "', dataIndex: '" + rec + "', align: 'center', flex: 1,renderer: 'SetCellImage'},"
        //    });
        //    storeZD = storeZD.substring(0, storeZD.length - 1) + "]";
        //    form.getForm().findField("storeZD").setValue(storeZD);
        //    var formData = form.getValues();
        //    tz_json = formData['tz_json'];
        //}
        var storeType;
        if (tz_json == "" || tz_json == null || tz_json == undefined) {
            storeType = "[";
            var form;
            if (flag == 1) {
                form = button.up('accountTaskAdd').down('form');
            }
            else {
                form = button.up('accountTaskEdit').down('form');
            }
            var arrTypeText = form.down('tagfield[name=TypeArr]').getRawValue().split(',');
            var arrTypeZDText = form.down('tagfield[name=TypeArrZD]').getRawValue().split(',');

            Ext.each(arrTypeText, function (recc) {
                storeType += '{"zd_name":"' + recc + '",';
                storeZD = "[{ header: '', dataIndex: 'zd_name', width: 175 },";
                Ext.each(arrTypeZDText, function (rec) {

                    storeZD += "{header: '" + rec + "', dataIndex: '" + rec + "', align: 'center', flex: 1,renderer: 'SetCellImage'},"

                    storeType += '"' + rec + '":1,';

                });
                storeType += " },";
            });

            storeZD = storeZD.substring(0, storeZD.length - 1) + "]";
            storeType = storeType.substring(0, storeType.length - 1) + "]";

            if (flag == 1) {
                var formE = button.up('accountTaskAdd').down('form');
                formE.getForm().findField("storeZD").setValue(storeZD);
            }
            else {
                var formE = button.up('accountTaskEdit').down('form');
                formE.getForm().findField("storeZD").setValue(storeZD);
            }
        }
        if (storeType != null && storeType != "" && storeType != undefined) {
            tz_json = storeType;
        }
        if (!win) {
            win = Ext.create('widget.accountUnit', { record: tz_json, storeZD: storeZD });
            this.getView().add(win);
        }
        win.show();
    },
    onLook: function (button, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }

        var record = sm.getSelection()[0];

        var win = Ext.create('widget.accountTaskLook', { record: record });
        me.getView().add(win);

        win.show();

        //GetAjax({
        //    url: 'api/AccountTask/GetTaskClassByTaskID?TaskID=' + record.get('taskid'),
        //    complete: function (jqXHR, textStatus, errorThrown) {
        //        if (textStatus == "success") {
        //            var typeData = jQuery.parseJSON(jqXHR.responseText);
        //            var TypeArr = [];
        //            $.each(typeData, function (i, item) {
        //                TypeArr.push(item["classid"]);
        //            });

        //            var win = Ext.create('widget.accountTaskLook', { record: record, TypeArr: TypeArr });
        //            me.getView().add(win);

        //            win.show();
        //        }
        //    }
        //});
    },

    onAdd: function (button, e) {
        var win = this.getView().child("accountTaskAdd");
        if (!win) {
            win = Ext.create('widget.accountTaskAdd');
            this.getView().add(win);
        }
        win.show();
    },
    onAddTaskOK: function (button, e) {

        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('panel[name=visitTab]').child('grid');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        var formData = form.getValues();

        var starttime = formData['starttime']
        var endtime = formData['endtime']
        if (starttime > endtime)
        {
            Ext.Msg.alert("提示", "任务期限开始时间不得晚于结束时间！");
            return;
        }
        var startyear = new Date(starttime).getFullYear();
        var endyear = new Date(endtime).getFullYear();
        var taskyear = formData['taskyear'];
        if (startyear != taskyear || endyear != taskyear)
        {
            Ext.Msg.alert("提示", "任务所属年度要与任务期限相互匹配！");
            return;
        }
        //var starttime = formData['starttime'] + ' ' + formData['starttime1'];
        //var endtime = formData['endtime'] + ' ' + formData['endtime1'];
        //formData["starttime"] = starttime;
        //formData["endtime"] = endtime;
        formData["sszd"] = form.down('tagfield[name=TypeArrZD]').getRawValue();
        formData["ssrw"] = form.down('tagfield[name=TypeArr]').getRawValue();
     
        PostAjax({
            url: 'api/AccountTask/AddAccountTask',
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
    onEdit: function (button, e) {
        var me = this;
        var grid = this.getView().down('panel[name=visitTab]').child('grid');

        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        GetAjax({
            url: 'api/AccountTask/GetTaskClassByTaskID?TaskID=' + record.get('taskid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var typeData = jQuery.parseJSON(jqXHR.responseText);
                    var TypeArr = [];
                    $.each(typeData, function (i, item) {
                        TypeArr.push(item["classid"]);
                    });
                    var win = Ext.create('widget.accountTaskEdit', { record: record, TypeArr: TypeArr });
                    me.getView().add(win);
                    win.show();
                    //GetAjax({
                    //    url: 'api/AccountTask/GetTaskZDByTaskID?TaskID=' + record.get('taskid'),
                    //    complete: function (jqXHR, textStatus, errorThrown) {
                    //        if (textStatus == "success") {
                    //            var typeData = jQuery.parseJSON(jqXHR.responseText);

                    //            var TypeArrZD = [];
                    //            $.each(typeData, function (i, item) {
                    //                TypeArrZD.push(item["sszd"]);
                    //            });
                    //            var win = Ext.create('widget.accountTaskEdit', { record: record, TypeArr: TypeArr, TypeArrZD: TypeArrZD });
                    //            me.getView().add(win);
                    //            win.show();
                    //        }
                    //    }
                    //});



                }
            }
        });
    },
    onEditTaskOK: function (button, e) {

        var win = button.up('window');
        var form = win.down('form');
        var grid = this.getView().down('panel[name=visitTab]').child('grid');
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        var formData = form.getValues();
        var starttime = formData['starttime']
        var endtime = formData['endtime']
        if (starttime > endtime)
        {
            Ext.Msg.alert("提示", "任务期限开始时间不得晚于结束时间！");
            return;
        }
        var startyear = new Date(starttime).getFullYear();
        var endyear = new Date(endtime).getFullYear();
        var taskyear = formData['taskyear'];
        if (startyear != taskyear || endyear != taskyear)
        {
            Ext.Msg.alert("提示", "任务所属年度要与任务期限相互匹配！");
            return;
        }

        var tz_type = form.getForm().findField("tz_type").getValue();
        
        //var starttime = formData['starttime'] + ' ' + formData['starttime1'];
        //var endtime = formData['endtime'] + ' ' + formData['endtime1'];
        //formData["starttime"] = starttime;
        //formData["endtime"] = endtime;
        // formData["sszd"] = form.down('tagfield[name=TypeArrZD]').getRawValue();
        PostAjax({
            url: 'api/AccountTask/EditAccountTask',
            data: formData,
            complete: function (jqXHR, textStatus) {
                win.unmask();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1500));
                    win.close();

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
    onQuery: function (obj, e) {
        var win = this.getView().child("accountTaskQuery");
        if (!win) {
            win = Ext.create('widget.accountTaskQuery');
            this.getView().add(win);
        }
        win.show();
    },
    ontaskQueryOK: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('panel[name=visitTab]').child('grid').getStore();

        var taskname = form.getForm().findField("taskname").getValue();
        var taskyear = form.getForm().findField("taskyear").getValue();
        var tz_type = form.getForm().findField("tz_type").getValue();
        var starttime = form.getForm().findField("starttime").getValue();
        var endtime = form.getForm().findField("endtime").getValue();

        var filters = [];

        if ($.trim(taskname) != null && $.trim(taskname) != "") {
            filters.push({ property: "taskname", value: $.trim(taskname) });
        }
        if ($.trim(taskyear) != null && $.trim(taskyear) != "") {
            filters.push({ property: "taskyear", value: $.trim(taskyear) });
        }
        if ($.trim(starttime) != null && $.trim(starttime) != "") {
            filters.push({ property: "starttime", value: starttime });
        }
        if ($.trim(endtime) != null && $.trim(endtime) != "")
        {
            filters.push({ property: "endtime", value: endtime });
        }

        if ($.trim(tz_type) != null && $.trim(tz_type) != "") {
            filters.push({ property: "tz_type", value: tz_type });
        }
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    onEmpty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=visitTab]').child('grid');
        var store = grid.getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.hide();
    },
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();

    }
});