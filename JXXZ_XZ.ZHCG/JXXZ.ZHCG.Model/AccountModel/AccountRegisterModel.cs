using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model.AccountModel
{
    /// <summary>
    /// 台账登记
    /// </summary>
    public class AccountRegisterModel
    {
        /// <summary>
        /// 登记标识
        /// </summary>
        public int registerid { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string title { get; set; }

        /// <summary>
        /// 时间
        /// </summary>
        public DateTime registertime { get; set; }

        /// <summary>
        /// 人物
        /// </summary>
        public string people { get; set; }

        /// <summary>
        /// 地点
        /// </summary>
        public string  address { get; set; }

        /// <summary>
        /// 任务分类标识
        /// </summary>
        public string taskclassid { get; set; }

        /// <summary>
        /// 任务内容
        /// </summary>
        public string content { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string remark { get; set; }

        /// <summary>
        /// 创建ID
        /// </summary>
        public int createuserid { get; set; }

        /// <summary>
        /// 创建人姓名
        /// </summary>
        public string createuserName { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime createtime { get; set; }

        /// <summary>
        /// 事件ID
        /// </summary>
        public string citizenid { get; set; }

        /// <summary>
        /// 任务ID
        /// </summary>
        public string typeID { get; set; }

        /// <summary>
        /// 任务分类
        /// </summary>
        public string typeName { get; set; }

        /// <summary>
        /// 附件内容集合
        /// </summary>
        public string ssbm { get; set; }

        public int[] TypeArr { get; set; }

        public string[] uploadpanelValue { get; set; }

        /// <summary>
        /// 附件内容集合
        /// </summary>
        public List<FileClass> files { get; set; }

        public int unitid { get; set; }

        /// <summary>
        /// 生成的word名称
        /// </summary>
        public string wordname { get; set; }

        /// <summary>
        /// 生成的word路径
        /// </summary>
        public string wordpath { get; set; }
    }
}
