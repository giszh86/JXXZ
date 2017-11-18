using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class CaseLinkTreeModel
    {
        public int id { get; set; }
        public string wfid { get; set; }
        public string  name { get; set; }
        public string text { get; set; }
        public int? seq { get; set; }
        public List<WFClassModel> children { get; set; }
        public bool? leaf { get; set; }

    }
}
