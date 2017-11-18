using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class CheckinController : ApiController
    {
        private QW_CheckinBLL bll = new QW_CheckinBLL();
        /// <summary>
        /// 签到管理列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_CheckinModel>> GetCheckinList(int start, int limit)
        {

            return bll.GetCheckinList(null, start, limit);
        }
        /// <summary>
        /// 管理签到列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_CheckinModel>> GetCheckinList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetCheckinList(filters, start, limit);
        }

      
        [HttpPost]
        public HttpResponseMessage ExportExcel()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string excelname = request["excelname"];
            string exceltitle = request["exceltitle"];
            string exceldata = request["exceldata"];
            string filter = request["filter"];

            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<QW_CheckinModel> list = bll.GetCheckinExportExcel(filters);
            CommonFunctionBLL<QW_CheckinModel> cfBll = new CommonFunctionBLL<QW_CheckinModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
    }
}