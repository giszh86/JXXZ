using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL
{
    public class CaseStatisticalReportDAL
    {
        /// <summary>
        /// 一般事件统计列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<view_casestatistical>> GetCommonCaseList(int start, int limit, List<Filter> filters)
        {
            List<view_casestatistical> list = new List<view_casestatistical>();
            Paging<List<view_casestatistical>> paging = new Paging<List<view_casestatistical>>();
            using (Entities db = new Entities())
            {
                IEnumerable<view_casestatistical> query = db.view_casestatistical;                

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "commonsitedatetime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int year = Convert.ToInt32(value);
                                    query = query.Where(t => t.sitedatetime.Value.Year == year);
                                }
                                break;
                        }
                    }
                }
                list = query.Skip(start).Take(limit).ToList();

                //获取列表
                paging.Items = list;
                //获取列表总数量                
                paging.Total = query.Count();

                return paging;
            }
        }

        /// <summary>
        /// 一般事件统计列表
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public List<view_casestatistical> GetCommonCaseListExcel(List<Filter> filters)
        {
            using (Entities db = new Entities())
            {
                IEnumerable<view_casestatistical> query = db.view_casestatistical;                

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "commonsitedatetime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int year = Convert.ToInt32(value);
                                    query = query.Where(t => t.sitedatetime.Value.Year == year);
                                }
                                break;
                        }
                    }
                }

                return query.ToList();
            }
        }

        /// <summary>
        /// 简易案件统计报表
        /// </summary>
        /// <returns></returns>
        public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(int start, int limit, List<Filter> filters)
        {
            List<Case_SimpleCasesModel> list = new List<Case_SimpleCasesModel>();
            Paging<List<Case_SimpleCasesModel>> paging = new Paging<List<Case_SimpleCasesModel>>();
            using (Entities db = new Entities())
            {
                IQueryable<Case_SimpleCasesModel> queryable = from a in db.case_simplecases

                                                              join dw in db.doc_wfsas on new { a1 = a.simpleid, b1 = "case_simplecases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dwTmp
                                                              from dwa in dwTmp.DefaultIfEmpty()
                                                              join wfa in db.case_workflowspecificactivitys on dwa.wfsaid equals wfa.wfsaid into wfaTmp
                                                              from dwfaa in wfaTmp.DefaultIfEmpty()

                                                              join h_join in db.base_users on a.createuserid equals h_join.id into hTmp
                                                              from h in hTmp.DefaultIfEmpty()
                                                              join c_join in db.base_units on h.unitid equals c_join.id into ctmp
                                                              from c in ctmp.DefaultIfEmpty()

                                                              join dwfk_join in db.doc_wfsas on new { a1 = dwfaa.wfsaid, b1 = 46 } equals new { a1 = dwfk_join.wfsaid, b1 = (int)dwfk_join.ddid } into dwfkTmp
                                                              from dwafk in dwfkTmp.DefaultIfEmpty()
                                                              join fk_join in db.temp_fksjpz on dwafk.documentid equals fk_join.id into fkTmp
                                                              from fk in fkTmp.DefaultIfEmpty()
                                                              select new Case_SimpleCasesModel
                                                              {
                                                                  simpleid = a.simpleid,
                                                                  cfjdsbh = a.cfjdsbh,
                                                                  casetypeid = a.casetypeid,
                                                                  casereason = a.casereason,
                                                                  caseaddress = a.caseaddress,
                                                                  pf_name = a.p_name == null ? a.f_name : a.p_name,
                                                                  cf = a.cf,
                                                                  casecontent = a.casecontent,
                                                                  createtime = a.createtime,
                                                                  createusername = h.displayname,
                                                                  wfsaid = dwfaa.wfsaid,
                                                                  fkpjbh = fk.fkpjbh
                                                              };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "simplesitedatetime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int year = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.createtime.Value.Year == year);
                                }
                                break;
                        }

                    }
                }
                list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSimpleComparer()).ToList();
                //获取列表总数量                
                paging.Total = list.Count();

                list = list.Skip(start).Take(limit).ToList();

                //获取列表
                paging.Items = list;

                return paging;
            }
        }

        /// <summary>
        /// 简易案件统计报表导出
        /// </summary>
        /// <returns></returns>
        public List<Case_SimpleCasesModel> GetSimpleCaseListExcel(List<Filter> filters = null)
        {

            using (Entities db = new Entities())
            {
                IQueryable<Case_SimpleCasesModel> queryable = from a in db.case_simplecases

                                                              join dw in db.doc_wfsas on new { a1 = a.simpleid, b1 = "case_simplecases" } equals new { a1 = (int)dw.caseid, b1 = dw.ddtablename } into dwTmp
                                                              from dwa in dwTmp.DefaultIfEmpty()
                                                              join wfa in db.case_workflowspecificactivitys on dwa.wfsaid equals wfa.wfsaid into wfaTmp
                                                              from dwfaa in wfaTmp.DefaultIfEmpty()

                                                              select new Case_SimpleCasesModel
                                                              {
                                                                  simpleid = a.simpleid,
                                                                  cfjdsbh = a.cfjdsbh,
                                                                  casereason = a.casereason,
                                                                  caseaddress = a.caseaddress,
                                                                  pf_name = a.p_name == null ? a.f_name : a.p_name,
                                                                  casecontent = a.casecontent,
                                                                  createtime = a.createtime,
                                                                  wfsaid = dwfaa.wfsaid,
                                                                  wfsid1 = dwfaa.wfsid,
                                                              };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "simplesitedatetime":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    int year = Convert.ToInt32(value);
                                    queryable = queryable.Where(t => t.createtime.Value.Year == year);
                                }
                                break;
                        }

                    }
                }

                List<Case_SimpleCasesModel> list = queryable.OrderByDescending(a => a.createtime).ToList();
                list = list.Distinct(new CaseSimpleComparer()).ToList();

                return list;
            }
        }
    }
}
