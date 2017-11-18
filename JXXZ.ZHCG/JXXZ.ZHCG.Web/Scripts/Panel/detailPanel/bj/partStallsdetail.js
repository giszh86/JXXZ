//小摊小贩概要面板
function partStalls(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.getHawkerInf + "?zfdx_shopid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var gps = data.grometry != null ? data.grometry.split(",") : [null, null]
            var html = "<tr><td class=panel-title-fontColor>小摊名称</td><td title=" + data.person + ">" + data.person + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>活动区域</td><td>" + data.address + "</td></tr>";
            $("#outlinedata").html(html);
            var buttonPartStalls = "buttonPartStalls";
            var iconUrl = "/Image/localtion/hawker.png";
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=partStallsDetail('" + id + "') /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + data.zfdx_shopid + "\",\"" + buttonPartStalls + "\",\"" + iconUrl + "\",\"" + gps[0] + "\",\"" + gps[1] + "\")' />";
            showoutline("小摊小贩概要面板", 300, 230, touchbarhtml);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//小摊小贩详情数据
function partStallsDetail(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.getHawkerInf + "?zfdx_shopid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='11' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>小贩姓名</td><td >" + data.person + "</td><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>证件号</td><td>" + data.card + "</td><td class=panel-title-fontColor>类型</td><td>" + data.hawkertype + "</td></tr><tr><td class=panel-title-fontColor>所属区域</td><td colspan=3>" + data.sourceareaname + "</td></tr><tr><td class=panel-title-fontColor>地址描述</td><td colspan=3>" + data.address + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3>" + data.remark + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("小摊小贩详情面板", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
