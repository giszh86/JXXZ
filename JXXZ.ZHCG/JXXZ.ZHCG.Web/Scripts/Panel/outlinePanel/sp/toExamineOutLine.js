//行政审批概要
function toExamineOutLine(id) {
    var url = config.webApi + configajaxUrl.toExamineDetails + "?syncrowguid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>审批号</td><td>"+data.row_id+"</td></tr><tr><td class=panel-title-fontColor>审批类型</td><td title=" + data.processversioninstancename + ">" + getsubstrvalue(data.processversioninstancename, 13) + "</td></tr><tr><td class=panel-title-fontColor>申请单位名称</td><td title=" + data.applyername + ">" + getsubstrvalue(data.applyername, 13) + "</td></tr><tr><td class=panel-title-fontColor>办结时间</td><td>" + data.banjiedate + "</td></tr><tr><td class=panel-title-fontColor>办理部门</td><td>" + data.windowname + "</td></tr>";
            $("#outlinedata").html(html);
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick='toExamineDetails(\"" + id + "\")' /><img src='Image/outline/location.png' title='定位' onclick='toExamineLocation(\"" + id + "\")' />";
            showoutline("审批概要面板", 300, 230, touchbarhtml);
        },error:function(xhr,textStatus)
        {
            console.log(textStatus);
        }
    })
}

//行政审批定位
function toExamineLocation(id) {
    var url = config.webApi + configajaxUrl.toExamineLocation + "?syncrowguid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (data != null) {
                var iconurl = '/Image/localtion/politics.png';
                var grometry = data.location;
                if (grometry == "" || grometry == null) {
                    var location = data.address.split(',');
                    var x = location[0];
                    var y = location[1];
                    moveTo(id, configType.toExamine, iconurl, x, y);
                } else {
                    var location = grometry.split(',');
                    var x = location[0];
                    var y = location[1];
                    moveTo(id, configType.toExamine, iconurl, x, y);
                }
            } else {
                msgerror = "暂无定位!";
                runerrorNumber(3);
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}