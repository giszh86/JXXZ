//回调分页
function ajaxData(p, types) {
    pageIndex = (p - 1) * config.pageSize;
    var type = $("#currentrequesttype").val();
    var ajaxurl;
    if (types != "" && types != "undefined" && types != null) {
        switch (types) {
            case 'jsdhis':
                var id = $("#lowLyingKey").val();
                pageIndex = (p - 1) * config.lowLyingHistoryPageSize;
                ajaxurl = config.webApi + configajaxUrl.lowLyingHistory + "?start=" + pageIndex + "&limit=" + config.lowLyingHistoryPageSize + "&id=" + id;
                showLowLyingHistory(id, ajaxurl, 0);
                break;
        }
    } else {
        switch (type) {
            case "ybaj":
                ajaxurl = config.webApi + configajaxUrl.ajlisturl + "?start=" + pageIndex + "&limit=" + config.pageSize;
                ajlist(ajaxurl, 0);
                break;
            case "ybajsc":
                var filters = [];
                filters.push({ property: "casereason", value: $("#AdvancedSearchValue").val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.ajlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                ajlist(ajaxurl, 0);
                break;
            case "ybajgsc":
                var filters = [];
                filters.push({ property: "casetype", value: $('input:radio[name="caseType"]:checked').val() });
                filters.push({ property: "casesourceid", value: $('input:radio[name="sourceOfTheCase"]:checked').val() });
                filters.push({ property: "unitid", value: $('input:radio[name="functionSquadron"]:checked').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.ajlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                ajlist(ajaxurl, 0);
                break;
            case "wtaj":
                ajaxurl = config.webApi + configajaxUrl.wtajlisturl + "?start=" + pageIndex + "&limit=" + config.pageSize;
                wtajlist(ajaxurl, 0);
                break;
            case "wtajsc":
                var filters = [];
                filters.push({ property: "casereason", value: $("#AdvancedSearchValue").val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.wtajlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                wtajlist(ajaxurl, 0);
                break;
            case "wtajgsc":
                var filters = [];
                filters.push({ property: "casetype", value: $('input:radio[name="caseType"]:checked').val() });
                filters.push({ property: "casesourceid", value: $('input:radio[name="sourceOfTheCase"]:checked').val() });
                filters.push({ property: "unitid", value: $('input:radio[name="functionSquadron"]:checked').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.wtajlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                wtajlist(ajaxurl, 0);
                break;
            case "sj":
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "eventtitle", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                //ajaxurl = config.webApi + configajaxUrl.eventlisturl + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                eventlist(ajaxurl, 0);
                break;
            case "sjgj":
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "sourceid", value: $('input:radio[name="eventScreeningHide"]:checked').val() });
                filters.push({ property: "unitid", value: $('input:radio[name="eventScreeningAll"]:checked').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                eventlist(ajaxurl, 0);
                break;
            case "sjoc":
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "sourceid", value: $("#eventOnclickValue").val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                eventlist(ajaxurl, 0);
                break;
            case "ry":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (peoplefilters.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.peoplelist + "?filter=" + JSON.stringify(peoplefilters) + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    peoplelist(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.peoplelist + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    peoplelist(ajaxurl, 0);
                }
                break;
            case "yh":
                pageIndex = (p - 1) * config.pagetwoSize;
                ajaxurl = config.webApi + configajaxUrl.curingcontractlist + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                curingcontractlist(ajaxurl, 0);
                break;
            case "yhsc":
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "contractname", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.curingcontractlist + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                curingcontractlist(ajaxurl, 0);
                break;
            case "wc":
                ajaxurl = config.webApi + configajaxUrl.nobuildlist + "?start=" + pageIndex + "&limit=" + config.pageSize;
                nobuildlist(ajaxurl, 0);
                break;
            case "wcsc":
                //违建列表的搜索分页的按钮事件
                var filters = [];
                filters.push({ property: "wjholder", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.nobuildlist + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                nobuildlist(ajaxurl, 0);
                break;
            case "cq":
                ajaxurl = config.webApi + configajaxUrl.demolitionlist + "?start=" + pageIndex + "&limit=" + config.pageSize;
                demolitionllist(ajaxurl, 0);
                break;
            case "cqsc":
                var filters = [];
                filters.push({ property: "projectname", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                ajaxurl = config.webApi + configajaxUrl.demolitionlist + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize;
                demolitionllist(ajaxurl, 0);
                break;
            case "bj":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (partsSearchFilter.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.partlist + "?filter=" + JSON.stringify(partsSearchFilter) + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    bjlist(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.partlist + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    bjlist(ajaxurl, 0);
                }
                break;
            case "buttonPartStore"://沿街店家
                pageIndex = (p - 1) * config.pagetwoSize;
                partStoreurl = config.webApi + configajaxUrl.getStreeShopList + "?start=" + pageIndex + "&limit=" + config.pagetwoSize + "&type=1";
                partStallsAndStoreList(partStoreurl, 0, 1);
                break;
            case "buttonPartStoresc"://沿街店家搜索
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "shopname", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                partStoreurl = config.webApi + configajaxUrl.getStreeShopList + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize + "&type=1";
                partStallsAndStoreList(partStoreurl, 0, 1);
                break;
            case "buttonPartStalls"://小摊小贩
                pageIndex = (p - 1) * config.pagetwoSize;
                partStoreurl = config.webApi + configajaxUrl.getStreeShopList + "?start=" + pageIndex + "&limit=" + config.pagetwoSize + "&type=2";
                partStallsAndStoreList(partStoreurl, 0, 2);
                break;
            case "buttonPartStallssc"://小摊小贩搜索
                pageIndex = (p - 1) * config.pagetwoSize;
                var filters = [];
                filters.push({ property: "shopname", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                partStoreurl = config.webApi + configajaxUrl.getStreeShopList + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pagetwoSize + "&type=2";
                partStallsAndStoreList(partStallsurl, 0, 2);
                break;
            case "buttonBlackListStore"://沿街店家黑名单
                pageIndex = (p - 1) * config.pageSize;
                partStoreurl = config.webApi + configajaxUrl.getBlackList + "?start=" + pageIndex + "&limit=" + config.pageSize + "&type=1";
                partStallsAndStoreList(partStoreurl, 0, 1);
                break;
            case "buttonPartStoreblacksc"://沿街店家黑名单搜索
                pageIndex = (p - 1) * config.pageSize;
                var filters = [];
                filters.push({ property: "shopname", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)
                partStoreurl = config.webApi + configajaxUrl.getBlackList + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize + "&type=1";
                partStallsAndStoreList(partStoreurl, 0, 1);
                break;
            case "buttonBlackListStalls"://小摊小贩黑名单
                pageIndex = (p - 1) * config.pageSize;
                partStallsurl = config.webApi + configajaxUrl.getBlackList + "?start=" + pageIndex + "&limit=" + config.pageSize + "&type=2";
                partStallsAndStoreList(partStallsurl, 0, 2);
                break;
            case "buttonPartStallsblacksc"://小摊小贩黑名单搜索
                pageIndex = (p - 1) * config.pageSize;

                var filters = [];
                filters.push({ property: "person", value: $('#AdvancedSearchValue').val() });
                filters = JSON.stringify(filters)

                partStallsurl = config.webApi + configajaxUrl.getBlackList + "?filter=" + filters + "&start=" + pageIndex + "&limit=" + config.pageSize + "&type=2";
                partStallsAndStoreList(partStallsurl, 0, 2);
                break;
            case "zz":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (renovationFilter.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.renovation + "?filter=" + JSON.stringify(renovationFilter) + "&start=0&limit=" + config.pagetwoSize;
                    getRenovationList(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.renovation + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    getRenovationList(ajaxurl, 0);
                }
                break;
            case "cl":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (carFilter.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.carlist + "?filter=" + JSON.stringify(carFilter) + "&start=0&limit=" + config.pagetwoSize;
                    getCarList(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.carlist + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    getCarList(ajaxurl, 0);
                }
                break;
            case "jsd":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (lowLyingFilter.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.lowLyingAreaList + "?filter=" + JSON.stringify(lowLyingFilter) + "&start=0&limit=" + config.pagetwoSize;
                    lowLyingAreaList(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.lowLyingAreaList + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    lowLyingAreaList(ajaxurl, 0);
                }
                break;
            case "sp":
                pageIndex = (p - 1) * config.pagetwoSize;
                if (toExamineListFilter.length > 0) {
                    ajaxurl = config.webApi + configajaxUrl.toExamineList + "?filter=" + JSON.stringify(toExamineListFilter) + "&start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    toExamineList(ajaxurl, 0);
                } else {
                    ajaxurl = config.webApi + configajaxUrl.toExamineList + "?start=" + pageIndex + "&limit=" + config.pagetwoSize;
                    toExamineList(ajaxurl, 0);
                }
                break;
        }
    }
}

//截取字符串公用方法
function getsubstrvalue(value, sublength) {
    if (value != null) {
        if (value.length > sublength) {
            return value.substring(0, sublength) + "...";
        } else {
            return value;
        }
    } else {
        return "";
    }
}


//显示list table
function showlisttable() {
    $("#listtable").show();
    var obj = document.getElementById("list");
    var dragobj = document.getElementById("listhead");
    initDragdiv(obj, dragobj);
}


//隐藏list table
function hidelisttable() {
    $("#listtable").hide();
}

//显示loading
function showloading() {
    $("#loading").show();
}

//隐藏loading
function hideloading() {
    $("#loading").hide();
}
//显示树loading
function showTreeloading() {
    $("#treeloadingPanle").show();
}
hideTreeloading();
function hideTreeloading() {
    $("#treeloadingPanle").hide();
}
//显示树
function showTree() {
    $("#tree").show();
}
hideTree();
function hideTree() {
    $("#tree").hide();
}


/*===========2--3维底图公用方法============*/
//点定位
var rememberberId, rememberType, rememberberIconUrl, rememberX, remberY, rememberCameratitle, rememberCameratypeId, bjPath;
function moveTo(id, type, iconUrl, x, y, cameratitle, cameratypeId, path) {
    rememberberId = id;
    rememberType = type;
    rememberberIconUrl = iconUrl;
    rememberX = x;
    remberY = y;
    rememberCameratitle = cameratitle;
    rememberCameratypeId = cameratypeId;
    bjPath = path;
    var val = document.getElementById("checkMapStatus").value;
    if (val == 1) {
        switch (type) {
            case "ry":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "jk":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type, cameratitle, cameratypeId);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "sj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "ybaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "jyaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "wtaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "bj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "buttonPartStore":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "buttonPartStalls":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "sp":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "cl":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加定位点
                    addMark(id, x, y, iconUrl, 1, type);
                    var coordinate = [x, y];
                    flytocoordinate(coordinate);
                    point_div.style.visibility = "visible";
                    point_overlay.setPosition([x, y]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
        }
    } else {
        switch (type) {
            case "ry":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.peopleIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                    rememberberIconUrl = "/Image/localtion/people.png";
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "cl":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/car.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.carIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "jk":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/camera.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.cameraIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "sj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/event.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.eventIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "ybaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/case.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.caseIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "jyaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/case.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.caseIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "wtaj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/wtaj.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.IllegallyIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "bj":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + "\\" + bjPath;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "buttonPartStore":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/street.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.streetIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "buttonPartStalls":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    //清除三维覆盖物
                    rememberberIconUrl = "/Image/localtion/hawker.png";
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.hawkerIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "sp":
                if (x != "null" && y != "null" && x != "undefind" && y != "undefind" && x != null && y != null && x != "" & y != "") {
                    rememberberIconUrl = "/Image/localtion/politics.png";
                    //清除三维覆盖物
                    clearthreeMap();
                    var threeIconUrl = diskPath.diskIconPath + IconPath.approvalIcon;
                    LoadPointAndIcon(x, y, 10, threeIconUrl);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
        }
    }
}

function addNoodles(id, type, pointslists) {
    var val = document.getElementById("checkMapStatus").value;
    if (val == 1) {
        switch (type) {
            case "wj":
                if (pointslists != "" && pointslists != null && pointslists != "undefind" && pointslists != "null") {
                    var points = [];
                    var point = pointslists.split(';');
                    for (var i = 0; i < point.length - 1; ++i) {
                        var lastpoint = point[i].split(',');
                        var x = lastpoint[0];
                        var y = lastpoint[1];
                        var latandlont = [x, y];
                        points.push(latandlont);
                    }
                    var pointslist = [];
                    pointslist.push(points);
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加面
                    addDrawNoodles(id, 'polygon', pointslist, 'rgba(240, 19, 23, 0.7)', '#18D8F9', 2);
                    var xy = pointslist[0];
                    flytocoordinate(xy[0]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case "cq":
                if (pointslists != "" && pointslists != null && pointslists != "undefind" && pointslists != "null") {
                    var points = [];
                    var point = pointslists.split(';');
                    for (var i = 0; i < point.length - 1; ++i) {
                        var lastpoint = point[i].split(',');
                        var x = lastpoint[0];
                        var y = lastpoint[1];
                        var latandlont = [x, y];
                        points.push(latandlont);
                    }
                    var pointslist = [];
                    pointslist.push(points);
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加面
                    addDrawNoodles(id, 'polygon', pointslist, 'rgba(101, 238, 59, 0.7)', '#18D8F9', 2);
                    var xy = pointslist[0];
                    flytocoordinate(xy[0]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case 'zz':
                if (pointslists != "" && pointslists != null && pointslists != "undefind" && pointslists != "null") {
                    var points = [];
                    var point = pointslists.split(';');
                    for (var i = 0; i < point.length - 1; ++i) {
                        var lastpoint = point[i].split(',');
                        var x = lastpoint[0];
                        var y = lastpoint[1];
                        var latandlont = [x, y];
                        points.push(latandlont);
                    }
                    var pointslist = [];
                    pointslist.push(points);
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加面
                    addDrawNoodles(id, 'polygon', pointslist, 'rgba(230, 18, 237, 0.7)', '#18D8F9', 2);
                    var xy = pointslist[0];
                    flytocoordinate(xy[0]);
                }
                else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case 'xcqy':
                if (pointslists != "" && pointslists != null && pointslists != "undefind" && pointslists != "null") {
                    var points = [];
                    var point = pointslists.split(';');
                    for (var i = 0; i < point.length - 1; ++i) {
                        var lastpoint = point[i].split(',');
                        var x = lastpoint[0];
                        var y = lastpoint[1];
                        var latandlont = [x, y];
                        points.push(latandlont);
                    }
                    var pointslist = [];
                    pointslist.push(points);
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加面
                    addDrawNoodles(id, 'polygon', pointslist, 'rgba(93, 183, 71, 0.7)', '#18D8F9', 2);
                    var xy = pointslist[0];
                    flytocoordinate(xy[0]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
            case 'qdqy':
                if (pointslists != "" && pointslists != null && pointslists != "undefind" && pointslists != "null") {
                    var points = [];
                    var point = pointslists.split(';');
                    for (var i = 0; i < point.length - 1; ++i) {
                        var lastpoint = point[i].split(',');
                        var x = lastpoint[0];
                        var y = lastpoint[1];
                        var latandlont = [x, y];
                        points.push(latandlont);
                    }
                    var pointslist = [];
                    pointslist.push(points);
                    //清除覆盖物
                    clearTrack();
                    clearMulch();
                    //添加面
                    addDrawNoodles(id, 'polygon', pointslist, 'rgba(180, 88, 85, 0.7)', '#18D8F9', 2);
                    var xy = pointslist[0];
                    flytocoordinate(xy[0]);
                } else {
                    msgerror = "暂无定位!";
                    runerrorNumber(3);
                }
                break;
        }
    }
}

//轨迹回放
function palytrack(id) {
    showTrack();
}

//周边定位
function periphery() {
    var val = document.getElementById("checkMapStatus").value;
    if (val == 1) {
        var slHost = document.getElementById("mapinfo");
        var page = slHost.Content.MapInfo;
        page.Round(120.761535672228, 30.7628256373794, 0.002, peripheryjsonPonit)
    } else {
        return;
    }
}

//日期转换
var DateTimeTo = function (format) {
    var date = new Date(format);
    var longStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "&nbsp;" + date.getHours() + ":" + date.getMinutes();
    return longStr;

}