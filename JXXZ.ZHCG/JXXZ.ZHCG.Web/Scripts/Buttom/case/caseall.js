var oldCaseData = null;
function getCaseBottom() {
    var url = config.webApi + configajaxUrl.caseBottom;
    $.ajax({
        url: url,
        type: 'get',
        async:true,
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            if (data != oldCaseData) {
                setcasewtTable(data);
                setCakeCaseData(data);
                setCaseColumData(data);
                setCaseColumnrightData(data);
                oldCaseData = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function setcasewtTable(data) {
    var array = data.split('|');
    var tableData = JSON.parse(array[2]);
    var casewtbottomhtml = "";
    $("#casewtTable").html(casewtbottomhtml);
    for (var i = 0; i < tableData.length; ++i) {
        var grometry = tableData[i].grometry;
        var wtid = tableData[i].wtid;
        casewtbottomhtml += "<li onclick='showcasegrometry(\"" + wtid + "\",\"" + grometry + "\")' tabindex=" + tableData[i].wtid + "><span>" + tableData[i].car_num + "</span><span title=" + tableData[i].wt_address + ">" + getsubstrvalue(tableData[i].wt_address, 15) + "</span></li>";
    }
    $("#casewtTable").html(casewtbottomhtml);
}

var casedoscroll = function () {
    var $parent = $('#casewtTable');
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
        marginTop: -height + 'px'
    }, 500, function () {
        $first.css('marginTop', 0).appendTo($parent);
    });
};
setInterval(function () { casedoscroll() }, 2000);


function showcasegrometry(wtid, grometry) {
    var type = 'wtaj';
    var grometryarray = grometry.split(',');
    var x = grometryarray[0];
    var y = grometryarray[1];
    var iconUrl = '/Image/localtion/wtaj.png';
    moveTo(wtid, type, iconUrl, x, y);
    showwtcasedetail(wtid);
}