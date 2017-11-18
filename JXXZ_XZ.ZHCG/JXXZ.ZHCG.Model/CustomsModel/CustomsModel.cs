using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CustomsModel
{
   public class CustomsModel
    {
        public int id { get; set; }
        public Nullable<double> x { get; set; }
        public Nullable<double> y { get; set; }
        public Nullable<int> userid { get; set; }
        public string remark { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
    }
}
