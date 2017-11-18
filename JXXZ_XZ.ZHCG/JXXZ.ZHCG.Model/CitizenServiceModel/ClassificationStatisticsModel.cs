using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
   public class ClassificationStatisticsModel
    {
       public string sname { get; set; }
       public int sid { get; set; }
       public int yuefen { get; set; }
       public int scount { get; set; }
       public int sumcount { get; set; }
       public Nullable<System.DateTime> foundtime { get; set; }

    }
}
