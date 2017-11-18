using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class LawInWaterModel
    {
        public System.DateTime reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public string classname { get; set; }
        public Nullable<int> cdzfry { get; set; }
        public Nullable<int> cdzfcl { get; set; }
        public Nullable<int> kzzfxccs { get; set; }
        public Nullable<int> zlxqzgtzs { get; set; }
        public Nullable<int> fxsswt { get; set; }
        public Nullable<int> wczgsswt { get; set; }
        public Nullable<int> jsys { get; set; }
        public Nullable<int> jcfx { get; set; }
        public Nullable<int> tsjb { get; set; }
        public Nullable<int> zlas { get; set; }
        public Nullable<int> jsfaxhdjzw { get; set; }
        public Nullable<int> hdfqw { get; set; }
        public Nullable<int> pslj { get; set; }
        public Nullable<int> ncgsl { get; set; }
        public Nullable<int> csgsl { get; set; }
        public Nullable<int> psywscll { get; set; }
        public Nullable<int> jas { get; set; }
        public Nullable<double> sjsjfmk { get; set; }
        public string zygzld { get; set; }
        public string czdzywt { get; set; }
        public string mldzykn { get; set; }
        public string xgdyjjy { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> updatetime { get; set; }
        public string remark { get; set; }
        public int createunitid { get; set; }
        public string createunitname { get; set; }
        public Nullable<int> isreport { get; set; }
        public Nullable<int> isstatistics { get; set; }
        public string preparer { get; set; }
        public string preparerphone { get; set; }
        public string shuser { get; set; }

        public int projectId { get; set; }
        public string project { get; set; }
        public string year { get; set; }
    }
}
