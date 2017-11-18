using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素历史坐标公用类
    /// </summary>
    public partial class MapElementHisCoord
    {
        /// <summary>
        /// 地图元素种类标识
        /// </summary>
        public int MapElementCategoryID { set; get; }

        /// <summary>
        /// 地图元素标识
        /// </summary>
        public int MapElementID { set; get; }

        /// <summary>
        /// 卫星时间
        /// </summary>
        public DateTime SatelliteTime { set; get; }

        /// <summary>
        /// 地图图形（WGS84）
        /// </summary>
        public string Shape1 { get; set; }

        /// <summary>
        /// 地图图形（其它）
        /// </summary>
        public string Shape2 { get; set; }

        /// <summary>
        /// 经度（WGS84）
        /// </summary>
        public decimal? Longitude { set; get; }

        /// <summary>
        /// 纬度（WGS84）
        /// </summary>
        public decimal? Latitude { set; get; }

        /// <summary>
        /// 经度（其它）
        /// </summary>
        public decimal? X { set; get; }

        /// <summary>
        /// 纬度（其它）
        /// </summary>
        public decimal? Y { set; get; }

        /// <summary>
        /// 海拔
        /// </summary>
        public int? Altitude { set; get; }

        /// <summary>
        /// 速度
        /// </summary>
        public int? Speed { set; get; }

        /// <summary>
        /// 方向
        /// </summary>
        public int? Direction { set; get; }

        /// <summary>
        /// 精度
        /// </summary>
        public int? Accuracy { set; get; }

        /// <summary>
        /// 卫星数量
        /// </summary>
        public int? Satellites { set; get; }

        /// <summary>
        /// 上报时间
        /// </summary>
        public DateTime? ReportedTime { set; get; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreatedTime { set; get; }
    }
}
