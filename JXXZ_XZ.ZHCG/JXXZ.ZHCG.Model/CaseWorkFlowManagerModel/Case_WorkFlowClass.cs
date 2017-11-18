using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.CaseWorkFlowManagerModel
{
    public class Case_WorkFlowClass
    {
        /// <summary>
        /// 工作流编号
        /// </summary>
        public string WFID { get; set; }

        /// <summary>
        /// 工作流详细编号
        /// </summary>
        public string WFDID { get; set; }

        /// <summary>
        /// 工作流实例ID
        /// </summary>
        public string WFSID { get; set; }

        /// <summary>
        /// 活动实例编号
        /// </summary>
        public string WFSAID { get; set; }



        /// <summary>
        /// 处理意见
        /// </summary>
        public string DEALCONTENT { get; set; }

        /// <summary>
        /// 具体表名
        /// </summary>
        public string FunctionName { get; set; }
        

        /// <summary>
        /// 下一步流程名称
        /// </summary>
        public string nextWFDIDNames { get; set; }

        /// <summary>
        /// 下一步流程用户ID
        /// </summary>
        public string NextWFUSERIDS { get; set; }

        /// <summary>
        /// 下一步流程用户名称
        /// </summary>
        public string NextUserNames { get; set; }

        /// <summary>
        /// 下一步流程详细编号
        /// </summary>
        public string NextWFDID { get; set; }

        /// <summary>
        /// 是否发送短信
        /// </summary>
        public string IsSendMsg { get; set; }

        /// <summary>
        /// 流程创建人
        /// </summary>
        public int? WFCreateUserID { get; set; }

        /// <summary>
        /// 案源表工作实例标识
        /// </summary>
        public string cswfsid { get; set; }


        /// <summary>
        /// 附件内容集合
        /// </summary>
        public List<FileClass> files { get; set; }


        /// <summary>
        /// 立案编号
        /// </summary>
        public string casebh { get; set; }
        /// <summary>
        /// 案件状态
        /// </summary>
        public string casemode { get; set; }
        /// <summary>
        /// 案件类型
        /// </summary>
        public int? casetype { get; set; }
        /// <summary>
        /// 案件来源
        /// </summary>
        public int? casesourceid { get; set; }
        /// <summary>
        /// 案由
        /// </summary>
        public string casereason { get; set; }
        /// <summary>
        /// 案件类型
        /// </summary>
        public string casetypeid { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string contact { get; set; }
        /// <summary>
        /// 联系电话
        /// </summary>
        public string contactphone { get; set; }
        /// <summary>
        /// 案发地址
        /// </summary>
        public string address { get; set; }

        /// <summary>
        /// 处理方式
        /// </summary>
        public string processmode { get; set; }
        /// <summary>
        /// 满意度
        /// </summary>
        public string satisfaction { get; set; }
        /// <summary>
        /// 附件内容集合
        /// </summary>
        public List<Doc_WfsasModel> WfsasModel { get; set; }
        /// <summary>
        /// 开始处理时间
        /// </summary>
        public DateTime? STIME { get; set; }

        /// <summary>
        /// 结束处理时间
        /// </summary>
        public DateTime? ETIME { get; set; }

        /// <summary>
        /// 基础表标识
        /// </summary>
        public int? caseid { get; set; }

        /// <summary>
        /// 案件属于类型
        /// </summary>
        public string casestatus { get; set; }
    }
}
