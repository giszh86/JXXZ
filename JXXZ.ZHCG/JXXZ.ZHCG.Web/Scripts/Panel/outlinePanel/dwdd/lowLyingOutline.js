//积水点报警概要
function lowLyingOutline(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.lowLyingOutline + "?id=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async:true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>部件名称</td><td>" + getsubstrvalue(data.jkdmc, 15) + "</td></tr><tr><td class=panel-title-fontColor>部件类型</td><td>积水点</td></tr><tr><td class=panel-title-fontColor>地址</td><td>" + data.dz + "</td></tr>";
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick='showLowLyingDetails(" + id + ")' />";
            $("#outlinedata").html(html);
            showoutline("积水点概要", 300, 180, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}