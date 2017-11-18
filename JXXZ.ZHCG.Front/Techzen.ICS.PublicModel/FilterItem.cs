using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Techzen.ICS.PublicModel
{
    /// <summary>
    /// 查询过滤项
    /// </summary>
    public partial class FilterItem
    {
        /// <summary>
        /// 名称 多个用“,”分隔 例："Code,Address"
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 运算符号 “>”，“>=”，“<”，“=<”，“==”，“!=”，“||”，“Like”,多个符号用“,”分隔 例：“||,==”
        /// </summary>
        public string Operator { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; set; }
    }
}
