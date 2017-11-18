using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.lawenforcementsupervisionModel
{
    public class Zfdx_InstocksModel
    {
        public int intstockid { get; set; }
        public string storagetype { get; set; }
        public string storagetypename { get; set; }
        public int? deviceid { get; set; }
        public int ?number { get; set; }
        public double? price { get; set; }
        public Nullable<System.DateTime> producedate { get; set; }
        public int? unitid { get; set; }
        public string processuserid { get; set; }
        public string  shuserid { get; set; }
        public string remark { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public int createuserid { get; set; }
        public string devicename { get; set; }
    }
}
