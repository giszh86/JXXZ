Ext.define('TianZun.controller.citizenservice.StatisticsManager', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.statisticsManager',

    requires: [

    ],

    //查询月度报表
    onQueryMonthOK: function (obj, e) {
        var form = obj.up('form');
        var store = this.getView().down('tabpanel').getActiveTab().down('grid').getStore();

        var moyear = form.down('combo[name=moyear]').getValue();
        var mmonth = form.down('combo[name=mmonth]').getValue();
        var sourceid = form.down('combo[name=sourceid]').getValue();
        form.down('hidden[name=pryear]').setValue(moyear);
        form.down('hidden[name=prmonth]').setValue(mmonth);
        form.down('hidden[name=prsourceid]').setValue(sourceid);
        form.down('hidden[name=prsource]').setValue(form.down('combo[name=sourceid]').getRawValue());
        var filters = [];

        if ($.trim(moyear) != null && $.trim(moyear) != "") {
            filters.push({ property: "moyear", value: $.trim(moyear) });
        }

        if ($.trim(mmonth) != null && $.trim(mmonth) != "") {
            filters.push({ property: "mmonth", value: mmonth });
        }

        if ($.trim(sourceid) != null && $.trim(sourceid) != "") {
            filters.push({ property: "sourceid", value: sourceid });
        }


        store.clearFilter(true);
        store.filter(filters);

    },

    //查询年度报表
    onQueryYearOK: function (obj, e) {
        var form = obj.up('form');
        var yyear = form.down('combo[name=yyear]').getValue();
        var grid = form.down('grid');
        form.down('hidden[name=pryyear]').setValue(yyear);

        Ext.Ajax.request({
            url: configs.WebApi + 'api/StatisticalReport/ClassificationStatistics?year=' + yyear,
            method: 'get',
            async: false,
            success: function (response) {
                var records = JSON.parse(response.responseText);
                var yeararr = [], yeardata = '[', yearHead = '[{header:"月份",dataIndex:"月份",align:"center",flex:1,summaryType: "sum",summaryRenderer:function (value, summaryData, dataIndex) { return "合计"; } },';
                $.each(records[0], function (name, value) {
                    if (name != "月份") {
                        yearHead += '{ header: "' + name + '", dataIndex: "' + name + '",align:"center", flex: 1,summaryType: "sum",summaryRenderer:function(value,summaryData, dataIndex){ return parseInt(value);} },';
                        yeararr.push(name)
                    }
                });

                yearHead = yearHead.substr(0, yearHead.length - 1) + ']';
                yearHead = eval('(' + yearHead + ')');

                $.each(records, function (name, value) {
                    yeardata += '{ "月份": "' + value['月份'] + '",';
                    $.each(yeararr, function (name1, value1) {
                        yeardata += '"' + value1 + '":' + (value[value1] == null ? 0 : parseInt(value[value1])) + ',';
                    })
                    yeardata = yeardata.substr(0, yeardata.length - 1) + '},';
                });
                yeardata = yeardata.substr(0, yeardata.length - 1) + ']';
                yeardata = eval('(' + yeardata + ')');                
                var yearStore = Ext.create('Ext.data.Store', { data: yeardata })
                grid.setColumns(yearHead);
                grid.setStore(yearStore);
            }
        });
    },    

    //月度报表打印预览
    onPrintMonth: function (obj, e) {
        var printcontent;
        var form = obj.up('form');
        var year = form.down('hidden[name=pryear]').getValue();
        var month = form.down('hidden[name=prmonth]').getValue();
        var sourceid = form.down('hidden[name=prsourceid]').getValue();
        var source = form.down('hidden[name=prsource]').getValue();

        printcontent = year + '年';
        printcontent += month == '' ? '' : month + '月';
        printcontent += source == '' ? '全部类' : source + '类';
        printcontent = printcontent + '统计表';

        //打印预览
        var grid = form.down('grid');
        PrintPreLook(grid, printcontent, 0, 2, '80%', '10%');
    },

    //年度报表打印预览
    onPrintYear: function (obj, e) {        
        var printcontent;
        var form = obj.up('form');
        var year = form.down('hidden[name=pryyear]').getValue();
        printcontent = year + '年归类统计表';

        //打印预览
        var grid = form.down('grid');
        PrintPreLook(grid, printcontent, 0, 2, '80%', '10%');
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
        var win = button.up('window');
        var form = win.down('form');
        form.getForm().reset();
    },

});