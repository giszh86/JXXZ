//违建详情基本信息
function shownobuilddetails(id) {
    hidedetailtouchbar();
    $("#detailtab14").show();
    var url = config.webApi + configajaxUrl.nobuilddetails + "?wjid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='14' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='15'><span>图片信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var htmldetails = "<tr><td colspan=4 style='color:#FF9450'>基本信息</td></tr><tr><td colspan=4><hr size='1' /></td></tr><tr><td class=panel-title-fontColor>户主(单位)</td><td>" + data.wjholder + "</td><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>身份</td><td>" + data.holderidentity + "</td><td class=panel-title-fontColor>户籍人口</td><td>" + data.householdnum + "人" + "</td></tr><tr><td class=panel-title-fontColor>地址</td><td>" + getsubstrvalue(data.address, 15) + "</td><td class=panel-title-fontColor>土地性质</td><td>" + data.landproperty + "</td></tr><tr><td class=panel-title-fontColor>建成时间</td><td>" + data.completiontime + "</td><td class=panel-title-fontColor>土地证号</td><td>" + data.landnum + "</td></tr><tr><td class=panel-title-fontColor>房产证号</td><td>" + data.propertynum + "</td><td class=panel-title-fontColor>占地面积</td><td>" + data.coverarea + "</td></tr><tr><td class=panel-title-fontColor>建筑面积</td><td>" + data.buildarea + "</td><td class=panel-title-fontColor>建筑用途</td><td>" + data.builduse + "</td></tr><tr><td class=panel-title-fontColor>建筑结构</td><td>" + data.buildstructure + "</td><td class=panel-title-fontColor>建筑层数</td><td>" + "地上" + data.buildlayers_up + "层" + ",地下" + data.buildlayers_down + "层" + "</td></tr><tr><td colspan=4 style='color:#FF9450'>违建信息</td></tr><tr><td class=panel-title-fontColor>违建类型</td><td>" + data.wj_wjtype + "</td><td class=panel-title-fontColor>违建用途</td><td>" + data.wj_use + "</td></tr><tr><td class=panel-title-fontColor>土地性质</td><td>" + data.wj_land + "</td><td class=panel-title-fontColor>建成时间</td><td>" + data.wj_time + "</td></tr><tr><td class=panel-title-fontColor>占地面积</td><td>" + data.wj_landarea + "</td><td class=panel-title-fontColor>违建面积</td><td>" + data.wj_wjarea + "</td></tr><tr><td class=panel-title-fontColor>建筑结构</td><td>" + data.wj_buildstructure + "</td><td class=panel-title-fontColor>建筑层数</td><td>" + "地上" + data.wj_layerup + "层,地下" + data.wj_layerup + "层" + "</td></tr><tr><td colspan=4 style='color:#FF9450'>处理结果</td></tr><tr><td colspan=4><hr size='1' /></td></tr><tr><td class=panel-title-fontColor>处理结果</td><td>" + getsubstrvalue(data.process, 15) + "</td><td class=panel-title-fontColor>发现时间</td><td>" + data.foundtime + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.reportuser + "</td><td class=panel-title-fontColor>上报时间</td><td>" + data.reporttime + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3>" + getsubstrvalue(data.remark, 25) + "</td></tr>";
            $("#nobuilddetailsdata").html(htmldetails);

            var smallpicturehtml = "";
            var bigpicturehtml = "";
            $.each(data["wjfilelist"], function (i, n) {
                smallpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.path + "&PicPath=" + n.filepath + " width='80' height='80' alt='' /></a></li>";
                bigpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.path + "&PicPath=" + n.filepath + " width='480' height='250' alt='' /></a></li>";
            });
            $("#nobuildsmallPicture").html(smallpicturehtml);
            $("#nobuildbigPicture").html(bigpicturehtml);
            initImgSwitch("#demo5", "#ban_pic5", "#ban_num5", "#prev5", "#next5");
            showdetail("违建详情", 640, 500);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}