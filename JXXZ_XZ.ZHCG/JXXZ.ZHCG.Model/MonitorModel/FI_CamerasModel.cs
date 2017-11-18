using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.MonitorModel
{
    public class FI_CamerasModel
    {

        public string cameraid { get; set; }
        public string unitid { get; set; }
        public int cameratypeid { get; set; }
        public string cameraname { get; set; }
        public string parameter { get; set; }
        public Nullable<int> isonline { get; set; }
        public Nullable<double> x84 { get; set; }
        public Nullable<double> y84 { get; set; }
        public Nullable<double> x2000 { get; set; }
        public Nullable<double> y2000 { get; set; }
        public Nullable<int> seq { get; set; }


        public string unitname { get; set; }
        public string parentid { get; set; }
        public string path { get; set; }
        public string cameratypename { get; set; }
        public string camera_unitid { get; set; }

    }
}
