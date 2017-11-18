var oldMonitorData = null;
function getMonitorBottom() {
    var url = config.webApi + configajaxUrl.monitorBottom;
    $.ajax({
        url: url,
        type: 'get',
        async:true,
        dataType: 'json',
        timeout: 10000,
        success: function (data, jqxhr, textStatus) {
            if (data != oldMonitorData) {
                var newdata = data.split('|');
                setmonitorColumnChart(JSON.parse(newdata[0]))
                setmonitorPieChart(JSON.parse(newdata[1]))
                setmonitorPienewChart(JSON.parse(newdata[2]))
                setmonitorPiehightChart(JSON.parse(newdata[3]))
                setMonitorTable(data)
                oldMonitorData = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function setMonitorTable(data) {
    var newdata = data.split('|');
    var arrayData = JSON.parse(newdata[4]);
    var numberData = JSON.parse(newdata[5]);
    var monitorLeftTablehtml = "";
    for (var i = 0; i < 3; i++) {
        monitorLeftTablehtml += "<tr><td>" + arrayData[i] + "</td><td id='leftTableOne" + i + "'></td></tr>";
    }
    $("#monitorLeftTable").html(monitorLeftTablehtml);
    var monitorRightTablehtml = "";
    for (var j = 3; j < arrayData.length; j++) {
        monitorRightTablehtml += "<tr><td>" + arrayData[j] + "</td><td id='leftTableOne" + j + "'></td></tr>"
    }
    $("#monitorRightTable").html(monitorRightTablehtml);

    $('#leftTableOne0').prop('number', 0).animateNumber({ number: numberData[0] }, 5500);
    $('#leftTableOne1').prop('number', 0).animateNumber({ number: numberData[1] }, 5500);
    $('#leftTableOne2').prop('number', 0).animateNumber({ number: numberData[2] }, 5500);
    $('#leftTableOne3').prop('number', 0).animateNumber({ number: numberData[3] }, 5500);
    $('#leftTableOne4').prop('number', 0).animateNumber({ number: numberData[4] }, 5500);
    $('#leftTableOne5').prop('number', 0).animateNumber({ number: numberData[5] }, 5500);
}