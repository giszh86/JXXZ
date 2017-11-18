using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
   public class StatisticalReportModel
    {
        public string  citizenid { get; set; }
       public string unitname { get; set; }
        public string eventid { get; set; }
        public string  complainant { get; set; }
        public string contactphone { get; set; }
        public Nullable<System.DateTime> foundtime { get; set; }
        public Nullable<System.DateTime> archivingtime { get; set; }
        public string  bigclassname { get; set; }
        public string  satisfaction { get; set; }
        public int sourceid { get; set; }
    }

   public class Test<StatisticalReportModel>
   {
       public string unitname { get; set; }
       public string eventid { get; set; }
       public string complainant { get; set; }
       public string contactphone { get; set; }
       public Nullable<System.DateTime> foundtime { get; set; }
       public Nullable<System.DateTime> archivingtime { get; set; }
       public string bigclassname { get; set; }
       public string satisfaction { get; set; }
       public int sourceid { get; set; }

     
   }
}
