//获取低洼地段抱紧状态和值
function getlowLayingAreaStatus() {
    var url = config.webApi + configajaxUrl.callPolice;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            var value = data[0];
            var key = data[1];
            var html = "";
            switch (key) {
                case "否":
                    html = "<img src='Image/callPolice/off.png' title='低洼地段报警值:" + value + "' class='callPoliceAnimation' />";
                    break;
                case "是":
                    html = "<img src='Image/callPolice/open.png' title='低洼地段报警值:" + value + "' class='callPoliceAnimation' />";
                    break;
            }
            $("#loalayAreaCallPolice").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}