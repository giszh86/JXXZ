var oldindexdata = null;
function getIndexBottom() {
    var ajaxurl = config.webApi + configajaxUrl.firstPage;
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (oldindexdata != data) {
                var newdata = data.split('|');
                changeCaseColumnright(JSON.parse(newdata[0]))
                setIndexLeftTable(JSON.parse(newdata[1]))
                changeFirstspectrum(JSON.parse(newdata[2]))
                setIndexRightTable(JSON.parse(newdata[3]))
                homepage();
                oldindexdata = data;
            }
            
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        } 
    })
}
window.onload = function () {
    getIndexBottom();
    caseNumberTimer = setInterval("getCaseNumber()", config.ajaxsecond);
    eventNumberTimer = setInterval("getEventNumber()", config.ajaxsecond);
    getOtherNumber();
    callPoliceTimer = setInterval("getlowLayingAreaStatus()", config.ajaxsecond);
    document.getElementById("checkMapStatus").value = 1;
}

function setIndexLeftTable(data) {
    //24小时值班
    $('#indexOnDuty').prop('number', 0).animateNumber({ number: data[0] }, 5500);
    //市局96310
    $('#indexCityCouncil').prop('number', 0).animateNumber({ number: data[1] }, 5500);
    //环境曝光台
    $('#indexSurroundings').prop('number', 0).animateNumber({ number: data[2] }, 5500);
    //市长电话
    $('#indexMayorPhone').prop('number', 0).animateNumber({ number: data[3] }, 5500);
    //数字城管
    $('#indexNumber').prop('number', 0).animateNumber({ number: data[4] }, 5500);
    //巡查发现
    $('#indexInspection').prop('number', 0).animateNumber({ number: data[5] }, 5500);
}
function setIndexRightTable(data) {
    //执法人员进度条
    $('#indexLawEnforcementW').css('width', data[0])
    //执法人员数量
    $('#indexLawEnforcementNumber').prop('number', 0).animateNumber({ number: data[1] }, 5500);

    //执法车进度条
    $('#indexLawEnforcementCarW').css('width', data[2])
    //执法车数量
    $('#indexLawEnforcementCarNumber').prop('number', 0).animateNumber({ number: data[3] }, 5500);


    //养护人员进度条
    $('#indexConservationW').css('width', data[4])
    //养护人员数量
    $('#indexConservationNumber').prop('number', 0).animateNumber({ number: data[5] }, 5500);

    //渣土车进度条
    $('#indexSlagCarW').css('width', data[6])
    //渣土车数量
    $('#indexSlagCarNumber').prop('number', 0).animateNumber({ number: data[7] }, 5500);

    //环卫人员进度条
    $('#indexSanitationW').css('width', data[8])
    //环卫人员数量
    $('#indexSanitationNumber').prop('number', 0).animateNumber({ number: data[9] }, 5500);

    //环卫车进度条
    $('#indexSanitationCarW').css('width', data[10])
    //环卫车数量
    $('#indexSanitationCarNumber').prop('number', 0).animateNumber({ number: data[11] }, 5500);
}

