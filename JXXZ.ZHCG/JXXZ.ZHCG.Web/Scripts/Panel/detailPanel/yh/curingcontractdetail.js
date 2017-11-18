//养护基本信息
function curingcontractdetail(id) {
    hidedetailtouchbar();
    $("#detailtab11").show();
    var url = config.webApi + configajaxUrl.curingcontractdetails + "?contractid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='11' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='12'><span>考核信息</span></li><li tabindex='13'><span>考核细则</span></li></ul>";
            appenddetailTab(tabhtml);

            var htmldetails = "<tr><td class=panel-title-fontColor>养护合同名称</td><td colspan=3>" + data.contractname + "</td></tr><tr><td class=panel-title-fontColor>养护内容类型</td><td>" + data.contracttypename + "</td><td class=panel-title-fontColor>签订日期</td><td>" + data.signdate + "</td></tr><tr><td class=panel-title-fontColor>甲方单位</td><td>" + data.jfdw + "</td><td class=panel-title-fontColor>甲方</td><td>" + data.jfdb + "</td></tr><tr><td class=panel-title-fontColor>乙方单位</td><td>" + data.yfdw + "</td><td class=panel-title-fontColor>乙方</td><td>" + data.yfdb + "</td></tr><tr><td class=panel-title-fontColor>开始时间</td><td>" + data.starttime + "</td><td class=panel-title-fontColor>结束时间</td><td>" + data.endtime + "</td></tr><tr><td class=panel-title-fontColor>巡查金额(元)</td><td>" + data.patrolemoney + "</td><td class=panel-title-fontColor>养护金额(元)</td><td>" + data.yhmoney + "</td></tr><tr><td class=panel-title-fontColor>监理单位</td><td colspan=3>" + data.jldw + "</td></tr><tr><td class=panel-title-fontColor>养护合同说明</td><td colspan=3>" + data.patrolexplain + "</td></tr>";
            $("#curingdetaildata").html(htmldetails);
            curingcheckdata(data.contractid);
          
            showdetail("养护详情", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//养护考核信息
function curingcheckdata(id) {
    var url = config.webApi + configajaxUrl.curingAssessmentInfo + "?contractid=" + id;
    $.ajax({
        url: url,
        async:true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "<tr><td class=panel-title-fontColor>养护合同名称</td><td colspan=3 title=" + data.contractname + ">" + getsubstrvalue(data.contractname, 35) + "</td></tr><tr><td class=panel-title-fontColor>养护单位名称</td><td colspan=3 title=" + data.companyname + ">" + getsubstrvalue(data.companyname, 35) + "</td></tr><tr><td class=panel-title-fontColor>合同巡查金额</td><td>" + data.patrolemoney + "元" + "</td><td class=panel-title-fontColor>合同养护金额</td><td>" + data.currentmoney + "元" + "</td></tr><tr><td class=panel-title-fontColor>养护总金额</td><td colspan=3>" + data.summoney + "元" + "</td></tr><tr><td class=panel-title-fontColor>当月综合得分</td><td>" + data.score + "分" + "</td><td class=panel-title-fontColor>合计扣分</td><td>" + data.fraction + "分" + "</td></tr>";
            $("#curringcheckdata").html(html);
            curingmoney(data.examineid);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//养护资金拨付
function curingmoney(id) {
    var url = config.webApi + configajaxUrl.curingAssessmentPoints + "?examineid=" + id;
    $.ajax({
        url: url,
        async: true,
        type: 'get',
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "";
            $.each(data, function (i, n) {
                html += "<tr><td title=" + n.deail + ">" + getsubstrvalue(n.deail, 10) + "</td><td>" + n.deduct + "</td></tr>";
            })
            $("#nowCurringAssessment").html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    });
}
