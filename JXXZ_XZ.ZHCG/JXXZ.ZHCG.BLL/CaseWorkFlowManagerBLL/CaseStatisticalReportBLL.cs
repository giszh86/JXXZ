using JXXZ.ZHCG.DAL;
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
    public class CaseStatisticalReportBLL
    {
        CaseStatisticalReportDAL dal = new CaseStatisticalReportDAL();

        /// <summary>
        /// 一般案件统计报表
        /// </summary>
        /// <returns></returns>
        public Paging<List<view_casestatistical>> GetCommonCaseList(int start, int limit, List<Filter> filters)
        {
            Paging<List<view_casestatistical>> list = dal.GetCommonCaseList(start, limit, filters);
            return list;
        }

        /// <summary>
        /// 一般案件统计报表导出
        /// </summary>
        /// <returns></returns>
        public List<view_casestatistical> GetCommonCaseListExcel(List<Filter> filters = null)
        {
            List<view_casestatistical> list = dal.GetCommonCaseListExcel(filters);
            return list;
        }

        /// <summary>
        /// 简易案件统计报表
        /// </summary>
        /// <returns></returns>
        public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(int start, int limit, List<Filter> filters)
        {
            Paging<List<Case_SimpleCasesModel>> list = dal.GetSimpleCaseList(start, limit, filters);
            return list;
        }

        /// <summary>
        /// 简易案件统计报表导出
        /// </summary>
        /// <returns></returns>
        public List<Case_SimpleCasesModel> GetSimpleCaseListExcel(List<Filter> filters = null)
        {
            List<Case_SimpleCasesModel> list = dal.GetSimpleCaseListExcel(filters);
            return list;
        }
    }
}
