function eventReportStatistics() {
    var url = config.webApi + configajaxUrl.eventReportStatistics;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var newdata = JSON.parse(data);
            var szcgCount = newdata[0];
            var sj96310Count = newdata[1];
            var dayworkCount = newdata[2];
            var yjsgzjCount = newdata[3];
            var xinfangCount = newdata[4];
            var hjbgCount = newdata[5];
            var szdhCount = newdata[6];
            var qtCount = newdata[7];
            $("#szcgCount").text(szcgCount);
            $("#sjPhoneCount").text(sj96310Count);
            $("#onDayWork").text(dayworkCount);
            $("#yjsgCount").text(yjsgzjCount);
            $("#xfCount").text(xinfangCount);
            $("#hjbgtCount").text(hjbgCount);
            $("#szPhoneCount").text(szdhCount);
            $("#otherCount").text(qtCount);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function eventReportMiddle(type) {
    var url = config.webApi + configajaxUrl.eventMiddleStatistics + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            setmiddleteameventData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function eventReportOnWeek() {
    var url = config.webApi + configajaxUrl.eventOnWeekStatistics;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            seteventcaseData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//事件大类分析方法
function eventClassAnalysis() {
    var url = config.webApi + configajaxUrl.getEventBytype;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var array = data.split('|');
            var one = JSON.parse(array[0]);
            var two = JSON.parse(array[1]);
            var html = "";
            for (var i = 0; i < one.length; i++) {
                html += "<li><span>" + one[i] + "</span><i>" + two[i] + "</i></li>";
            }
            $("#eventClassAnalysis").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}