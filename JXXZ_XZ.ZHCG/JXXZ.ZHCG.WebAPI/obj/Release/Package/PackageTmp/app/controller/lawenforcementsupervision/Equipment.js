Ext.define('TianZun.controller.lawenforcementsupervision.Equipment', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.equipment',
    requires: [
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentQuery',
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentPut',
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentOut',
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentAdd',
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentEdit',
        'TianZun.view.lawenforcementsupervision.equipment.EquipmentInfo',
    ],
    
    //查询
    onQuerysb: function (obj, e) {
        
        var win = this.getView().child("equipmentQuery");
        if (!win) {
            win = Ext.create('widget.equipmentQuery');
            this.getView().add(win);
        }
        win.show();
    },
    //查询成功
    onsubmitss: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();
        
        var devicename = form.getForm().findField("devicename").getValue();
        var devicetype = form.getForm().findField("devicetype").getValue();
        if (!form.isValid()) {
            return;
        }
        var filters = [];
        if ($.trim(devicename) != null && $.trim(devicename) != "") {
            filters.push({ property: "devicename", value: $.trim(devicename) });
        };
        if ($.trim(devicetype) != null && $.trim(devicetype) != "") {
            filters.push({ property: "devicetype", value: $.trim(devicetype) });
        };
        store.clearFilter(true);
        store.filter(filters);
        win.hide();
    },
    //设备入库
    onrkDispatch: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Equipment/GetDevicesModel?deviceid=" + record.get('deviceid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.equipmentPut', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        })
    },
    //设备入库成功
    onsubmitrk:function(obj,e){
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        //if (parseInt(formData['devicesum']) < parseInt(formData['number']) + parseInt(formData['stocknum'])) {
        //    Ext.Msg.alert("提示", "数量超出设备数量，请重新填写");
        //    return;
        //};
        //formData['foundtime'] = formData['foundtime1'] + ' ' + formData['foundtime2'];
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });

        PostAjax({
            url: 'api/Equipment/AddInstocks',
            data:formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        })
    },
    //设备出库
    onckDispatch: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Equipment/GetDevicesModel?deviceid=" + record.get('deviceid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.equipmentOut', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        })
    },
    //出库成功
    onsubmitout:function(obj,e){
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        if (parseInt(formData['stocknum']) < parseInt(formData['number'])) {
            Ext.Msg.alert("提示", "数量不足,请重新填写数量!");
            return;
        }
        //formData['foundtime'] = formData['foundtime1'] + ' ' + formData['foundtime2'];
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: 'api/Equipment/AddOutstocks',
            data:formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        })
    },
    //新增
    onAdd: function (obj, e) {
        var win = this.getView().child("EquipmentAdd");
        if (!win) {
            win = Ext.create('widget.equipmentAdd');
            this.getView().add(win);
        }
        win.show();
    },
    //设备上报成功
    onsubmit: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var formData = form.getValues();
        var store = grid.getStore();
        if (!form.isValid()) {
            return;
        }
        //formData['foundtime'] = formData['foundtime1'] + ' ' + formData['foundtime2'];
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: 'api/Equipment/AddStocks',
            data:formData,
            complete: function (jqXHR, textStatus, errorThrown)
            {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        })
    },
    //修改
    onEdit: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];

        GetAjax({
            url: "/api/Equipment/GetDevicesModel?deviceid=" + record.get('deviceid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.equipmentEdit', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        })
    },
    //编辑成功
    onsubmitxg: function (obj, e) {
        var win = obj.up('window');
        var form = win.down('form');
        var grid = this.getView().down('grid');
        var store = grid.getStore();
        var formData = form.getValues();
        if (!form.isValid()) {
            return;
        }
        formData['foundtime'] = formData['foundtime1'] + ' ' + formData['foundtime2'];
        Ext.Msg.show({
            title: '正在提交',
            msg: '正在提交，请稍候...',
        });
        PostAjax({
            url: 'api/Equipment/EditStocks',
            data:formData,
            complete: function (jqXHR, textStatus, errorThrown) {
                Ext.Msg.close();
                if (textStatus == "success") {
                    grid.getSelectionModel().clearSelections();
                    store.reload();
                    win.close();
                    Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                    });
                }
            }
        })
    },
    //关闭
    onclose: function (obj) {
        var win = obj.up('window');
        win.close();
    },
    //查看
    onLook: function (obj, e) {
        var grid = obj.up('grid');
        var asdf = this;
        var sm = grid.getSelectionModel();
        if (sm.getSelection().length == 0) {
            Ext.Msg.alert("提示", "请选择一条记录");
            return;
        } else if (sm.getSelection().length >= 2) {
            Ext.Msg.alert("提示", "只能选择一条记录");
            return;
        }
        var record = sm.getSelection()[0];
        GetAjax({
            url: "/api/Equipment/GetDevicesModel?deviceid=" + record.get('deviceid'),
            complete: function (jqXHR, textStatus, errorThrown) {
                
                if (textStatus == "success") {
                    var jsonstr = JSON.parse(jqXHR.responseText);
                    var win = Ext.create('widget.equipmentInfo', { record: jsonstr });
                    asdf.getView().add(win);
                    win.show();
                } else {
                    Ext.Msg.show({
                        title: "错误提示",
                        icon: Ext.Msg.ERROR,
                        msg: "非常抱歉！" + "查询数据时发生错误，请您与管理员联系！"
                    });
                }
            }
        })
    },
    //返回
    onback: function (obj) {
        var win = obj.up("window");
        win.close();
    },
    //清空
    onempty: function (button) {
        button.up('form').reset();
        var grid = this.getView().down('panel[name=sbgl]').child('grid');
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