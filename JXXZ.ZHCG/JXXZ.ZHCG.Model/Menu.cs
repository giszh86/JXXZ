using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class Menu
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int? ParentID { get; set; }
        public string Path { get; set; }
        public string Url { get; set; }
        public string Comment { get; set; }
        public string icon { get; set; }
        public int Type { get; set; }
    }
}
