using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.FrontDeskModel
{
    public class FrontDeskModel
    {
        public string id { get; set; }
        public string type { get; set; }
        public double x84 { get; set; }
        public double y84 { get; set; }
        public int? logintype { get; set; }
        public string Channel { get; set; }
        public string title { get; set; }
        public string icon { get; set; }
    }


    public class statistics {
        public string id { get; set; }
        public string name { get; set; }
        public int value { get; set; }
    
    }
}
