function ajlist(ajaxurl, status) {
    hidelisttable();
    showloading();
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            var html = "";
            $.each(data["Items"], function (i, n) {
                if (n.wfid == "2017030613400001") {
                    html += "<tr onclick='ajoutline(\"" + n.wfsid + "\", \"" + n.wfid + "\", \"" + n.caseid + "\")'><td title=" + n.wfsid + ">" + getsubstrvalue(n.wfsid, 8) + "</td><td title=" + n.casereason + ">" + getsubstrvalue(n.casereason, 10) + "</td><td><img src='Image/tools/details.png' onclick='ajoutline(\"" + n.wfsid + "\", \"" + n.wfid + "\", \"" + n.caseid + "\")' /></td></tr>";
                } else {
                    html += "<tr onclick='ajoutline(\"" + n.wfsid + "\", \"" + n.wfid + "\", \"" + n.caseid + "\")'><td title=" + n.wfsid + ">" + getsubstrvalue(n.wfsid, 8) + "</td><td title=" + n.casereason + ">" + getsubstrvalue(n.casereason, 10) + "</td><td><img src='Image/tools/details.png' onclick='ajoutline(\"" + n.wfsid + "\", \"" + n.wfid + "\", \"" + n.caseid + "\")' /></td></tr>";
                }
            })
            $('#listtabledata').html(html);
            hideloading();
            showlisttable();
            if (status == 1) {
                initPager($("#Page"), data.PageCount, 'Page');
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}