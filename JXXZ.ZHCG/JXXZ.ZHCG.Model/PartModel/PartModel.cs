using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.PartModel
{
    public class partBriefModel
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 设备小类
        /// </summary>
        public string sbxl { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string objname { get; set; }
        /// <summary>
        /// 横坐标
        /// </summary>
        public string cdinatex { get; set; }
        /// <summary>
        /// 纵坐标
        /// </summary>
        public string cdinatey { get; set; }
    }
    public class PartModel
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 设备大类
        /// </summary>
        public string sbdl { get; set; }
        /// <summary>
        /// 设备小类
        /// </summary>
        public string sbxl { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string objcode { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string objname { get; set; }
        /// <summary>
        /// 主管部门代码
        /// </summary>
        public string cdepcode { get; set; }
        /// <summary>
        /// 主管部门名称
        /// </summary>
        public string cdepname { get; set; }
        /// <summary>
        /// 权属单位代码
        /// </summary>
        public string owndepcode { get; set; }
        /// <summary>
        /// 权属单位名称
        /// </summary>
        public string owndepname { get; set; }
        /// <summary>
        /// 护养单位代码
        /// </summary>
        public string matdepcode { get; set; }
        /// <summary>
        /// 护养单位名称
        /// </summary>
        public string matdepname { get; set; }
        /// <summary>
        /// 材质
        /// </summary>
        public string material { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string conperson { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        public string telephone { get; set; }
        /// <summary>
        /// 移动电话
        /// </summary>
        public string mobile { get; set; }
        /// <summary>
        /// 所属单元网格
        /// </summary>
        public string ownbgcode { get; set; }
        /// <summary>
        /// 位置描述
        /// </summary>
        public string objpos { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public string objstate { get; set; }
        /// <summary>
        /// 现势性
        /// </summary>
        public string usestate { get; set; }
        /// <summary>
        /// 初始时间
        /// </summary>
        public string crdate { get; set; }
        /// <summary>
        /// 变更时间
        /// </summary>
        public string chdate { get; set; }
        /// <summary>
        /// 数据来源
        /// </summary>
        public string datasource { get; set; }
        /// <summary>
        /// 横坐标
        /// </summary>
        public string cdinatex { get; set; }
        /// <summary>
        /// 纵坐标
        /// </summary>
        public string cdinatey { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }
        /// <summary>
        /// 图标
        /// </summary>
        public string icon { get; set; }
        /// <summary>
        /// 图标2
        /// </summary>
        public string path { get; set; }
    }

    /// <summary>
    /// 统计
    /// </summary>
    public class toCount
    {
        public int number { get; set; }
    }
}
