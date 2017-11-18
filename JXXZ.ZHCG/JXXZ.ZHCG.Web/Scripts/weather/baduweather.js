getWeather();
function getWeather() {
    $.ajax({
        url: 'http://api.map.baidu.com/telematics/v3/weather',
        type: 'get',
        data: {
            location: '嘉兴',
            output: 'json',
            ak: '6tYzTvGZSOpYB5Oc2YGGOKt8'
        },
        async: true,
        timeout: 10000,
        dataType: 'jsonp',
        success: function (data, jqxhr, textStatus) {
            var weatherData = data.results[0].weather_data;
            var html = "<tr><td><img src=" + weatherData[0].dayPictureUrl + " /></td><td>" + weatherData[0].weather + "</td></tr><tr><td>秀洲区</td><td>" + weatherData[0].temperature + "</td></tr>";
            $('#weatherlist').html(html);
        }, error: function (xhr, textStatus) {
            console.log(textStatus);
        }
    })
}