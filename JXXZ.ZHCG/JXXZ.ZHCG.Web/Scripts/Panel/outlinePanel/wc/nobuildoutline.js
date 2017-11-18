function nobuildoutline(id) {
    var url = config.webApi + configajaxUrl.nobuilddetails + "?wjid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>户主</td><td>" + data.wjholder + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>违建地址</td><td>" + getsubstrvalue(data.address, 30) + "</td></tr><tr><td class=panel-title-fontColor>发现时间</td><td>" + data.foundtime + "</td></tr>";
            $("#outlinedata").html(html);
            var wj = "wj";
            var geography = data.geography;
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=shownobuilddetails('" + id + "') /><img src='Image/outline/location.png' title='定位' onclick='addNoodles(\"" + id + "\",\"" + wj + "\",\"" + geography + "\")' />";

            showoutline("违建概要面板", 300, 230, touchbarhtml);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}