Ext.define('TianZun.controller.qwmanager.TeamDuty', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teamDuty',

    //添加队员任务
    onAddOK: function (button, e) {
        var view = this.getView();
        var win = button.up('window');
        var form = win.down('form');
        var pgcmp = this.getView().down('hidden[name=pagecount]');
        var timeParams = pgcmp.getValue();
        var formData = form.getValues();
        formData['sszd'] = this.getView().down('combo[name=middleteam]').getValue();
        formData['ssbc'] = this.getView().down('combo[name=group]').getValue();
        formData['personid'] = this.getView().down('hidden[name=personid]').getValue();

        if (form.isValid()) {
            if (formData['taskstarttime1'] > formData['taskendtime1']) {
                Ext.Msg.alert('提示', '开始日期不得晚于结束日期!');
                return;
            }
            if (formData['taskstarttime2'] > formData['taskendtime2']) {
                Ext.Msg.alert('提示', '开始时间不得晚于结束时间!');
                return;
            }
            formData['taskstarttime'] = formData['taskstarttime1'] + " " + formData['taskstarttime2']
            formData['taskendtime'] = formData['taskendtime1'] + " " + formData['taskendtime2']
            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });

            PostAjax({
                url: "/api/TeamDuty/AddTeamDuty",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var middleteamid = view.down('form').down('combo[name=middleteam]').getValue();
                        var groupid = view.down('form').down('combo[name=group]').getValue();
                        var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;

                        Ext.Ajax.request({
                            url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
                            method: 'get',
                            scope: this,
                            success: function (response) {
                                var records = JSON.parse(response.responseText);
                                $("#TableOne").html(records.GetTableOneMes);
                                $("#TableNext").html(records.GetTableContentMes);
                            }
                        });

                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        win.close();
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });
        }
    },

    //修改巡查区域
    onEditOK: function (button, e) {
        var view = this.getView();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var pgcmp = this.getView().down('hidden[name=pagecount]');
        var timeParams = pgcmp.getValue();
        formData['taskstarttime'] = formData['taskstarttime1'] + " " + formData['taskstarttime2']
        formData['taskendtime'] = formData['taskendtime1'] + " " + formData['taskendtime2']
        if (form.isValid()) {
            Ext.Msg.show({
                title: '正在提交',
                msg: '正在提交，请稍候...',
            });
            PostAjax({
                url: "/api/TeamDuty/ModifyUserTask",
                data: formData,
                complete: function (jqXHR, textStatus, errorThrown) {
                    Ext.Msg.close();
                    if (textStatus == "success") {
                        var middleteamid = view.down('form').down('combo[name=middleteam]').getValue();
                        var groupid = view.down('form').down('combo[name=group]').getValue();
                        var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;

                        Ext.Ajax.request({
                            url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
                            method: 'get',
                            scope: this,
                            success: function (response) {
                                var records = JSON.parse(response.responseText);
                                $("#TableOne").html(records.GetTableOneMes);
                                $("#TableNext").html(records.GetTableContentMes);
                            }
                        });

                        Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                        win.close();
                    } else {
                        Ext.Msg.show({
                            title: "错误提示",
                            icon: Ext.Msg.ERROR,
                            msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                        });
                    }
                }
            });
        }

    },

    //删除巡查区域
    onDeleteOK: function (button, e) {
        var view = this.getView();
        var win = button.up('window');
        var form = win.down('form');
        var formData = form.getValues();
        var pgcmp = this.getView().down('hidden[name=pagecount]');
        var timeParams = pgcmp.getValue();
        Ext.Msg.confirm("提示", "您确定要执行删除操作吗？", function (btn) {
            if (btn == "yes") {
                Ext.Msg.show({
                    title: '正在提交',
                    msg: '正在提交，请稍候...',
                });

                GetAjax({
                    url: "/api/TeamDuty/DeleteUserTask?usertaskid=" + formData["usertaskid"],
                    complete: function (jqXHR, textStatus, errorThrown) {
                        Ext.Msg.close();
                        if (textStatus == "success") {
                            var middleteamid = view.down('form').down('combo[name=middleteam]').getValue();
                            var groupid = view.down('form').down('combo[name=group]').getValue();
                            var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;

                            Ext.Ajax.request({
                                url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
                                method: 'get',
                                scope: this,
                                success: function (response) {
                                    var records = JSON.parse(response.responseText);
                                    $("#TableOne").html(records.GetTableOneMes);
                                    $("#TableNext").html(records.GetTableContentMes);
                                }
                            });

                            Ext.MessageBox.show({ title: "提示", msg: "操作成功！" }, setTimeout(function () { Ext.Msg.hide(); }, 1000));
                            win.close();
                        } else {
                            Ext.Msg.show({
                                title: "错误提示",
                                icon: Ext.Msg.ERROR,
                                msg: "非常抱歉！" + "保存数据时发生错误，请您与管理员联系！<br/>错误信息：" + action.response.status
                            });
                        }
                    }
                });
            }
        })
    },

    //上一周
    onPreviousWeek: function (obj) {
        var middleteamid = obj.up('form').down('combo[name=middleteam]').getValue();
        var groupid = obj.up('form').down('combo[name=group]').getValue();
        var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;

        var pgcmp = obj.up().up().down('hidden[name=pagecount]');
        var timeParams = pgcmp.getValue();
        timeParams = parseInt(timeParams) - 7;
        pgcmp.setValue(timeParams);

        Ext.Ajax.request({
            url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
            method: 'get',
            scope: this,
            success: function (response) {
                var records = JSON.parse(response.responseText);
                $("#TableOne").html(records.GetTableOneMes);
                $("#TableNext").html(records.GetTableContentMes);
            }
        });
    },

    //本周
    onTheWeek: function (obj) {
        var middleteamid = obj.up('form').down('combo[name=middleteam]').getValue();
        var groupid = obj.up('form').down('combo[name=group]').getValue();
        var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;
        var pgcmp = this.getView().down('hidden[name=pagecount]');
        pgcmp.setValue(0);
        var timeParams = pgcmp.getValue();
        Ext.Ajax.request({
            url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
            method: 'get',
            scope: this,
            success: function (response) {
                var records = JSON.parse(response.responseText);
                $("#TableOne").html(records.GetTableOneMes);
                $("#TableNext").html(records.GetTableContentMes);
            }
        });
    },

    //下一周
    onNextWeek: function (obj) {
        var middleteamid = obj.up('form').down('combo[name=middleteam]').getValue();
        var groupid = obj.up('form').down('combo[name=group]').getValue();
        var unitid = middleteamid == null ? null : groupid == null ? middleteamid : groupid;

        var pgcmp = obj.up().up().down('hidden[name=pagecount]');
        var timeParams = pgcmp.getValue();
        timeParams = parseInt(timeParams) + 7;
        pgcmp.setValue(timeParams);

        Ext.Ajax.request({
            url: configs.WebApi + 'api/TeamDuty/GetTeamDutyView?timeParams=' + timeParams + '&unitid=' + unitid,
            method: 'get',
            scope: this,
            success: function (response) {
                var records = JSON.parse(response.responseText);
                $("#TableOne").html(records.GetTableOneMes);
                $("#TableNext").html(records.GetTableContentMes);
            }
        });
    },

    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    onHide: function (button) {
        var win = button.up('window');
        win.hide();
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

});