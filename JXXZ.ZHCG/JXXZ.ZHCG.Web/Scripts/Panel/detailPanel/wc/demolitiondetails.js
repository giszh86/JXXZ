//违拆基本信息
function showdemolitiondetails(id) {
    hidedetailtouchbar();
    $("#detailtab16").show();
    var url = config.webApi + configajaxUrl.demolitiondetails + "?cqid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='16' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='17'><span>图片信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var titlehtml = "<tr><td colspan=4>" + data.projectname + "</td></tr>";
            $("#demolitiontitledetailsdata").html(titlehtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>项目负责人</td><td>" + data.projectleader + "</td><td class=panel-title-fontColor>联系电话</td><td>" + data.contackphone + "</td></tr><tr><td class=panel-title-fontColor>拆迁面积</td><td colspan=3>" + data.cqarea + "</td></tr><tr><td class=panel-title-fontColor>项目启动时间</td><td>" + data.starttime + "</td><td class=panel-title-fontColor>项目结束时间</td><td>" + data.endtime + "</td></tr><tr><td class=panel-title-fontColor>所属区域</td><td colspan=3>" + getsubstrvalue(data.ssqyname, 30) + "</td></tr><tr><td class=panel-title-fontColor>拆迁地址</td><td colspan=3>" + data.address + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3>" + getsubstrvalue(data.remark, 30) + "</td></tr>";
            $("#demolitiondetailsdata").html(htmldetails);

            var smallpicturehtml = "";
            var bigpicturehtml = "";
            $.each(data["wjfilelist"], function (i, n) {
                smallpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.path + "&PicPath=" + n.filepath + " width='80' height='80' alt='' /></a></li>";
                bigpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.path + "&PicPath=" + n.filepath + " width='480' height='250' alt='' /></a></li>";
            });
            $("#demolitionsmallPicture").html(smallpicturehtml);
            $("#demolitionbigPicture").html(bigpicturehtml);
            initImgSwitch("#demo4", "#ban_pic4", "#ban_num4", "#prev4", "#next4");

            showdetail("拆迁项目详情", 640, 450);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}