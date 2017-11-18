using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素状态公用类
    /// </summary>
    public partial class MapElementStatus
    {
        /// <summary>
        /// 地图元素种类标识
        /// </summary>
        public int MapElementCategoryID { get; set; }

        /// <summary>
        /// 标识
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int? SeqNo { get; set; }

    }
}
