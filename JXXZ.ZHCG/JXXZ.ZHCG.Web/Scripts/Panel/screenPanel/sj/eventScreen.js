//设置事件高级筛选 职能部门默认值
if (document.getElementById("eventAll") != null) {
    document.getElementById("eventAll").checked = "checked"
}
function changeDepartment(event) {
    var that = event.value;
    if (that == "D1") {
        $('#eventOwnedSquadronUnit').html(Handlebars.compile($("#event-AdvancedScreeningAll").html()))
    } else if (that == "D2") {
        $('#eventOwnedSquadronUnit').html(Handlebars.compile($("#event-AdvancedScreeningSquadron").html()))
    } else if (that == "D3") {
        $('#eventOwnedSquadronUnit').html(Handlebars.compile($("#event-AdvancedScreeningUnit").html()))
    }
}
function eventAdvancedScreeningSubmit() {
    var titleArray = "<tr><td></td><td>事件编号</td><td>标题</td><td></td></tr>";
    showlist("事件列表", titleArray, 270, 370, configType.eventAS);
    var filters = [];
    filters.push({ property: "sourceid", value: $('input:radio[name="eventScreeningHide"]:checked').val() });
    filters.push({ property: "unitid", value: $('input:radio[name="eventScreeningAll"]:checked').val() });
    filters = JSON.stringify(filters)
    eventlist(config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize, 1);
    hideScreen()
}
//搜索按钮事件
function AdvancedSearch() {
    var filters = [];
    filters.push({ property: "eventtitle", value: $('#AdvancedSearchValue').val() });
    filters = JSON.stringify(filters)
    eventlist(config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize, 1);
    var titleArray = "<tr><td></td><td>事件编号</td><td>标题</td><td></td></tr>";
    showlistPanel();
    showlist("事件列表", titleArray, 270, 370, configType.event);
}
//左下角事件点击筛选
function eventLeftOnClick(number) {
    var titleArray = "<tr><td></td><td>事件编号</td><td>标题</td><td></td></tr>";
    hideListTab();
    changelistcontent();
    showlist("事件列表", titleArray, 270, 370, configType.eventoc);
    var filters = [];
    filters.push({ property: "sourceid", value: number });
    filters = JSON.stringify(filters)
    eventlist(config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize, 1);
    $("#eventOnclickValue").val(number)
    
}