$(document).ready(function () {
    hideAllBottom();
    hidelist();
    hideoutline();
    hidedetail();
});
var tabs = document.getElementById("hexagonMenu").getElementsByTagName("li");
hexagonMenuChange(tabs);
//事件案件定时器
var eventNumberTimer;
var caseNumberTimer;
//低洼地段定时器
var callPoliceTimer;

//全局时间控件
var timer;
//菜单切换
function hexagonMenuChange(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
    }
    function tabChanges(any) {
        $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
        document.getElementById("AdvancedSearchValue").value = "";
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                $(tabs[i]).addClass("bottomImgUp_selected");
                if (tabs[i].tabIndex == 1) {
                    hideAllBottom();
                    document.getElementById("personnel").style.visibility = "visible";
                    //清空高级筛选数组
                    peoplefilters = [];
                    peoplelist(config.webApi + configajaxUrl.peoplelist + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td></td><td>姓名</td><td>编号</td><td></td></tr>";
                    showlistPanel();
                    showlist("人员列表", titleArray, 270, 370, configType.people);
                    var checkobj = document.getElementById("checkbox").getElementsByTagName("li");
                    checkboxListSwitch(checkobj);
                    oldPersonData = null;
                    oldgetPersonallByTypeData = null;
                    stopInterval();
                    timer = setInterval("getPersonall()", config.ajaxsecond);
                }
                if (tabs[i].tabIndex == 2) {
                    hideAllBottom();
                    document.getElementById("vehicle").style.visibility = "visible";
                    carFilter = [];
                    getCarList(config.webApi + configajaxUrl.carlist + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td>车牌号</td><td>车辆类型</td><td></td></tr>";
                    showlistPanel();
                    showlist("车辆列表", titleArray, 270, 370, configType.cartype);
                    stopInterval();
                }
                if (tabs[i].tabIndex == 3) {
                    hideAllBottom();
                    document.getElementById("monitor").style.visibility = "visible";
                    cameratree(config.webApi + configajaxUrl.cameraTree);
                    changelistcontentcamera();
                    showtree();
                    showlist("监控列表", null, 270, 370, configType.camera);
                    stopInterval();
                    oldMonitorData = null;
                    getMonitorBottom();
                    hideTree();
                }
                if (tabs[i].tabIndex == 4) {
                    hideAllBottom();
                    document.getElementById("event").style.visibility = "visible";
                    var filters = [];
                    filters.push({ property: "eventtitle", value: $('#AdvancedSearchValue').val() });
                    filters = JSON.stringify(filters)
                    eventlist(config.webApi + configajaxUrl.eventlisturl + "?filter=" + filters + "&start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td></td><td>事件编号</td><td>标题</td><td></td></tr>";
                    showlistPanel();
                    showlist("事件列表", titleArray, 270, 370, configType.event);
                    stopInterval();
                    oldeventdata = null;
                    timer = setInterval("getEventBottom()", config.ajaxsecond);
                }
                if (tabs[i].tabIndex == 5) {
                    hideAllBottom();
                    document.getElementById("case").style.visibility = "visible";
                    ajlist(config.webApi + configajaxUrl.ajlisturl + "?start=0&limit=" + config.pageSize, 1);
                    var titleArray = "<tr><td>案件编号</td><td>案由</td><td></td></tr>";
                    showlistPanel();
                    showlist("案件列表", titleArray, 270, 370, configType.ybaj);
                    stopInterval();
                    oldCaseData = null;
                    getCaseBottom();
                    timer = setInterval("getCaseBottom()", config.ajaxsecond);
                }
                if (tabs[i].tabIndex == 6) {
                    partsSearchFilter = [];
                    $("#partOnclickValue").val(null);
                    hideAllBottom();
                    document.getElementById("parts").style.visibility = "visible";
                    bjlist(config.webApi + configajaxUrl.partlist + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td>部件名称</td><td>类型</td><td></td></tr>";
                    showlistPanel();
                    showlist("部件列表", titleArray, 270, 370, configType.partlist);
                    stopInterval();
                    getPartsAll();
                }
                if (tabs[i].tabIndex == 7) {
                    hideAllBottom();
                    document.getElementById("curing").style.visibility = "visible";
                    curingcontractlist(config.webApi + configajaxUrl.curingcontractlist + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td>状态</td><td>养护合同</td><td>养护总金额</td><td></td></tr>";
                    showlistPanel();
                    showlist("养护列表", titleArray, 270, 370, configType.curringContract);
                    stopInterval();
                    getCurringAll();
                    getCurringleftPie();
                }
                if (tabs[i].tabIndex == 8) {
                    hidelist();
                    hideoutline();
                    hidedetailAnimation();
                    hidetree();
                    //清空搜索数组
                    renovationFilter = [];
                    getRenovationList(config.webApi + configajaxUrl.renovation + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td>任务标题</td><td></td></tr>";
                    showlistPanel();
                    showlist("专项整治列表", titleArray, 270, 370, configType.renovation);
                }
                if (tabs[i].tabIndex == 9) {
                    hidelist();
                    hideoutline();
                    hidedetailAnimation();
                    hidetree();
                    //清空搜索数组
                    toExamineListFilter = [];
                    toExamineList(config.webApi + configajaxUrl.toExamineList + "?start=0&limit=" + config.pagetwoSize, 1);
                    var titleArray = "<tr><td>审批号</td><td>审批事项</td><td></td></tr>";
                    showlistPanel();
                    showlist("行政审批列表", titleArray, 270, 370, configType.toExamine);
                }
                if (tabs[i].tabIndex == 10) {
                    hidelist();
                    hideoutline();
                    hidedetailAnimation();
                    hidetree();
                    nobuildlist(config.webApi + configajaxUrl.nobuildlist + "?start=0&limit=" + config.pageSize, 1);
                    var titleArray = "<tr><td></td><td>违建单位</td><td></td></tr>";
                    showlistPanel();
                    showlist("违建列表", titleArray, 270, 370, configType.nobuild);
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "bottomImgUp";
            } else {
                tabs[i].className = "bottomImgUp bottomImgDown";
            }
        }
    }
}

//获取无人机
function getUavTree() {
    hideAllBottom();
    document.getElementById("monitor").style.visibility = "visible";
    uavtree(config.webApi + configajaxUrl.uavList, config.PathAshx);
    changelistcontentcamera();
    showtree();
    showlist("无人机列表", null, 270, 370, 'wrj');
    stopInterval();
    oldMonitorData = null;
    hideTree();
}


//隐藏所有底部内容
function hideAllBottom() {
    document.getElementById("first").style.visibility = "hidden";
    document.getElementById("personnel").style.visibility = "hidden";
    document.getElementById("vehicle").style.visibility = "hidden";
    document.getElementById("monitor").style.visibility = "hidden";
    document.getElementById("event").style.visibility = "hidden";
    document.getElementById("case").style.visibility = "hidden";
    document.getElementById("parts").style.visibility = "hidden";
    document.getElementById("curing").style.visibility = "hidden";
    hidelist();
    hideoutline();
    hidedetailAnimation();
    hidetree();
    hideTrack();
    hidePeriphery();
    hideScreen();
    hideframeSelection();
    appendalllocationBtn("");
    var obj = document.getElementById("tree");
    hideNicescroll(obj);
    minimizeFirst = true;
}

//显示列表
function showlist(title, titleArray, width, height, type) {
    $("#listtitle").text(title);
    $("#listtabletitle").html(titleArray);
    $("#list").width(width);
    $("#list").height(height);
    $("#currentrequesttype").val(type);
    var tabhtml;
    switch (type) {
        case 'ybaj':
            tabhtml = "<ul><li class='tabswitch_select' tabindex='1'><span>执法案件</span></li><li tabindex='2'><span>违停案件</span></li></ul>";
            appendlistTab(tabhtml);
            var seachbtn = "<img src='Image/tools/search.png' onclick='caseScreeningSubmit()' /><img src='Image/tools/seniorsearch.png' onclick='caseAdvancedScreeningShow()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = " <div class='allbtn-location' onclick='caseAlllocation()'><lable>全部定位</lable></div>";
            appendalllocationBtn(alllocationhtml);
            changeshowlistcontent();
            break;
        case 'wtaj':
            tabhtml = "<ul><li tabindex='1'><span>执法案件</span></li><li  class='tabswitch_select' tabindex='2'><span>违停案件</span></li></ul>";
            appendlistTab(tabhtml);
            var seachbtn = "<img src='Image/tools/search.png' onclick='violatedCaseScreeningSubmit()' /><img src='Image/tools/seniorsearch.png' onclick='violatedCaseAdvancedScreeningShow()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = " <div class='allbtn-location' onclick='caseAlllocation()'><lable>全部定位</lable></div>";
            appendalllocationBtn(alllocationhtml);
            changeshowlistcontent();
            break;
        case 'sj':
            var seachbtn = "<img src='Image/tools/search.png' onclick='AdvancedSearch()' /><img src='Image/tools/seniorsearch.png' onclick='AdvancedScreening()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = " <div class='allbtn-location' onclick='eventalllocation()'><lable>全部定位</lable></div>";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
        case 'jk':
            tabhtml = "<ul><li class='tabswitch_select' tabindex='3'><span>监控</span></li><li tabindex='4'><span>专题</span></li></ul>";
            appendlistTab(tabhtml);
            changeshowlistcontent();
            break;
        case 'ry':
            var seachbtn = "<img src='Image/tools/search.png' onclick='peopleSeach()' /><img src='Image/tools/seniorsearch.png' onclick='popleSeniorSearch()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = " <div class='allbtn-location' onclick='peoplealllocation()'><lable>全部定位</lable></div>";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
        case 'yh':
            var seachbtn = "<img src='Image/tools/search.png' onclick='conservationSearch()' />";
            appendlistSeachbtn(seachbtn);
            hideListTab();
            changelistcontent();
            break;
        case 'wc':
            var seachbtn = "<img src='Image/tools/search.png' onclick='nobuildlistSearch()' />";
            appendlistSeachbtn(seachbtn);
            tabhtml = "<ul><li class='tabswitch_select' tabindex='5'><span>违建列表</span></li><li tabindex='6'><span>拆迁列表</span></li></ul>";
            appendlistTab(tabhtml);
            changeshowlistcontent();
            break;
        case 'cq':
            var seachbtn = "<img src='Image/tools/search.png' onclick='demolitionllistSearch()' />";
            appendlistSeachbtn(seachbtn);
            tabhtml = "<ul><li  tabindex='5'><span>违建列表</span></li><li class='tabswitch_select' tabindex='6'><span>拆迁列表</span></li></ul>";
            appendlistTab(tabhtml);
            changeshowlistcontent();
            break;
        case 'bj':
            var seachbtn = "<img src='Image/tools/search.png' onclick='partsListSearch()' />";
            appendlistSeachbtn(seachbtn);
            hideListTab();
            changelistcontent();
            break;
        case 'wrj':
            hideListTab();
            changeshowlistcontent();
            break;
        case 'buttonPartStore'://沿街店家
            var seachbtn = "<img src='Image/tools/search.png' onclick='partStoreScreenOnclick()' />";
            appendlistSeachbtn(seachbtn);
            hideListTab();
            changelistcontent();
            break;
        case 'buttonPartStalls'://小摊小贩
            var seachbtn = "<img src='Image/tools/search.png' onclick='partStallsScreenOnclick()' />";
            appendlistSeachbtn(seachbtn);
            hideListTab();
            changelistcontent();
            break;
        case 'buttonBlackListStore'://黑名单沿街店家
            var seachbtn = "<img src='Image/tools/search.png' onclick='partStoreScreenBlackOnclick()' />";
            appendlistSeachbtn(seachbtn);
            tabhtml = "<ul><li class='tabswitch_select' tabindex='7'><span>沿街店家</span></li><li  tabindex='8'><span>小摊小贩</span></li></ul>";
            appendlistTab(tabhtml);
            changeshowlistcontent();
            break;
        case 'buttonBlackListStalls'://黑名单小摊小贩
            var seachbtn = "<img src='Image/tools/search.png' onclick='partStallsScreenBlackOnclick()' />";
            appendlistSeachbtn(seachbtn);
            tabhtml = "<ul><li  tabindex='7'><span>沿街店家</span></li><li class='tabswitch_select' tabindex='8'><span>小摊小贩</span></li></ul>";
            appendlistTab(tabhtml);
            changeshowlistcontent();
            break;
        case 'zz':
            var seachbtn = "<img src='Image/tools/search.png' onclick='renovationSearch()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = "";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
        case 'cl':
            var seachbtn = "<img src='Image/tools/search.png' onclick='carListSearch()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = " <div class='allbtn-location' onclick='caralllocation()'><lable>全部定位</lable></div>";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
        case 'jsd':
            var seachbtn = "<img src='Image/tools/search.png' onclick='lowLyingSearch()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = "";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
        case 'sp':
            var seachbtn = "<img src='Image/tools/search.png' onclick='toExamineListSearch()' />";
            appendlistSeachbtn(seachbtn);
            var alllocationhtml = "";
            appendalllocationBtn(alllocationhtml);
            hideListTab();
            changelistcontent();
            break;
    }
    $("#list").show();
}

//追加全部定位
function appendalllocationBtn(html) {
    $("#btn-alllocation").html(html);
}

//追加列表面板table切换
function appendlistTab(html) {
    $("#listtitleSwatch").show();
    $("#listtitleSwatch").html(html);
    var tabsone = document.getElementById("listtitleSwatch").getElementsByTagName("li");
    tabswitch(tabsone);
}
//隐藏列表table切换
function hideListTab() {
    $("#listtitleSwatch").hide();
}

//追加详情面板table切换
function appenddetailTab(html) {
    $("#datail-touch-bar").show();
    $("#datail-touch-bar").html(html);
    var detalistouchbar = document.getElementById("datail-touch-bar").getElementsByTagName("li");
    detailstouchbar(detalistouchbar);
}

//隐藏详情table切换
function hidedetailtab() {
    $("#datail-touch-bar").hide();
}

//显示详情table切换
function showdetailtab() {
    $("#datail-touch-bar").show();
}
//显示列表
function showlistPanel() {
    $("#listtitleSwatch").show();
    $("#searchline").show();
    $("#listbottom").show();
    $("#listcontent").show();
}
//隐藏列表
function hidelist() {
    $("#list").hide();
}

//隐藏备注面板
function hideremarkPanel() {
    $("#remarkPanel").hide();
}

//显示备注面本
function showremarkPanel(id, x, y) {
    if (x != "undefind" && x != "" && x != null && y != "undefind" && y != "" && y != null && id == 'add') {
        document.getElementById("latitude").value = y;
        document.getElementById("longitude").value = x;
        var html = '<button onclick="hideremarkPanel()">关闭</button><button onclick="addRemarkInfo()">添加</button>';
        document.getElementById("appendRemarkbtn").innerHTML = html;
    } else {
        singRemarkInfo(id);
        document.getElementById("textAreaId").value = id;
        var html = '<button onclick="hideremarkPanel()">关闭</button><button onclick="deletePoints()">删除</button>';
        document.getElementById("appendRemarkbtn").innerHTML = html;
    }
    $("#remarkInfo").val(null);
    var obj = document.getElementById("remarkPanel");
    var dragobj = document.getElementById("remarktitledrag");
    initDragdiv(obj, dragobj);
    $("#remarkPanel").show();
}

//追加列表按钮html
function appendlistSeachbtn(html) {
    $("#searchbtnContent").html(html);
}
//显示轨迹回放面板
function showTrack(id, type, name, carUnitId, cartel) {
    var values = document.getElementById("checkMapStatus").value;
    if (values == 1) {
        hidePeriphery();
        hidedetail();
        var date = new Date();
        var endTime = date.format("yyyy-MM-dd hh:mm:ss");
        document.getElementById("endTime").value = endTime;
        var newdate = date.setHours((date.getHours() - 1), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        var startTime = timeStamp(newdate);
        document.getElementById("startTime").value = startTime;
        document.getElementById("playTrackId").value = id;
        document.getElementById("playTrackType").value = type;
        document.getElementById("trackTitle").innerText = name;
        document.getElementById("carUnitId").value = carUnitId;
        document.getElementById("cartel").value = cartel;
        initsilder();
        $("#trackPlayBack").show();
        var obj = document.getElementById("trackPlayBack");
        var dragobj = document.getElementById("trackPanelDraw");
        initDragdiv(obj, dragobj);
        var dom = document.getElementById("palyTrackIcon").getElementsByTagName("li");
        palyTrackPanels(dom);
    }
}
//js日期转换yyyy-MM-dd hh:mm:ss 或者yyyy-MM-dd hh:mm:ss:S
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
}
//js日期unix时间戳转换 
var timeStamp = function (unixTime) {
    var dateObj = new Date(unixTime);
    var unixTimeToDate = dateObj.format("yyyy-MM-dd hh:mm:ss");
    return unixTimeToDate;
}



//隐藏轨迹回放面板
function hideTrack() {
    stopAnimation();
    $("#trackPlayBack").hide();
}

function changelistcontent() {
    $("#listcontent").removeClass();
    $("#listcontent").addClass('listdatacontent-seachbar');
}

function changeshowlistcontent() {
    $("#listcontent").removeClass();
    $("#listcontent").addClass('listdatacontent-seachbarswich');
}

function changelistcontentcamera() {
    $("#listcontent").removeClass();
    $("#listcontent").addClass('listdatacontent');
    $("#searchline").hide();
    $("#listbottom").hide();
    $("#listcontent").hide();
}

//显示概要
function showoutline(title, width, height, touchbarhtml) {
    $("#outlinetitle").text(title);
    $("#outline").width(width);
    $("#outline").height(height);
    $("#out-panle-foot").html(touchbarhtml);
    $("#outline").show();
    var obj = document.getElementById("outline");
    var dragobj = document.getElementById("outlinetitledrag");
    initDragdiv(obj, dragobj);
}

//隐藏概要
function hideoutline() {
    $("#outline").hide();
}


//高级筛选
function AdvancedScreening() {
    var button='<div class="btn-location" onclick="eventAdvancedScreeningSubmit()">确定</div>'
    $('#screenContent').html(Handlebars.compile($("#event-AdvancedScreening").html()))
    showScreen('事件高级筛选', 548, 370, button)
}

//显示详情
function showdetail(title, width, heigth) {
    $("#minmaxBtn").removeClass();
    $("#minmaxBtn").addClass("panelMin");
    minimizeFirst = true;
    $("#bigPaneltitle").text(title);
    $("#bigPanel").width(width);
    $("#bigPanel").height(heigth);
    $("#bigPanel").show();
    var obj = document.getElementById("bigPanel");
    var dragobj = document.getElementById("detailsdragtitle");
    initDragdiv(obj, dragobj);
    var caseprocessobj = document.getElementById("detailtab2");
    showScrool(caseprocessobj);
    var eventprocessObj = document.getElementById("detailtab6");
    showScrool(eventprocessObj);
    var objrytoDay = document.getElementById("detailtab10");
    showScrool(objrytoDay);
    var curingAssessment = document.getElementById("detailtab13");
    showScrool(curingAssessment);
    var objxcrw = document.getElementById("detailtab21");
    showScrool(objxcrw);
    try {
        var caseprocessobj = document.getElementById("detailtab2");
        hideNicescroll(caseprocessobj);
        showNicescroll(caseprocessobj);
        var eventprocessObj = document.getElementById("detailtab6");
        hideNicescroll(eventprocessObj);
        showNicescroll(eventprocessObj);
        var objrytoDay = document.getElementById("detailtab10");
        hideNicescroll(objrytoDay);
        showNicescroll(objrytoDay);
        var curingAssessment = document.getElementById("detailtab13");
        hideNicescroll(curingAssessment);
        showNicescroll(curingAssessment);
        var objxcrw = document.getElementById("detailtab21");
        hideNicescroll(objxcrw);
        showNicescroll(objxcrw);
    } catch (e) {
        console.log(e.message);
    }

}

//隐藏详情
function hidedetail() {
    $("#bigPanel").hide();
    map.removeOverlay(point_overlay);
    try{
        var objrytoDay = document.getElementById("detailtab10");
        hideNicescroll(objrytoDay);
        var eventprocessObj = document.getElementById("detailtab6");
        hideNicescroll(eventprocessObj);
        var caseprocessobj = document.getElementById("detailtab2");
        hideNicescroll(caseprocessobj);
        var curingAssessment = document.getElementById("detailtab13");
        hideNicescroll(curingAssessment);
    } catch (e) {
        console.log(e.message);
    }
    
}

//隐藏详情保留点位动画
function hidedetailAnimation() {
    $("#bigPanel").hide();
    try {
        var objrytoDay = document.getElementById("detailtab10");
        hideNicescroll(objrytoDay);
        var eventprocessObj = document.getElementById("detailtab6");
        hideNicescroll(eventprocessObj);
        var caseprocessobj = document.getElementById("detailtab2");
        hideNicescroll(caseprocessobj);
        var curingAssessment = document.getElementById("detailtab13");
        hideNicescroll(curingAssessment);
    } catch (e) {
        console.log(e.message);
    }
}

//最小化详情
var minimizeFirst = true;
var remerberDetailHight;
var remerberthisHide;
function minimizeDetail() {
    if (minimizeFirst) {
        remerberDetailHight = $("#bigPanel").outerHeight(true); 
        $("#bigPanel").animate({ height: "30px" }, function () {
            //获取详情面板的子元素
            var allchildren = $(".detail-panel-content");
            for (var i = 0; i < allchildren.length; ++i) {
                var displayStatus = $(allchildren[i]).css('display');
                if (displayStatus == 'none') {

                } else {
                    $(allchildren[i]).hide();
                    remerberthisHide = i;
                }
            }
            hidedetailtab();
            minimizeFirst = false;
            $("#minmaxBtn").removeClass();
            $("#minmaxBtn").addClass("panelMax");
        });
    } else {
        showdetailtab();
        var allchildren = $(".detail-panel-content");
        $(allchildren[remerberthisHide]).show();
        $("#minmaxBtn").removeClass();
        $("#minmaxBtn").addClass("panelMin");
        $("#bigPanel").animate({ height: remerberDetailHight });
        minimizeFirst = true;
    }
  
}


//显示周边
function showPeriphery(id, x, y, type, carUnitId, cartel) {
    var values = document.getElementById("checkMapStatus").value;
    if (values == 1) {
        switch (type) {
            case 'ry':
                var html = "<div class='btn-location' onclick='peripheryto(\"" + id + "\",\"" + x + "\",\"" + y + "\")'>定位</div>";
                $("#peoplePeripherybtn").html(html);
                $("#peoplePeriphery").show();
                var obj = document.getElementById("peoplePeriphery");
                var dragobj = document.getElementById("peoplePeriphery-title");
                initDragdiv(obj, dragobj);
                hideTrack();
                hidedetail();
                break;
            case 'sj':
                var html = "<div class='btn-location' onclick='EventPeripheryto(\"" + id + "\",\"" + x + "\",\"" + y + "\")'>定位</div>";
                $("#peoplePeripherybtn").html(html);
                $("#peoplePeriphery").show();
                var obj = document.getElementById("peoplePeriphery");
                var dragobj = document.getElementById("peoplePeriphery-title");
                initDragdiv(obj, dragobj);
                hidedetail();
                break;
            case 'cl':
                var html = "<div class='btn-location' onclick='carPeripheryto(\"" + id + "\",\"" + carUnitId + "\",\"" + cartel + "\")'>定位</div>";
                $("#peoplePeripherybtn").html(html);
                $("#peoplePeriphery").show();
                var obj = document.getElementById("peoplePeriphery");
                var dragobj = document.getElementById("peoplePeriphery-title");
                initDragdiv(obj, dragobj);
                hideTrack();
                hidedetail();
                break;
        }
    }
}

//隐藏周边
function hidePeriphery() {
    $("#peoplePeriphery").hide();
}

//显示高级搜索
function showScreen(title, width, hight, btnhtml) {
    $("#screenTitle").text(title);
    $("#screenPanel").width(width);
    $("#screenPanel").height(hight);
    $("#screenBottom").html(btnhtml);
    $("#screenPanel").show();
    var obj = document.getElementById("screenPanel");
    var dragobj = document.getElementById("screenTitleDrag");
    initDragdiv(obj, dragobj);
}

//隐藏高级搜索
function hideScreen() {
    $("#screenPanel").hide();
}
//追加高级搜索内容
function appendScreenContent(html) {
    $("#screenContent").html(html);
}

//显示树
function showtree() {
    $("#tree").show();
}

//隐藏树
function hidetree() {
    $("#tree").hide();
}

//显示高级框选面板
function showframeSelection(html, btnhtml, titleText) {
    isCheckFirst = true;
    setFrameTitle(titleText);
    appendFrameSelection(html);
    appendFrameSelectionBtn(btnhtml);
    var obj = document.getElementById("frameSelectionPanel");
    var dragobj = document.getElementById("frameselectiontitle");
    initDragdiv(obj, dragobj);
    $("#frameSelectionPanel").show();

}
//追加标题
function setFrameTitle(text) {
    $("#fame-selectionTitle").text(text);
}
//隐藏高级框选面板
function hideframeSelection() {
    $("#frameSelectionPanel").hide();
}
//追加高级框选内容
function appendFrameSelection(html) {
    $("#frameSelectionContent").html(html);
}
//追加框选面板按钮
function appendFrameSelectionBtn(html) {
    $("#frame-selectionBottom").html(html);
}
//框选全部
var isCheckFirst = true;
function checkAllSelection() {
    if (isCheckFirst) {
        //获取checkbox
        var checklist = $('input:checkbox[name="chkkx"]');
        for (var i = 0; i < checklist.length; ++i) {
            checklist[i].checked = true;
        }
        isCheckFirst = false;
    } else {
        //获取checkbox
        var checklist = $('input:checkbox[name="chkkx"]');
        for (var i = 0; i < checklist.length; ++i) {
            checklist[i].checked = false;
        }
        isCheckFirst = true;
    }
    
}

//时间暂停
function stopInterval() {
    window.clearInterval(timer);
}

//图表自适应大小
window.onresize = function () {
    casepieChart.resize();
    caseColumnrightChart.resize();
    caseColumnChart.resize();
    eventLineChart.resize();
    eventpieChart.resize();
    firstpieChart.resize();
    firstspectrumChart.resize();
    renyuanpieChart.resize();
    renyuanColumn.resize();
    linepersonnelChart.resize();
    vehiclepieChart.resize();
    vehicleColumn.resize();
    vehiclelineChart.resize();
    monitorPieChart.resize();
    monitorColumnChart.resize();
    monitorPiehightChart.resize();
    monitorPienewChart.resize();
    partshistogramChart.resize();
    partsrightpieChart.resize();
    curingcenterChart.resize();
    curingleftpieChart.resize();
    curingrightpieChart.resize();
    middleteameventChart.resize();
    statisticalAnalysisChart.resize();
    statisticalSnalysisChart.resize();
    eventcaseChart.resize();
    partsleftpieChart.resize();
    personnelOnlineChart.resize();
}

//加载silder控件
function initsilder() {
    $('.single-slider').jRange({
        from: 0,
        to: 20,
        step: 1,
        scale: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        width: 530,
        showLabels: true,
        showScale: true
    });
}

//获取数组最大值
Array.max = function (array) {
    return Math.max.apply(Math, array);
};
//获取数组最小值
Array.min = function (array) {
    return Math.min.apply(Math, array);
};