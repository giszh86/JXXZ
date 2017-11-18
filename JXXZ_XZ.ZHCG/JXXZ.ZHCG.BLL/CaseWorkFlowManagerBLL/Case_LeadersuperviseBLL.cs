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
    public class Case_LeadersuperviseBLL
    {
        private Case_LeadersuperviseDAL dal = new Case_LeadersuperviseDAL();

        /// <summary>
        /// 督办信息
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<Case_LeadersuperviseModel>> GetLeadersuperviseList(int start, int limit, int caseid)
        {
            List<Case_LeadersuperviseModel> items = dal.GetLeadersuperviseList(start, limit, caseid).ToList();
            int total = dal.GetLeadersuperviseCount(caseid);
            Paging<List<Case_LeadersuperviseModel>> paging = new Paging<List<Case_LeadersuperviseModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 历史督办
        /// </summary>
        /// <param name="caseid"></param>
        /// <returns></returns>
        public List<Case_LeadersuperviseModel> GetHistoryLeader(int caseid)
        {
            List<Case_LeadersuperviseModel> items = dal.GetHistoryLeadersuperviseList(caseid);
            return items;
        }

        #region 后台列表
        /// <summary>
        /// 获取未督办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlreadyModel>> GetAlreadySupervise(List<Filter> filters, int start, int limit)
        {
            Paging<List<AlreadyModel>> paging = dal.GetAlreadySupervise(filters, start, limit);

            return paging;
        }

        /// <summary>
        /// 督办列表导出
        /// </summary>
        /// <returns></returns>
        public List<AlreadyModel> GetAlreadySuperviseExcel(List<Filter> filter = null)
        {
            List<AlreadyModel> list = dal.GetAlreadySuperviseExcel(filter);

            return list;
        }

        #endregion


        /// <summary>
        /// 获取未督办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlreadyModel>> GetNoAlreadySupervise(List<Filter> filters, int start, int limit)
        {
            List<AlreadyModel> items = dal.GetNoAlreadySupervise(filters, start, limit).ToList();
            int total = dal.GetNoAlreadySuperviseCount(filters);
            Paging<List<AlreadyModel>> paging = new Paging<List<AlreadyModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取自己已督办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlreadyModel>> GetYesUserAlreadySupervise(List<Filter> filters, int start, int limit, int userid)
        {
            List<AlreadyModel> items = dal.GetYesUserAlreadySupervise(filters, start, limit, userid).ToList();
            int total = dal.GetYesUserAlreadySuperviseCount(filters, userid);
            Paging<List<AlreadyModel>> paging = new Paging<List<AlreadyModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 获取自己已督办列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<AlreadyModel>> GetNoUserAlreadySupervise(List<Filter> filters, int start, int limit, int userid)
        {
            List<AlreadyModel> items = dal.GetNoUserAlreadySupervise(filters, start, limit, userid).ToList();
            int total = dal.GetNoUserAlreadySuperviseCount(filters, userid);
            Paging<List<AlreadyModel>> paging = new Paging<List<AlreadyModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        /// <summary>
        /// 添加领导督办
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddLeadersupervise(Case_LeadersuperviseModel model)
        {
            return dal.AddLeadersupervise(model);
        }
    }
}
