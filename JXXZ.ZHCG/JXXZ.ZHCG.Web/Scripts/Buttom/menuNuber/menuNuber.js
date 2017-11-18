//获取案件数量
var caseoldNumber = null;
function getCaseNumber() {
    var url = config.webApi + configajaxUrl.caseNumber;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (caseoldNumber != data) {
                $('#caseNumber').prop('number', 0).animateNumber({ number: data }, 5500);
                caseoldNumber = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//获取事件数量
var eventoldNumber = null;
function getEventNumber() {
    var url = config.webApi + configajaxUrl.eventNumber;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (eventoldNumber != data) {
                $('#eventNumber').prop('number', 0).animateNumber({ number: data }, 5500);
                eventoldNumber = data;
            }
           
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//其他数据数量
function getOtherNumber() {
    var url = config.webApi + configajaxUrl.ontherBottom;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var peopleNumber = data[0];
            $('#peopleNumber').prop('number', 0).animateNumber({ number: peopleNumber }, 5500);
            var carNumber = data[1];
            $('#carNumber').prop('number', 0).animateNumber({ number: carNumber }, 5500);
            var cameraNumber = data[2];
            $('#cameraNumber').prop('number', 0).animateNumber({ number: cameraNumber }, 5500);
            var partsNumber = data[3];
            $('#partsNumber').prop('number', 0).animateNumber({ number: partsNumber }, 5500);
            var curringNumber = data[4];
            $('#curringNumber').prop('number', 0).animateNumber({ number: curringNumber }, 5500);
            var renovationNumber = data[5];
            $('#renovationNumber').prop('number', 0).animateNumber({ number: renovationNumber }, 5500);
            var approvalNumber = data[6];
            $('#approvalNumber').prop('number', 0).animateNumber({ number: approvalNumber }, 5500);
            var IllegalNumber = data[7];
            $('#IllegalNumber').prop('number', 0).animateNumber({ number: IllegalNumber }, 5500);

        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}