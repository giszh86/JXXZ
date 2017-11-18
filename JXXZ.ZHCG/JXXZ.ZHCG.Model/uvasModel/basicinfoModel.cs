using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.uvasModel
{
    public class basicinfoModel
    {
        public int ovaid { get; set; }
        public string ovanum { get; set; }
        public string ovaname { get; set; }
        public string device { get; set; }
        public string unit { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }
        public Nullable<int> isdelete { get; set; }
    }
}
