using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public class Case_WorkFlowSpecificUsersDAL
    {
        /// <summary>
        /// 获取所有环节用户实例
        /// </summary>
        /// <returns></returns>
        public IQueryable<case_workflowspecificusers> GetList()
        {
            Entities db = new Entities();
            IQueryable<case_workflowspecificusers> list = db.case_workflowspecificusers;
            return list;
        }
        /// <summary>
        /// 修改环节处理人实体
        /// </summary>
        /// <param name="model"></param>
        public void Update(case_workflowspecificusers model)
        {
            Entities db = new Entities();
            case_workflowspecificusers result = db.case_workflowspecificusers
                .SingleOrDefault(a => a.wfsuid == model.wfsuid);
            if (result != null)
            {
                result.content = model.content;
                result.dealtime = model.dealtime;
                result.status = model.status;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 增加环节处理人实体
        /// </summary>
        /// <param name="model"></param>
        public void Add(case_workflowspecificusers model)
        {
            Entities db = new Entities();
            db.case_workflowspecificusers.Add(model);
            db.SaveChanges();
        }

    }
}
