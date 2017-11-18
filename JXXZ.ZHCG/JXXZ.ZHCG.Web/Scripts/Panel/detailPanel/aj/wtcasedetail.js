//违停基础信息
function showwtcasedetail(id) {
    hidedetailtouchbar();
    $("#detailtab3").show();
    var ajaxurl = config.webApi + configajaxUrl.wtajdetailurl + "?wtid=" + id;
    $.ajax({
        url: ajaxurl,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var htmltitle = "<tr><td>" + data.car_num + "</td></tr><tr><td>" + data.car_typename + "</td></tr>";
            var htmldetails = "<tr><td class=panel-title-fontColor>采集单位</td><td>" + data.cjdw + "</td><td class=panel-title-fontColor>采集人</td><td>" + data.cjr + "</td></tr><tr><td class=panel-title-fontColor>审核状态</td><td>" + checkwtajStatus(data.processstatus) + "</td><td class=panel-title-fontColor>处理状态</td><td>未校对</td></tr><tr><td class=panel-title-fontColor>违停地点</td><td colspan=3>" + data.wt_address + "</td></tr><tr><td class=panel-title-fontColor>违法行为</td><td colspan=3>" + data.wfxw + "</td></tr><tr><td class=panel-title-fontColor>审核意见</td><td colspan=3>" + data.zfreason + "</td></tr><tr><td class=panel-title-fontColor>审核人</td><td>" + data.shr + "</td></tr>";
            var tabhtml = "<ul><li tabindex='3' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='4'><span>图片信息</span></li></ul>";
            appenddetailTab(tabhtml);
            $("#wtdetaildata").html(htmldetails);
            $("#casewttitle").html(htmltitle);

            var smallpicturehtml="";
            var bigpicturehtml = "";
            $.each(data["casewtfilelist"], function (i, n) {
                smallpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.path + "&PicPath=" + n.filepath + " width='80' height='80' alt='' /></a></li>";
                bigpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.path + "&PicPath=" + n.filepath + " width='480' height='250' alt='' /></a></li>";
            });
            $("#wtcasesmallpicture").html(smallpicturehtml);
            $("#wtcasebigpicture").html(bigpicturehtml);
            initImgSwitch("#demo1", "#ban_pic1", "#ban_num1", "#prev1", "#next1");
            showdetail("案件详情面板", 640, 430);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function checkwtajStatus(value){
    var newvalue = value == "0" ? "未处理" : value == "1" ? "生效" : "作废";
    return newvalue;
}