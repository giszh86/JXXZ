using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Reflection;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;

namespace JXXZ.ZHCG.WebAPI.Controllers.CitizenService
{
    public class StatisticalReportController : ApiController
    {
        /// <summary>
        /// 统计列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<StatisticalReportModel>> GetEventReport(int start, int limit)
        {
            StatisticalReportBLL bll = new StatisticalReportBLL();
            return bll.GetEventReport(null, start, limit);
        }

        /// <summary>
        /// 统计列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<StatisticalReportModel>> GetEventReport(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            StatisticalReportBLL bll = new StatisticalReportBLL();
            return bll.GetEventReport(filters, start, limit);
        }

        /// <summary>
        /// 统计年份
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        public DataTable ClassificationStatistics(int year)
        {
            StatisticalReportBLL srb = new StatisticalReportBLL();
            DataTable dt = srb.ClassificationStatistics(year);
            return dt;
        }

        /// <summary>
        /// 导出月度报表Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportMonthExcel(string excelname,string exceltitle, string exceldata,string year,string month,string sourceid)
        {
            StatisticalReportBLL bll = new StatisticalReportBLL();
            //获取导出的数据
            List<StatisticalReportModel> list = bll.GetEventReport(year,month, sourceid);

            //获取导出的Excel表
            CommonFunctionBLL<StatisticalReportModel> cfBll = new CommonFunctionBLL<StatisticalReportModel>(exceldata);
            return cfBll.saveExcel(list, excelname,exceltitle);
        }

        /// <summary>
        /// 导出年度报表Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportYearExcel(string excelname, string exceltitle, string exceldata, string year)
        {
            StatisticalReportBLL bll = new StatisticalReportBLL();
            //获取导出的数据
            DataTable dt = bll.ClassificationStatistics(Convert.ToInt32(year));

            //获取导出的Excel表
            CommonFunctionBLL<StatisticalReportModel> cfBll = new CommonFunctionBLL<StatisticalReportModel>(exceldata);
            return cfBll.CreateExcel(dt, excelname, exceltitle);
        }

    }    
}
