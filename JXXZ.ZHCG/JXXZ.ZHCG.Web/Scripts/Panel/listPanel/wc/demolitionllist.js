function demolitionllist(ajaxurl, status) {
    hidelisttable();
    showloading();
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var demolitionTemplate = Handlebars.compile($("#demolition-template").html());
            $('#listtabledata').html(demolitionTemplate(data["Items"]));
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