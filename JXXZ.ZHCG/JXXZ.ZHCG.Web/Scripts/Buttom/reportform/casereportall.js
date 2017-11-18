function getreportCaseAll(type) {
    var url = config.webApi + configajaxUrl.caseTypeStatistics + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            setstatisticalAnalysisData(data);
            getreportCaseNum();
            getsixCaseReport();
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getreportCaseStatus(type) {
    var url = config.webApi + configajaxUrl.caseStatusStatistics + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            setstatisticalSnalysisData(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getreportCaseNum() {
    var url = config.webApi + configajaxUrl.caseCountStatistics;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var newdata = JSON.parse(data);
            var ybajCount = newdata[1];
            var jyajCount = newdata[0];
            var zdajCount = newdata[2];
            var wtajCount = newdata[3];
            $("#reportybajCount").text(ybajCount);
            $("#reportjyajCount").text(jyajCount);
            $("#reportzdajCount").text(zdajCount);
            $("#reportwtajCount").text(wtajCount);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getsixCaseReport() {
    var url = config.webApi + configajaxUrl.caseSixtypeStatistics;
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
            $("#caseSixCount").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
