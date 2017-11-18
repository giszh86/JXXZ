//人员基本信息
function showpeopledetail(id) {
    hidedetailtouchbar();
    hidePeriphery();
    hideTrack();
    $("#detailtab9").show();
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
            var htmldetails = "<tr><td rowspan=6><img src=" + config.PathAshx + "GetPictureFile.ashx?PathClass=" + data.FilesPath + "&PicPath=" + data.avatar + " /></td><td colspan=4 style='font-size:25px; color:#F8A125;'>" + data.displayname + "</td></tr><tr><td colspan=4><hr size='1' /></td></tr><tr><td class=panel-title-fontColor>所属岗位</td><td>" + duttlist + "</td><td class=panel-title-fontColor>所属部门</td><td>" + data.unitname + "</td></tr><tr><td class=panel-title-fontColor>编号</td><td>" + data.code + "</td><td class=panel-title-fontColor>手机号</td><td>" + data.mobile + "</td></tr><tr><td class=panel-title-fontColor>在岗情况</td><td>" + checkIsOnDuty(data.IsOnDuty) + "</td><td class=panel-title-fontColor>人员报警</td><td><a href='#' style='color:white'>离线(" + data.alarmsCount + ")</a></td></tr><tr><td class=panel-title-fontColor>最后定位时间</td><td colspan=3>" + data.positiontime + "</td></tr>";
       
            var tabhtml = "<ul><li tabindex='9' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='10'><span>今日上报</span></li><li tabindex='21'><span>巡查任务</span></li></ul>";
            appenddetailTab(tabhtml);
            $("#rydetailsdata").html(htmldetails);
            todayEventbyUser(id);
            getPatrolMission(id);
            showdetail("人员详细", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//用户今日上报
function todayEventbyUser(id) {
    var url = config.webApi + configajaxUrl.todayeventbyuser + "?userid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "";
            $.each(data, function (i, n) {
                html += "<tr><td>" + n.createtime + "</td><td>" + getsubstrvalue(n.eventid, 15) + "</td><td title=" + n.smalltypename + ">" + getsubstrvalue(n.smalltypename, 10) + "</td><td title=" + n.eventaddress + ">" + getsubstrvalue(n.eventaddress, 10) + "</td><td>" + checkisdealwith(n.isdealwith) + "</td></tr>";
            })

            $("#todayEventuser").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//检查状态
function checkisdealwith(val) {
    if (val != null) {
        switch (val) {
            case 1:
                return "已归档"
                break;
            case 0:
                return "处理中"
                break;
        }
    }
}
//获取巡查任务
function getPatrolMission(userId) {
    var url = config.webApi + configajaxUrl.PatrolMission + "?userID=" + userId;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "";
            $.each(data, function (i, n) {
                var patrolTime = taskdateTimeTo(n.taskstarttime) + "-" + taskdateTimeTo(n.taskendtime);
                var checkInTime = taskdateTimeTo(n.start_stime) + "-" + taskdateTimeTo(n.start_etime);
                var returnTime = taskdateTimeTo(n.end_stime) + "-" + taskdateTimeTo(n.end_etime);
                var xcqytypes = 'xcqy';
                var qdqytypes = 'qdqy';
                html += "<tr><td>" + n.taskexplain + "</td><td>" + patrolTime + "</td><td>" + checkInTime + "</td><td>" + returnTime + "</td><td><img src='Image/outline/location.png' title='巡查区域定位' onclick='addNoodles(\"" + n.usertaskid + "\",\"" + xcqytypes + "\",\"" + n.xcgrometry.substring(0, n.xcgrometry.lastIndexOf(';')) + "\")' /></td><td><img src='Image/outline/location.png' title='签到区域定位' onclick='addNoodles(\"" + n.usertaskid + "\",\"" + qdqytypes + "\",\"" + n.qdgrometry.substring(0, n.qdgrometry.lastIndexOf(';')) + "\")' /></td></tr>";
            });
            $("#patrolAreaData").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}


//时间转换
var taskdateTimeTo=function(time){
    var data=new Date(time);
    var str=data.getHours()+":"+data.getMinutes();
    return str;
}
