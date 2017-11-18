function initPager(obj,pageCount) {
    var html = "<img class='btn_img' src='../Image/Pager/firstPage.png' onclick='firstPage()' title='首页' /><img class='btn_img' src='../Image/Pager/lastPage.png' onclick='lastPage()' title='上一页' /><span class='showpagedelite'>第<span id='currentPage'>1</span>/<span id='pageCount'></span>页</span><img class='btn_img' src='../Image/Pager/nextPage.png' onclick='nextPage()' title='下一页' /><img class='btn_img' src='../Image/Pager/Shadowe.png' onclick='shadowe()' title='尾页' /><input type='number' id='pagenumber' class='text' min='1' value='1' required='required'  /><input type='button' value='Go' class='Go' onclick='jump()' /><input type='hidden' id='thisPageIndex' value='1' />";
    obj.html(html);
    $("#pageCount").text(pageCount);
    $("#pagenumber").attr("max", pageCount);
}

//首页
function firstPage() {
    $("#thisPageIndex").val(1);
    $("#currentPage").text(1);
    ajaxData();
}
//上一页
function lastPage() {
    var currentPage = $("#currentPage").text();
    if (parseInt(currentPage) == 1) {
    } else {
        var pageIndex = (parseInt(currentPage) - 1);
        $("#currentPage").text(pageIndex);
        $("#thisPageIndex").val(pageIndex);
    }
    ajaxData();
}
//下一页
function nextPage() {
    var currentPage = $("#currentPage").text();
    var pageCount=$("#pageCount").text();
    if (parseInt(currentPage) == parseInt(pageCount)) {
    } else {
        var pageIndex = (parseInt(currentPage) + 1);
        $("#currentPage").text(pageIndex);
        $("#thisPageIndex").val(pageIndex);
    }
    ajaxData();
}
//尾页
function shadowe() {
    $("#thisPageIndex").val($("#pageCount").text());
    $("#currentPage").text($("#pageCount").text());
    ajaxData();
}
//Go
function jump() {
    var jumpPageIndex = $("#pagenumber").val();
    var pageCount = $("#pageCount").text();
    if (isNaN(jumpPageIndex)) {
        return;
    }
    if (jumpPageIndex < 1) {
        return;
    }
    if (parseInt(jumpPageIndex) > parseInt(pageCount)) {
    } else {
        $("#thisPageIndex").val(jumpPageIndex);
        $("#currentPage").text(jumpPageIndex);
    }
    ajaxData();
}

