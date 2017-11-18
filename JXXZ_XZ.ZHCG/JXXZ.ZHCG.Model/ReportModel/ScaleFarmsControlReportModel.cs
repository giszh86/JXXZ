using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class ScaleFarmsControlReportModel
    {
        public System.DateTime reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public string classname { get; set; }
        public Nullable<int> szcyl { get; set; }
        public Nullable<int> szzfjccs { get; set; }
        public Nullable<int> szzfjcjl { get; set; }
        public Nullable<int> szxqzgtzs { get; set; }
        public Nullable<int> szzgyzwt { get; set; }
        public Nullable<int> szla { get; set; }
        public Nullable<int> szja { get; set; }
        public Nullable<double> szsjjffmk { get; set; }
        public Nullable<int> szyjsfjg { get; set; }
        public Nullable<int> qtj { get; set; }
        public Nullable<int> qty { get; set; }
        public Nullable<int> qtry { get; set; }
        public Nullable<int> qtqt { get; set; }
        public Nullable<int> qtzfjccs { get; set; }
        public Nullable<int> qtzfjcjl { get; set; }
        public Nullable<int> qtkjxqzgtzs { get; set; }
        public Nullable<int> qtla { get; set; }
        public Nullable<double> qtsjsjfmk { get; set; }
        public Nullable<int> tqts { get; set; }
        public Nullable<int> tqgb { get; set; }
        public Nullable<int> qtcc { get; set; }
        public Nullable<double> qtccwjmj { get; set; }
        public string zygzld { get; set; }
        public string czdzywt { get; set; }
        public string mldzykn { get; set; }
        public string xgdyjjy { get; set; }
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
        public string year { get; set; }
    }
}
