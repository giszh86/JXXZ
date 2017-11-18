using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 统计公用类
    /// </summary>
    public partial class Statistic
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
        /// 在线数
        /// </summary>
        public int? Onlines { get; set; }

        /// <summary>
        /// 离线数
        /// </summary>
        public int? Offlines { get; set; }

        /// <summary>
        /// 总数
        /// </summary>
        public int? Totals { get; set; }

        /// <summary>
        /// 统计类型
        /// </summary>
        public string Type { get; set; }
        
        /// <summary>
        /// 统计表类型
        /// </summary>
        public string TableType { get; set; }

        /// <summary>
        /// 值显示方式
        /// </summary>
        public string ValueDisplayMode { get; set; }
    }
}
