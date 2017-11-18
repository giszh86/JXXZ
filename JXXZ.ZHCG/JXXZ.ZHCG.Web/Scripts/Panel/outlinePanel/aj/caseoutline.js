function ajoutline(wfsid, wfid, caseid) {
    var url;
    if (wfid == "2017030613400001") {
        url = config.webApi + configajaxUrl.ajdetailurl + "?wfsid=" + wfsid;
    } else {
        url = config.webApi + configajaxUrl.simpleCase + "?simpleid=" + caseid;
    }
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html;
            var touchbarhtml;
            if (wfid == "2017030613400001") {
                html = "<tr><td class=panel-title-fontColor>案件类型</td><td>一般案件</td></tr><tr><td class=panel-title-fontColor>案件编号</td><td>" + data.casebh + "</td></tr><tr><td class=panel-title-fontColor>案件地址</td><td>" + getsubstrvalue(data.caseaddress, 15) + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td title=" + data.casereason + ">" + getsubstrvalue(data.casereason, 15) + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.displayname + "</td></tr><tr><td class=panel-title-fontColor>案发日期</td><td>" + data.sitedatetime + "</td></tr>";
                var ybaj = "ybaj";
                var iconUrl = "/Image/localtion/case.png";
                var grometry = data.geographical84.split(',');
                var x = grometry[0];
                var y = grometry[1];
                touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick='showcasedetail(\"" + wfsid + "\",\"" + wfid + "\")' /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + wfsid + "\",\"" + ybaj + "\",\"" + iconUrl + "\",\"" + x + "\",\"" + y + "\")'/>";
            } else {
                html = "<tr><td class=panel-title-fontColor>案件类型</td><td>简易案件</td></tr><tr><td class=panel-title-fontColor>案件编号</td><td>" + data.cfjdsbh + "</td></tr><tr><td class=panel-title-fontColor>案件地址</td><td title=" + data.caseaddress + ">" + getsubstrvalue(data.caseaddress, 15) + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td title=" + data.casecontent + ">" + getsubstrvalue(data.casecontent, 15) + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.casereasonname + "</td></tr><tr><td class=panel-title-fontColor>案发日期</td><td>" + data.sitedatetime + "</td></tr>";
                var jyaj = "jyaj";
                var iconUrl = "/Image/localtion/case.png";
                var grometry = data.geographical84.split(',');
                var x = grometry[0];
                var y = grometry[1];
                touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick='showcasedetail(\"" + caseid + "\",\"" + wfid + "\")' /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + caseid + "\",\"" + jyaj + "\",\"" + iconUrl + "\",\"" + x + "\",\"" + y + "\")'/>";
            }
            $("#outlinedata").html(html);
            showoutline("案件概要面板", 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}