using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class SpecialPeriodReportModel
    {
        public Nullable<int> reportid { get; set; }
        public System.DateTime reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public Nullable<int> dccs { get; set; }
        public Nullable<int> cdrs { get; set; }
        public Nullable<int> cdcc { get; set; }
        public Nullable<int> fxs { get; set; }
        public Nullable<int> zgwcs { get; set; }
        public Nullable<int> xzzf { get; set; }
        public Nullable<double> fkje { get; set; }
        public Nullable<int> ffxcgzs { get; set; }
        public Nullable<double> ghzmj { get; set; }
        public Nullable<double> zgzmj { get; set; }
        public Nullable<double> wzqyjzlj { get; set; }
        public Nullable<double> wagdsjqyjzlj { get; set; }
        public Nullable<double> syqdjzlj { get; set; }
        public Nullable<double> gdzbcsctfy { get; set; }
        public Nullable<double> fkjey { get; set; }
        public Nullable<int> zg { get; set; }
        public Nullable<int> qd { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public string statisticsuser { get; set; }
        public string shuser { get; set; }
        public string bzcslshdcqk { get; set; }
        public string fxwtycljg { get; set; }
        public string drjxyrdgzap { get; set; }
        public string xysjcmxtjjsx { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> updatetime { get; set; }
        public string remark { get; set; }
        public Nullable<int> isreport { get; set; }
        public Nullable<int> isstatistics { get; set; }

        public int createunitid { get; set; }
        public string createunitname { get; set; }

        public int projectId { get; set; }
        public string project { get; set; }
        public string classname { get; set; }
        public Nullable<System.DateTime> whattime { get; set; }
    }
}
