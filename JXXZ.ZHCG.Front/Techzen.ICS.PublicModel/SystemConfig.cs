using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 系统配置公用类
    /// </summary>
    public partial class SystemConfig
    {
        /// <summary>
        /// 编号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 上级编号
        /// </summary>
        public string ParentCode { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int? SeqNo { get; set; }

        /// <summary>
        /// 是否文件夹
        /// </summary>
        public int? IsFolder { get; set; }
    }
}
