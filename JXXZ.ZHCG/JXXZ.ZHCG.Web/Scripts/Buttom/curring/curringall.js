function getCurringAll() {
    var ajaxurl = config.webApi + configajaxUrl.curringCenterBottom;
    $.ajax({
        url: ajaxurl,
        async: true,
        type: 'get',
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            setcuringrightpieData(data);
            setcuringhistogrameData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })

}

function getCurringleftPie() {
    //获取当前月份
    var date = new Date();
    var thismonth = date.getMonth() + 1;
    setval(thismonth);
    var url = config.webApi + configajaxUrl.curringPieBottom + "?yf=" + thismonth;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            setcuringleftpieData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getCurringAllbyMonth(month) {
    var url = config.webApi + configajaxUrl.curringPieBottom + "?yf=" + month;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            setcuringleftpieData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}