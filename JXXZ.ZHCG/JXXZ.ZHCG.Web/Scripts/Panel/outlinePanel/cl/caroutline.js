//车辆概要
function carOutline(carid) {
    var url = config.webApi + configajaxUrl.cardetails + "?carid=" + carid;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html;
            var unitName = getUnitName(data.unitid);
            var newunitName = unitName.substring(0, unitName.length - 1);
            var statusName = chkCarOnline(data.isonline);
            var type = data.unitid;
            var x = 0;
            var y = 0;
            var cl = 'cl';
            html = "<tr><td class=panel-title-fontColor>车牌号</td><td>" + data.carnumber + "</td></tr><tr><td  class=panel-title-fontColor>车辆终端</td><td>" + data.cartel + "</td></tr><tr><td  class=panel-title-fontColor>所属中队</td><td>" + newunitName + "</td></tr><tr><td  class=panel-title-fontColor>在线状态</td><td>" + statusName + "</td></tr>";
            $("#outlinedata").html(html);
            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=showCarDetails('" + carid + "') /><img src='Image/outline/trackplay.png' title='轨迹回放' onclick='showTrack(\"" + carid + "\",\"" + cl + "\",\"" + data.carnumber + "\",\"" + data.unitid + "\",\"" + data.cartel + "\")' /><img src='Image/outline/location.png' title='定位' onclick='get_carLocation(\"" + carid + "\",\"" + type + "\",\"" + data.cartel + "\")' /><img src='Image/outline/add.png' title='周边' onclick='showPeriphery(\"" + carid + "\",\"" + x + "\",\"" + y + "\",\"" + cl + "\",\"" + type + "\",\"" + data.cartel + "\")' /><img src='Image/outline/paly.png' title='视频' onclick='showCarVideo(\"" + data.cartel + "\",\"" + data.unitid + "\")'/>";
            showoutline("车辆概要面板", 300, 230, touchbarhtml);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//检查车辆状态
function chkCarStatus(value) {
    var statusName = "";
    if (value != null && value != "" && value != "undefind") {
        switch (value) {
            case 0:
                statusName = "在用";
                break;
            case 1:
                statusName = "报废";
                break;
        }
        return statusName;
    }
}

//检查车辆在线状态
function chkCarOnline(value) {
    var statusName = "";
    if (value == 0) {
        statusName = "离线";

    } else {
        statusName = "在线";
    }
    return statusName;
}

//高照签名
var gz_Token = "";
//车辆平台登录
car_Login('12');
function car_Login(type) {
    var url = "";
    switch (type) {
        case '12':
            url = config.carPath + configajaxUrl.carloginInterface + "?account=" + carCode.gz_accout + "&password=" + carCode.gz_password;
            break;
    }
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'jsonp',
        jsonpCallback: 'success_jsonpCallback',
        success: function (data, jqxhr, textStatus) {
            switch (type) {
                case '12':
                    gz_Token = data.jsession;
                    break;
            }
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//获取定位
function get_carLocation(carid, type, cartel) {
    var url = "";
    switch (type) {
        case '12':
            url = config.carPath + configajaxUrl.carlocationInterface + "?jsession=" + gz_Token + "&devIdno=" + cartel + "&toMap=2";
            break;
    }
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'jsonp',
        jsonpCallback: 'success_jsonpCallback',
        success: function (data, jqxhr, textStatus) {
            if (data.result == 4) {
                switch (type) {
                    case '12':
                        car_Login(type)
                        break;
                }
            } else {
                if (data.status == null || data.status == "") {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                } else {
                    var length = data.status.length - 1;
                    //经度
                    var lng = data.status[length].mlng;
                    //纬度
                    var lat = data.status[length].mlat;
                    var wgs84 = position.bd09ToWgs84(lat, lng);
                    var x = wgs84.longitude;
                    var y = wgs84.latitude;
                    //图标icon
                    var iconUrl = '/Image/localtion/car.png';
                    moveTo(carid, 'cl', iconUrl, x, y);
                }
            }
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//车辆周边
function carPeripheryto(carid, carUnitId, cartel) {
    var url = "";
    switch (carUnitId) {
        case "12":
            url = config.carPath + configajaxUrl.carlocationInterface + "?jsession=" + gz_Token + "&devIdno=" + cartel + "&toMap=2";
            break;
    }
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'jsonp',
        jsonpCallback: 'success_jsonpCallback',
        success: function (data, jqxhr, textStatus) {
            if (data.result == 4) {
                switch (type) {
                    case '12':
                        car_Login(type)
                        break;
                }
            } else {
                if (data.status == null || data.status == "") {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                } else {
                    var length = data.status.length - 1;
                    //经度
                    var lng = data.status[length].mlng;
                    //纬度
                    var lat = data.status[length].mlat;
                    var wgs84 = position.bd09ToWgs84(lat, lng);
                    var x = wgs84.longitude;
                    var y = wgs84.latitude;
                    carPeriphery(carid, x, y);
                }
            }
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//车辆周边
function carPeriphery(carId, selfx, selfy) {
    var centerpointx = selfx;
    var centerpointy = selfy;
    var radius;
    var type = "";
    //获取radio值
    var val = $('input:radio[name="fw"]:checked').val();
    if (val == "Other") {
        radius = document.getElementById("otherRadius").value;
    } else {
        radius = val;
    }
    //获取checkbox值
    var checklist = $('input:checkbox[name="checktype"]');
    for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].checked == true) {
            type += checklist[i].value + ",";
        }
    }
    var url = config.webApi + configajaxUrl.userPeriphery + "?type=" + type + "&x84=" + selfx + "&y84=" + selfy + "&radius=" + radius;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var centerpoint = [parseFloat(centerpointx), parseFloat(centerpointy)];
            //清除覆盖物
            clearTrack();
            clearMulch();
            var newradius = calculationRadius(radius);
            addDrawCircle(3, 'circle', centerpoint, newradius, 'rgba(16,131,220,0.7)', '#186DAE', 1);
            var iconUrl = "";
            for (var i = 0; i < data.length; i++) {
                var types = data[i].type;
                var id = data[i].id;
                var x = data[i].x84;
                var y = data[i].y84;
                switch (types) {
                    case 'ry':
                        iconUrl = '/Image/localtion/people.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'sj':
                        iconUrl = '/Image/localtion/event.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'ybaj':
                        iconUrl = '/Image/localtion/case.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'jyaj':
                        iconUrl = '/Image/localtion/case.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'wtaj':
                        iconUrl = '/Image/localtion/wtaj.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'sp':
                        iconUrl = '/Image/localtion/politics.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'bj':
                        iconUrl = data[i].icon;
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'jk':
                        iconUrl = '/Image/localtion/camera.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'cl':
                        iconUrl = '/Image/localtion/car.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                }
            }
            iconUrl = '/Image/localtion/car.png';
            addMark(carId, centerpointx, centerpointy, iconUrl, 1, 'cl');
            point_div.style.visibility = "visible";
            point_overlay.setPosition([centerpointx, centerpointy]);
            hidePeriphery();
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}