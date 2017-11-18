using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CitizenServiceModel
{
   public class Attachment
    {
        /// <summary>
        /// 附件ID
        /// </summary>
        public string FILEID { get; set; }

        /// <summary>
        /// 附件类型
        /// </summary>
        public string FILETYPE { get; set; }

        /// <summary>
        /// 附件名称
        /// </summary>
        public string FILENAME { get; set; }

        /// <summary>
        /// 下载路径
        /// </summary>
        public string FILEPATH { get; set; }

        public double? size { get; set; }
       /// <summary>
       /// 流程
       /// </summary>
        public string WFDID { get; set; }

        public string path { get; set; }
    }
}
