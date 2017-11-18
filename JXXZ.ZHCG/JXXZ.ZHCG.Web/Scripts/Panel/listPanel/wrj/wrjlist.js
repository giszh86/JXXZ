function uavtree(ajaxurl, configurl) {
    hideTree();
    showTreeloading();
    $.ajax({
        url: ajaxurl,
        type: 'get',
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

                    if (data.path != null) {
                        var path = data.path;
                        path = path.substring(2, path.length);
                        path = configurl + path;
                        var type = 'jk';
                        var iconUrl = '/Image/localtion/camera.png';
                        var iframesrc = "/Camera/uav.html?path=" + path;
                        myWindow = window.open(iframesrc, data.text, 'width=1000,height=500, top=80, left=50');
                        myWindow.focus();
                    }
                }
            });
            $('#tree').treeview('collapseAll', { silent: true });
            hideTreeloading();
            showTree();
            var obj = document.getElementById("tree");
            showScrool(obj);
            showNicescroll(obj);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}