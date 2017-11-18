function renovationOutline(taskid) {
    var url = config.webApi + configajaxUrl.renovationdetails + "?taskid=" + taskid;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>任务标题</td><td title=" + data.title + ">" + getsubstrvalue(data.title, 15) + "</td></tr><tr><td class=panel-title-fontColor>任务类型</td><td>" + data.zd_name
+ "</td></tr><tr><td class=panel-title-fontColor>紧急程度</td><td>" + checkRenovationlevel(data.level) + "</td></tr><tr><td class=panel-title-fontColor>任务期限</td><td>" + checkRenovationterm(data.term) + "</td></tr>";
            $("#outlinedata").html(html);
            var zz = "zz";
            var grometry = data.grometry;
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=renovationDetails('" + taskid + "') /><img src='Image/outline/location.png' title='定位' onclick='addNoodles(\"" + taskid + "\",\"" + zz + "\",\"" + grometry + "\")' />";
            showoutline("专项整治概要", 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function checkRenovationlevel(value) {
    var status="";
    switch (value) {
        case 1:
            status = "一般";
            break;
        case 2:
            status = "紧急";
            break;
        case 3:
            status = "特急";
            break;
    }
    return status;
}

function checkRenovationterm(value) {
    var status = "";
    switch (value) {
        case 1:
            status = "短期";
            break;
        case 2:
            status = "长期";
            break;
    }
    return status;
}