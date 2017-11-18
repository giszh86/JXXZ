using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.WorkFlowManagerModel
{
   public class WF_WorkFlowOldModel
    {
       public string wfsaid { get; set; }
       public string wfsid { get; set; }
       public Nullable<int> status { get; set; }
       public Nullable<int> dealuserid { get; set; }
       public Nullable<System.DateTime> dealtime { get; set; }
       public string wfdid { get; set; }
       public Nullable<System.DateTime> createtime { get; set; }

       public string wfsuid { get; set; }
       public Nullable<int> userid { get; set; }
       public string content { get; set; }
       public Nullable<int> createuserid { get; set; }
       public Nullable<int> ismainuser { get; set; }
       public string remark { get; set; }
       public string processmode { get; set; }
       public string satisfaction { get; set; }

       public string wfdname { get; set; }
       public string username { get; set; }
       public string createusername { get; set; }


    }
   public class WF_WorkFlowLinkOld {
       public string wfdid { get; set; }
       public int dealuserid { get; set; }
   }

}
