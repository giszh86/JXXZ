using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AccountModel
{
    public class AccountImageModel
    {
        /// <summary>
        /// 任务分类id
        /// </summary>
        public int srid { get; set; }

        /// <summary>
        /// 任务分类名称
        /// </summary>
        public string zd_name { get; set; }

        /// <summary>
        /// 台帐个数
        /// </summary>
        public double count { get; set; }

        /// <summary>
        /// 总大小
        /// </summary>
        public string sum_size { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public string createtime { get; set; }

        /// <summary>
        /// 事件标题
        /// </summary>
        public string eventtitle { get; set; }

        /// <summary>
        /// 文件名称
        /// </summary>
        public string filename { get; set; }

        /// <summary>
        /// 文件路径
        /// </summary>
        public string filepath { get; set; }
    }
}
