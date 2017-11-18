using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
   public class WF_WorkFlowSpecificUsersDAL
    {
        /// <summary>
        /// 获取所有环节用户实例
        /// </summary>
        /// <returns></returns>
        public IQueryable<wf_workflowspecificusers> GetList()
        {
            Entities db = new Entities();
            IQueryable<wf_workflowspecificusers> list = db.wf_workflowspecificusers;
            return list;
        }
        /// <summary>
        /// 修改环节处理人实体
        /// </summary>
        /// <param name="model"></param>
        public void Update(wf_workflowspecificusers model)
        {
            Entities db = new Entities();
            wf_workflowspecificusers result = db.wf_workflowspecificusers
                .SingleOrDefault(a => a.wfsuid == model.wfsuid);
            if (result != null)
            {
                result.content = model.content;
                result.dealtime = model.dealtime;
                result.status = model.status;
                result.remark = model.remark;
                result.ismainuser = model.ismainuser;
                result.processmode = model.processmode;
                result.satisfaction = model.satisfaction;
                db.SaveChanges();
            }
        }

        /// <summary>
        /// 增加环节处理人实体
        /// </summary>
        /// <param name="model"></param>
        public void Add(wf_workflowspecificusers model)
        {
            Entities db = new Entities();
            db.wf_workflowspecificusers.Add(model);
            db.SaveChanges();
        }


    }
}
