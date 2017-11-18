//执法案件搜索
function caseScreeningSubmit() {
    var titleArray = "<tr><td>案件编号</td><td>案由</td><td></td></tr>";
    showlistPanel();
    showlist("案件列表", titleArray, 270, 370, configType.ybajsc);
    var filters = [];
    filters.push({ property: "casereason", value: $("#AdvancedSearchValue").val() });
    filters = JSON.stringify(filters)
    ajlist(config.webApi + configajaxUrl.ajlisturl + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
}
//执法案件高级筛选
function caseAdvancedScreeningSubmit() {
    var titleArray = "<tr><td>案件编号</td><td>案由</td><td></td></tr>";
    showlistPanel();
    showlist("案件列表", titleArray, 270, 370, configType.ybajgsc);
    var filters = [];
    filters.push({ property: "casetype", value: $('input:radio[name="caseType"]:checked').val() });
    filters.push({ property: "casesourceid", value: $('input:radio[name="sourceOfTheCase"]:checked').val() });
    filters.push({ property: "unitid", value: $('input:radio[name="functionSquadron"]:checked').val() });
    filters = JSON.stringify(filters)
    ajlist(config.webApi + configajaxUrl.ajlisturl + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
    hideScreen()
}


//显示执法案件高级筛选
function caseAdvancedScreeningShow() {
    var button = "<div class='btn-location' onclick='caseAdvancedScreeningSubmit()'>确定</div>"
    $('#screenContent').html(Handlebars.compile($("#case-AdvancedScreening").html()))
    showScreen('执法案件高级筛选', 548, 370, button)
}

//违停案件搜索
function violatedCaseScreeningSubmit() {
    var titleArray = "<tr><td>车牌号</td><td>地址</td><td></td></tr>";
    showlistPanel();
    showlist("案件列表", titleArray, 270, 370, configType.wtajsc);
    var filters = [];
    filters.push({ property: "carnum", value: $("#AdvancedSearchValue").val() });
    filters = JSON.stringify(filters)
    wtajlist(config.webApi + configajaxUrl.wtajlisturl + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
}
//显示违停案件高级筛选
function violatedCaseAdvancedScreeningShow() {
    var button = "<div class='btn-location' onclick='violatedCAdvancedScreeningSubmit()'>确定</div>"
    $('#screenContent').html(Handlebars.compile($("#violatedCase-AdvancedScreening").html()))
    showScreen('执法案件高级筛选', 548, 280, button)
}
//违停案件高级筛选
function violatedCAdvancedScreeningSubmit() {
    var titleArray = "<tr><td>车牌号</td><td>地址</td><td></td></tr>";
    showlistPanel();
    showlist("案件列表", titleArray, 270, 370, configType.wtajgsc);
    var filters = [];
    filters.push({ property: "isphone", value: $('input:radio[name="sourceOfTheCase"]:checked').val() });
    filters.push({ property: "unitid", value: $('input:radio[name="belongsToSquadron"]:checked').val() });
    filters = JSON.stringify(filters)
    wtajlist(config.webApi + configajaxUrl.wtajlisturl + "?filter=" + filters + "&start=0&limit=" + config.pageSize, 1);
    hideScreen()
}
