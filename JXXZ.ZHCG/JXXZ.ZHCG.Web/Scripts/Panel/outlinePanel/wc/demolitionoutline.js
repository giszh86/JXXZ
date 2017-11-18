function demolitionoutline(id) {
    var url = config.webApi + configajaxUrl.demolitiondetails + "?cqid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async:true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>项目名称</td><td>" + data.projectname + "</td></tr><tr><td class=panel-title-fontColor>负责人</td><td>" + data.projectleader + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contackphone + "</td></tr><tr><td class=panel-title-fontColor>地址</td><td>" + getsubstrvalue(data.address, 15) + "</td></tr>";
            $("#outlinedata").html(html);
            var cq = "cq";
            var geography = data.geography;
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=showdemolitiondetails('" + id + "') /><img src='Image/outline/location.png' title='定位' onclick='addNoodles(\"" + id + "\",\"" + cq + "\",\"" + geography + "\")' />";
            showoutline("拆迁项目概要面板", 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}