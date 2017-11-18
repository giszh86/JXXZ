//tab切换
function tabswitch(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
    }
    function tabChanges(any) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                $(tabs[i]).addClass("tabswitch_select");
                if (tabs[i].tabIndex == 1) {
                    ajlist(config.webApi + configajaxUrl.ajlisturl + "?start=0&limit=" + config.pageSize + "", 1);
                    var titleArray = "<tr><td>案件编号</td><td>案由</td><td></td></tr>";
                    showlist("案件列表", titleArray, 270, 370, configType.ybaj);
                    $("#listcontent").show();
                }
                if (tabs[i].tabIndex == 2) {
                    wtajlist(config.webApi + configajaxUrl.wtajlisturl + "?start=0&limit=" + config.pageSize + "", 1);
                    var titleArray = "<tr><td>车牌号</td><td>地址</td><td></td></tr>";
                    showlist("案件列表", titleArray, 270, 370, configType.wtaj);
                    $("#listcontent").show();
                }
                if (tabs[i].tabIndex == 3) {
                    cameratree(config.webApi + configajaxUrl.cameraTree);
                    changelistcontentcamera();
                    hideTree();
                }
                if (tabs[i].tabIndex == 4) {
                    cameratree(config.webApi + configajaxUrl.cameratopics);
                    changelistcontentcamera();
                    hideTree();
                }
                if (tabs[i].tabIndex == 5) {
                    $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
                    document.getElementById("AdvancedSearchValue").value = "";
                    nobuildlist(config.webApi + configajaxUrl.nobuildlist + "?start=0&limit=" + config.pageSize, 1);
                    var titleArray = "<tr><td></td><td>违建单位</td><td></td></tr>";
                    showlist("违建列表", titleArray, 270, 370, configType.nobuild);
                    $("#listcontent").show();
                }
                if (tabs[i].tabIndex == 6) {
                    $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
                    document.getElementById("AdvancedSearchValue").value = "";
                    demolitionllist(config.webApi + configajaxUrl.demolitionlist + "?start=0&limit=" + config.pageSize, 1);
                    var titleArray = "<tr><td></td><td>项目名称</td><td></td></tr>";
                    showlist("拆迁列表", titleArray, 270, 370, configType.demolition);
                    $("#listcontent").show();
                }
                if (tabs[i].tabIndex == 7) {
                    $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
                    document.getElementById("AdvancedSearchValue").value = "";
                    partStallsAndStoreList(config.webApi + configajaxUrl.getBlackList + "?start=0&limit=" + config.pageSize + "&type=1", 1, 1);
                    var titleArray = "<tr><td>店家名称</td><td>店家类型</td><td></td></tr>";
                    showlist("黑名单列表", titleArray, 270, 370, configType.buttonBlackListStore);
                    $("#listcontent").show();
                }
                if (tabs[i].tabIndex == 8) {
                    $("#AdvancedSearchValue").siblings("a[href='#clear']").hide();
                    document.getElementById("AdvancedSearchValue").value = "";
                    partStallsAndStoreList(config.webApi + configajaxUrl.getBlackList + "?start=0&limit=" + config.pageSize + "&type=2", 1, 2);
                    var titleArray = "<tr><td>小摊名称</td><td>联系电话</td><td></td></tr>";
                    showlist("黑名单列表", titleArray, 270, 370, configType.buttonBlackListStalls);
                    $("#listcontent").show();
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "";
            } else {
                tabs[i].className = "";
            }
        }
    }
}

var reportMenutab = document.getElementById("reportMenu").getElementsByTagName("li");
reportCenterMenuTab(reportMenutab);
//报表中心菜单切换
function reportCenterMenuTab(reporttabs) {
    for (var i = 0; i < reporttabs.length; i++) {
        reporttabs[i].onclick = function () { reporttabsChanges(this); }
    }
    function reporttabsChanges(any) {
        for (var i = 0; i < reporttabs.length; i++) {
            if (reporttabs[i] == any) {
                reporttabs[i].className = "reporttopMenuSelect";
                if (reporttabs[i].tabIndex == 1) {
                    hideReportCenter();
                }
                if (reporttabs[i].tabIndex == 2) {
                    var Status = document.getElementById("reportcenterStatus").value;
                    if (Status == 2) {
                        document.getElementById("reportCenterLableTile").innerText = "事件专题";
                        document.getElementById("reporttopMenuTitle").innerText = "案件专题";
                        document.getElementById("reporttab1").style.visibility = "visible";
                        document.getElementById("reporttab2").style.visibility = "hidden";
                        document.getElementById("reportcenterStatus").value = 1;
                        var tabcontrolToolone = document.getElementById("controlToolfirst").getElementsByTagName("li");
                        controlTool(tabcontrolToolone);
                        var tabcontrolTooltwo = document.getElementById("controlToollast").getElementsByTagName("li");
                        controlToolone(tabcontrolTooltwo);
                        getreportCaseAll(1);
                        getreportCaseStatus(1);
                    } else {
                        var middlecaseoutlinetab = document.getElementById("middlecaseoutline").getElementsByTagName("li");
                        middlecasetab(middlecaseoutlinetab);
                        document.getElementById("reportCenterLableTile").innerText = "案件专题";
                        document.getElementById("reporttopMenuTitle").innerText = "事件专题";
                        document.getElementById("reporttab1").style.visibility = "hidden";
                        document.getElementById("reporttab2").style.visibility = "visible";
                        document.getElementById("reportcenterStatus").value = 2;
                        eventReportStatistics();
                        eventReportMiddle(1);
                        eventReportOnWeek();
                        eventClassAnalysis()
                    }
                }
            } else if (i % 2 == 0) {
                reporttabs[i].className = "";
            } else {
                reporttabs[i].className = "";
            }
        }
    }
}

//报表日期切换(案件类型统计分析)
function controlTool(casetypetabs) {
    for (var i = 0; i < casetypetabs.length; i++) {
        casetypetabs[i].onclick = function () { casetypetabChanges(this); }
        casetypetabs[i].className = "";
    }
    casetypetabs[0].className = "controlToolSelect";
    function casetypetabChanges(any) {
        for (var i = 0; i < casetypetabs.length; i++) {
            if (casetypetabs[i] == any) {
                casetypetabs[i].className = "controlToolSelect";
                if (casetypetabs[i].tabIndex == 1) {
                    var type = casetypetabs[i].tabIndex;
                    getreportCaseAll(type);
                }
                if (casetypetabs[i].tabIndex == 2) {
                    var type = casetypetabs[i].tabIndex;
                    getreportCaseAll(type);
                }
                if (casetypetabs[i].tabIndex == 3) {
                    var type = casetypetabs[i].tabIndex;
                    getreportCaseAll(type);
                }
            } else if (i % 2 == 0) {
                casetypetabs[i].className = "";
            } else {
                casetypetabs[i].className = "";
            }
        }
    }
}

//报表日期切换(案件状态统计分析)
function controlToolone(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
        tabs[i].className = "";
    }
    tabs[0].className = "controlToolSelect";
    function tabChanges(any) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                $(tabs[i]).addClass("controlToolSelect");
                if (tabs[i].tabIndex == 1) {
                    var type = tabs[i].tabIndex;
                    getreportCaseStatus(type);
                }
                if (tabs[i].tabIndex == 2) {
                    var type = tabs[i].tabIndex;
                    getreportCaseStatus(type);
                }
                if (tabs[i].tabIndex == 3) {
                    var type = tabs[i].tabIndex;
                    getreportCaseStatus(type);
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "";
            } else {
                tabs[i].className = "";
            }
        }
    }
}

//报表日期切换(各中队事件概况)
function middlecasetab(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
        tabs[i].className = "";
    }
    tabs[0].className = "controlToolSelect";
    function tabChanges(any) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                $(tabs[i]).addClass("controlToolSelect");
                if (tabs[i].tabIndex == 1) {
                    var type = tabs[i].tabIndex;
                    eventReportMiddle(type);
                }
                if (tabs[i].tabIndex == 2) {
                    var type = tabs[i].tabIndex;
                    eventReportMiddle(type);
                }
                if (tabs[i].tabIndex == 3) {
                    var type = tabs[i].tabIndex;
                    eventReportMiddle(type);
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "";
            } else {
                tabs[i].className = "";
            }
        }
    }
}

var number=0;
//轨迹回放面板按钮切换
var isStop = true;
function palyTrackPanels(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
    }
    function tabChanges(any) {
        tabs[0].className= "";
        tabs[1].className = "";
        tabs[2].className = "";
        tabs[0].className = "trackPanel-Icon palywhite";
        tabs[1].className = "trackPanel-Icon suspendwhite";
        tabs[2].className = "trackPanel-Icon stopwhite";
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                if (tabs[i].tabIndex == 1) {
                    var type = document.getElementById("playTrackType").value;
                    var id = document.getElementById("playTrackId").value;
                    var startTime=document.getElementById("startTime").value;
                    var endTime = document.getElementById("endTime").value;
                    var carUnitId = document.getElementById("carUnitId").value;
                    var cartel = document.getElementById("cartel").value;
                    switch (type) {
                        case 'ry':
                            if (number == 0) {
                                clearMulch();
                                peoplePlayTrack(id, startTime, endTime);
                            } else {
                                restartAnimation();
                                number = 0;
                            }
                            break;
                        case 'cl':
                            if (number == 0) {
                                clearMulch();
                                positions.splice(0, positions.length);//清空数组 
                                carTrack(id, carUnitId, cartel, startTime, endTime, 1, 200);
                            } else {
                                restartAnimation();
                                number = 0;
                            }
                            break;
                    }
                    tabs[i].className = "";
                    tabs[i].className = "trackPanel-Icon paly";
                }
                if (tabs[i].tabIndex == 2) {
                    var type = document.getElementById("playTrackType").value;
                    switch (type) {
                        case 'ry':
                            suspendAnimation();
                            number = 1;
                            break;
                        case 'cl':
                            suspendAnimation();
                            number = 1;
                            break;
                    }
                    tabs[i].className = "";
                    tabs[i].className = "trackPanel-Icon suspend";
                }
                if (tabs[i].tabIndex == 3) {
                    var type = document.getElementById("playTrackType").value;
                    switch (type) {
                        case 'ry':
                            stopAnimation();
                            hideTrack();
                            break;
                        case 'cl':
                            stopAnimation();
                            hideTrack();
                            break;
                    }
                    tabs[i].className = "";
                    tabs[i].className = "trackPanel-Icon stop";
                }

            }
        }
    }
}


//detailspanel详情面板touchbar切换
function detailstouchbar(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () { tabChanges(this); }
    }
    function tabChanges(any) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                $(tabs[i]).addClass("datail-touch-bar-select");
                if (tabs[i].tabIndex == 1) {
                    hidedetailtouchbar();
                    $("#detailtab1").show();
                }
                if (tabs[i].tabIndex == 2) {
                    hidedetailtouchbar();
                    $("#detailtab2").show();
                }
                if (tabs[i].tabIndex == 3) {
                    hidedetailtouchbar();
                    $("#detailtab3").show();
                }
                if (tabs[i].tabIndex == 4) {
                    hidedetailtouchbar();
                    $("#detailtab4").show();
                }
                if (tabs[i].tabIndex == 5) {
                    hidedetailtouchbar();
                    $("#detailtab5").show();
                }
                if (tabs[i].tabIndex == 6) {
                    hidedetailtouchbar();
                    $("#detailtab6").show();
                }
                if (tabs[i].tabIndex == 7) {
                    hidedetailtouchbar();
                    $("#detailtab7").show();
                }
                if (tabs[i].tabIndex == 8) {
                    hidedetailtouchbar();
                    $("#detailtab8").show();
                }
                if (tabs[i].tabIndex == 9) {
                    hidedetailtouchbar();
                    $("#detailtab9").show();
                }
                if (tabs[i].tabIndex == 10) {
                    hidedetailtouchbar();
                    $("#detailtab10").show();
                }
                if (tabs[i].tabIndex == 11) {
                    hidedetailtouchbar();
                    $("#detailtab11").show();
                }
                if (tabs[i].tabIndex == 12) {
                    hidedetailtouchbar();
                    $("#detailtab12").show();
                }
                if (tabs[i].tabIndex == 13) {
                    hidedetailtouchbar();
                    initdatetime();
                    $("#detailtab13").show();
                }
                if (tabs[i].tabIndex == 14) {
                    hidedetailtouchbar();
                    $("#detailtab14").show();
                }
                if (tabs[i].tabIndex == 15) {
                    hidedetailtouchbar();
                    $("#detailtab15").show();
                }
                if (tabs[i].tabIndex == 16) {
                    hidedetailtouchbar();
                    $("#detailtab16").show();
                }
                if (tabs[i].tabIndex == 17) {
                    hidedetailtouchbar();
                    $("#detailtab17").show();
                }
                if (tabs[i].tabIndex == 21) {
                    hidedetailtouchbar();
                    $("#detailtab21").show();
                }
                if (tabs[i].tabIndex == 22) {
                    hidedetailtouchbar();
                    $("#detailtab22").show();
                }
                if (tabs[i].tabIndex == 23) {
                    hidedetailtouchbar();
                    $("#detailtab23").show();
                }
                if (tabs[i].tabIndex == 24) {
                    hidedetailtouchbar();
                    $("#detailtab24").show();
                }
                if (tabs[i].tabIndex == 25) {
                    hidedetailtouchbar();
                    $("#detailtab25").show();
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "";
            } else {
                tabs[i].className = "";
            }
        }
    }
}

//隐藏所有详情内容
function hidedetailtouchbar() {
    $("#detailtab1").hide();
    $("#detailtab2").hide();
    $("#detailtab3").hide();
    $("#detailtab4").hide();
    $("#detailtab5").hide();
    $("#detailtab6").hide();
    $("#detailtab7").hide();
    $("#detailtab8").hide();
    $("#detailtab9").hide();
    $("#detailtab10").hide();
    $("#detailtab11").hide();
    $("#detailtab12").hide();
    $("#detailtab13").hide();
    $("#detailtab14").hide();
    $("#detailtab15").hide();
    $("#detailtab16").hide();
    $("#detailtab17").hide();
    $("#detailtab21").hide();
    $("#detailtab22").hide();
    $("#detailtab23").hide();
    $("#detailtab24").hide();
    $("#detailtab25").hide();
}
