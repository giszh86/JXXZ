using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.UnitGridModel
{
   public class UnitGridModel
    {
        public int id { get; set; }
        public int typeid { get; set; }
        public string typename { get; set; }
        public string grometry { get; set; }
        public string remarks1 { get; set; }
        public string gridname { get; set; }
        public string colour { get; set; }
    }
   public class typeModel {
       public int id { get; set; }
       public string name { get; set; }
   }
}
