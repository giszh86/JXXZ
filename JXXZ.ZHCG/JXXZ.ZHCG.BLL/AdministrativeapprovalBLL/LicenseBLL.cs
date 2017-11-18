using JXXZ.ZHCG.DAL.administrativeapprovalDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.administrativeapprovalBLL
{
    public class LicenseBLL
    {
        private LicenseDAL dal = new LicenseDAL();

        #region 获取行政许可待审批列表
        /// <summary>
        /// 获取行政许可待审批列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetPendingCaseSourcesList(List<Filter> filter, int start, int limit, int userid)
        {
            return dal.GetPendingCaseSourcesList(filter, start, limit,userid);
        }
        #endregion

        #region 获取行政许可已审批列表
        /// <summary>
        /// 获取行政许可已审批列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetFinishCaseSourcesList(List<Filter> filter, int start, int limit,int userid)
        {
            return dal.GetFinishCaseSourcesList(filter, start, limit, userid);
        }
        #endregion

        #region 获取行政许可审批全部列表
        /// <summary>
        /// 获取行政许可审批全部列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Pag<LicenseModel> GetAllCaseSourcesList(List<Filter> filter, int start, int limit)
        {
            var rst = dal.GetAllCaseSourcesList(filter, start, limit);
            return rst;
            //List<LicenseModel> items = dal.GetAllCaseSourcesList(filter, start, limit).ToList();
            //int total = dal.GetAllCaseSourcesCount(filter);

            //Paging<List<LicenseModel>> paging = new Paging<List<LicenseModel>>();
            //paging.Items = items;
            //paging.Total = total;

            //return paging;
        }
        #endregion

        #region 获取行政许可详情
        /// <summary>
        /// 获取行政许可详情
        /// </summary>
        /// <param name="licensingid"></param>
        /// <returns></returns>
        public LicenseModel GetApprovalInfo(int licensingid)
        {
            return dal.GetApprovalInfo(licensingid);
        }
        #endregion

        #region 提交审批处理意见
        /// <summary>
        /// 提交审批处理意见
        /// </summary>
        /// <returns></returns>
        public int AddDealAdvice(LicenseModel model)
        {
            int success = dal.AddDealAdvice(model);
            return success;
        }
        #endregion

        #region 修改行政许可
        /// <summary>
        /// 修改行政许可
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ModifyApproveInf(LicenseModel model)
        {
            return dal.ModifyApproveInf(model);
        }
        #endregion

        #region 添加审批信息
        /// <summary>
        /// 添加审批信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddApproveInf(LicenseModel model, List<FileClass> list)
        {
            int success = dal.AddApproveInf(model, list);
            return success;
        }
        #endregion

        #region 手机上报
        public int SmAddApproveInf(LicenseModel model, List<FileClass> list)
        {
            return dal.AddApproveInf(model, list);
        }
        #endregion

    }
}
