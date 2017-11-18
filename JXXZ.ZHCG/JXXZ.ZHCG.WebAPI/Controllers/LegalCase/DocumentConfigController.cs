using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class DocumentConfigController : ApiController
    {
        /// <summary>
        /// 文书配置全部案件环节
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<WFClassModel> GetDefinitionClass()
        {
            Case_WorkFlowDetailsBLL bll = new Case_WorkFlowDetailsBLL();
            return bll.GetDefinitionClass();
        }

        /// <summary>
        /// 获取案件环节文书组织
        /// </summary>
        /// <returns></returns>
        public List<CaseLinkTreeModel> GetCaseLinkList()
        {
            Case_WorkFlowDetailsBLL bll = new Case_WorkFlowDetailsBLL();
            return bll.GetCaseLinkList();
        }

        /// <summary>
        /// 新增文书配置
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddWfdddrs()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            Doc_WfdddrsModel model = new Doc_WfdddrsModel();

            model.wfdid = request["wfdid"];
            if (!string.IsNullOrEmpty(request["ddid"]))
                model.ddid = Convert.ToInt32(request["ddid"]);
            if (!string.IsNullOrEmpty(request["isrequired"]))
                model.isrequired = Convert.ToInt32(request["isrequired"]);
            if (!string.IsNullOrEmpty(request["seq"]))
                model.seq = Convert.ToInt32(request["seq"]);
            model.status = 0;

            int result = bll.AddWfdddrs(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 修改文书配置
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ModifyWfdddrs()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            Doc_WfdddrsModel model = new Doc_WfdddrsModel();

            if (!string.IsNullOrEmpty(request["ddid"]))
                model.ddid = Convert.ToInt32(request["ddid"]);
            model.wfdid = request["wfdid"];
            if (!string.IsNullOrEmpty(request["dwdid"]))
                model.dwdid = Convert.ToInt32(request["dwdid"]);
            if (!string.IsNullOrEmpty(request["isrequired"]))
                model.isrequired = Convert.ToInt32(request["isrequired"]);
            if (!string.IsNullOrEmpty(request["seq"]))
                model.seq = Convert.ToInt32(request["seq"]);
            model.status = 0;

            int result = bll.ModifyWfdddrs(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 删除文书配置
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage DeleteWfdddrs()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            Doc_WfdddrsModel model = new Doc_WfdddrsModel();

            if (!string.IsNullOrEmpty(request["ddid"]))
                model.ddid = Convert.ToInt32(request["ddid"]);
            model.wfdid = request["wfdid"];
            if (!string.IsNullOrEmpty(request["dwdid"]))
                model.dwdid = Convert.ToInt32(request["dwdid"]);
            if (!string.IsNullOrEmpty(request["isrequired"]))
                model.isrequired = Convert.ToInt32(request["isrequired"]);
            if (!string.IsNullOrEmpty(request["seq"]))
                model.seq = Convert.ToInt32(request["seq"]);
            model.status = 1;

            int result = bll.ModifyWfdddrs(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 文书配置列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Doc_WfdddrsModel>> GetWfdddrsList(int start, int limit)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetWfdddrsList(null, start, limit);
        }

        /// <summary>
        /// 文书配置列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Doc_WfdddrsModel>> GetWfdddrsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetWfdddrsList(filters, start, limit);
        }

        /// <summary>
        /// 根据流程环节获取必填文书
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Doc_WfdddrsModel> GetRequireWfdddrsList(string wfdid)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetRequireWfdddrsList(wfdid);
        }
    }
}
