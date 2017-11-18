var partsSearchFilter = [];
function partOnclick(name) {
    partsSearchFilter = [];
    var titleArray = "<tr><td>部件编号</td><td>标题</td><td></td></tr>";
    showlist("部件列表", titleArray, 270, 370, configType.partlist);
    partsSearchFilter.push({ property: "sbxl", value: name });
    bjlist(config.webApi + configajaxUrl.partlist + "?filter=" + JSON.stringify(partsSearchFilter) + "&start=0&limit=" + config.pagetwoSize, 1);
    $("#partOnclickValue").val(name)
}

function partsListSearch() {
    partsSearchFilter = [];
    var thisListName = $("#partOnclickValue").val();
    var searchKey = $("#AdvancedSearchValue").val();
    partsSearchFilter.push({ property: "sbxl", value: thisListName });
    partsSearchFilter.push({ property: "objname", value: searchKey });
    bjlist(config.webApi + configajaxUrl.partlist + "?filter=" + JSON.stringify(partsSearchFilter) + "&start=0&limit=" + config.pagetwoSize, 1);
}


