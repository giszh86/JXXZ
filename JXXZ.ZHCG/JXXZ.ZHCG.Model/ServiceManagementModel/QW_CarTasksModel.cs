using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
   public class QW_CarTasksModel
    {
        public int cartaskid { get; set; }
        public Nullable<int> patrolid { get; set; }
        public int sszd { get; set; }
        public Nullable<int> ssbc { get; set; }
        public int carid { get; set; }
        public string carnum { get; set; }
        public string patrolgrometry { get; set; }
        public System.DateTime taskstarttime { get; set; }
        public System.DateTime taskendtime { get; set; }
        public string taskexplain { get; set; }
        public System.DateTime createtime { get; set; }
        public int createuserid { get; set; }

       /// <summary>
       /// 车牌号
       /// </summary>
        public List<CarNum> carnums { get; set; }
        /// <summary>
        /// 勾选的星期
        /// </summary>
        public List<string> weeks { get; set; }
    }

    public class CarNum
    {
        public int carid { get; set; }
        public string carnum { get; set; }
    }
}
