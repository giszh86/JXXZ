using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public class QW_SigninAreasModel
    {
        public int signinareaid { get; set; }
        public int sszd { get; set; }
        public int? ssbc { get; set; }
        public string name { get; set; }
        public string explain { get; set; }
        public System.DateTime start_stime { get; set; }
        public System.DateTime start_etime { get; set; }
        public System.DateTime end_stime { get; set; }
        public System.DateTime end_etime { get; set; }
        public string grometry { get; set; }
        public System.DateTime createtime { get; set; }
        public int createuserid { get; set; }

        public string sszdname { get; set; }
        public string ssbcname { get; set; }
        public string createusername { get; set; }
    }
}
