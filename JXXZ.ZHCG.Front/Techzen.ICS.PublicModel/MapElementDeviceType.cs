using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素设备类型公用类
    /// </summary>
    public partial class MapElementDeviceType
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
        /// 上级标识
        /// </summary>
        public int? ParentID { get; set; }

        /// <summary>
        /// 级别
        /// </summary>
        public int? Level { get; set; }

        /// <summary>
        /// 路径
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int? SeqNo { get; set; }
    }
}
