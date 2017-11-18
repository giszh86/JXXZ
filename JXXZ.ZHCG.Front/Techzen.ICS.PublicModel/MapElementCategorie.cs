using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素种类公用类
    /// </summary>
    public partial class MapElementCategorie
    {

        /// <summary>
        /// 标识
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 图形类型
        /// </summary>
        public int? ShapeTypeID { get; set; }

        /// <summary>
        /// 统计类型标识
        /// </summary>
        public int? StatisticTypeID { get; set; }

        /// <summary>
        /// 是否可以移动
        /// </summary>
        public int? IsMovable { get; set; }

        /// <summary>
        /// 静态属性结构
        /// </summary>
        public string StaticPropertiesSchema { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int? SeqNo { get; set; }

    }
}
