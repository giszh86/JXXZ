function initPager(obj, pageCount, domId, type) {
    var html = "<img class='btn_img' src='../Image/Pager/firstPage.png' onclick='firstPage(" + domId + ",\"" + type + "\")' title='首页' /><img class='btn_img' src='../Image/Pager/lastPage.png' onclick='lastPage(" + domId + ",\"" + type + "\")' title='上一页' /><span class='showpagedelite'>第<span>1</span>/<span></span>页</span><img class='btn_img' src='../Image/Pager/nextPage.png' onclick='nextPage(" + domId + ",\"" + type + "\")' title='下一页' /><img class='btn_img' src='../Image/Pager/Shadowe.png' onclick='shadowe(" + domId + ",\"" + type + "\")' title='尾页' /><input type='number' class='text' min='1' value='1' required='required'  /><input type='button' value='Go' class='Go' onclick='jump(" + domId + ",\"" + type + "\")' />";
    obj.html(html);
    var childrenDom = $(obj).children("span").children("span");
    $(childrenDom[1]).text(pageCount);
    $(".text").attr("max", pageCount);
}

//首页
function firstPage(obj, type) {
    var newObj = $(obj);
    var childrenDom = $(newObj).children("span").children("span");
    $(childrenDom[0]).text(1);
    ajaxData(1, type);
}
//上一页
function lastPage(obj, type) {
    var newObj = $(obj);
    var pageIndex;
    var childrenDom = $(newObj).children("span").children("span");
    var currentPage = $(childrenDom[0]).text();
    if (parseInt(currentPage) == 1) {
        return;
    } else {
        pageIndex = (parseInt(currentPage) - 1);
        $(childrenDom[0]).text(pageIndex);
    }
    ajaxData(pageIndex, type);
}
//下一页
function nextPage(obj, type) {
    var newObj = $(obj);
    var pageIndex;
    var childrenDom = $(newObj).children("span").children("span");
    var currentPage = $(childrenDom[0]).text();
    var pageCount = $(childrenDom[1]).text();
    if (parseInt(currentPage) == parseInt(pageCount)) {
        return;
    } else {
        pageIndex = (parseInt(currentPage) + 1);
        $(childrenDom[0]).text(pageIndex);
    }
    ajaxData(pageIndex, type);
}
//尾页
function shadowe(obj, type) {
    var newObj = $(obj);
    var childrenDom = $(newObj).children("span").children("span");
    var pageIndex = $(childrenDom[1]).text();
    $(childrenDom[0]).text(pageIndex);
    ajaxData(pageIndex, type);
}

//Go
function jump(obj, type) {
    var newObj = $(obj);
    var jumpPageIndex = $($(obj).children()[5]).val();
    var childrenDom = $(newObj).children("span").children("span");
    var pageCount = $(childrenDom[1]).text();
    if (isNaN(jumpPageIndex)) {
        return;
    }
    if (jumpPageIndex < 1) {
        return;
    }
    if (parseInt(jumpPageIndex) > parseInt(pageCount)) {
        return;
    } else {
        $(childrenDom[0]).text(jumpPageIndex);
    }
    ajaxData(jumpPageIndex, type);
}