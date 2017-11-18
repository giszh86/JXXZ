using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.monitorProjectModel
{
    public class TreeMonitorModel
    {
        public int unitid { get; set; }
        public string unitname { get; set; }
        public string path { get; set; }
        public Nullable<int> seq { get; set; }
        public Nullable<int> parentid { get; set; }
        public string id { get; set; }
        public string parentname { get; set; }
        public string newUnitid { get; set; }
        public string text { get; set; }
        public bool expanded { get; set; }
        public bool leaf { get; set; }
        public List<TreeMonitorModel> children { get; set; }
    }
}
