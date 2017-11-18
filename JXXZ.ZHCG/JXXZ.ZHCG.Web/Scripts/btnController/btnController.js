function add(val) {
    if ((parseInt(val) + 1) > 12) {
        return;
    } else {
        setval((parseInt(val) + 1));
        var month = (parseInt(val) + 1);
        getCurringAllbyMonth(month);
    }
}

function subtraction(val) {
    if ((parseInt(val) - 1) == 0) {
        return;
    } else {
        setval((parseInt(val) - 1));
        var month = (parseInt(val) - 1);
        getCurringAllbyMonth(month);
    }
}

function setval(val) {
    $("#curringNowMoth").text(val);
}

function getval() {
    return $("#curringNowMoth").text();
}