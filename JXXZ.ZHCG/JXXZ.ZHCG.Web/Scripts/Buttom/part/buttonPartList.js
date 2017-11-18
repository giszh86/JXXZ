//小摊小贩和沿街店家的列表
function partStallsAndStoreList(ajaxurl, status, number) {
    hidelisttable();
    showloading();
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var partTemplate 
            if (number==1) {
                partTemplate = Handlebars.compile($("#buttonPartStore-template").html());
            }else{
                partTemplate = Handlebars.compile($("#buttonPartStalls-template").html());
            }
            $('#listtabledata').html(partTemplate(data["Items"]));
            hideloading();
            showlisttable();
            if (status == 1) {
                initPager($("#Page"), data.PageCount,'Page');
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//number 1为沿街店家 2为小摊小贩 3为黑名单
function partButtonOnclick(number) {
    $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
    document.getElementById("AdvancedSearchValue").value = "";
    if (number == 1) {
        partStallsAndStoreList(config.webApi + configajaxUrl.getStreeShopList + "?start=0&limit=" + config.pagetwoSize + "&type=1", 1, 1);
        var titleArray = "<tr><td>店家名称</td><td>店家类型</td><td></td></tr>";
        showlistPanel();
        showlist("沿街店家列表", titleArray, 270, 370, configType.buttonPartStore);
    }
    else if (number == 2) {
        partStallsAndStoreList(config.webApi + configajaxUrl.getStreeShopList + "?start=0&limit=" + config.pagetwoSize + "&type=2", 1, 2);
        var titleArray = "<tr><td>小摊名称</td><td>联系电话</td><td></td></tr>";
        showlistPanel();
        showlist("小摊小贩列表", titleArray, 270, 370, configType.buttonPartStalls);
    }
    else if (number == 3) {
        partStallsAndStoreList(config.webApi + configajaxUrl.getBlackList + "?start=0&limit=" + config.pageSize + "&type=1", 1, 1);
        var titleArray = "<tr><td>店家名称</td><td>店家类型</td><td></td></tr>";
        showlistPanel();
        showlist("黑名单列表", titleArray, 270, 370, configType.buttonBlackListStore);
    }

}
