function partStallsScreenOnclick() {
    var titleArray = "<tr><td>小摊名称</td><td>联系电话</td><td></td></tr>";
    showlist("小摊小贩列表", titleArray, 270, 370, configType.buttonPartStallssc);
    var filters = [];
    filters.push({ property: "person", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    partStallsAndStoreList(config.webApi + configajaxUrl.getStreeShopList + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize + "&type=2", 1, 2);
   
}


function partStallsScreenBlackOnclick() {
    var titleArray = "<tr><td>小摊名称</td><td>联系电话</td><td></td></tr>";
    showlist("小摊小贩列表", titleArray, 270, 370, configType.buttonPartStallsblacksc);
    var filters = [];
    filters.push({ property: "person", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    partStallsAndStoreList(config.webApi + configajaxUrl.getBlackList + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize + "&type=2", 1, 2);

}


