using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Case_LeadersuperviseModel
    {
        public int supid { get; set; }
        public Nullable<int> caseid { get; set; }
        public string workflowid { get; set; }
        public Nullable<int> userid { get; set; }
        public string supopinion { get; set; }
        public Nullable<System.DateTime> suptime { get; set; }
        public Nullable<int> level { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }

        public string casereason { get; set; }
        public string username { get; set; }
        public string mobile { get; set; }
        public string dbrname { get; set; }
        public string phone { get; set; }
        public int isSendMsg { get; set; }
        public string casename { get; set; }
        public string createusernmae { get; set; }
    }
}
