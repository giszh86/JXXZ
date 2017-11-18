function initdatetime() {
    var data = new Date();
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    $("#yearpic").text(year);
    $("#monthpic").text(month);
}

function monthadd(val) {
    var newval;
    if ((parseInt(val) + 1) > 12) {
        return;
    } else {
        newval = (parseInt(val) + 1);
        $("#monthpic").text(newval);
    }
}

function monthreduce(val) {
    var newval;
    if ((parseInt(val) - 1) < 1) {
        return;
    } else {
        newval = parseInt(val) - 1
        $("#monthpic").text(newval);
    }
}

function yearadd(val) {
    var newval = parseInt(val) + 1;
    $("#yearpic").text(newval);
}
function yearreduce(val) {
    var newval = parseInt(val) - 1;
    $("#yearpic").text(newval);
}

function geyyear() {
    return $("#yearpic").text();
}

function getmonth() {
    return $("#monthpic").text();
}