//车辆搜索
var carFilter = [];
function carListSearch() {
    var searchText = $("#AdvancedSearchValue").val();
    if (searchText != "" && searchText != null) {
        //清空搜索条件
        carFilter = [];
        carFilter.push({ property: 'carnumber', value: searchText });
        var url = config.webApi + configajaxUrl.carlist + "?filter=" + JSON.stringify(carFilter) + "&start=0&limit=" + config.pagetwoSize;
        getCarList(url, 1);
    } else {
        //清空搜索条件
        carFilter = [];
        var url = config.webApi + configajaxUrl.carlist + "?start=0&limit=" + config.pagetwoSize;
        getCarList(url, 1);
    }
}