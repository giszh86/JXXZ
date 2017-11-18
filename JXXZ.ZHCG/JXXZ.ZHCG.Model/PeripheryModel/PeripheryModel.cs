using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.PeripheryModel
{
    public class PeripheryModel
    {
        public int userid { get; set; }
        public string username { get; set; }
        public decimal? x84 { get; set; }
        public decimal? y84 { get; set; }
        public decimal? x2000 { get; set; }
        public decimal? y2000 { get; set; }
        public string phone { get; set; }
        public int? unitid { get; set; }
        public string unitname { get; set; }
        public int? ishelp { get; set; }
        public DateTime? helptime { get; set; }
        public string remarks1 { get; set; }
        public DateTime? positiontime { get; set; }
        public string shortnumber { get; set; }
    }

    public class PeripheryApi {
        public int userid { get; set; }
        public string username { get; set; }
        public decimal? x84 { get; set; }
        public decimal? y84 { get; set; }
        public decimal? x2000 { get; set; }
        public decimal? y2000 { get; set; }
        public string phone { get; set; }
        public int? unitid { get; set; }
        public string unitname { get; set; }
    
    }

    public class PeripheryInspection 
    {
        public int id { get; set; }
        public string  name { get; set; }
        public double? distance { get; set; }
        public string explain { get; set; }
    }
}
