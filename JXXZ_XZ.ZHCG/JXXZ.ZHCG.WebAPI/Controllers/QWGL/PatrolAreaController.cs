using JXXZ.ZHCG.BLL.ServiceManagementBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.QWGL
{
    public class PatrolAreaController : ApiController
    {
        /// <summary>
        /// 巡查区域列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_PatrolAreasModel>> GetPatrolAreasList(int start, int limit)
        {
            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            return bll.GetPatrolAreasList(null, start, limit);
        }

        /// <summary>
        /// 巡查区域列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<QW_PatrolAreasModel>> GetPatrolAreasList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            return bll.GetPatrolAreasList(filters, start, limit);
        }

        /// <summary>
        /// 添加巡查区域
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddPatrolAreas()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_PatrolAreasModel model = new QW_PatrolAreasModel();

            if (!string.IsNullOrEmpty(request.Form["sszd"]))
                model.sszd = Convert.ToInt32(request.Form["sszd"]);
            if (!string.IsNullOrEmpty(request.Form["ssbc"]))
                model.ssbc = Convert.ToInt32(request.Form["ssbc"]);
            if (!string.IsNullOrEmpty(request.Form["areatype"]))
                model.areatype = Convert.ToInt32(request.Form["areatype"]);
            model.name = request.Form["name"];
            model.explain = request.Form["explain"];
            model.grometry = request.Form["grometry"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            bll.AddPatrolAreas(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 巡查区域编辑
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditPatrolAreas()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            QW_PatrolAreasModel model = new QW_PatrolAreasModel();

            if (!string.IsNullOrEmpty(request.Form["patrolid"]))
                model.patrolid = Convert.ToInt32(request.Form["patrolid"]);
            if (!string.IsNullOrEmpty(request.Form["sszd"]))
                model.sszd = Convert.ToInt32(request.Form["sszd"]);
            if (!string.IsNullOrEmpty(request.Form["ssbc"]))
                model.ssbc = Convert.ToInt32(request.Form["ssbc"]);
            if (!string.IsNullOrEmpty(request.Form["areatype"]))
                model.areatype = Convert.ToInt32(request.Form["areatype"]);
            model.name = request.Form["name"];
            model.explain = request.Form["explain"];
            model.grometry = request.Form["grometry"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            int result = bll.EditPatrolAreas(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 删除巡查区域
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage DeletePatrolAreas(int patrolid)
        {
            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            int result = bll.DeletePatrolAreas(patrolid);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (result > 0)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 根据中队班次获取巡查区域
        /// </summary>
        /// <param name="sszd"></param>
        /// <param name="ssbc"></param>
        /// <returns></returns>
        [HttpGet]
        public List<QW_PatrolAreasModel> GetPatrolAreasCom(int sszd, int ssbc)
        {
            QW_PatrolAreasBLL bll = new QW_PatrolAreasBLL();
            return bll.GetPatrolAreasCom(sszd, ssbc);
        }
    }
}
