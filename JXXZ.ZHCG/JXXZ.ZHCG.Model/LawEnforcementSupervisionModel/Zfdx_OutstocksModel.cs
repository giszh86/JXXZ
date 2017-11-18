using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.lawenforcementsupervisionModel
{
   public  class Zfdx_OutstocksModel
    {
       public int outstockid { get; set; }
       public string outtype { get; set; }
       public string outtypename { get; set; }
       public int? deviceid { get; set; }
       public string process { get; set; }
       public int? number { get; set; }
       public double? price { get; set; }
       public string applyuser { get; set; }
       public string receiveunit { get; set; }
       public int? unit { get; set; }
       public string shuser { get; set; }
       public string remark { get; set; }
       public int createuserid { get; set; }
       public Nullable<System.DateTime> createtime { get; set; }
       public string devicename { get; set; }
    }
}
