using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class QW_CarsModel
    {
        public int carid { get; set; }
        public string code { get; set; }
        public string cartypeid { get; set; }
        public int unitid { get; set; }
        public string unitname { get; set; }
        public string carnumber { get; set; }
        public string cartel { get; set; }
        public int isonline { get; set; }
        public int createuserid { get; set; }
        public System.DateTime createtime { get; set; }
        public int status { get; set; }
        public Nullable<int> ssbc { get; set; }
        public string ssbcname { get; set; }
        public int? carstatus { get; set; }
        public string cartypename { get; set; }
    }
}
