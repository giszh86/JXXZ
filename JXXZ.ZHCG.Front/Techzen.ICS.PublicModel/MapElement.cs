using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素公用类
    /// </summary>
    public partial class MapElement
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
        /// 编号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 化身
        /// </summary>
        public string Avatar { get; set; }

        /// <summary>
        /// 区域标识
        /// </summary>
        public int? RegionID { get; set; }

        /// <summary>
        /// 区域名称
        /// </summary>
        public string RegionName { get; set; }

        /// <summary>
        /// 单位标识
        /// </summary>
        public int? UnitID { get; set; }

        /// <summary>
        /// 单位名称
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        /// 地图元素业务类型标识
        /// </summary>
        public int? MapElementBizTypeID { get; set; }

        /// <summary>
        /// 地图元素业务类型名称
        /// </summary>
        public string MapElementBizTypeName { get; set; }

        /// <summary>
        /// 地图元素设备类型标识
        /// </summary>
        public int? MapElementDeviceTypeID { get; set; }

        /// <summary> 
        /// 地图元素设备类型名称
        /// </summary>
        public string MapElementDeviceTypeName { get; set; }

        /// <summary>
        /// 地图元素状态标识
        /// </summary>
        public int? MapElementStatusID { get; set; }

        /// <summary>
        /// 地图元素状态名称
        /// </summary>
        public string MapElementStatusName { get; set; }

        /// <summary>
        /// 静态属性
        /// </summary>
        public string StaticProperties { get; set; }

        /// <summary>
        /// 动态属性
        /// </summary>
        public string DynamicProperties { get; set; }

        /// <summary>
        /// 是否在线
        /// </summary>
        public int? IsOnline { get; set; }

        /// <summary>
        /// 保留字段1
        /// </summary>
        public string ReservedField1 { get; set; }

        /// <summary>
        /// 保留字段2
        /// </summary>
        public string ReservedField2 { get; set; }

        /// <summary>
        /// 保留字段3
        /// </summary>
        public string ReservedField3 { get; set; }

        /// <summary>
        /// 保留字段4
        /// </summary>
        public string ReservedField4 { get; set; }

        /// <summary>
        /// 保留字段5
        /// </summary>
        public string ReservedField5 { get; set; }

        /// <summary>
        /// 保留字段6
        /// </summary>
        public string ReservedField6 { get; set; }

        /// <summary>
        /// 保留字段7
        /// </summary>
        public int? ReservedField7 { get; set; }

        /// <summary>
        /// 保留字段8
        /// </summary>
        public int? ReservedField8 { get; set; }

        /// <summary>
        /// 保留字段9
        /// </summary>
        public DateTime? ReservedField9 { get; set; }

        /// <summary>
        /// 保留字段10
        /// </summary>
        public DateTime? ReservedField10 { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreatedTime { get; set; }

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
        /// 坐标上报时间
        /// </summary>
        public DateTime? CoordReportedTime { get; set; }

        /// <summary>
        /// 坐标创建时间
        /// </summary>
        public DateTime? CoordCreatedTime { get; set; }
    }
}
