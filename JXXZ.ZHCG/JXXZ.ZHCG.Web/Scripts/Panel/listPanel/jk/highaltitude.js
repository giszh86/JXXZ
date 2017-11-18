function highaltitudeVideo() {
    hideTree();
    showTreeloading();
    changelistcontentcamera();
    var filter = [];
    filter.push({ property: 'unitname', value: '嘉禾城乡天眼' });
    var url = config.webApi + configajaxUrl.cameraTree + "?filter=" + JSON.stringify(filter);
    $.ajax({
        url: url,
        type: "get",
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            $('#tree').treeview({
                data: data,
                expandIcon: "tree_arrows_right",
                collapseIcon: "tree_arrows_down",
                emptyIcon: "tree_arrows_camera",
                levels: 3,
                onhoverColor: "#F39944",
                showBorder: false,
                showTags: true,
                highlightSelected: true,
                highlightSearchResults: false,
                selectedBackColor: "#F39944",
                onNodeSelected: function (event, data) {
                    if (data.cameraid != null) {
                        var id = data.cameraid;
                        var type = 'jk';
                        var iconUrl = '/Image/localtion/camera.png';
                        var x = data.x84;
                        var y = data.y84;
                        var logintype = data.logintype;
                        var cameratitle = data.text;
                        moveTo(id, type, iconUrl, x, y, cameratitle, logintype);
                        location.href = "Webshell://" + data.cameraid + "&" + logintype + "";
                        //var iframesrc = "/Camera/Camera.html?Channel=" + data.cameraid + "&title=" + cameratitle + "&logintype=" + logintype;
                        //myWindow = window.open(iframesrc, '', 'width=1000,height=500, top=80, left=50');
                        //myWindow.focus();
                    }
                }
            });
            $('#tree').treeview('collapseAll', { silent: true });
            hideTreeloading();
            showTree();
            showlist("监控列表", null, 270, 370, configType.camera);
            var obj = document.getElementById("tree");
            showScrool(obj);
            showNicescroll(obj);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}