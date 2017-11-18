//获取id, class, tagName
var get = {
    byId: function (id) {
        return typeof id === "string" ? document.getElementById(id) : id
    },
    byClass: function (sClass, oParent) {
        var aClass = [];
        var reClass = new RegExp("(^| )" + sClass + "( |$)");
        var aElem = this.byTagName("*", oParent);
        for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        return aClass
    },
    byTagName: function (elem, obj) {
        return (obj || document).getElementsByTagName(elem)
    }
};
//拖拽函数
function drag(oDrag, handle) {
    var disX = dixY = 0;
    handle = handle || oDrag;
    handle.style.cursor = "move";
    handle.onmousedown = function (event) {
        var event = event || window.event;
        disX = event.clientX - oDrag.offsetLeft;
        disY = event.clientY - oDrag.offsetTop;

        document.onmousemove = function (event) {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
            var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

            iL <= 0 && (iL = 0);
            iT <= 0 && (iT = 0);
            iL >= maxL && (iL = maxL);
            iT >= maxT && (iT = maxT);

            oDrag.style.left = iL + "px";
            oDrag.style.top = iT + "px";

            var objscroll = document.getElementById("tree");
            hideNicescroll(objscroll);
            reloadScroll(objscroll);
            showNicescroll(objscroll);

            var objrytoDay = document.getElementById("detailtab10");
            hideNicescroll(objrytoDay);
            reloadScroll(objrytoDay);
            showNicescroll(objrytoDay);

            var eventprocessObj = document.getElementById("detailtab6");
            hideNicescroll(eventprocessObj);
            reloadScroll(eventprocessObj);
            showNicescroll(eventprocessObj);

            var caseprocessobj = document.getElementById("detailtab2");
            hideNicescroll(caseprocessobj);
            reloadScroll(caseprocessobj);
            showNicescroll(caseprocessobj);

            var curingAssessment = document.getElementById("detailtab13");
            hideNicescroll(curingAssessment);
            reloadScroll(curingAssessment);
            showNicescroll(curingAssessment);

            return false
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture()
        };
        this.setCapture && this.setCapture();
        return false
    };
}
//初始化drag函数带参数
function initDragdiv(obj, dragobj) {
    drag(obj, dragobj);
}
