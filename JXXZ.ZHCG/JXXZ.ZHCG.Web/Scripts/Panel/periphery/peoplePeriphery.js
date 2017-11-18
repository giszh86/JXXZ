function peripheryto(userId, selfx, selfy) {
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
            iconUrl = '/Image/localtion/people.png';
            addMark(userId, centerpointx, centerpointy, iconUrl, 1, 'ry');
            point_div.style.visibility = "visible";
            point_overlay.setPosition([centerpointx, centerpointy]);
            hidePeriphery();
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

var calculationRadius = function (value) {
    //50米半径长度等于
    var radius = 0.0005301706880887885;
    //1米的圆半径长度等于
    var onemeter = radius / 50.72680525421596;
    var radiusresult = value * onemeter;
    return radiusresult;
}


//事件周边
function EventPeripheryto(eventId, selfx, selfy) {
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
            iconUrl = '/Image/localtion/event.png';
            addMark(eventId, centerpointx, centerpointy, iconUrl, 1, 'sj');
            point_div.style.visibility = "visible";
            point_overlay.setPosition([centerpointx, centerpointy]);
            hidePeriphery();
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}