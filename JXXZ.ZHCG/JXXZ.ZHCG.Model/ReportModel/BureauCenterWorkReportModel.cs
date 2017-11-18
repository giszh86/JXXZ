using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class BureauCenterWorkReportModel
    {
        public int reportid { get; set; }
        public System.DateTime reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public string classname { get; set; }
        public Nullable<double> czczmj { get; set; }
        public Nullable<double> czccmj { get; set; }
        public Nullable<int> czla { get; set; }
        public Nullable<int> czja { get; set; }
        public Nullable<double> czsjsjfmk { get; set; }
        public Nullable<double> czxzccmj { get; set; }
        public Nullable<double> czzsmj { get; set; }
        public Nullable<int> kzzfcs { get; set; }
        public Nullable<int> zlxqzgtzs { get; set; }
        public Nullable<double> qlczmj { get; set; }
        public Nullable<double> qlczsl { get; set; }
        public string fzhdmc { get; set; }
        public string xccs { get; set; }
        public string fxzghdwt { get; set; }
        public string gmczf { get; set; }
        public string shzf { get; set; }
        public string jgcsljfs { get; set; }
        public Nullable<int> cccztsjb { get; set; }
        public Nullable<int> ccyyla { get; set; }
        public Nullable<double> ccsjsjfmk { get; set; }
        public Nullable<double> dlczzwt { get; set; }
        public Nullable<int> dlcztsjb { get; set; }
        public Nullable<int> dlla { get; set; }
        public Nullable<double> dlsjsjfmk { get; set; }
        public Nullable<int> ccyyczzwt { get; set; }
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
