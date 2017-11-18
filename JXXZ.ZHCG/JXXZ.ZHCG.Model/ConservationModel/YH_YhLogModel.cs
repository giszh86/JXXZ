using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.ConservationModel
{
   public class YH_YhLogModel
    {
        public int yhlogid { get; set; }
        public int yhcontract { get; set; }
        public string yhcontractname { get; set; }
        public System.DateTime patroltime { get; set; }
        public string patrolexplain { get; set; }
        public System.DateTime createtime { get; set; }
        public int createuserid { get; set; }
        public string createusername { get; set; }
        public DateTime writedate { get; set; }
        public DateTime writetime { get; set; }

        public DateTime createtimefrom { get; set; }
        public DateTime createtimeto { get; set; }

        public List<YH_FileModel> filelist { get; set; }
        public string[] uploadpanelValue { get; set; }

        /// <summary>
        /// 图片1
        /// </summary>
        public string photo1 { get; set; }
        /// <summary>
        /// 图片2
        /// </summary>
        public string photo2 { get; set; }
        /// <summary>
        /// 图片3
        /// </summary>
        public string photo3 { get; set; }
    }
}
