//车辆详情
function showCarDetails(carid) {
    hidedetailtouchbar();
    hidePeriphery();
    hideTrack();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.cardetails + "?carid=" + carid;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='20' class='datail-touch-bar-select'><span>基本信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var unitName = getUnitName(data.unitid);
            var newunitName = unitName.substring(0, unitName.length - 1);
            var htmldetails = "<tr><td colspan=4 style='font-size:25px; color:#F8A125;'>" + data.carnumber + "</td></tr><tr><td colspan=4><hr /></td></tr><tr><td class=panel-title-fontColor>车辆终端</td><td>" + data.cartel + "</td><td class=panel-title-fontColor>车辆类型</td><td>" + data.cartypename + "</td></tr><tr><td class=panel-title-fontColor>所属中队</td><td>" + newunitName + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            showdetail("车辆详情", 640, 300);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//车辆视频
function showCarVideo(cartel, carUnitId) {
    hidedetailtouchbar();
    hidePeriphery();
    hideTrack();
    $("#detailtab11").show();
    var tabhtml = "<ul><li tabindex='20' class='datail-touch-bar-select'><span>视频信息</span></li></ul>";
    var htmldetails="";
    switch (carUnitId) {
        case '12':
            htmldetails = "<iframe src=" + config.carPath + configajaxUrl.carVideoAddRess + "?lang=zh&devIdno=" + cartel + "&jsession=" + gz_Token + "" + " style='width:660px;height:500px;border:0px;' scrolling='no'></iframe>";
            break;
    }
    $("#curingdetaildata").html(htmldetails);
    appenddetailTab(tabhtml);
    showdetail("视频详情", 680, 590);
}
