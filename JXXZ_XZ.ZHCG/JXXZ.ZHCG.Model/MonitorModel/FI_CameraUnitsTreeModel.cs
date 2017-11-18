using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.MonitorModel
{
    public class FI_CameraUnitsTreeModel
    {
        //public string unitid { get; set; }
        //public string unitname { get; set; }
        //public string parentid { get; set; }
        //public string path { get; set; }
        //public int seq { get; set; }
        //public bool expanded { get; set; }
        //public bool leaf { get; set; }

        //public string cameraid { get; set; }
        //public string camerasunitid { get; set; }
        //public string cameraname { get; set; }

        public string id { get; set; }
        public string parentnode { get; set; }
        public string parentid { get; set; }
        public string cameraid { get; set; }
        public int? logintype { get; set; }
        public int unitid { get; set; }
        public Nullable<double> x84 { get; set; }
        public Nullable<double> y84 { get; set; }
        public string text { get; set; }
        public string path { get; set; }
        public bool @checked { get; set; }
        public bool expanded { get; set; }
        public bool leaf { get; set; }
        public List<FI_CameraUnitsTreeModel> nodes { get; set; }
        public List<FI_CameraUnitsTreeModel> children { get; set; }
    }
}
