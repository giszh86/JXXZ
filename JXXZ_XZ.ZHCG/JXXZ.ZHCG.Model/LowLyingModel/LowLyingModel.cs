using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.LowLyingModel
{
    public class LowLyingModel
    {
        public int id { get; set; }
        public string jkdmc { get; set; }
        public string zt { get; set; }
        public string whdw { get; set; }
        public string whry { get; set; }
        public string bjljz { get; set; }
        public string dz { get; set; }
        public int lsbjsl { get; set; }
        public int sfbj { get; set; }
    }

    public class LowLyingOldModel
    {
        public int id { get; set; }
        public int lowid { get; set; }
        public string bjz { get; set; }
        public string bjljz { get; set; }
        public Nullable<int> sfbj { get; set; }
        public Nullable<System.DateTime> cjsj { get; set; }
        public string clqk { get; set; }
    }

    public class glxxModel {
        public int id { get; set; }
        public int levelid { get; set; }
        public string name { get; set; }
        public int parentid { get; set; }
        public string description { get; set; }
    }

    public class sbxxModel {
        public int id { get; set; }
        public string name { get; set; }
        public string usertype { get; set; }
        public string userparameter { get; set; }
        public string managementid { get; set; }
        public string communicationid { get; set; }
        public string transmission { get; set; }
        public int collectionmethod { get; set; }
        public string isenabled { get; set; }
        public string relatedquantity { get; set; }
        public string displayvolume { get; set; }
    }

    public class lsjlModel {
        public DateTime? recordingtime { get; set; }
        public decimal  waterlevel { get; set; }


    }
}
