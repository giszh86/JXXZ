using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
   public class Case_WorkFlowDetailsDAL
    {

        /// <summary>
        /// 获取所有详细工作流
        /// </summary>
        /// <returns></returns>
       public IQueryable<case_workflowdetails> GetList()
        {
            Entities db = new Entities();
            IQueryable<case_workflowdetails> list = db.case_workflowdetails;
            return list;
        }


        /// <summary>
        /// 文书配置全部案件环节
        /// </summary>
        /// <returns></returns>
       public List<WFClassModel> GetDefinitionClass()
        {
            List<WFClassModel> list = new List<WFClassModel>();
            using (Entities db = new Entities())
            {
                IQueryable<WFClassModel> queryable = from a in db.case_workflowdetails
                                                     //where a.nextid != null || a.nextid!=""
                                                     select new WFClassModel
                                                   {
                                                       id = a.wfdid,
                                                       name = a.wfdname,
                                                       text=a.wfdname,
                                                       seq=a.seqnum
                                                   };
                list = queryable.OrderBy(a=>a.seq).ToList();
            }
            return list;
        }

       /// <summary>
       /// 文书配置全部案件环节
       /// </summary>
       /// <returns></returns>
       public List<WFClassModel> GetCaseLinkList(int phaseid)
       {
           List<WFClassModel> list = new List<WFClassModel>();
           using (Entities db = new Entities())
           {
               IQueryable<WFClassModel> queryable = from a in db.case_workflowdetails
                                                    where a.phaseid==phaseid
                                                    select new WFClassModel
                                                    {
                                                        id = a.wfdid,
                                                        phaseid=a.phaseid,
                                                        name = a.wfdname,
                                                        text = a.wfdname,
                                                        seq = a.seqnum,
                                                        leaf = true
                                                    };
               list = queryable.OrderBy(a => a.seq).ToList();
           }
           return list;
       }

       /// <summary>
       /// 获取单个详细工作流根据流程详细编号
       /// </summary>
       /// <param name="WFID">工作流详细编号</param>
       /// <returns></returns>
       public case_workflowdetails GetSingle(string WFDID)
       {
           Entities db = new Entities();
           case_workflowdetails model = db.case_workflowdetails.SingleOrDefault(a => a.wfdid == WFDID);

           return model;
       }

    }
}
