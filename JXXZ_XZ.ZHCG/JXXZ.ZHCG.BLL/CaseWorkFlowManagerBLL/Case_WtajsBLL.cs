using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Case_WtajsBLL
    {
       private Case_WtajsDAL dal = new Case_WtajsDAL();
       /// <summary>
       /// 违停事件
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Case_WtajsModel>> GetPendingCaseWtajsList(List<Filter> filters, int start, int limit, string processstatus) 
       {
           Paging<List<Case_WtajsModel>> paging = dal.GetCaseWtajsList(filters, start, limit, processstatus);
           return paging;
       }
       /// <summary>
       /// 全部违停
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Case_WtajsModel>> GetAllCaseWtajsList(List<Filter> filters, int start, int limit) 
       {
           List<Case_WtajsModel> items = dal.GetAllCaseWtajsList(filters, start, limit).ToList();
           int total = dal.GetAllCaseWtajsCount(filters);
           Paging<List<Case_WtajsModel>> paging = new Paging<List<Case_WtajsModel>>();
           paging.Items = items;
           paging.Total = total;
           return paging;
       }

       /// <summary>
       /// 违停列表导出
       /// </summary>
       /// <returns></returns>
       public List<Case_WtajsModel> GetWtajsCaseListExcel(string status, List<Filter> filter = null)
       {
           List<Case_WtajsModel> list = dal.GetWtajsCaseListExcel(status, filter);

           return list;
       }

       /// <summary>
       /// 详情列表
       /// </summary>
       /// <param name="wtid"></param>
       /// <returns></returns>
       public Case_WtajsModel Getcase(int wtid)
       {
       return dal.Getcase(wtid);
       }


       /// <summary>
       /// 审核
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int ModifyWtajs(Case_WtajsModel model)
       {
           return dal.ModifyWtajs(model);
       }


        /// <summary>
        /// 添加违停
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int AddWtajs(case_wtajs model)
       {
           return dal.AddWtajs(model);
       }
        /// <summary>
        /// 添加违停附件
        /// </summary>
        /// <param name="model"></param>
       public void AddWtFile(case_wtfiles model)
       {
           dal.AddWtFile(model);
       }

        /// <summary>
        /// 图片加载
        /// </summary>
        /// <param name="wtid"></param>
        /// <returns></returns>
       public List<FileUploadClass> GetFileUpload(int wtid)
       {
           return dal.GetFileUpload(wtid);
       }

       /// <summary>
       /// 全部违停
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Case_WtajsModel>> GetDateAllCaseWtajsList(List<Filter> filters, int start, int limit)
       {
           List<Case_WtajsModel> items = dal.GetDateAllCaseWtajsList(filters, start, limit).ToList();
           int total = dal.GetDateAllCaseWtajsCount(filters);
           Paging<List<Case_WtajsModel>> paging = new Paging<List<Case_WtajsModel>>();
           paging.Items = items;
           paging.Total = total;
           return paging;
       }

       /// <summary>
       /// 手机上报违停
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Case_WtajsModel>> GetApiWt(List<Filter> filters, int start, int limit)
       {
           List<Case_WtajsModel> items = dal.GetApiWt(filters, start, limit).ToList();
           int total = dal.GetApiWtCount(filters);
           Paging<List<Case_WtajsModel>> paging = new Paging<List<Case_WtajsModel>>();
           paging.Items = items;
           paging.Total = total;
           return paging;
       }

       #region 导出车辆列表
       public List<Case_WtajsModel> GetCaseWtajsList(List<Filter> filters)
       {
           return dal.GetCaseWtajsList(filters);
       }
       #endregion
    }
}
