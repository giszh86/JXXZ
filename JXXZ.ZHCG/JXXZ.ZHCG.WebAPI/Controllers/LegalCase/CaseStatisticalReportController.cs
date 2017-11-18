using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class CaseStatisticalReportController : ApiController
    {
        CaseStatisticalReportBLL bll = new CaseStatisticalReportBLL();

        /// <summary>
        /// 一般案件统计报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<view_casestatistical>> GetCommonCaseList(int start, int limit, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != null)
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            return bll.GetCommonCaseList(start, limit, filters);
        }

        /// <summary>
        /// 简易案件统计报表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_SimpleCasesModel>> GetSimpleCaseList(int start, int limit,string filter=null)
        {
            List<Filter> filters = null;
            if (filter != null)
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            return bll.GetSimpleCaseList(start, limit, filters);
        }

        /// <summary>
        /// 统计报表导出
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ExportExcel()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string excelname = request["excelname"];
            string exceltitle = request["exceltitle"];
            string exceldata = request["exceldata"];
            string filter = request["filter"];
            int type = string.IsNullOrEmpty(request["type"])?4:Convert.ToInt32(request["type"]);
            string filetemppath = System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/reportTemplate.xls");

            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            if (type == 1) {
                List<view_casestatistical> list = bll.GetCommonCaseListExcel(filters);
                CommonFunctionBLL<view_casestatistical> cfBll = new CommonFunctionBLL<view_casestatistical>(exceldata);
                return cfBll.saveExcel(9, filetemppath,"", list, excelname, exceltitle,0);
            }
            else if (type == 2)
            {
                List<Case_SimpleCasesModel> list = bll.GetSimpleCaseListExcel(filters);
                CommonFunctionBLL<Case_SimpleCasesModel> cfBll = new CommonFunctionBLL<Case_SimpleCasesModel>(exceldata);
                return cfBll.saveExcel(list, excelname, exceltitle);
            }
            else if (type == 3) {
                List<Case_SimpleCasesModel> list = bll.GetSimpleCaseListExcel(filters);
                CommonFunctionBLL<Case_SimpleCasesModel> cfBll = new CommonFunctionBLL<Case_SimpleCasesModel>(exceldata);
                return cfBll.saveExcel(list, excelname, exceltitle);
            }
            else
            {
                List<Case_SimpleCasesModel> list = bll.GetSimpleCaseListExcel(filters);
                CommonFunctionBLL<Case_SimpleCasesModel> cfBll = new CommonFunctionBLL<Case_SimpleCasesModel>(exceldata);
                return cfBll.saveExcel(list, excelname, exceltitle);
            }
        }
    }
}