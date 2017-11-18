
//养护列表的搜索
function conservationSearch() {

    hideAllBottom();
    document.getElementById("curing").style.visibility = "visible";

    var filters = [];
    filters.push({ property: "contractname", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    curingcontractlist(config.webApi + configajaxUrl.curingcontractlist + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize, 1);

    var titleArray = "<tr><td>状态</td><td>养护合同</td><td>养护总金额</td><td></td></tr>";
    showlistPanel();
    showlist("养护列表", titleArray, 270, 370, configType.curringContractsc);
    stopInterval();
    getCurringAll();
    getCurringleftPie();
    hideListTab();
    changelistcontent();
}