using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public  class QW_PatrolLogModel
    {
       public int logid { get; set; }
       public int? userid { get; set; }
       public string checkid { get; set; }
       public string checkname { get; set; }
       public int? isfound { get; set; }
       public Nullable<System.DateTime> reporttime { get; set; }
       public string remark { get; set; }
       public string unitname { get; set; }
       public string username { get; set; }
       public int unitid { get; set; }
    }

   public class PatrolLog {
       public DateTime? date { get; set; }
       public string week { get; set; }
       public int? userid { get; set; }
       public string remark { get; set; }

       private List<PatrolLogList> _list = new List<PatrolLogList>();

       public List<PatrolLogList> list
       {
           get { return _list; }
           set { _list = value; }
       }
   }

   public class PatrolLogList {
       public string id { get; set; }
       public string name { get; set; }
       public int? isnot { get; set; }
   }
}
