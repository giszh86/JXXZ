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
   public class Case_PrescripTionsBLL
    {

       private Case_PrescripTionsDAL dal = new Case_PrescripTionsDAL();


       /// <summary>
       /// 实效列表
       /// </summary>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Case_PrescripTionsModel>> GetPrescripList(int start, int limit)
       {
           List<Case_PrescripTionsModel> items = dal.GetPrescripList(start, limit).ToList();
           int total = dal.GetPrescripCount();

           Paging<List<Case_PrescripTionsModel>> paging = new Paging<List<Case_PrescripTionsModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }

       public int AddPrescrip(Case_PrescripTionsModel model) {
           return dal.AddPrescrip(model);
       }
       public int EditPrescrip(Case_PrescripTionsModel model) {
           return dal.EditPrescrip(model);
       }

       //根据wfdid获取时限
       public double GetPrescrip(string wfdid)
       {
           return dal.GetPrescrip(wfdid);
       }
    }
}
