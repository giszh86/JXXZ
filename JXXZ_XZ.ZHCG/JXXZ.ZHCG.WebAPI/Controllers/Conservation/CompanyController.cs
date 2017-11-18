using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.ConservationBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ConservationModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.Conservation
{
    public class CompanyController : ApiController
    {
        private YH_CompanyBLL bll = new YH_CompanyBLL();

        /// <summary>
        /// 添加养护公司
        /// </summary>
        [HttpPost]
        public HttpResponseMessage AddConserbation(YH_CompanyModel model)
        {
            int success = bll.AddConserbation(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 养护公司列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_CompanyModel>> GetConserbationList(int start, int limit)
        {
            return bll.GetConserbationList(null, start, limit);
        }

        /// <summary>
        /// 养护公司列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<YH_CompanyModel>> GetConserbationList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetConserbationList(filters, start, limit);
        }

        /// <summary>
        /// 养护单位详情
        /// </summary>
        /// <param name="wfsid"></param>
        /// <returns></returns>
        [HttpGet]
        public YH_CompanyModel GetConserbationModel(int companyid)
        {
            return bll.GetConserbationModel(companyid);

        }


        /// <summary>
        /// 修改养护公司
        /// </summary>
        [HttpPost]
        public HttpResponseMessage EditConserbation(YH_CompanyModel model)
        {
            int success = bll.EditConserbation(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 删除养护单位
        /// </summary>
        /// <param name="companyid"></param>
        [HttpGet]
        public HttpResponseMessage DeleteConserbation(int companyid)
        {
            int success = bll.DeleteConserbation(companyid);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 下拉框
        /// </summary>
        /// <returns></returns>
        public List<SourcesModel> GetDWSourceList()
        {
            return bll.GetSourceList();
        }

        #region 导出当前养护单位列表
        /// <summary>
        /// 导出报表到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<YH_CompanyModel> list = bll.GetCompanyListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<YH_CompanyModel> cfBll = new CommonFunctionBLL<YH_CompanyModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion
    }
}