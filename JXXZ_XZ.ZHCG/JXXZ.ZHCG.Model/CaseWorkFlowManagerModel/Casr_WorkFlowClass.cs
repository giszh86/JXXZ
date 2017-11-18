using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
   public class Casr_WorkFlowClass
    {
        /// <summary>
        /// 返回流程状态 1表示没有该流程 2表示该流程不完整
        /// </summary>
        public int WorkFlowState { get; set; }

        public string wfdname { get; set; }

        public string wfdid { get; set; }

        /// <summary>
        /// 下一步流程名称
        /// </summary>
        public List<nextwfdidname> nextwfdidname { get; set; }
    }

   public class nextwfdidname {
       public string  nextid { get; set; }
       public string wfdname { get; set; }
       public string nextroleid { get; set; }
       public string nextunitid { get; set; }
   
   }
}
