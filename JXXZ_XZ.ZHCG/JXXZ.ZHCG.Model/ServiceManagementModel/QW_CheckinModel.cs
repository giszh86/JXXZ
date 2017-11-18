using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ServiceManagementModel
{
    public class QW_CheckinModel
    {
        public int signinareaid { get; set; }
        public string name { get; set; }
        public int userid { get; set; }
        public string path { get; set; }
        public string displayname { get; set; }
        public System.DateTime taskstarttime { get; set; }
        public System.DateTime qdsstime { get; set; }
        public System.DateTime qdsetime { get; set; }
        public System.DateTime qdestime { get; set; }
        public System.DateTime qdeetime { get; set; }

        public DateTime? stime { get; set; }
        public DateTime? etime { get; set; }
        public int? unitid { get; set; }

        /// <summary>
        /// 签到日期
        /// </summary>
        private string _signdate;

        public string signdate
        {
            get {
                return String.Format("{0:yyyy-MM-dd}", taskstarttime);
            }
            set { _signdate = value; }
        }

        /// <summary>
        /// 计划签到时间
        /// </summary>
        private string _planchecktime;

        public string planchecktime
        {
            get {
                _planchecktime = String.Format("{0:HH:mm}", qdsstime) + "--" + String.Format("{0:HH:mm}", qdsetime);
                return _planchecktime; 
            }
            set { _planchecktime = value; }
        }

        /// <summary>
        /// 计划签退时间
        /// </summary>
        private string _plansignback;

        public string plansignback
        {
            get
            {
                _planchecktime = String.Format("{0:HH:mm}", qdestime) + "--" + String.Format("{0:HH:mm}", qdeetime);
                return _planchecktime;
            }
            set { _plansignback = value; }
        }

        /// <summary>
        /// 实际签到时间
        /// </summary>
        private string _actualcheckin;

        public string actualcheckin
        {
            get {
                if (stime == null)
                {
                    _actualcheckin = "无";
                }
                else {
                    _actualcheckin = String.Format("{0:HH:mm}", stime);
                }
                return _actualcheckin; 
            }
            set { _actualcheckin = value; }
        }

        /// <summary>
        /// 实际签退时间
        /// </summary>
        private string _actualsignback;

        public string actualsignback
        {
            get
            {
                if (etime == null)
                {
                    _actualcheckin = "无";
                }
                else
                {
                    _actualcheckin = String.Format("{0:HH:mm}", etime);
                }
                return _actualcheckin;
            }
            set { _actualsignback = value; }
        }

        /// <summary>
        /// 签到状态
        /// </summary>
        private string _checkinstate;

        public string checkinstate
        {
            get {
                if (stime == null)
                {
                    _checkinstate = "不正常签到";
                }
                else
                {
                    _checkinstate = "正常签到";
                }
                return _checkinstate;
            }
            set { _checkinstate = value; }
        }

        /// <summary>
        /// 签退状态
        /// </summary>
        private string _signbackstate;

        public string signbackstate
        {
            get
            {
                if (etime == null)
                {
                    _checkinstate = "不正常签退";
                }
                else
                {
                    _checkinstate = "正常签退";
                }
                return _checkinstate;
            }
            set { _signbackstate = value; }
        }
    }
}
