using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Doc_DefinitionsModel
    {
        public int ddid { get; set; }
        public string ddname { get; set; }
        public string doccode { get; set; }
        public Nullable<int> isunique { get; set; }
        public Nullable<int> ddstate { get; set; }
        public string ddpath { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<int> seq { get; set; }
        public string phasename { get; set; }
    }
}
