
//违建列表的搜索
function demolitionllistSearch() {
    var filters = [];
    filters.push({ property: "projectname", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    demolitionllist(config.webApi + configajaxUrl.demolitionlist + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
    var titleArray = "<tr><td></td><td>项目名称</td><td></td></tr>";
    showlistPanel();
    showlist("拆迁列表", titleArray, 270, 370, configType.demolitionsc);
}