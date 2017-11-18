using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class QW_CarHistoryPositionsModel
    {
        public int carid { get; set; }
        public Nullable<decimal> x84 { get; set; }
        public Nullable<decimal> y84 { get; set; }
        public Nullable<decimal> x2000 { get; set; }
        public Nullable<decimal> y2000 { get; set; }
        public System.DateTime positiontime { get; set; }
        public string cartel { get; set; }
        public Nullable<decimal> speed { get; set; }
        public Nullable<double> lc { get; set; }
        public Nullable<double> yl { get; set; }
        public Nullable<int> pk { get; set; }
        public Nullable<int> isanalyze { get; set; }
    }
}
