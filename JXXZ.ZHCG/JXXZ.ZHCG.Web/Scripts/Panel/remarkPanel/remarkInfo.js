//添加备注信息
function addRemarkInfo() {
    var x = $("#longitude").val();
    var y = $("#latitude").val();
    var remark = $("#remarkInfo").val();
    var params = { x: x, y: y, remark: remark };
    var url = config.webApi + configajaxUrl.addPoints;
    $.ajax({
        url: url,
        type: 'post',
        async: true,
        dataType: 'json',
        timeout: 10000,
        data: params,
        success: function (message, jqxhr, textStatus) {
            hideremarkPanel();
            var id = message.id;
            var x = message.x;
            var y = message.y;
            var iconUrl = 'Image/toolbar/2DRight/addPoints.png';
            addMark(id, x, y, iconUrl, 1, 'bd', null);
            msgerror = "添加成功!";
            runerrorNumber(3);
        }, error: function (xhr, textStatus) {
            msgerror = "添加失败!";
            runerrorNumber(3);
            console.log(textStatus);
        }
    })
}

var msgerror;
function runerrorNumber(number) {
    $("#centershowMessge").show();
    if (number > 0) {
        $("#messagesuccess").text("" + msgerror + "(" + number + ")");
        var next = (number - 1);
        setTimeout("runerrorNumber(" + next + ")", 1000);
    } else {
        $("#centershowMessge").hide();
    }
}

//显示历史标点
function showhistoryPints() {
    hideremarkPanel();
    clearMulch();
    var url = config.webApi + configajaxUrl.allPoints;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            var iconUrl='Image/toolbar/2DRight/addPoints.png';
            $.each(data, function (i, n) {
                var id = n.id;
                var x = n.x;
                var y = n.y;
                addMark(id, x, y, iconUrl, 1, 'bd', null);
            });
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//查询备注信息
function singRemarkInfo(id) {
    var url = config.webApi + configajaxUrl.singlePoints + "?id=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            $("#remarkInfo").val(data.remark);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//删除备注信息
function deletePoints() {
    var id = document.getElementById("textAreaId").value;
    var params = { id: id };
    var url = config.webApi + configajaxUrl.deletePoints;
    $.ajax({
        url: url,
        type: 'post',
        async: true,
        dataType: 'json',
        timeout: 10000,
        data: params,
        success: function (message, jqxhr, textStatus) {
            showhistoryPints();
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}