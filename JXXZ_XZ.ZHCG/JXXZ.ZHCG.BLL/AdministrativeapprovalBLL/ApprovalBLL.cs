using JXXZ.ZHCG.DAL.administrativeapprovalDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.AdministrativeapprovalBLL
{
    public class ApprovalBLL
    {
        ApprovalDAL dal = new ApprovalDAL();

        #region 获取行政审批列表
        public Paging<List<Audit_project_wModel>> GetApprovalList(List<Filter> filters, int start, int limit, int userid, int status, bool isxzk)
        {
            return dal.GetApprovalList(filters, start, limit, userid, status, isxzk);
        }
        #endregion

        #region 获取行政审批全部列表
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(List<Filter> filters, int start, int limit, int userid, int status)
        {
            return dal.GetAllApprovalList(filters, start, limit, userid, status);
        }
        #endregion

        #region 获取意见列表
        public Paging<List<Audit_project_wModel>> GetAdviceList(int start, int limit, string pviguid)
        {
            return dal.GetAdviceList(start, limit, pviguid);
        }
        #endregion

        #region 获取流转日志
        public Paging<List<Audit_project_wModel>> GetTransformLogList(int start, int limit, string pviguid)
        {
            return dal.GetTransformLogList(start, limit, pviguid);
        }
        #endregion

        #region 获取办结信息
        public Audit_project_wModel GetBanjieList(string pviguid)
        {
            return dal.GetBanjieList(pviguid);
        }
        #endregion

        #region 获取流程信息详情
        public approvalDetail GetApprovalDetail(string syncrowguid)
        {
            return dal.GetApprovalDetail(syncrowguid);
        }
        #endregion

        #region 获取附件类型
        public List<FileUploadClass> GetFileUpload(string wfsuid, string OriginPath, string smallPath)
        {
            return dal.GetFileUpload(wfsuid, OriginPath, smallPath);
        }
        #endregion

        #region 获取行政审批详情
        public Audit_project_wModel ApprovalDetail(string syncrowguid)
        {
            return dal.ApprovalDetail(syncrowguid);
        }
        #endregion


        #region  web端列表接口
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(List<Filter> filters, int start, int limit)
        {
            return dal.GetAllApprovalList(filters, start, limit);
        }
        #endregion

        /*20170901行政审批流程修改*/

        #region 获取行政审批列表
        public Paging<List<Audit_project_wModel>> GetToBeApprovalList(List<Filter> filters, int start, int limit, int userid, int status, bool isxzk)
        {
            return dal.GetToBeApprovalList(filters, start, limit, userid, status, isxzk);
        }
        #endregion

        #region 获取行政审批全部列表
        public Paging<List<Audit_project_wModel>> GetTheAllApprovalList(List<Filter> filters, int start, int limit)
        {
            return dal.GetTheAllApprovalList(filters, start, limit);
        }
        #endregion

        #region 行政科派遣中队内勤
        /// <summary>
        /// 行政科派遣中队内勤
        /// </summary>
        public int assignMidTeam(Audit_project_wModel model)
        {
            return dal.assignMidTeam(model);
        }
        #endregion

        #region 选择确定中队下班组成员
        public List<User> GetUnitsChild(int unitid)
        {
            return dal.GetUnitsChild(unitid);
        }
        #endregion

        #region 中队内勤派遣队员
        /// <summary>
        /// 中队内勤派遣队员
        /// </summary>
        public int assignTeamber(Audit_project_wModel model)
        {
            return dal.assignTeamber(model);
        }
        #endregion

        #region 班组成员处理
        public int memberDeal(Audit_project_wModel model)
        {
            return dal.memberDeal(model);
        }
        #endregion

        #region 行政科进行归档
        public int xzkOnFile(Audit_project_wModel model)
        {
            return dal.xzkOnFile(model);
        }
        #endregion

        #region 获取流程审批信息详情
        public approvalDetail GetFlowDetail(string pviguid,int userid)
        {
            return dal.GetFlowDetail(pviguid,userid);
        }
        #endregion

        #region 获取处理时的流程信息
        public approvalDetail GetOnDealDetail(string pviguid, int userid)
        {
            return dal.GetOnDealDetail(pviguid, userid);
        }
        #endregion
    }
}
