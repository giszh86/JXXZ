using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
    public class EventModel
    {
        /// <summary>
        /// 事件ID
        /// </summary>
        public string eventId { get; set; }
        /// <summary>
        /// 事件标题
        /// </summary>
        public string eventTitle { get; set; }

        /// <summary>
        /// 事件上报用户
        /// </summary>
        public string eventUser { get; set; }

        /// <summary>
        /// 事件上报时间
        /// </summary>
        public DateTime? eventTime { get; set; }

        /// <summary>
        /// 地理位置
        /// </summary>
        public string grometry { get; set; }
    }
}
