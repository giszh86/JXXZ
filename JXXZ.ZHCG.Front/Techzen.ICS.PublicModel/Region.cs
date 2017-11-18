using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 区域公用类
    /// </summary>
    public partial class Region
    {
        /// <summary>
        /// 标识
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 区域类型标识
        /// </summary>
        public int? RegionTypeID { get; set; }

        /// <summary>
        /// 区域类型名称
        /// </summary>
        public string RegionTypeName { get; set; }

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
        /// 地图图形
        /// </summary>
        public string Shape { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int? SeqNo { get; set; }

    }
}
