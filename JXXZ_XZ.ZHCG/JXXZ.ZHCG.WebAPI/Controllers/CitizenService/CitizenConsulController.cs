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
    public class CitizenConsulController : ApiController
    {

        /// <summary>
        /// 咨询事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_ConsulTationsModel>> GetConsulTationsList(int start, int limit)
        {
            SM_ConsulTationsBLL bll = new SM_ConsulTationsBLL();
            return bll.GetConsulTationsList(null, start, limit);
        }

        /// <summary>
        /// 咨询事件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<SM_ConsulTationsModel>> GetConsulTationsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            SM_ConsulTationsBLL bll = new SM_ConsulTationsBLL();
            return bll.GetConsulTationsList(filters, start, limit);
        }


        /// <summary>
        /// 添加咨询事件
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCizitenConsul()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            SM_ConsulTationsModel model = new SM_ConsulTationsModel();
            model.consultuser = request.Form["consultPerson"];
            model.contact = request.Form["phone"];
            model.title = request.Form["eventTitle"];
            if (!string.IsNullOrEmpty(request.Form["visitTime"]))
                model.acceptancetime = Convert.ToDateTime(request.Form["visitTime"]);
            if (!string.IsNullOrEmpty(request.Form["bigtypeid"]))
                model.bigtypeid = Convert.ToInt32(request.Form["bigtypeid"]);
            if (!string.IsNullOrEmpty(request.Form["smalltypeid"]))
                model.smalltypeid = Convert.ToInt32(request.Form["smalltypeid"]);
            model.consultcontent = request.Form["consultContent"];
            model.createtime = DateTime.Now;
            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);



            SM_ConsulTationsBLL bll = new SM_ConsulTationsBLL();
            bll.AddConsulTations(model);
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

            SM_ConsulTationsBLL bll = new SM_ConsulTationsBLL();
            List<SM_ConsulTationsModel> list = bll.GetConsulTationsListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<SM_ConsulTationsModel> cfBll = new CommonFunctionBLL<SM_ConsulTationsModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
    }
}
