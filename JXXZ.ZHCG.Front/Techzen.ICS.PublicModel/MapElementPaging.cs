using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 地图元素分页公用类
    /// </summary>
    public partial class MapElementPaging
    {
        /// <summary>
        /// 总条数
        /// </summary>
        public int Total { get; set; }

        /// <summary>
        /// 数据
        /// </summary>
        public IEnumerable<MapElement> Items { get; set; }
    }
}
