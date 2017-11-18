using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.WorkFlowManagerDAL
{
   public class WF_WorkFlowDetailDAL
    {
        /// <summary>
        /// 获取所有详细工作流
        /// </summary>
        /// <returns></returns>
        public IQueryable<wf_workflowdetails> GetList()
        {
            Entities db = new Entities();
            IQueryable<wf_workflowdetails> list = db.wf_workflowdetails;
            return list;
        }
        /// <summary>
        /// 获取单个详细工作流根据流程详细编号
        /// </summary>
        /// <param name="WFID">工作流详细编号</param>
        /// <returns></returns>
        public wf_workflowdetails GetSingle(string WFDID)
        {
            Entities db = new Entities();
            wf_workflowdetails model = db.wf_workflowdetails.SingleOrDefault(a => a.wfdid == WFDID);

            return model;
        }

       /// <summary>
       /// 获取所有工作流
       /// </summary>
        /// <param name="wfid">工作流编号</param>
       /// <returns></returns>
        public List<SelectListItemModel> GetSelectListItem(string wfid) {

            List<SelectListItemModel> list = new List<SelectListItemModel>();

           using (Entities db = new Entities())
           {
               IQueryable<SelectListItemModel> queryable =
                   db.wf_workflowdetails.Where(a => a.wfid == wfid)
                   .Select(t => new SelectListItemModel()
                   {
                       id = t.wfdid,
                       name = t.wfdname
                   });

               list = queryable.ToList();
           }

           return list;
       }


    }
}
