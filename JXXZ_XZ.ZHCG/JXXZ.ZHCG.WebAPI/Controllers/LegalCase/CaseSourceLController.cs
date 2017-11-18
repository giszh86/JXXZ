using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
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
    public class CaseSourceLController : ApiController
    {
        /// <summary>
        /// 获取案件来源
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ClassModel> GetSourcesClass()
        {
            Case_SourcesBLL bll = new Case_SourcesBLL();
            return bll.GetSourcesClass();
        }

        /// <summary>
        /// 获取移交单位
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ClassModel> GetYjdwClass()
        {
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetYjdwClass();
        }

        /// <summary>
        /// 新增案源登记
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCaseSources()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            Case_CaseSourcesModel model = new Case_CaseSourcesModel();

            if (!string.IsNullOrEmpty(request["sourceid"]))
                model.sourceid = Convert.ToInt32(request["sourceid"]);
            if (!string.IsNullOrEmpty(request["yjdwid"]))
                model.yjdwid = Convert.ToInt32(request["yjdwid"]);
            model.contact = request["contact"];
            model.contactphone = request["contactphone"];
            model.contactaddress = request["contactaddress"];
            model.wfxwfsdz = request["wfxwfsdz"];
            model.cluecontent = request["cluecontent"];
            model.processopinion = request["processopinion"];
            model.notetaker = request["notetaker"];
            if (!string.IsNullOrEmpty(request["casetype"]))
                model.casetype = Convert.ToInt32(request["casetype"]);
            model.createuserid = Convert.ToInt32(request["userid"]);
            model.createtime = DateTime.Now;
            if (!string.IsNullOrEmpty(request["status"]))
                model.status = Convert.ToInt32(request["status"]);
            if (!string.IsNullOrEmpty(request["notetime"]))
                model.notetime = Convert.ToDateTime(request["notetime"]);
            model.lastatus = 0;

            int caseid = bll.AddCaseSources(model);

            Case_WorkFlowManagerBLL wfbll = new Case_WorkFlowManagerBLL();
            Case_WorkFlowClass wf = new Case_WorkFlowClass();

            #region 案件流程
            wf.FunctionName = "case_sources";
            wf.WFID = "2017022219210001";
            wf.WFDID = "2017022219200001";
            wf.NextWFDID = "2017022219200002";
            wf.NextWFUSERIDS = ""; //下一步流程ID           
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = Convert.ToInt32(request.Form["userid"]); //当前流程创建人
            wf.casetype = 1;
            wf.caseid = caseid;
            #endregion

            string wf_data = wfbll.WF_Submit(wf);

            #region 文书
            List<Doc_WfsasModel> WfsasList = new List<Doc_WfsasModel>();
            Doc_WfsasModel dwmodel = new Doc_WfsasModel();

            dwmodel.wfsaid = wf_data.Split(new string[] { "wfsaid\":\"" }, StringSplitOptions.RemoveEmptyEntries)[1].Substring(0, 22);
            dwmodel.filetyoe = 3;
            dwmodel.ddid = 11;
            dwmodel.createuserid = Convert.ToInt32(request["userid"]);
            dwmodel.ddtablename = "case_casesources";
            dwmodel.caseid = caseid;
            dwmodel.ddtableid = caseid;
            dwmodel.filename = "案件来源登记表";
            dwmodel.status = 0;

            //生成WORD、PDF文件
            DocumentReplaceHandleBLL drhbll = new DocumentReplaceHandleBLL();
            Dictionary<string, string> dic = bll.ToWordPDF(dwmodel.filename, System.Web.Hosting.HostingEnvironment.MapPath("~/DocumentTemplate/" + dwmodel.filename + ".docx"), ConfigManageClass.LegalCasePath, drhbll.GetDocumentDictory(model));

            dwmodel.lastwordpath = dic["WordPath"];
            dwmodel.lastpdfpath = dic["PDFPath"];

            WfsasList.Add(dwmodel);
            bll.function_AddWfsas(WfsasList);
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true,\"caseid\":" + caseid + "," + wf_data + "}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 处理待办案源
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage HandleCaseSources(Case_CaseSourcesModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();

            int result = bll.HandleCaseSources(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            if (result == 1)
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            else
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");

            return response;
        }        

        /// <summary>
        /// 待处理案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetPendingCaseSourcesList(int start, int limit,int userid)
        {
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetPendingCaseSourcesList(null, start, limit, userid);
        }

        /// <summary>
        /// 待处理案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetPendingCaseSourcesList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetPendingCaseSourcesList(filters, start, limit,userid);
        }

        /// <summary>
        /// 已处理案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetProcessedCaseSourcesList(int start, int limit, int userid)
        {
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetProcessedCaseSourcesList(null, start, limit,userid);
        }

        /// <summary>
        /// 已处理案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetProcessedCaseSourcesList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetProcessedCaseSourcesList(filters, start, limit,userid);
        }

        /// <summary>
        /// 全部案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetAllCaseSourcesList(int start, int limit)
        {
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetAllCaseSourcesList(null, start, limit);
        }

        /// <summary>
        /// 全部案源列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Case_CaseSourcesModel>> GetAllCaseSourcesList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            return bll.GetAllCaseSourcesList(filters, start, limit);
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

            Case_CaseSourcesBLL bll = new Case_CaseSourcesBLL();
            List<Case_CaseSourcesModel> list = bll.GetAllCaseSourcesListExcel(filters);

            //获取导出的Excel表
            CommonFunctionBLL<Case_CaseSourcesModel> cfBll = new CommonFunctionBLL<Case_CaseSourcesModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }
    }
}
