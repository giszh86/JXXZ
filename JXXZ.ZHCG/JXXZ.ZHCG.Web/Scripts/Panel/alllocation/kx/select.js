var index = 0;
var rlimit = 1000;
var rstartPoint;
var rendPoint;
function allSelectPoint(startPoint, endPoint) {
    rstartPoint = startPoint;
    rendPoint = endPoint;
    //获取checkbox值
    var typestr = "";
    var checklist = $('input:checkbox[name="chkkx"]');
    for (var i = 0; i < checklist.length; ++i) {
        if (checklist[i].checked == true) {
            typestr += checklist[i].value + ",";
        }
    }
    var url = config.webApi + configajaxUrl.allPointSelect + "?coordinate1=" + rstartPoint + "&coordinate2=" + rendPoint + "&type=" + typestr + "&start=" + index + "&limit=" + rlimit;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var x = data[i].x84;
                var y = data[i].y84;
                var types = data[i].type;
                var logintype = data[i].logintype;
                var iconUrl = "";
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
                    case 'jk':
                        var cameratitle = data[i].title;
                        iconUrl = '/Image/localtion/camera.png';
                        addMark(id, x, y, iconUrl, 1, types, cameratitle, logintype);
                        break;
                    case 'bj':
                        iconUrl = "/" + data[i].icon;
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'sp':
                        iconUrl = '/Image/localtion/politics.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                    case 'cl':
                        iconUrl = '/Image/localtion/car.png';
                        addMark(id, x, y, iconUrl, 1, types);
                        break;
                }
            }
            index = index + rlimit;
            rlimit = index + rlimit;
            if (data != null) {
                allSelectPoint(rstartPoint, rendPoint);
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}