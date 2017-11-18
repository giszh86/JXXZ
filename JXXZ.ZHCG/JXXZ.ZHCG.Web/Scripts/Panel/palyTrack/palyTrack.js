//人员轨迹
function peoplePlayTrack(userId, startTime, endTime) {
    var url = config.webApi + configajaxUrl.userTrack + "?ID=" + userId + "&startTime=" + startTime + "&endTime=" + endTime;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 60000,
        dataType: 'json',
        success: function (data, jqxhr, textStatus) {
            if (data != "" && data != null && data != "undefind") {
                var result = setPointList(data);
                if (result == true) {
                    var iconUrl = '/Image/localtion/people.png';
                    startAnimation(iconUrl);
                }
            } else {
                return;
            }
           
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}

//车辆轨迹
var currentPage = 1;
var maxPageIndex = 0;
function carTrack(carid, carUnitId, cartel, startTime, endTime, currentPage, pageRecords) {
    var url = "";
    switch (carUnitId) {
        case "12":
            url = config.carPath + configajaxUrl.carHistoryTrack + "?jsession=" + gz_Token + "&devIdno=" + cartel + "&begintime=" + startTime + "&endtime=" + endTime + "&currentPage=" + currentPage + "&pageRecords=" + pageRecords + "&toMap=2";
            break;
    }
    debugger;
    $.ajax({
        url: url,
        type: 'get',
        async: true,
        timeout: 10000,
        dataType: 'jsonp',
        success: function (data, jqxhr, textStatus) {
            if (data.result == 4) {
                switch (carUnitId) {
                    case '12':
                        car_Login(carUnitId)
                        break;
                }
            } else {
                if (data.tracks.length == 0 || data.tracks == "" || data.tracks == null) {
                    msgerror = "暂无轨迹!";
                    runerrorNumber(3);
                } else {
                    var totalCount = data.pagination.totalRecords;
                    maxPageIndex = Math.ceil(totalCount / pageRecords);
                    if (currentPage <= maxPageIndex) {
                        for (var i = 0; i < data.tracks.length; i++) {
                            //经度
                            var lng = data.tracks[i].mlng;
                            //纬度
                            var lat = data.tracks[i].mlat;
                            if (parseFloat(lng) != 0 && parseFloat(lat) != 0) {
                                var wgs84 = position.bd09ToWgs84(lat, lng);
                                var x = wgs84.longitude;
                                var y = wgs84.latitude;
                                var arrayWgs = [x, y];
                                positions.push(arrayWgs);
                            }
                        }
                        currentPage = currentPage + 1;
                        carTrack(carid, carUnitId, cartel, startTime, endTime, currentPage, 200);
                    } else if (currentPage > maxPageIndex) {
                        var iconUrl = '/Image/localtion/car.png';
                        startAnimation(iconUrl);
                        currentPage = 1;
                        return;
                    }
                }
            }
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}
