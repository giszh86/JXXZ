using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public class QW_UserTasksModel
    {
        public int usertaskid { get; set; }
        public Nullable<int> patrolid { get; set; }
        public string patrolgrometry { get; set; }
        public Nullable<int> signinareaid { get; set; }
        public string signingrometry { get; set; }
        public int sszd { get; set; }
        public Nullable<int> ssbc { get; set; }
        public int userid { get; set; }
        public System.DateTime taskstarttime { get; set; }
        public System.DateTime taskendtime { get; set; }
        public string taskexplain { get; set; }
        public System.DateTime createtime { get; set; }
        public int createuserid { get; set; }

        public List<int> userids { get; set; }
       /// <summary>
       /// 勾选的星期
       /// </summary>
        public List<string> weeks { get; set; }
    }

   public class UserTask {
       public int usertaskid { get; set; }
       public int? patrolid { get; set; }
       public int? signinareaid { get; set; }
       public string patrolname { get; set; }
       public string signinareaname { get; set; }
       public DateTime taskstarttime { get; set; }
       public DateTime taskendtime { get; set; }
       public string taskexplain { get; set; }
       public int userid { get; set; }
       public System.DateTime start_stime { get; set; }
       public System.DateTime start_etime { get; set; }
       public System.DateTime end_stime { get; set; }
       public System.DateTime end_etime { get; set; }
       public string qdgrometry { get; set; }
       public string xcgrometry { get; set; }
   }
}
