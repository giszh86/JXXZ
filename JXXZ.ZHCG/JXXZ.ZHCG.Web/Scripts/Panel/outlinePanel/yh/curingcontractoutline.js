//养护概要
function curingcontractoutline(contractid) {
    var url = config.webApi + configajaxUrl.curingcontractdetails + "?contractid=" + contractid;
    $.ajax({
        url: url,
        type:'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>养护合同</td><td title=" + data.contractname + ">" + getsubstrvalue(data.contractname, 15) + "</td></tr><tr><td class=panel-title-fontColor>养护内容类型</td><td>" + data.contacttypename + "</td></tr><tr><td class=panel-title-fontColor>签订日期</td><td>" + data.signdate + "</td></tr>";
            $("#outlinedata").html(html);
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=curingcontractdetail('" + contractid + "') />";
            showoutline("养护概要", 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}