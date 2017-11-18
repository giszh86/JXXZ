using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class ClassModel
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string text { get; set; }
        public string code { get; set; }
        public int? seq { get; set; }
        public int isrequired { get; set; }
        public int isunique { get; set; }
    }
    public class WFClassModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public int? phaseid { get; set; }
        public string text { get; set; }
        public int? seq { get; set; }
        public bool? leaf { get; set; }
    }
}
