function caseAlllocation() {
    var type = 'aj';
    var url = config.webApi + configajaxUrl.alllocation + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            //清除覆盖物
            clearTrack();
            clearMulch();
            var iconUrl = "";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var x = data[i].x84;
                var y = data[i].y84;
                var types = data[i].type;
                if (types == 'ybaj') {
                    iconUrl = '/Image/localtion/case.png';
                }
                if (types == 'jyaj') {
                    iconUrl = '/Image/localtion/case.png';
                }
                if (types == 'wtaj') {
                    iconUrl = '/Image/localtion/wtaj.png';
                }
                addMark(id, x, y, iconUrl, 1, types);
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
