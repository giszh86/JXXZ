using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.SystemDAL
{
    public class SystemLogModel
    {
        public int id { get; set; }
        public string source { get; set; }
        public string content { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public string createusername { get; set; }
    }
}
