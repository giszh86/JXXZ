using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.LawEnforcementSupervisionModel
{
   public  class Zfdx_DevicesModel
    {
       public int deviceid { get; set; }
       public string devicename { get; set; }
       public string brand { get; set; }
       public string model { get; set; }
       public string jldw { get; set; }
       public string devicetype { get; set; }
       public string devicetypename { get; set; }
       public string remark { get; set; }
       public int createuserid { get; set; }
       public Nullable<System.DateTime> createtime { get; set; }
       public DateTime? updatetime { get; set; }
       public Nullable<int> stocknum { get; set; }
       public Nullable<int> devicesum { get; set; }
       public string zd_name { get; set; }
    }
}
