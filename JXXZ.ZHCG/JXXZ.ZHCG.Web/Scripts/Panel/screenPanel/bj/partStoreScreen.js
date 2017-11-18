function partStoreScreenOnclick() {
    var titleArray = "<tr><td>店家名称</td><td>店家类型</td><td></td></tr>";
    showlist("沿街店家列表", titleArray, 270, 370, configType.buttonPartStoresc);
    var filters = [];
    filters.push({ property: "shopname", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    partStallsAndStoreList(config.webApi + configajaxUrl.getStreeShopList + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize + "&type=1", 1, 1);
}

function partStoreScreenBlackOnclick() {
    var titleArray = "<tr><td>店家名称</td><td>店家类型</td><td></td></tr>";
    showlist("沿街店家列表", titleArray, 270, 370, configType.buttonPartStoreblacksc);
    var filters = [];
    filters.push({ property: "shopname", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    partStallsAndStoreList(config.webApi + configajaxUrl.getBlackList + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize + "&type=1", 1, 1);

}
