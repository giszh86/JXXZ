using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Case_ZdModel
    {
        public string zd_typename { get; set; }
        public string zd_type { get; set; }
        public string zd_id { get; set; }
        public string zd_name { get; set; }
        public int zd_seq { get; set; }
        public int status { get; set; }
        public string remark { get; set; }
        public Nullable<int> parentid { get; set; }
    }
}
