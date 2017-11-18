using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public class Case_WorkFlowSpecificActivitysDAL
    {
        /// <summary>
        /// 获取单个流程实例具体环节根据工作流实例环节编号
        /// </summary>
        /// <param name="WFID">工作流实例环节编号</param>
        /// <returns></returns>
        public case_workflowspecificactivitys GetSingle(string WFSAID)
        {
            Entities db = new Entities();
            case_workflowspecificactivitys model = db.case_workflowspecificactivitys
                .SingleOrDefault(a => a.wfsaid == WFSAID);
            return model;
        }
        /// <summary>
        /// 修改单个流程实例具体环节
        /// </summary>
        /// <param name="model"></param>
        public void Update(case_workflowspecificactivitys model)
        {
            Entities db = new Entities();
            case_workflowspecificactivitys result = db.case_workflowspecificactivitys
                .SingleOrDefault(a => a.wfsaid == model.wfsaid);
            if (result != null)
            {
                result.status = model.status;
                result.dealuserid = model.dealuserid;
                result.dealtime = model.dealtime;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 增加单个流程实例具体环节
        /// </summary>
        /// <param name="model"></param>
        public void Add(case_workflowspecificactivitys model)
        {
            Entities db = new Entities();
            db.case_workflowspecificactivitys.Add(model);
            db.SaveChanges();
        }
    }
}
