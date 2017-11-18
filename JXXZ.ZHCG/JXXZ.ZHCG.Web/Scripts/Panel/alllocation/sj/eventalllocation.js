function eventalllocation() {
    var type = 'sj';
    var url = config.webApi + configajaxUrl.alllocation + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            //清除覆盖物
            clearTrack();
            clearMulch();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var x = data[i].x84;
                var y = data[i].y84;
                iconUrl = '/Image/localtion/event.png';
                var types = 'sj';
                addMark(id, x, y, iconUrl, 1, types);
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })


}