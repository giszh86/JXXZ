function checkboxListSwitch(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        var one = $(tabs[i]).children();
        $(one[0]).removeClass();
        $(one[0]).addClass("check off");
        tabs[i].onclick = function () { tabChanges(this); }
    }
    var one = $(tabs[0]).children();
    $(one[0]).removeClass();
    $(one[0]).addClass("check on");
    $("#checkboxSelectValue").val(1);
    function tabChanges(any) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] == any) {
                if (tabs[i].tabIndex == 1) {
                    var one = $(tabs[i]).children();
                    $(one[0]).removeClass();
                    $(one[0]).addClass("check on");
                    var one = $(tabs[1]).children();
                    $(one[0]).removeClass();
                    $(one[0]).addClass("check off");
                    getPersonallByType(1);
                    $("#checkboxSelectValue").val(1);
                }
                if (tabs[i].tabIndex == 2) {
                    var one = $(tabs[i]).children();
                    $(one[0]).removeClass();
                    $(one[0]).addClass("check on");
                    var one = $(tabs[0]).children();
                    $(one[0]).removeClass();
                    $(one[0]).addClass("check off");
                    getPersonallByType(2);
                    $("#checkboxSelectValue").val(2);
                }
            }
        }
    }
}