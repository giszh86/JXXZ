function renovationDetails(taskid) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.renovationdetails + "?taskid=" + taskid;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='19' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var longUnitId = data.xdzd;
            var longunitName = getUnitName(longUnitId);
            var htmldetails = "<tr><td class=panel-title-fontColor>任务标题</td><td colspan=3 title=" + data.title + ">" + getsubstrvalue(data.title, 25) + "</td></tr><tr><td class=panel-title-fontColor>任务类型</td><td>" + data.zd_name + "</td><td class=panel-title-fontColor>紧急程度</td><td>" + checkRenovationlevel(data.level) + "</td></tr><tr><td class=panel-title-fontColor>发起人</td><td>" + data.fqr + "</td><td class=panel-title-fontColor>发起时间</td><td>" + DateTimeTo(data.fqtime) + "</td></tr><tr><td class=panel-title-fontColor>任务区域</td><td colspan=3 title=" + data.region + ">" + getsubstrvalue(data.region, 25) + "</td></tr><tr><td class=panel-title-fontColor>任务说明</td><td colspan=3 title=" + data.taskexplain + ">" + getsubstrvalue(data.taskexplain, 25) + "</td></tr><tr><td class=panel-title-fontColor>行动中队</td><td colspan='3' title=" + longunitName + ">" + getsubstrvalue(longunitName, 35) + "</td></tr><tr><td class=panel-title-fontColor>任务期限</td><td colspan=3>" + checkRenovationterm(data.term) + "</td></tr><tr><td class=panel-title-fontColor>任务时间</td><td colspan=3>" + DateTimeTo(data.starttime) + "&nbsp;&nbsp;至&nbsp;&nbsp;" + DateTimeTo(data.endtime) + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("专项整治详情", 640, 300);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getUnitName(longUnitId) {
    var url = config.webApi + configajaxUrl.unitName + "?longUnitid=" + longUnitId;
    var unitName = "";
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            unitName = data;
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    });
    return unitName;
}