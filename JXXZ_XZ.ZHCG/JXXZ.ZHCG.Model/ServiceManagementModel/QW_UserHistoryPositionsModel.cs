using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class QW_UserHistoryPositionsModel
    {
        public int upid { get; set; }
        public int userid { get; set;}
        public decimal? x84 { get; set; }
        public decimal? y84 { get; set; }
        public decimal? x2000{ get; set; }
        public decimal? y2000{ get; set; }
        public Nullable<System.DateTime> positiontime { get; set; }
        public string  imeicode { get; set; }
        public int speed { get; set; }
        public string  address { get; set; }
    }
}
