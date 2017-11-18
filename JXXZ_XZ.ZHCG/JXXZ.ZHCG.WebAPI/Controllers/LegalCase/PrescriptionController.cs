using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class PrescriptionController : ApiController
    {
        private Case_PrescripTionsBLL bll = new Case_PrescripTionsBLL();
        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_PrescripTionsModel>> GetPrescripList(int start, int limit)
        {
            return bll.GetPrescripList(start, limit);
        }
        /// <summary>
        /// 添加
        /// </summary>
        [HttpPost]
        public HttpResponseMessage AddPrescrip(Case_PrescripTionsModel model)
        {
            int success = bll.AddPrescrip(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 修改
        /// </summary>
        [HttpPost]
        public HttpResponseMessage EditPrescrip(Case_PrescripTionsModel model)
        {
            int success = bll.EditPrescrip(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 根据wfdid获取时限
        /// </summary>
        [HttpGet]
        public HttpResponseMessage GetTermByWFDID(string wfdid)
        {
            double term = bll.GetPrescrip(wfdid);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true,\"term\":" + term + "}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

    }
}