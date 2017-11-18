//沿街店家概要面板
function partStore(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.getStreetShopsInf + "?zfdx_shopid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var gps = data.grometry!=null?data.grometry.split(","):[null,null]
            var html = "<tr><td class=panel-title-fontColor>店家名称</td><td title=" + data.shopname + ">" + data.shopname + "</td></tr><tr><td class=panel-title-fontColor>店家类型</td><td>" + data.shoptypename + "</td></tr><tr><td class=panel-title-fontColor>地址</td><td>" + data.address + "</td></tr>";
            $("#outlinedata").html(html);
            var buttonPartStore = "buttonPartStore";
            var iconUrl = "/Image/localtion/street.png";
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=partStoreDetail('" + id + "') /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + data.zfdx_shopid + "\",\"" + buttonPartStore + "\",\"" + iconUrl + "\",\"" + gps[0] + "\",\"" + gps[1] + "\")' />";
            showoutline("沿街店家概要面板", 300, 230, touchbarhtml);
            
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//沿街店家详情数据
function partStoreDetail(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.getStreetShopsInf + "?zfdx_shopid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='11' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>店家名称</td><td >" + data.shopname + "</td><td class=panel-title-fontColor>店家类型</td><td>" + data.shoptypename + "</td></tr><tr><td class=panel-title-fontColor>联系人</td><td>" + data.person + "</td><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>证件号</td><td>" + data.card + "</td><td class=panel-title-fontColor>员工数</td><td>" + data.staffsum + "</td><tr><td class=panel-title-fontColor>许可证号</td><td>" + data.licencecard + "</td><td class=panel-title-fontColor>营业面积</td><td>" + data.businessarea + "</td></tr><tr><td class=panel-title-fontColor>许可证有效期</td><td colspan=3>" + data.e_licence + "&nbsp;&nbsp;至&nbsp;&nbsp;" + data.e_licence + "</td></tr><tr><td class=panel-title-fontColor>经营有效期</td><td colspan=3>" + data.s_business + "&nbsp;&nbsp;至&nbsp;&nbsp;" + data.e_business + "</td></tr><tr><td class=panel-title-fontColor>地址</td><td colspan=3>" + data.address + "</td></tr><tr><td class=panel-title-fontColor>所属区域</td><td colspan=3>" + data.sourceareaname + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("沿街店家详情面板", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}


