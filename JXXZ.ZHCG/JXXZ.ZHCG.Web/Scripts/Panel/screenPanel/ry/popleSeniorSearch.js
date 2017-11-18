//人员高级搜索
function popleSeniorSearch() {
    var html = "";
    html += "<div class='peoplePeriphery-content-title'>类型</div><hr />";
    html += "<table class='peoplePeriphery-content-table'><tr><td><input type='radio' name='peopletype' id='peopleall' value='0' checked='checked' onchange='showPeopleContent(this)' /><label for='peopleall'>全部</label></td><td><input type='radio' name='peopletype' id='zfry' value='1' onchange='showPeopleContent(this)' /><label for='zfry'>执法人员</label></td><td><input type='radio' name='peopletype' id='hwry' value='2' onchange='showPeopleContent(this)' /><label for='hwry'>环卫人员</label></td><td><input type='radio' name='peopletype' id='yhry' value='3' onchange='showPeopleContent(this)' /><label for='yhry'>养护人员</label></td></tr></table><div class='peoplePeriphery-content-title'>部门</div><hr /><table class='peoplePeriphery-content-table' id='peopleDeapartRadio'><tr><td><input type='radio' name='depart' id='departall' value='0' checked='checked' /><label for='departall'>全部</label></td></tr></table>";
    var btnhtml = "<div class='btn-location' onclick='btnScreenPeopleSure()'>确定</div>";
    appendScreenContent(html);
    showScreen("人员高级搜索", 590, 230, btnhtml);
}

//获取人员radio选择值
function showPeopleContent(p) {
    var value = p.value;
    var html = "";
    switch (value) {
        case "0":
            html += "<tr><td><input type='radio' name='depart' id='departall' value='0' checked='checked' /><label for='departall'>全部</label></td></tr>";
            break;
        case "1":
            html += "<tr><td><input type='radio' name='depart' id='jdzdPart' value='10' checked='checked' /><label for='jdzdPart'>机动中队</label></td><td><input type='radio' name='depart' id='xczdPart' value='11' /><label for='xczdPart'>新城中队</label></td><td><input type='radio' name='depart' id='gzzdPart' value='12' /><label for='gzzdPart'>高照中队</label></td><td><input type='radio' name='depart' id='wdzdPart' value='13' /><label for='wdzdPart'>王店中队</label></td></tr><tr><td><input type='radio' name='depart' id='hhzdPart' value='14' /><label for='hhzdPart'>洪合中队</label></td><td><input type='radio' name='depart' id='xkzdPart' value='15' /><label for='xkzdPart'>新塍中队</label></td><td><input type='radio' name='depart' id='wjjzdPart' value='16' /><label for='wjjzdPart'>王江泾中队</label></td><td><input type='radio' name='depart' id='ycgzdPart' value='17' /><label for='ycgzdPart'>油车港中队</label></td></tr>";
            break;
        case "2":
            html += "<tr><td><input type='radio' name='depart' id='hwPartone' value='30' checked='checked' /><label for='hwPartone'>环卫部门01</label></td><td><input type='radio' name='depart' id='hwParttwo' value='31' /><label for='hwParttwo'>环卫部门02</label></td></tr>";
            break;
        case "3":
            html += "<tr><td><input type='radio' name='depart' id='xcstreet' value='18' checked='checked' /><label for='xcstreet'>新城街道</label></td><td><input type='radio' name='depart' id='gzstreet' value='19' /><label for='gzstreet'>高照街道</label></td><td><input type='radio' name='depart' id='xystreet' value='20' /><label for='xystreet'>秀源水务公司</label></td><td><input type='radio' name='depart' id='xhstreet' value='21' /><label for='xhstreet'>秀宏-绿化</label></td></tr><tr><td><input type='radio' name='depart' id='gxstreet' value='26' /><label for='gxstreet'>高新区</label></td></tr>";
            break;
    }
    $("#peopleDeapartRadio").html(html);
}
//高级搜索
var peoplefilters = [];
function btnScreenPeopleSure() {
    //获取radio值
    var UnitTypeID = $('input:radio[name="peopletype"]:checked').val();
    //获取radio值
    var UnitID = $('input:radio[name="depart"]:checked').val();
    //清空高级筛选数组
    peoplefilters = [];
    peoplefilters.push({ property: 'UnitTypeID', value: UnitTypeID });
    peoplefilters.push({ property: 'UnitID', value: UnitID });
    var url = config.webApi + configajaxUrl.peoplelist + "?filter=" + JSON.stringify(peoplefilters) + "&start=0&limit=" + config.pagetwoSize;
    peoplelist(url, 1);
    hideScreen();
}
//搜索
var peopleUsuallyFilters = [];
function peopleSeach() {
    var seachText = $("#AdvancedSearchValue").val();
    peopleUsuallyFilters = [];
    peoplefilters.forEach(function (i) {
        peopleUsuallyFilters.push(i);
    })
    peopleUsuallyFilters.push({ property: 'DisplayName', value: seachText });
    var url = config.webApi + configajaxUrl.peoplelist + "?filter=" + JSON.stringify(peopleUsuallyFilters) + "&start=0&limit=" + config.pagetwoSize;
    peoplelist(url, 1);
    hideScreen();
}
