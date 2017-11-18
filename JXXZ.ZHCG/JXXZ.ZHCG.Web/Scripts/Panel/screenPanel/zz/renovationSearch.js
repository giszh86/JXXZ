//专项整治搜索
var renovationFilter = [];
function renovationSearch() {
    var searchText = $("#AdvancedSearchValue").val();
    if (searchText != "" && searchText != null) {
        //清空搜索条件
        renovationFilter = [];
        renovationFilter.push({ property: 'title', value: searchText });
        var url = config.webApi + configajaxUrl.renovation + "?filter=" + JSON.stringify(renovationFilter) + "&start=0&limit=" + config.pagetwoSize;
        getRenovationList(url, 1);
    } else {
        //清空搜索条件
        renovationFilter = [];
        var url = config.webApi + configajaxUrl.renovation + "?start=0&limit=" + config.pagetwoSize;
        getRenovationList(url, 1);
    }  
}