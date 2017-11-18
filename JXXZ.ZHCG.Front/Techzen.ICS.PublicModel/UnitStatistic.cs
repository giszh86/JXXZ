using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 单位统计公用类
    /// </summary>
    public partial class UnitStatistic
    {
        /// <summary>
        /// 地图元素种类
        /// </summary>
        public int MapElementCategoryID { get; set; }

        /// <summary>
        /// 单位标识
        /// </summary>
        public int UnitID { get; set; }

        /// <summary>
        /// 地图元素业务类型标识
        /// </summary>
        public int MapElementBizTypeID { get; set; }

        /// <summary>
        /// 地图元素设备类型标识
        /// </summary>
        public int MapElementDeviceTypeID { get; set; }

        /// <summary>
        /// 地图元素状态标识
        /// </summary>
        public int MapElementStatusID { get; set; }

        /// <summary>
        /// 在线数
        /// </summary>
        public int? Onlines { get; set; }

        /// <summary>
        /// 离线线
        /// </summary>
        public int? Offlines { get; set; }

        /// <summary>
        /// 总数
        /// </summary>
        public int? Totals { get; set; }
    }
}
