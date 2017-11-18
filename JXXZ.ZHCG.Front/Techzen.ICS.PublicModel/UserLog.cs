using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 用户日志
    /// </summary>
    public partial class UserLog
    {
        /// <summary>
        /// 用户行为标识
        /// </summary>
        public int UserBehaviourID { get; set; }

        /// <summary>
        /// 用户行为名称
        /// </summary>
        public string UserBehaviourName { get; set; }

        /// <summary>
        /// 系统标识
        /// </summary>
        public int SystemID { get; set; }

        /// <summary>
        /// 级别
        /// </summary>
        public int? Level { get; set; }

        /// <summary>
        /// 消息内容
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public DateTime DateTime { get; set; }
    }
}
