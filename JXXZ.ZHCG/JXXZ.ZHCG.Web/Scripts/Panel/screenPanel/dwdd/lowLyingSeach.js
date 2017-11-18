//低洼地段列表搜索
var lowLyingFilter = [];
function lowLyingSearch() {
    var searchText = $("#AdvancedSearchValue").val();
    if (searchText != "" && searchText != null) {
        //清空搜索条件
        lowLyingFilter = [];
        lowLyingFilter.push({ property: 'jkdmc', value: searchText });
        var url = config.webApi + configajaxUrl.lowLyingAreaList + "?filter=" + JSON.stringify(lowLyingFilter) + "&start=0&limit=" + config.pagetwoSize;
        lowLyingAreaList(url, 1);
    } else {
        //清空搜索条件
        lowLyingFilter = [];
        var url = config.webApi + configajaxUrl.lowLyingAreaList + "?start=0&limit=" + config.pagetwoSize;
        lowLyingAreaList(url, 1);
    }
}