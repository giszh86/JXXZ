using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
   public class SM_ConsulTationsModel
    {
        public int consultid { get; set; }
        public string consultuser { get; set; }
        public string contact { get; set; }
        public string title { get; set; }
        public int bigtypeid { get; set; }
        public int smalltypeid { get; set; }
        public Nullable<System.DateTime> acceptancetime { get; set; }
        public string consultcontent { get; set; }
        public Nullable<System.DateTime> createtime { get; set; }
        public Nullable<int> createuserid { get; set; }

        public string bigtypename { get; set; }
        public string smalltypename { get; set; }
        public string createusername { get; set; }

    }
}
