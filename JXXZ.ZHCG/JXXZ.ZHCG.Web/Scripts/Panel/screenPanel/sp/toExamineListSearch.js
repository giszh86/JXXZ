//行政审批搜索
var toExamineListFilter = [];
function toExamineListSearch() {
    toExamineListFilter = [];
    toExamineListFilter.push({ property: "projectname", value: $('#AdvancedSearchValue').val() });
    toExamineList(config.webApi + configajaxUrl.toExamineList + "?filter=" + JSON.stringify(toExamineListFilter) + "&start=0&limit=" + config.pagetwoSize, 1);
    var titleArray = "<tr><td>审批事项</td><td></td></tr>";
    showlistPanel();
    showlist("行政审批列表", titleArray, 270, 370, configType.toExamine);
}