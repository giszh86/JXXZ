Ext.define('TianZun.controller.legalcasemanager.CaseStatisticalReport', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caseStatisticalReport',

    //一般案件查询
    onQueryOK:function(obj){
        var activetab = this.getView().down('tabpanel').getActiveTab();
        var title = activetab.title;
        var store = activetab.down('grid').getStore();

        var ybaj_year, jyaj_year, wtps_stime, wtps_etime, wtcl_stime, wtcl_etime, wfjz_year,filters = [];
        if (title == '一般案件') {
            ybaj_year = activetab.down('combo').getValue();
            if ($.trim(ybaj_year) != null && $.trim(ybaj_year) != "") {
                filters.push({ property: "commonsitedatetime", value: $.trim(ybaj_year) });
            }
        }
        else if (title == '简易案件')//简易案件查询
        {
            wtps_stime = activetab.down('combo').getValue();
            if ($.trim(wtps_stime) != null && $.trim(wtps_stime) != "") {
                filters.push({ property: "simplesitedatetime", value: $.trim(wtps_stime) });
            }
        }
        else if (title == '违停拍摄') {//违停拍摄查询
            wtps_stime = activetab.down('datefield[name=stime]').getValue();
            wtps_etime = activetab.down('datefield[name=etime]').getValue();
        }
        else if (title == '违停处理') {//违停处理查询
            wtcl_stime = activetab.down('datefield[name=stime]').getValue();
            wtcl_etime = activetab.down('datefield[name=etime]').getValue();
        }
        else {//违法建筑查询
            wfjz_year = activetab.down('combo').getValue();
            if ($.trim(wfjz_year) != null && $.trim(wfjz_year) != "") {
                filters.push({ property: "ybaj_year", value: $.trim(wfjz_year) });
            }
        }

        store.clearFilter(true);
        store.filter(filters);
    },

    //打印预览
    onPrintMonth: function (obj) {        
        var grid = obj.up('tabpanel') == null ? obj.up('form').down('grid') : obj.up('tabpanel').getActiveTab().down('grid');
        var activetab = obj.up('tabpanel').getActiveTab();
        var year='';
        var bgntime='';
        var endtime='';
        var printcontent = '';
        if (activetab.title == '一般案件')
        {
            year = Ext.getCmp('CommonCaseYear').getValue();
            printcontent = year + "年一般案件统计报表";
            PrintPreLook(grid, printcontent, 0, 1, '90%', '5%');
        }
        else if (activetab.title == '简易案件')
        {
            year = Ext.getCmp('SimpleCaseYear').getValue();
            printcontent = year + "年简易案件统计报表";
            PrintPreLook(grid, printcontent, 0, 2, '90%', '5%');
        }
        else if (activetab.title == '违停拍摄')
        {
            bgntime = Ext.getCmp('illCamBgnTime').getValue();
            endtime = Ext.getCmp('illCamEndTime').getValue();
            if (bgntime == null && endtime == null)
            {
                printcontent = "违停拍摄统计报表";
            }
            else
            {
                printcontent = bgntime + '至' + endtime + "违停拍摄统计报表";
            }
            PrintPreLook(grid, printcontent, 0, 2, '90%', '5%');
        }
        else if (activetab.title == '违停处理')
        {
            bgntime = Ext.getCmp('illStopBgnTime').getValue();
            endtime = Ext.getCmp('illStopEndTime').getValue();
            if (bgntime == null && endtime == null)
            {
                printcontent = "违停处理统计报表";
            }
            else
            {
                printcontent = bgntime + '至' + endtime + "违停处理统计报表";
            }
            PrintPreLook(grid, printcontent, 0, 2, '90%', '5%');
        }
        else
        {
            year = Ext.getCmp('IllBuildYear').getValue();
            printcontent = year + "年违法建筑统计报表";
            PrintPreLook(grid, printcontent, 0, 2, '90%', '5%');
        }
    },


    //关闭弹窗
    onClose: function (obj) {
        var win = obj.up('window');
        win.close();
    },

    //隐藏弹窗
    onHide: function (obj) {
        var win = obj.up('window');
        win.hide();
    },

    //重置搜索条件
    onEmpty: function (button) {
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();
        var filter = [{

        }];
        store.clearFilter(true);
        store.filter(filter);
        store.load();
        var win = button.up('window');
        win.close();
    },
});