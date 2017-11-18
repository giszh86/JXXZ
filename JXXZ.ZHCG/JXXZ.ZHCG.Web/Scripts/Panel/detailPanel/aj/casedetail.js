//执法基础信息
function showcasedetail(id, wfid){
    var ajaxurl;
    if (wfid == "2017030613400001") {
        ajaxurl = config.webApi + configajaxUrl.ajdetailurl + "?wfsid=" + id;
    } else {
        ajaxurl = config.webApi + configajaxUrl.simpleCase + "?simpleid=" + id;
    }
    hidedetailtouchbar();
    $("#detailtab1").show();
    $.ajax({
        url: ajaxurl,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var panelheight;
            var htmldetails;
            var tabhtml;
            //一般案件
            if (wfid == "2017030613400001") {
                if (data.persontype == "type_dw") {
                    htmldetails = "<tr><td class=panel-title-fontColor>案件编号</td><td>" + data.casebh + "</td><td class=panel-title-fontColor>案件地址</td><td title=" + data.caseaddress + ">" + getsubstrvalue(data.caseaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td colspan=3 title=" + data.casereason + ">" + getsubstrvalue(data.casereason, 35) + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.displayname + "</td><td class=panel-title-fontColor>案发时间</td><td>" + data.sitedatetime + "</td></tr><tr><td class=panel-title-fontColor>单位名称</td><td>" + data.f_name + "</td><td class=panel-title-fontColor>法定代表人</td><td>" + data.f_dbr + "</td></tr><tr><td class=panel-title-fontColor>证件类型</td><td>" + data.f_cardtypename + "</td><td class=panel-title-fontColor>证件号</td><td>" + data.f_card + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td><td class=panel-title-fontColor>联系地址</td><td title=" + data.contactaddress + ">" + getsubstrvalue(data.contactaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>受委托人</td><td>" + data.f_wtr + "</td><td class=panel-title-fontColor>身份证号</td><td>" + data.f_cardnum + "</td></tr><tr><td class=panel-title-fontColor>适用的法律法规</td><td colspan=3 title=" + data.flfg + ">" + getsubstrvalue(data.flfg, 35) + "</td></tr><tr><td class=panel-title-fontColor>适用的处罚</td><td colspan=3 title=" + data.cf + ">" + getsubstrvalue(data.cf, 35) + "</td></tr><tr><td class=panel-title-fontColor>案情描述</td><td colspan=3 title=" + data.casecontent + ">" + getsubstrvalue(data.casecontent, 35) + "</td></tr>";
                } else {
                    htmldetails = "<tr><td class=panel-title-fontColor>案件编号</td><td>" + data.casebh + "</td><td class=panel-title-fontColor>案件地址</td><td title=" + data.caseaddress + ">" + getsubstrvalue(data.caseaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td colspan=3 title=" + data.casereason + ">" + getsubstrvalue(data.casereason, 35) + "</td></tr><tr><td class=panel-title-fontColor>上报人</td><td>" + data.displayname + "</td><td class=panel-title-fontColor>案发时间</td><td>" + data.sitedatetime + "</td></tr><tr><td class=panel-title-fontColor>案件当事人</td><td>" + checkNowCasePeople(data.persontype, data) + "</td><td class=panel-title-fontColor>性别</td><td>" + checkSex(data.p_sex, data) + "</td></tr><tr><td class=panel-title-fontColor>证件类型</td><td>" + data.f_cardtypename + "</td><td class=panel-title-fontColor>证件号</td><td>" + data.f_card + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td><td class=panel-title-fontColor>联系地址</td><td title=" + data.contactaddress + ">" + getsubstrvalue(data.contactaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>适用的法律法规</td><td colspan=3 title=" + data.flfg + ">" + getsubstrvalue(data.flfg, 35) + "</td></tr><tr><td class=panel-title-fontColor>适用的处罚</td><td colspan=3 title=" + data.cf + ">" + getsubstrvalue(data.cf, 35) + "</td></tr><tr><td class=panel-title-fontColor>案情描述</td><td colspan=3 title=" + data.casecontent + ">" + getsubstrvalue(data.casecontent, 35) + "</td></tr>";
                }
            
                tabhtml = "<ul><li tabindex='1' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='2'><span>流转日志</span></li></ul>";
                panelheight = 350;
            } else {
                if (data.persontype == "type_dw") {
                    htmldetails = "<tr><td class=panel-title-fontColor>处罚决定书编号</td><td colspan=3>" + data.cfjdsbh + "</td></tr><tr><td class=panel-title-fontColor>案件类型</td><td>" + data.casetypeid + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td colspan=3 title=" + data.casereason + ">" + getsubstrvalue(data.casereason, 35) + "</td></tr><tr><td class=panel-title-fontColor>案件地址</td><td colspan=3>" + data.caseaddress + "</td></tr><tr><td class=panel-title-fontColor>案发时间</td><td>" + data.sitedatetime + "</td><td class=panel-title-fontColor>当事人类型</td><td>" + checkNowCasePeoplestring(data.persontype) + "</td></tr><tr><td class=panel-title-fontColor>单位名称</td><td>" + data.f_name + "</td><td class=panel-title-fontColor>法定代表人</td><td>" + data.f_dbr + "</td></tr><tr><td class=panel-title-fontColor>证件类型</td><td>" + data.f_cardtype + "</td><td class=panel-title-fontColor>证件号</td><td>" + data.f_card + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td><td class=panel-title-fontColor>受委托人</td><td>" + data.f_wtr + "</td></tr><tr><td class=panel-title-fontColor>联系地址</td><td>" + data.contactaddress + "</td><td class=panel-title-fontColor>身份证号</td><td>" + data.f_card + "</td></tr><tr><td class=panel-title-fontColor>适用的法律法规</td><td colspan=3>" + data.flfg + "</td></tr><tr><td class=panel-title-fontColor>适用的处罚</td><td colspan=3 title=" + data.cf + ">" + getsubstrvalue(data.cf, 35) + "</td></tr><tr><td class=panel-title-fontColor>案情描述</td><td colspan=3>" + getsubstrvalue(data.casecontent, 30) + "</td></tr><tr><td class=panel-title-fontColor>缴款方式</td><td colspan=3>" + data.jktype + "</td></tr><tr><td class=panel-title-fontColor>罚款金额</td><td>" + data.fk_money + "</td><td class=panel-title-fontColor>缴款银行</td><td>" + data.bank_name + "</td></tr><tr><td class=panel-title-fontColor>银行户名</td><td>" + data.bank_accountname + "</td><td class=panel-title-fontColor>银行账号</td><td>" + data.bank_account + "</td></tr><tr><td class=panel-title-fontColor>执法人姓名</td><td>" + data.zfr_name + "</td><td class=panel-title-fontColor>执法证号</td><td>" + data.zf_card + "</td></tr><tr><td class=panel-title-fontColor>执法时间</td><td>" + data.zf_time + "</td><td class=panel-title-fontColor>执法地点</td><td>" + getsubstrvalue(data.zf_address, 25) + "</td></tr>";
                } else {
                    htmldetails = "<tr><td class=panel-title-fontColor>处罚决定书编号</td><td colspan=3>" + data.cfjdsbh + "</td></tr><tr><td class=panel-title-fontColor>案件类型</td><td>" + data.casetypeid + "</td></tr><tr><td class=panel-title-fontColor>案由</td><td colspan=3 title=" + data.casereason + ">" + getsubstrvalue(data.casereason, 35) + "</td></tr><tr><td class=panel-title-fontColor>案件地址</td><td colspan=3>" + data.caseaddress + "</td></tr><tr><td class=panel-title-fontColor>案发时间</td><td colspan=3>" + data.sitedatetime + "</td></tr><tr><td class=panel-title-fontColor>当事人类型</td><td colspan=3>" + checkNowCasePeoplestring(data.persontype) + "</td></tr><tr><td class=panel-title-fontColor>姓名</td><td>" + data.p_name + "</td><td class=panel-title-fontColor>性别</td><td>" + data.p_sex + "</td></tr><tr><td class=panel-title-fontColor>证件类型</td><td>" + data.p_cardtype + "</td><td class=panel-title-fontColor>证件号</td><td>" + data.p_cardnum + "</td></tr><tr><td class=panel-title-fontColor>联系电话</td><td>" + data.contactphone + "</td><td class=panel-title-fontColor>联系地址</td><td>" + getsubstrvalue(data.contactaddress, 20) + "</td></tr><tr><td class=panel-title-fontColor>适用的法律法规</td><td colspan=3>" + data.flfg + "</td></tr><tr><td class=panel-title-fontColor>适用的处罚</td><td colspan=3 title=" + data.cf + ">" + getsubstrvalue(data.cf, 35) + "</td></tr><tr><td class=panel-title-fontColor>案情描述</td><td colspan=3>" + getsubstrvalue(data.casecontent, 30) + "</td></tr><tr><td class=panel-title-fontColor>缴款方式</td><td colspan=3>" + data.jktype + "</td></tr><tr><td class=panel-title-fontColor>罚款金额</td><td>" + data.fk_money + "</td><td class=panel-title-fontColor>缴款银行</td><td>" + data.bank_name + "</td></tr><tr><td class=panel-title-fontColor>银行户名</td><td>" + data.bank_accountname + "</td><td class=panel-title-fontColor>银行账号</td><td>" + data.bank_account + "</td></tr><tr><td class=panel-title-fontColor>执法人姓名</td><td>" + data.zfr_name + "</td><td class=panel-title-fontColor>执法证号</td><td>" + data.zf_card + "</td></tr><tr><td class=panel-title-fontColor>执法时间</td><td>" + data.zf_time + "</td><td class=panel-title-fontColor>执法地点</td><td>" + getsubstrvalue(data.zf_address, 25) + "</td></tr>";
                }
                tabhtml = "<ul><li tabindex='1' class='datail-touch-bar-select'><span>基本信息</span>";
                panelheight = 470;
            }
            appenddetailTab(tabhtml);
            showcaselink(id);
            $("#detaildata").html(htmldetails);
            showdetail("案件详情面板", 640, panelheight);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
//检查当事人或法人(type_dw=法人)
function checkNowCasePeople(value, data) {
    if (value != null) {
        if (value == "type_dw") {
            return data.f_dbr;
        } else {
            return data.p_name;
        }
    }
}
function checkNowCasePeoplestring(value) {
    if (value != null) {
        if (value == "type_dw") {
            return "法人";
        } else {
            return "自然人";
        }
    }
}


//检查性别
function checkSex(value, data) {
    if (value != null) {
        if (value == "type_dw") {
            return "";
        } else {
            return data.p_sex;
        }
    }
}

//一般案件
function showcaselink(id) {
    var ajaxurl = config.webApi + configajaxUrl.ajlink + "?wfsid=" + id;
    $.ajax({
        url: ajaxurl,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var htmllink = null;
            $.each(data, function (i, n) {
                htmllink += "<tr><td>" + n.wfdname + "</td><td>" + n.username + "</td><td>" + getsubstrvalue(n.content, 4) + "</td><td>" + n.stime + "</td><td>" + n.etime + "</td></tr>";
            });
            $("#detaildatalink").html(htmllink);
        }, error: function (data, textStatus) {
            console.log(textStatus);
        }
    })
}