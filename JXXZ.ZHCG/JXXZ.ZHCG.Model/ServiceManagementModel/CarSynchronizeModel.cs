using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public  class CarSynchronizeModel
    {
        public int id { get; set; }
        public string nm { get; set; }
        public int ic { get; set; }
        public int pid { get; set; }
        public equipment[] dl { get; set; }

    }
   public class equipment
   {
       public string id { get; set; }
       public int pid { get; set; }
       public int ic { get; set; }
       public string io { get; set; }
       public int cc { get; set; }
       public string cn { get; set; }
       public int tc { get; set; }
       public string tn { get; set; }
       public int md { get; set; }
       public string sim { get; set; }
   }
}
