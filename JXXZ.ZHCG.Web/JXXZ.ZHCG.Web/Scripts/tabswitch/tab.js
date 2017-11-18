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
                    $("#tab1Content").show();
                    $(".tree").hide();
                }
                if (tabs[i].tabIndex == 2) {
                    $("#tab1Content").hide();
                    $(".tree").show();
                }
            } else if (i % 2 == 0) {
                tabs[i].className = "";
            } else {
                tabs[i].className = "";
            }
        }
    }
}