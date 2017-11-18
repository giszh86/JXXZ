using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ReportModel
{
    public class H7N7ReportModel
    {
        public Nullable<int> reportid { get; set; }
        public Nullable<int> cdcl { get; set; }
        public Nullable<int> ffxczl { get; set; }
        public Nullable<int> qlhqjy { get; set; }
        public Nullable<int> cchqjy { get; set; }
        public Nullable<int> czhqsl { get; set; }
        public string qt { get; set; }
        public string drgzzf { get; set; }
        public System.DateTime reportdate { get; set; }
        public string unitname { get; set; }
        public int unitid { get; set; }
        public Nullable<int> xccs { get; set; }
        public Nullable<int> cdry { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> updatetime { get; set; }
        public Nullable<int> isreport { get; set; }
        public Nullable<int> isstatistics { get; set; }

        public string remark { get; set; }
        public int createunitid { get; set; }
        public string createunitname { get; set; }

        public int projectId { get; set; }
        public string project { get; set; }
        public string classname { get; set; }
    }
}
