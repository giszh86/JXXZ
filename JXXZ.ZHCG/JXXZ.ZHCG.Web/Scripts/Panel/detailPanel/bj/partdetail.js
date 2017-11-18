//部件基本信息
function partsoutline(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.partdetails + "?id=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {

            moveTo(data.id, "bj", data.icon, data.cdinatex, data.cdinatey, null, null, data.path);

            var tabhtml = "<ul><li tabindex='18' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);

            var htmldetails = "<tr><td class=panel-title-fontColor>部件名称</td><td colspan=3>" + data.objname + "</td></tr><tr><td class=panel-title-fontColor>主管单位</td><td>" + data.cdepname + "</td><td class=panel-title-fontColor>权属单位</td><td>" + data.owndepname + "</td></tr><tr><td class=panel-title-fontColor>养护单位</td><td>" + data.matdepname + "</td><tr><td class=panel-title-fontColor>数据来源</td><td>" + data.datasource + "</td><tr><td class=panel-title-fontColor>竣工日期</td><td>" + data.crdate + "</td><td class=panel-title-fontColor>变更日期</td><td>" + data.chdate + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3>" + data.remark + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("部件详情", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//部件显示详情
function partsoutlineDetail(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.partdetails + "?id=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='18' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>部件名称</td><td colspan=3>" + data.objname + "</td></tr><tr><td class=panel-title-fontColor>主管单位</td><td>" + data.cdepname + "</td><td class=panel-title-fontColor>权属单位</td><td>" + data.owndepname + "</td></tr><tr><td class=panel-title-fontColor>养护单位</td><td>" + data.matdepname + "</td><tr><td class=panel-title-fontColor>数据来源</td><td>" + data.datasource + "</td><tr><td class=panel-title-fontColor>竣工日期</td><td>" + data.crdate + "</td><td class=panel-title-fontColor>变更日期</td><td>" + data.chdate + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3>" + data.remark + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("部件详情", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}


