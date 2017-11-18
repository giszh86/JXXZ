function peopleoutline(id) {
    var url = config.webApi + configajaxUrl.peopledetails + "?userid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var duttlist;
            if (data.rolename.length > 1) {
                duttlist = data.rolename[0] + "、" + data.rolename[1];
            }
            if (data.rolename.length == 1) {
                duttlist = data.rolename[0];
            }
            if (data.rolename.length == 0) {
                duttlist = "";
            }
            var html = "<tr><td rowspan=5><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.FilesPath + "&PicPath=" + data.avatar + " /></td><td class=panel-title-fontColor>所属岗位</td><td>" + duttlist + "</td></tr><tr><td  class=panel-title-fontColor>执法编号</td><td>" + data.code + "</td></tr><tr><td  class=panel-title-fontColor>手机号码</td><td>" + data.mobile + "</td></tr><tr><td  class=panel-title-fontColor>在岗情况</td><td>" + checkIsOnDuty(data.IsOnDuty) + "</td></tr><tr><td  class=panel-title-fontColor>定位时间</td><td>" + data.positiontime + "</td></tr>";
            $("#outlinedata").html(html);
            var title = data.displayname + "(" + data.unitname + ")";
            var ry = "ry";
            var iconurl = "/Image/localtion/people.png";
            var x = data.x84;
            var y = data.y84;
            var name = data.displayname;
            var nodetype = 'xcqy';
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick='showpeopledetail(\"" + id + "\")' /><img src='Image/outline/trackplay.png' title='轨迹回放' onclick='showTrack(\"" + id + "\",\"" + ry + "\",\"" + name + "\")' /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + id + "\",\"" + ry + "\",\"" + iconurl + "\",\"" + x + "\",\"" + y + "\")'/><img src='Image/outline/add.png' title='周边' onclick='showPeriphery(\"" + id + "\",\"" + x + "\",\"" + y + "\",\"" + ry + "\")' /><img src='Image/outline/task.png' title='巡查区域' onclick='addNoodles(\"" + id + "\",\"" + nodetype + "\",\"" + data.grometry + "\")' /><span style='float:right;margin-right:5px;'><img src='Image/outline/locationtime.png' /><lable>" + getlocationtimegap(data.hour, data.minutes) + "</lable></span>";
            showoutline(title, 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}


//检查在岗情况
function checkIsOnDuty(val) {
    if (val != null) {
        if (val == 0) {
            return "离岗";
        } else {
            return "在岗"
        }
    } else {
        return "离岗";
    }
}

//返回定位时间间距
function getlocationtimegap(hour, minutes) {
    if (hour > 0) {
        return hour + "小时" + minutes + "分钟前";
    } else {
        return minutes + "分钟前";
    }
}