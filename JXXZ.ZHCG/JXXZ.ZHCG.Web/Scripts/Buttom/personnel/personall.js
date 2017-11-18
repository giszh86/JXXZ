var oldPersonData = null;
var oldgetPersonallByTypeData = null;
function getPersonall() {
    var type = $("#checkboxSelectValue").val();
    getPersonallByType(type);
    var url=config.webApi+configajaxUrl.personBottom;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout:10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (data != oldPersonData) {
                setrenyuanpieData(data);
                setrenyuanColumnData(data);
                setpersonnelOnlineData(data);
                oldPersonData = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function getPersonallByType(type) {
    var url = config.webApi + configajaxUrl.personOnlineBottom + "?type=" + type;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (data != oldgetPersonallByTypeData) {
                setlinepersonnelData(data);
                oldgetPersonallByTypeData = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}