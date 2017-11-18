using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class ReportListModel
    {
        public int reportid { get; set; }
        public string reportname { get; set; }
        public Nullable<int> reporttype { get; set; }
        public string statistics { get; set; }
        public Nullable<int> isenable { get; set; }
        public string remark { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public Nullable<System.DateTime> whattime { get; set; }

        public string isactived { get; set; }
        public string reporttypename { get; set; }
        public string reporttime { get; set; }
        public string unitname { get; set; }
        public System.DateTime reportdate { get; set; }

        public int reportyear { get; set; }
    }
}
