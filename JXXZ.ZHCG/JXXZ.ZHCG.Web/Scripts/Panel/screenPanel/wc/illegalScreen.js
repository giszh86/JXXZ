
//违建列表的搜索
function nobuildlistSearch() {
    hidelist();
    hideoutline();
    hidedetail();
    hidetree();
    var filters = [];
    filters.push({ property: "wjholder", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    nobuildlist(config.webApi + configajaxUrl.nobuildlist + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
    var titleArray = "<tr><td></td><td>违建单位</td><td></td></tr>";
    showlistPanel();
    showlist("违建列表", titleArray, 270, 370, configType.nobuildsc);
}