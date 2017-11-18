function eventoutline(id) {
    var url = config.webApi + configajaxUrl.eventlistdetails + "?citizenid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html;
            html = "<tr><td class=panel-title-fontColor>编号</td><td>" + data.citizenid + "</td></tr><tr><td class=panel-title-fontColor>事件标题</td><td title=" + data.eventtitle + ">" + getsubstrvalue(data.eventtitle, 15) + "</td></tr><tr><td class=panel-title-fontColor>事件内容</td><td title=" + data.eventcontent + ">" + getsubstrvalue(data.eventcontent, 15) + "</td></tr><tr><td class=panel-title-fontColor>事件来源</td><td>" + data.sourcename + "</td></tr><tr><td class=panel-title-fontColor>上报时间</td><td>" + data.createtime + "</td></tr>";

            $("#outlinedata").html(html);
            var sj = "sj";
            var iconUrl = "/Image/localtion/event.png";
            var grometry = data.grometry.split(',');
            var x = grometry[0];
            var y = grometry[1];

            var touchbarhtml = "<img src='Image/tools/details.png' title='详情' onclick=showevent('" + id + "') /><img src='Image/outline/location.png' title='定位' onclick='moveTo(\"" + id + "\",\"" + sj + "\",\"" + iconUrl + "\",\"" + x + "\",\"" + y + "\")' /><img src='Image/outline/add.png' title='周边'onclick='showPeriphery(\"" + id + "\",\"" + x + "\",\"" + y + "\",\"" + sj + "\")'  />";
            //王江泾智慧城管演示
           // touchbarhtml += "<img src='Image/Tree/camera.png' title='周边监控' onclick='showEventPeripheryto(\"" + id + "\",\"" + x + "\",\"" + y + "\")' />";

            showoutline("事件概要面板", 300, 230, touchbarhtml);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//王江泾智慧城管演示周边
function showEventPeripheryto(id, x, y) {
    //清除覆盖物
    clearTrack();
    clearMulch();
    //范围100米
    var radius = 100;
    var newradius = calculationRadius(radius);
    var centerpoint = [parseFloat(x), parseFloat(y)];

    var cameraone = newradius / 3;
    var cameratwo = newradius / 2;
    var camerathree = newradius / 5;

    var pointonex = parseFloat(x) + cameraone;
    var pointoney = parseFloat(y) + cameraone;

    var pointtwox = parseFloat(x) + cameratwo;
    var pointtwoy = parseFloat(y) - cameratwo;

    var pointthreex = parseFloat(x) - camerathree;
    var pointthreey = parseFloat(y) - camerathree;
   
    addDrawCircle(3, 'circle', centerpoint, newradius, 'rgba(16,131,220,0.7)', '#186DAE', 1);
    addMark('1000238$1$0$0', pointonex, pointoney, '/Image/localtion/camera.png', 1, 'jk','监控',1);
    addMark('1000238$1$0$0', pointtwox, pointtwoy, '/Image/localtion/camera.png', 1, 'jk', '监控',1);
    addMark('1000238$1$0$0', pointthreex, pointthreey, '/Image/localtion/camera.png', 1, 'jk', '监控',1);

    var iconUrl = '/Image/localtion/event.png';
    addMark(id, parseFloat(x), parseFloat(y), iconUrl, 1, 'sj');
    point_overlay.setPosition([parseFloat(x), parseFloat(y)]);
}