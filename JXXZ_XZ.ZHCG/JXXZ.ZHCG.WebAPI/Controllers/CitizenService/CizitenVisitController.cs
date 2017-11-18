using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.CitizenServiceBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.CitizenService
{
    public class CizitenVisitController : ApiController
    {
        /// <summary>
        /// 回访事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_VisitsModel>> GetVisitsList(int start, int limit)
        {
            SM_VisitsBLL bll = new SM_VisitsBLL();
            return bll.GetVisitsList(null, start, limit);
        }

        /// <summary>
        /// 回访事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_VisitsModel>> GetVisitsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_VisitsBLL bll = new SM_VisitsBLL();
            return bll.GetVisitsList(filters, start, limit);
        }

        /// <summary>
        /// 添加回访事件
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCizitenVisit()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            SM_VisitsModel model = new SM_VisitsModel();

            model.citizenid = request.Form["citizenid"];
            model.contact = request.Form["contact"];
            model.processopinion = request.Form["processopinion"];
            model.returnvisit = Convert.ToInt32(request.Form["returnvisit"]);
            model.satisfaction = Convert.ToInt32(request.Form["satisfaction"]);
            model.processmode = Convert.ToInt32(request.Form["processmode"]);
            if (!string.IsNullOrEmpty(request.Form["visittime"]))
                model.visittime = Convert.ToDateTime(request.Form["visittime"]);
            model.respondents = request.Form["respondents"];
            model.returnvisitcontent = request.Form["returnvisitcontent"];
            model.createtime = DateTime.Now;
            model.createuserid = Convert.ToInt32(request.Form["userid"]);

            SM_VisitsBLL bll = new SM_VisitsBLL();
            bll.AddVisits(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

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

            SM_VisitsBLL bll = new SM_VisitsBLL();
            List<SM_VisitsModel> list = bll.GetVisitsListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<SM_VisitsModel> cfBll = new CommonFunctionBLL<SM_VisitsModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
    }
}
