using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class LandLawReportModel
    {
        public Nullable<System.DateTime> reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public string classname { get; set; }
        public Nullable<double> wfydajzjs { get; set; }
        public Nullable<double> gtbmyss { get; set; }
        public Nullable<double> zhzfbmslyss { get; set; }
        public Nullable<double> xdcfjdsjs { get; set; }
        public Nullable<double> sqqzzxjs { get; set; }
        public Nullable<double> lacczjs { get; set; }
        public Nullable<double> sazmj { get; set; }
        public Nullable<double> qzgdmj { get; set; }
        public Nullable<double> fkje { get; set; }
        public Nullable<double> msmj { get; set; }
        public Nullable<double> ccwfjzmj { get; set; }
        public Nullable<double> mswfsd { get; set; }
        public Nullable<double> tccfjy { get; set; }
        public Nullable<double> sjcf { get; set; }
        public Nullable<double> cfqt { get; set; }
        public Nullable<double> ysgajg { get; set; }
        public Nullable<double> cqqzcs { get; set; }
        public Nullable<double> zjxszr { get; set; }
        public Nullable<double> zjxszrqt { get; set; }
        public Nullable<double> yjajs { get; set; }
        public Nullable<double> wjazjs { get; set; }
        public Nullable<double> nysd { get; set; }
        public Nullable<double> yysd { get; set; }
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
    }
}
