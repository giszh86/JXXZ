$(document).ready(function () {
    setInterval(function () {
        getData();
    }, 1000);
});
function getData() {
    var time = document.getElementById("time");
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth() + 1;//当前月份
    var days = date.getDay();//天
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var hoursNow;
    var minuteNow;
    var secondNow;
    var monthNow;
    var dayNow;
    if (parseInt(hours) < 10) {
        hoursNow = '0' + hours;
    } else {
        hoursNow = hours;
    }
    if (parseInt(minute) < 10) {
        minuteNow = '0' + minute;
    } else {
        minuteNow = minute;
    }
    if (parseInt(second) < 10) {
        secondNow = '0' + second;
    } else {
        secondNow = second;
    }
    if (parseInt(month) < 10) {
        monthNow = '0' + month;
    } else {
        monthNow = month;
    }
    if (parseInt(data) < 10) {
        dayNow = '0' + data;
    } else {
        dayNow = data;
    }
    time.innerHTML = year + "-" + monthNow + "-" + dayNow + "&nbsp;" + hoursNow + ":" + minuteNow + ":" + secondNow;
}

function judgeDays(days) {
    var week = "";
    switch (days) {
        case 0:
            week = "星期天";
            break;
        case 1:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
        default:
            return week;
    }
    return week;
}