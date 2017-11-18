using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Case_SimpleCasesBLL
    {
       private Case_SimpleCasesDAL dal = new Case_SimpleCasesDAL();

       public int  AddSimpleCases(Case_SimpleCasesModel model)
       {
         return dal.AddSimpleCases(model);
       }

       //编辑简易案件
       public int EditSimpleCases(Case_SimpleCasesModel model)
       {
           return dal.EditSimpleCases(model);
       }

       public Case_SimpleCasesModel GetSimpleCaseList(int simpleid)
       {
           return dal.GetSimpleCaseList(simpleid);
       }

       /// <summary>
       /// 待办列表
       /// </summary>
       /// <returns></returns>
       public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(List<Filter> filter, int start, int limit)
       {

           List<Case_SimpleCasesModel> items = dal.GetSimpleCaseList(filter, start, limit).ToList();
           int total = dal.GetSimpleCaseCount(filter);

           Paging<List<Case_SimpleCasesModel>> paging = new Paging<List<Case_SimpleCasesModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

       /// <summary>
       /// 已办案件列表导出
       /// </summary>
       /// <returns></returns>
       public List<Case_SimpleCasesModel> GetSimpleCaseListExcel(List<Filter> filter = null)
       {
           List<Case_SimpleCasesModel> list = dal.GetSimpleCaseListExcel(filter);

           return list;
       }
    }
}
