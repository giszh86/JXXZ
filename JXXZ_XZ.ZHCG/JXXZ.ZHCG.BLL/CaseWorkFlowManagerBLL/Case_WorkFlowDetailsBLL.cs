using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Case_WorkFlowDetailsBLL
   {
       private Case_WorkFlowDetailsDAL dal = new Case_WorkFlowDetailsDAL();
       
         /// <summary>
        /// 文书配置全部案件环节
        /// </summary>
        /// <returns></returns>
       public List<WFClassModel> GetDefinitionClass()
       {
           return dal.GetDefinitionClass();
       }

       /// <summary>
       /// 获取案件环节文书组织
       /// </summary>
       /// <returns></returns>
       public List<CaseLinkTreeModel> GetCaseLinkList()
       {
           Case_PhasesDAL CPdal = new Case_PhasesDAL();
           List<CaseLinkTreeModel> clTrees = new List<CaseLinkTreeModel>();
           List<CaseLinkTreeModel> clTree =CPdal.GetDefinitionClass();

           foreach (var item in clTree)
           {
               item.children = dal.GetCaseLinkList(item.id);
               item.leaf = false;
               clTrees.Add(item);
           }
           return clTrees;
       }
    }
}
