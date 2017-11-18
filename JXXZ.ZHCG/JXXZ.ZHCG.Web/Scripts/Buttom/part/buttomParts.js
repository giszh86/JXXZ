//部件底部数据
function getPartsAll() {
    var url = config.webApi + configajaxUrl.partsBottom;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            setpartshistogramChart(data);
            setpartsrightpieChart(data);
            setpartsleftpieChart(data);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}