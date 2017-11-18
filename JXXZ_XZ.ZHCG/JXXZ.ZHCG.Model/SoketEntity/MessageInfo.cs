using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.SoketEntity
{

    /// <summary>
    /// 离线消息
    /// </summary>
    public class MessageInfo
    {
        /// <summary>
        /// 实体类构造函数
        /// </summary>
        /// <param name="_MsgTime"></param>
        /// <param name="_MsgContent"></param>
        public MessageInfo(DateTime _MsgTime, ArraySegment<byte> _MsgContent)
        {
            MsgTime = _MsgTime;
            MsgContent = _MsgContent;
        }

        /// <summary>
        /// 消息时间
        /// </summary>
        public DateTime MsgTime { get; set; }

        /// <summary>
        /// 消息内容
        /// </summary>
        public ArraySegment<byte> MsgContent { get; set; }
    }
}
