//首页
function homepage() {
    hideAllBottom();
    document.getElementById("first").style.visibility = "visible";
    stopInterval();
    getIndexBottom();
    timer = setInterval("getIndexBottom()", config.ajaxsecond);
    oldindexdata = null;
}

//工具条显示隐藏
var isshowTool = true;
function showrighttoolbar() {
    if (isshowTool) {
        var values = document.getElementById("checkMapStatus").value;
        if (values == 1) {
            document.getElementById("twoMapRighttoolbar").style.visibility = "visible";
            document.getElementById("righttoolbar").style.visibility = "hidden";
            isshowTool = false;
        } else {
            document.getElementById("righttoolbar").style.visibility = "visible";
            document.getElementById("twoMapRighttoolbar").style.visibility = "hidden";
            isshowTool = false;
        }
    } else {
        $("#toolbar-tip-show").hide();
        isHidden = true;
        document.getElementById("righttoolbar").style.visibility = "hidden";
        document.getElementById("twoMapRighttoolbar").style.visibility = "hidden";
        isshowTool = true;
    }
    
}

//显示报表中心
function showReportCenter() {
    document.getElementById("reportcenter").style.visibility = "visible";
    document.getElementById("reporttab1").style.visibility = "visible";
    var tabcontrolToolone = document.getElementById("controlToolfirst").getElementsByTagName("li");
    controlTool(tabcontrolToolone);
    var tabcontrolTooltwo = document.getElementById("controlToollast").getElementsByTagName("li");
    controlToolone(tabcontrolTooltwo);
    getreportCaseAll(1);
    getreportCaseStatus(1);
    document.getElementById("reportcenterStatus").value = 1;
}

//隐藏报表中心
function hideReportCenter() {
    document.getElementById("reportcenter").style.visibility = "hidden";
    document.getElementById("reporttab1").style.visibility = "hidden";
    document.getElementById("reporttab2").style.visibility = "hidden";
    document.getElementById("reportcenterStatus").value = 2;
}


//2维地图3维地图切换
function mapChange() {
    var value = document.getElementById("checkMapStatus").value;
    if (value == 1) {
        document.getElementById("sanwei").style.visibility = "visible";
        document.getElementById("map").style.visibility = "hidden";
        document.getElementById("checkMapStatus").value = 2;
        IsHid = false;
        $("#toolbar-tip-show").hide();
        document.getElementById("twoMapRighttoolbar").style.visibility = "hidden";
        isshowTool = true;
        isHidden = false;
        InitScene();
        LoadC3SNew();
        moveTo(rememberberId, rememberType, rememberberIconUrl, rememberX, remberY, rememberCameratitle, rememberCameratypeId, bjPath);
    } else {
        document.getElementById("sanwei").style.visibility = "hidden";
        document.getElementById("map").style.visibility = "visible";
        document.getElementById("checkMapStatus").value = 1;
        document.getElementById("righttoolbar").style.visibility = "hidden";
        moveTo(rememberberId, rememberType, rememberberIconUrl, rememberX, remberY, rememberCameratitle, rememberCameratypeId, bjPath);
        isshowTool = true;
        isHidden = true;
        IsHid = true;
    }
}

//跳转办公平台
function showWorkFirst() {
    var url = config.PathAshx + "Index.html";
    window.open(url);
}