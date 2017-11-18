//积水点详情
function showLowLyingDetails(id) {
    hidedetailtouchbar();
    $("#detailtab22").show();
    var url = config.webApi + configajaxUrl.lowLyingOutline + "?id=" + id;
    $("#detailta22").show();
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='22' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='23'><span>报警历史</span></li></ul>";
            appenddetailTab(tabhtml);
            var titlehtml = "<tr><td>" + data.id + "</td></tr>";
            $("#lowLyingTitle").html(titlehtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>检测点名称</td><td>" + data.jkdmc + "</td><td class=panel-title-fontColor>状态</td><td>" + data.zt + "</td></tr><tr><td class=panel-title-fontColor>维护单位</td><td title=" + data.whdw + ">" + getsubstrvalue(data.whdw, 15) + "</td><td class=panel-title-fontColor>报警临界值</td><td>" + data.bjljz + "</td></tr><tr><td class=panel-title-fontColor>历史报警信息</td><td>" + data.lsbjsl + "</td><td class=panel-title-fontColor>地址</td><td title=" + data.dz + ">" + getsubstrvalue(data.dz, 15) + "</td></tr>";
            $("#lowLyingDetails").html(htmldetails);
            showdetail("积水点详情", 640, 300);
            var ajaxurl = config.webApi + configajaxUrl.lowLyingHistory + "?start=0&limit=" + config.lowLyingHistoryPageSize + "&id=" + id;
            showLowLyingHistory(id, ajaxurl, 1);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//积水点历史记录
function showLowLyingHistory(id, ajaxurl, status) {
    $("#lowLyingKey").val(id);
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var htmldetails = "";
            $.each(data["Items"], function (i, n) {
                htmldetails += "<tr><td>" + n.cjsj + "</td><td>" + n.bjz + "</td><td>" + n.bjljz + "</td></tr>";
            });
            $("#lowLyingHistory").html(htmldetails);
            if (status == 1) {
                initPager($("#pagetwo"), data.PageCount, 'pagetwo', 'jsdhis');
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })

}