var oldeventdata = null;
function getEventBottom() {
    var ajaxurl = config.webApi + configajaxUrl.receptionevent;
    $.ajax({
        url: ajaxurl,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (data != oldeventdata) {
                seteventtable(data);
                setDataEventLine(data);
                setDataEventPieChart(data);
                oldeventdata = data;
            }
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

function seteventtable(data) {
    var htmltable = "";
    $("#eventrightTable").html(htmltable);
    $("#eventrightTable").html(null);
    var newdata = data.split('|');
    var eventtable = JSON.parse(newdata[5]);
    for (var i = 0; i < eventtable.length; ++i) {
        var eventid = eventtable[i].eventId;
        var grometry = eventtable[i].grometry;
        htmltable += "<li onclick='showeventgrometry(\"" + eventid + "\",\"" + grometry + "\")'><span  title=" + eventtable[i].eventTitle + ">" + getsubstrvalue(eventtable[i].eventTitle, 7) + "</span>" + "<span>" + "<" + eventtable[i].eventUser + ">" + "</span><span>" + DateTimeTo(eventtable[i].eventTime) + "</span></li>";
    }
    $("#eventrightTable").html(htmltable);
}

var doscroll = function () {
    var $parent = $('#eventrightTable');
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
        marginTop: -height + 'px'
    }, 500, function () {
        $first.css('marginTop', 0).appendTo($parent);
    });
};
setInterval(function () { doscroll() }, 2000);

function showeventgrometry(eventId, grometry) {
    var type = 'sj';
    var grometryarray=grometry.split(',');
    var x=grometryarray[0];
    var y=grometryarray[1];
    var iconUrl = '/Image/localtion/event.png';
    moveTo(eventId, type, iconUrl, x, y);
    showevent(eventId);
}