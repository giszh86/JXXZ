using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class StrawAndWasteControlModel
    {
        public Nullable<System.DateTime> reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public string classname { get; set; }
        public Nullable<int> cdzfry { get; set; }
        public Nullable<int> cdzfcl { get; set; }
        public Nullable<int> kzzfxccs1 { get; set; }
        public Nullable<int> kzzfdccs { get; set; }
        public Nullable<int> kzzfxccs2 { get; set; }
        public Nullable<int> fxczmhd { get; set; }
        public Nullable<double> ghmj1 { get; set; }
        public Nullable<int> fxysjtd { get; set; }
        public Nullable<double> ghmj2 { get; set; }
        public Nullable<int> fxczs { get; set; }
        public Nullable<int> ltfsjgla { get; set; }
        public Nullable<int> ltfsjgja { get; set; }
        public Nullable<double> ltfsjgsjsjfk { get; set; }
        public Nullable<int> nyjyla { get; set; }
        public Nullable<int> nyjyja { get; set; }
        public Nullable<double> nyjysjsjfmk { get; set; }
        public Nullable<int> fscsljla { get; set; }
        public Nullable<int> fscsljja { get; set; }
        public Nullable<double> fscsljsjsjfmk { get; set; }
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
