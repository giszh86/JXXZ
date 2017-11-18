using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Case_WorkFlowSpecificsModel
    {
        public string wfsid { get; set; }
        public string wfid { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> status { get; set; }
        public string wfsname { get; set; }
        public string currentwfsaid { get; set; }
        public Nullable<int> filestatus { get; set; }
        public Nullable<int> casetype { get; set; }
        public Nullable<int> casesourceid { get; set; }
        public string casereason { get; set; }
        public string casemode { get; set; }
        public string contact { get; set; }
        public string contactphone { get; set; }
        public string address { get; set; }

    }
}
