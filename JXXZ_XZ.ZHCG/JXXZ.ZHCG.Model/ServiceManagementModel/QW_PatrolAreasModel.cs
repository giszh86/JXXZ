using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public class QW_PatrolAreasModel
    {
        public int patrolid { get; set; }
        public int sszd { get; set; }
        public int? ssbc { get; set; }
        public string name { get; set; }
        public int areatype { get; set; }
        public string explain { get; set; }
        public string grometry { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }


        public string  sszdname { get; set; }
        public string  ssbcname { get; set; }
        public string createusername { get; set; }

    }
}
