//事件基础信息
function showevent(id) {
    hidedetailtouchbar();
    hidePeriphery();
    $("#detailtab5").show();
    var url = config.webApi + configajaxUrl.eventlistdetails + "?citizenid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='5' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='6'><span>事件处理流程</span></li><li tabindex='7'><span>事件处理前照片</span></li><li tabindex='8'><span>事件处理后照片</span></li></ul>";

            appenddetailTab(tabhtml);
            var titlehtml = "<tr><td>" + data.eventid + "</td></tr>";
            $("#eventtitle").html(titlehtml);

            var doidear = "";
            var username = "";
            var dealtime = "";
            if (data["workflowold"].length > 0) {
                username = data["workflowold"][(data["workflowold"].length - 1)].username;
                dealtime = data["workflowold"][(data["workflowold"].length - 1)].dealtime;
                for (var i = 0; i < data["workflowold"].length; i++) {
                    if (data["workflowold"][i].wfdid == "2017021410240003" || data["workflowold"][i].wfdid == "2017021410240007") {
                        doidear = data["workflowold"][i].content;
                    }
                }
            }

            var detailshtml = "<tr><td class=panel-title-fontColor>事件标题</td><td colspan=3 title=" + data.eventtitle + ">" + getsubstrvalue(data.eventtitle, 40) + "</td></tr><tr><td class=panel-title-fontColor>值班时间</td><td>" + data.dutytime + "</td><td class=panel-title-fontColor>事件来源</td><td>" + data.sourcename + "</td></tr><tr><td class=panel-title-fontColor>事件大类</td><td title=" + data.bigtypename + ">" + getsubstrvalue(data.bigtypename, 20) + "</td><td class=panel-title-fontColor>事件小类</td><td title=" + data.smalltypename + ">" + getsubstrvalue(data.smalltypename, 20) + "</td></tr><tr><td class=panel-title-fontColor>投诉人</td><td>" + data.complainant + "</td><td class=panel-title-fontColor>人数</td><td>" + data.cnumber + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td><td class=panel-title-fontColor>联系地址</td><td title=" + data.contactaddress + ">" + getsubstrvalue(data.contactaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>发现时间</td><td>" + data.foundtime + "</td><td class=panel-title-fontColor>限办时间</td><td>" + data.limittime + "</td></tr><tr><td class=panel-title-fontColor>事件地址</td><td colspan=3>" + data.eventaddress + "</td></tr><tr><td class=panel-title-fontColor>事件内容</td><td colspan=3 title=" + data.eventcontent + ">" + getsubstrvalue(data.eventcontent, 40) + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.recorduser + "</td><td class=panel-title-fontColor>上报时间</td><td>" + data.foundtime + "</td></tr><tr><td class=panel-title-fontColor>处理方式</td><td colspan=3>" + data.processmode + "</td></tr><tr><td class=panel-title-fontColor>处理意见</td><td colspan=3>" + doidear + "</td></tr><tr><td class=panel-title-fontColor>满意度</td><td colspan=3>" + data.satisfaction + "</td></tr><tr><td class=panel-title-fontColor>处理人</td><td>" + username + "</td><td class=panel-title-fontColor>处理时间</td><td>" + dealtime + "</td></tr>";
            eventlink(data.wfsid);
            eventpicture(data.citizenid, '2017021410240010');
            eventbeforepicture(data.citizenid, '2017021410240003,2017021410240007');
            $("#eventdetaildata").html(detailshtml);

            showdetail("事件详情面板", 640, 450);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//事件处理流程
function eventlink(wfsid) {
    var url = config.webApi + configajaxUrl.eventlinklist + "?wfsid=" + wfsid;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = null;
            $.each(data, function (i, n) {
                html += "<tr><td>" + n.wfdname + "</td><td>" + n.username + "</td><td>" + n.createtime + "</td><td title=" + n.content + ">" + getsubstrvalue(n.content, 15) + "</td></tr>";
            })
            $("#eventdatalink").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//事件处理前照片
function eventpicture(citizenid, wfdid) {
    var url = config.webApi + configajaxUrl.eventpicture + "?citizenid=" + citizenid + "&wfdid=" + wfdid;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var smallpicturehtml = "";
            var bigpicturehtml = "";
            $.each(data, function (i, n) {
                smallpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.FilesPath + "&PicPath=" + n.OriginalPath + " width='80' height='80' alt='' /></a></li>";
                bigpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.FilesPath + "&PicPath=" + n.OriginalPath + " width='480' height='250' alt='' /></a></li>";
            })
            $("#eventsmallPicture").html(smallpicturehtml);
            $("#eventbigPicture").html(bigpicturehtml);
            initImgSwitch("#demo2", "#ban_pic2", "#ban_num2", "#prev2", "#next2");
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })

}

//事件处理后照片
function eventbeforepicture(citizenid, wfdid) {
    var url = config.webApi + configajaxUrl.eventpicture + "?citizenid=" + citizenid + "&wfdid=" + wfdid;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var smallpicturehtml = "";
            var bigpicturehtml = "";
            $.each(data, function (i, n) {
                smallpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.FilesPath + "&PicPath=" + n.OriginalPath + " width='80' height='80' alt='' /></a></li>";
                bigpicturehtml += "<li><a href='javascript:;'><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + n.FilesPath + "&PicPath=" + n.OriginalPath + " width='480' height='250' alt='' /></a></li>";
            })
            $("#eventbeforesmallPicture").html(smallpicturehtml);
            $("#eventbeforebigPicture").html(bigpicturehtml);
            initImgSwitch("#demo3", "#ban_pic3", "#ban_num3", "#prev3", "#next3");
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })

}