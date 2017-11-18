using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.monitorProjectModel
{
    public class MonitorListModel
    {
        public int unitid { get; set; }
        public string unitname { get; set; }
        public string cameraid { get; set; }
        public Nullable<int> seq { get; set; }

        public string childid { get; set; }
        public string cameratypeid { get; set; }
        public string cameraname { get; set; }
        public string cameratypename { get; set; }
        public List<string> childList { get; set; }
    }
}
