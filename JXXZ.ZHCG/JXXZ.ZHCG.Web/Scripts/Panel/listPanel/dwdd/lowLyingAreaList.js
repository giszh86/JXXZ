//低洼地段列表
function lowLyingAreaList(ajaxurl, status) {
    hidelisttable();
    showloading();
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var lowLyingTemplate = Handlebars.compile($("#lowLyingList-template").html());
            $('#listtabledata').html(lowLyingTemplate(data["Items"]));
            hideloading();
            showlisttable();
            if (status == 1) {
                initPager($("#Page"), data.PageCount, 'Page');
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

