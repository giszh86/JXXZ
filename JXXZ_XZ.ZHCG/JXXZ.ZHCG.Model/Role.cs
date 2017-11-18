using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class Role
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int? IsSystem { get; set; }
        public int? SeqNo { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }

        public string[] PermissionCodeArr { get; set; }
    }
}
