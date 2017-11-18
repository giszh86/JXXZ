using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Doc_WfdddrsModel
    {
        public int dwdid { get; set; }
        public Nullable<int> ddid { get; set; }
        public string wfdid { get; set; }
        public int isrequired { get; set; }
        public int seq { get; set; }
        public int status { get; set; }

        public string  ddname { get; set; }
        public string wfdname { get; set; }
        public Nullable<int> phaseid { get; set; }
    }
}
