using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class TreeUnit
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int? UnitTypeID { get; set; }
        public string UnitTypeName { get; set; }
        public int? ParentID { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public string text { get; set; }
        public bool expanded { get; set; }
        public bool leaf { get; set; }
        public List<TreeUnit> children { get; set; }
    }
}
