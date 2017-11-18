using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL
{
    public class SiginDetail
    {
        public SiginDetail()
        {
            signList = new List<qw_usersignins>();
        }
        public int usertaskId { get; set; }
        /// <summary>
        /// 签到区域id
        /// </summary>
        public int signinareaId { get; set; }
        public DateTime taskTime { get; set; }
        public string taskexplain { get; set; }

        public DateTime start_stime { get; set; }
        public DateTime start_etime { get; set; }

        public DateTime end_stime { get; set; }
        public DateTime end_etime { get; set; }

        public string grometry { get; set; }
        /// <summary>
        /// 签到区域名称
        /// </summary>
        public string name { get; set; }

        public List<qw_usersignins> signList { get; set; }

        public string weekday
        {
            get
            {
                string st = taskTime.DayOfWeek.ToString();
                string week = null;
                switch (st)
                {
                    case "Monday":
                        week = "星期一";
                        break;
                    case "Tuesday":
                        week = "星期二";
                        break;
                    case "Wednesday":
                        week = "星期三";
                        break;
                    case "Thursday":
                        week = "星期四";
                        break;
                    case "Friday":
                        week = "星期五";
                        break;
                    case "Saturday":
                        week = "星期六";
                        break;
                    case "Sunday":
                        week = "星期日";
                        break;
                }
                return week;
            }
        }

    }
}
