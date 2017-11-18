function wtajoutline(id) {
    var url = config.webApi + configajaxUrl.wtajdetailurl + "?wtid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html;
            html = "<tr><td class=panel-title-fontColor>车牌号</td><td>" + data.car_num + "</td></tr><tr><td class=panel-title-fontColor>违停地址</td><td title=" + data.wt_address + ">" + getsubstrvalue(data.wt_address, 15) + "</td></tr><tr><td class=panel-title-fontColor>处罚决定书号</td><td>" + data.cfjdsh + "</td></tr><tr><td class=panel-title-fontColor>采集单位</td><td>" + data.cjdw + "</td></tr><tr><td class=panel-title-fontColor>违停时间</td><td>" + data.wt_time + "</td></tr>";

            $("#outlinedata").html(html);
            var wtaj = "wtaj";
            var iconUrl = "/Image/localtion/wtaj.png";
            var x = data.x84;
            var y = data.y84;
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=showwtcasedetail(\"" + id + "\") /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + id + "\",\"" + wtaj + "\",\"" + iconUrl + "\",\"" + x + "\",\"" + y + "\")'/>";
            showoutline("案件概要面板", 300, 230, touchbarhtml);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}