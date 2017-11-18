//创建滚动条
function showScrool(obj) {
    $(obj).niceScroll({
        cursorcolor: "#919596",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false, //是否隐藏滚动条
    });
}

//隐藏滚动条
function hideNicescroll(obj) {
    $(obj).getNiceScroll().hide();
}
//显示滚动条
function showNicescroll(obj) {
    $(obj).getNiceScroll().show();
}
//重置滚动条
function reloadScroll(obj) {
    $(obj).getNiceScroll().resize();
}

//修正位置
function reloadshowScrool(obj, top, left) {
    obj.style.display = "none";
    $(obj).niceScroll({
        cursorcolor: "#919596",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false, //是否隐藏滚动条
        railoffset: { top: top, left: left },//管理滚动条位置
    });
    obj.style.display = "block";
}