//行政审批详情
function toExamineDetails(id) {
    hidedetailtouchbar();
    $("#detailtab24").show();
    var url = config.webApi + configajaxUrl.toExamineDetails + "?syncrowguid=" + id;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var tabhtml = "<ul><li tabindex='24' class='datail-touch-bar-select'><span>基本信息</span></li><li tabindex='25'><span>办结信息</span></li></ul>";
            appenddetailTab(tabhtml);
            var htmldetails = "<tr><td class=panel-title-fontColor>申报号</td><td>" + data.flowsn + "</td><td class=panel-title-fontColor>审批事项</td><td>" + data.projectname + "</td></tr><tr></tr><tr><td class=panel-title-fontColor>审批类型</td><td colspan=3 title=" + data.processversioninstancename + ">" + getsubstrvalue(data.processversioninstancename, 30) + "</td></tr><tr><td class=panel-title-fontColor>申请单位名称</td><td title=" + data.applyername + ">" + getsubstrvalue(data.applyername, 15) + "</td><td class=panel-title-fontColor>法定代表人</td><td>" + data.legal + "</td></tr><tr><td class=panel-title-fontColor>证件类型</td><td>" + data.certname + "</td><td class=panel-title-fontColor>证件号</td><td>" + data.certnum + "</td></tr><tr><td class=panel-title-fontColor>联系地址</td><td colspan=3 title=" + data.address + ">" + getsubstrvalue(data.address, 35) + "</td></tr><tr><td colspan=4 style='color:orange; font-size:15px'>联系人</td></tr><tr><td colspan=4><hr size='1' /></td></tr><tr><td class=panel-title-fontColor>姓名</td><td>" + data.contactperson + "</td><td class=panel-title-fontColor>手机号</td><td>" + data.contactmobile + "</td></tr><tr><td class=panel-title-fontColor>电话号码</td><td colspan=3>" + data.contactphone + "</td></tr><tr><td class=panel-title-fontColor>备注</td><td colspan=3 title=" + data.remark + ">" + getsubstrvalue(data.remark, 35) + "</td></tr>";

            var overhtml = "<tr><td>办理部门</td><td>" + data.windowname + "</td><td>收件人</td><td>" + data.receiveusername + "</td></tr><tr><td>办件申请时间</td><td>" + data.receivedate + "</td><td>处理时间</td><td>" + data.acceptuserdate + "</td></tr><tr><td>办件承诺期限</td><td>" + data.promise_day + "天" + "</td><td>承诺办结时间</td><td>" + data.banwandate + "</td></tr><tr><td>承诺期限单位</td><td>" + data.windowname + "</td><td>实际办结时间</td><td>" + data.banjiedate + "</td></tr>";
            overToExamineDetails(overhtml);
            $("#toExamineDetaildata").html(htmldetails);
            showdetail("审批详情面板", 640, 350);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//行政审批办结详情
function overToExamineDetails(html) {
    $("#toExamineDoworkdata").html(html);
}