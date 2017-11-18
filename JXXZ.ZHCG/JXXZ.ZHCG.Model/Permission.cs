using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class Permission
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string ParentCode { get; set; }
        public string Path { get; set; }
        public string Comment { get; set; }
        public int? SeqNo { get; set; }
    }
}
