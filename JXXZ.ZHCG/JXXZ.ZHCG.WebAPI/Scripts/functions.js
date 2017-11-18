function PostAjax(options) {
    if (options.data == undefined)
    {
        options.data = null;
    }

    $.ajax({
        method: "Post",
        url: configs.WebApi + options.url,
        data: options.data,
        contentType: 'application/x-www-form-urlencoded',
        complete: function (jqXHR, textStatus, errorThrown) {
            options.complete(jqXHR, textStatus, errorThrown);
        }
    });
}

function GetAjax(options) {
    $.ajax({
        method: "Get",
        url: configs.WebApi + options.url,
        complete: function (jqXHR, textStatus, errorThrown) {
            options.complete(jqXHR, textStatus, errorThrown);
        }
    });
}

function GetPermissions(successFunction) {
    GetAjax({
        url: 'api/Permission/GetPermissionsByUserID?userID=' + $.cookie("USER_ID"),
        complete: function (jqXHR, textStatus, errorThrown) {
            if (textStatus == "success") {
                configs.Permissions = jQuery.parseJSON(jqXHR.responseText);

                if (successFunction != undefined || successFunction != null) {
                    successFunction();
                }
            }
        }
    });
}

function FilterStore(store, filters) {

    store.clearFilter();

    if (filters.length > 0)
        store.filter(filters);
    else
        store.load();
}

function Mask() {
    if (Ext.ComponentQuery.query('viewport').length > 0)
    {
        Ext.ComponentQuery.query('viewport')[0].mask();
    }
}

function UnMask() {
    if (Ext.ComponentQuery.query('viewport').length > 0) {
        Ext.ComponentQuery.query('viewport')[0].unmask();
    }
}

//判断某个值是否在数组中
//arr:数组
//value:所包含值
//type:1数字2字符串
function ValueInArr(arr, value, type) {
    for (var i = 0; i < arr.length; i++) {
        var arrvalue = type == 1 ? parseInt(arr[i]) : arr[i]
        if (arrvalue == value) {
            return true;
        }
    }
    return false;
}

//获取当前日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHour = date.getHours();
    var strMinute = date.getMinutes();
    var strSecond = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
    }
    if (strMinute >= 0 && strMinute <= 9) {
        strMinute = "0" + strMinute;
    }
    if (strSecond >= 0 && strSecond <= 9) {
        strSecond = "0" + strSecond;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHour + seperator2 + strMinute + seperator2 + strSecond;
    return currentdate;
}

//Excel打印预览
//grid：传入需打印grid组件
//printcontent:打印表格的标题
//左边的距离
//纸张的宽度
//纸张的高度
//横向或竖直显示：1：竖直 2：横向
//表格宽度
//左右边距
function PrintPreLook(grid, printcontent,left,direction,tablewidth,marginwidth) {
    var LODOP = getLodop();
    var gridcol = grid.getColumns();
    var gridcount = gridcol.length;
    var effcount = 0;
    var extratr = '<tr>';
    var tableStr = '<table style="width:' + tablewidth + ';border:1px solid #000;margin-bottom;15px;margin-right:' + marginwidth + ';margin-left:' + marginwidth + ';border-collapse:collapse;text-align:center;font-family: 微软雅黑, 宋体 !important;font-size:13px;" cellpadding=0 cellspacing=0><tr style="background-color:#999;padding:0 2 0 2">';
    for (var i = 0; i < gridcount; i++) {
        var tempcolumn = gridcol[i].up('gridcolumn');
        if (tempcolumn != null)
        {
            console.log(tempcolumn);
            var tempcount = tempcolumn.query('gridcolumn').length;
            tableStr = tableStr + '<td rowspan="1" colspan="' + tempcount + '" style="border:1px solid #000;text-align:center;height:30px;">' + tempcolumn.text + '</td>';
            for (var j = 0; j < tempcount; j++)
            {
                if (gridcol[i] != null)
                {
                    extratr += '<td style="border:1px solid #000;text-align:center;background-color:#999;padding:0 2 0 2;height:30px;">' + gridcol[i].text + '</td>';
                }
                i++;
            }
            i--;
        } else {
            if (gridcol[i].text != '' && gridcol[i].text != null && gridcol[i].text != undefined && gridcol[i].text != '序号')
            {
                tableStr = tableStr + '<td rowspan="2" style="border:1px solid #000;text-align:center;height:30px;">' + gridcol[i].text + '</td>';
            } else
                effcount++;
        }
    }
    tableStr = tableStr + '</tr>' + extratr + '</tr>';
    var store = grid.getStore();
    var recordCount = store.getCount();
    for (var i = 0; i < recordCount; i++) {
        var r = store.getAt(i);
        tableStr = tableStr + '<tr style="height:15px;font-size:8pt;">';
        for (var j = effcount; j < gridcount; j++) {
            var dataIndex = gridcol[j].dataIndex;
            var tdvalue = r.get(dataIndex) == null ? '' : r.get(dataIndex);

            tableStr = tableStr + '<td style="border:1px solid #ccc;text-align:center;padding:0 2 0 2">' + tdvalue + '</td>';
        }
        tableStr = tableStr + '</tr>';
    }
    tableStr = tableStr + '</table>';
    var printcontent = '<h2 style="text-align:center">' + printcontent + '</h2>';
    printcontent += tableStr;
    var strFormHtml ="<body>" + printcontent + "</body>";
    LODOP.PRINT_INIT("MyCMP打印");
    LODOP.SET_SHOW_MODE("NP_NO_RESULT", true);
    LODOP.SET_PRINT_MODE("RESELECT_ORIENT", true);//设置是否可以重新选择打印方向
    LODOP.ADD_PRINT_TEXT(0, 0, 0, 0, "");
    //LODOP.SET_PRINT_TEXT_STYLE(1, "宋体", 15, 1, 0, 0, 1);
    //LODOP.SET_PRINT_PAGESIZE(3, '100mm', '650mm', "");
    LODOP.ADD_PRINT_HTM('5%', left, '100%', '90%', strFormHtml);
    if (direction == 1)
    {
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);//横向时的正向显示
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A3");//设置纸张为A4（按操作系统定义的A4尺寸），横向打印

    }
    else
    {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");//设置纸张为A4（按操作系统定义的A4尺寸），竖直打印

    }
    LODOP.PREVIEW();
}
