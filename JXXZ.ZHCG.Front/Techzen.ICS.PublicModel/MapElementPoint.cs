using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素公用类
    /// </summary>
    public partial class MapElementPoint
    {
        /// <summary>
        /// 标识
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 图标
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// 经度（其它）
        /// </summary>
        public double X { get; set; }

        /// <summary>
        /// 纬度（其它）
        /// </summary>
        public double Y { get; set; }
        /// <summary>
        /// 来源类型
        /// </summary>
        public int Type { get; set; }
    }
}
