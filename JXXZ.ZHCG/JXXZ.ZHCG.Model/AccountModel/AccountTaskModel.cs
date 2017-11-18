using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AccountModel
{
    public class AccountTaskModel
    {
        public int taskid { get; set; }
        public string taskname { get; set; }
        public int? taskyear { get; set; }
        public int? tz_type { get; set; }
        public Nullable<System.DateTime> starttime { get; set; }
        public Nullable<System.DateTime> endtime { get; set; }
        public string remark { get; set; }
        public string tz_json { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public string sszd { get; set; }//所属中队集合
        public string ssrw { get; set; }//所属任务集合
        public string createusername { get; set; }
        public string ssbm { get; set; }

        public int[] TypeArr { get; set; }
        public int[] TypeArrZD { get; set; }

        public string[] uploadpanelValue { get; set; }
    }
}
