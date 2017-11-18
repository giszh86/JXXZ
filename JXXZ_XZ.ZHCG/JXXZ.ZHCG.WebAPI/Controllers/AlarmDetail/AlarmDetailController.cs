using JXXZ.ZHCG.BLL.AlarmDetail;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.AlarmDetail;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.AlarmDetail
{
    public class AlarmDetailController : ApiController
    {
        private AlarmDetailBLL bll = new AlarmDetailBLL();

        [HttpGet]
        public Paging<List<AlarmDetailModel>> GetAlarmDetailCount(int start, int limit)
        {
            return bll.GetAlarmDetailList(null, start, limit);
        }

        [HttpGet]
        public Paging<List<AlarmDetailModel>> GetAlarmDetailCount(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAlarmDetailList(filters, start, limit);
        }

        [HttpGet]
        public AlarmDetailModel GetAlarmDetailModel(int id)
        {
            return bll.GetAlarmDetailModel(id);
        }

         /// <summary>
        /// 修改审核状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage EditAlarmDetailReview(int id, int type)
        {
           int success= bll.EditAlarmDetailReview(id, type);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":falst}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 修改申诉状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditAlarmDetailAppeals(AlarmDetailModel model)
        {
            int success = bll.EditAlarmDetailAppeals(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":falst}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }


        #region 人员报警列表导出
        /// <summary>
        /// 人员报警列表导出到Excel
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage ExportExcel(string excelname, string exceltitle, string exceldata, string filter = null)
        {
            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            List<AlarmDetailModel> list = bll.GetAlarmDetailList(filters);

            //获取导出的Excel表
            CommonFunctionBLL<AlarmDetailModel> cfBll = new CommonFunctionBLL<AlarmDetailModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
        #endregion
    }
}