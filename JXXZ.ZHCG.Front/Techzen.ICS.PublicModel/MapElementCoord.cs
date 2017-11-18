using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素坐标公用类
    /// </summary>
    public partial class MapElementCoord
    {
        /// <summary>
        /// 地图元素种类标识
        /// </summary>
        public int MapElementCategoryID { get; set; }

        /// <summary>
        /// 地图元素标识
        /// </summary>
        public int MapElementID { get; set; }

        /// <summary>
        /// 地图图形（WGS84）
        /// </summary>
        public string Shape1 { get; set; }

        /// <summary>
        /// 地图图形（其它）
        /// </summary>
        public string Shape2 { get; set; }

        /// <summary>
        /// 卫星时间
        /// </summary>
        public DateTime? SatelliteTime { get; set; }

        /// <summary>
        /// 经度（WGS84）
        /// </summary>
        public decimal? Longitude { get; set; }

        /// <summary>
        /// 纬度（WGS84）
        /// </summary>
        public decimal? Latitude { get; set; }

        /// <summary>
        /// 经度（其它）
        /// </summary>
        public decimal? X { get; set; }

        /// <summary>
        /// 纬度（其它）
        /// </summary>
        public decimal? Y { get; set; }

        /// <summary>
        /// 海拔
        /// </summary>
        public int? Altitude { get; set; }

        /// <summary>
        /// 速度
        /// </summary>
        public int? Speed { get; set; }

        /// <summary>
        /// 方向
        /// </summary>
        public int? Direction { get; set; }

        /// <summary>
        /// 精度
        /// </summary>
        public int? Accuracy { get; set; }

        /// <summary>
        /// 卫星数量
        /// </summary>
        public int? Satellites { get; set; }

        /// <summary>
        /// 上报时间
        /// </summary>
        public DateTime? ReportedTime { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreatedTime { get; set; }
    }
}
