using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{

    public class Weatherdata
    {
        public string date { get; set; }
        public string dayPictureUrl { get; set; }
        public string nightPictureUrl { get; set; }
        public string weather { get; set; }
        public string wind { get; set; }
        public string temperature { get; set; }
    }

    public class WeatherResult
    {
        public string currentCity { get; set; }
        public string pm25 { get; set; }
        //public List<> index { get; set; }
        public List<Weatherdata> weather_data { get; set; }
    }
    public class WeatherMess
    {
        public int error { get; set; }
        public string status { get; set; }
        public string date { get; set; }
        public List<WeatherResult> results { get; set; }
    }

    public class Weather
    {
        public string date { get; set; }
        public string dayPictureUrl { get; set; }
        public string nightPictureUrl { get; set; }
        public string weather { get; set; }
        public string wind { get; set; }
        public string temperature { get; set; }
        public string temperatureToday { get; set; }
    }
}
