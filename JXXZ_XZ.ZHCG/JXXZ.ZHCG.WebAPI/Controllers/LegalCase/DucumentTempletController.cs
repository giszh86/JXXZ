using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
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
    public class DucumentTempletController : ApiController
    {
        /// <summary>
        /// 新增文书模板
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddDocumentTemplet()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            Doc_DefinitionsBLL bll = new Doc_DefinitionsBLL();
            //文件上传
            Doc_DefinitionsModel model = new Doc_DefinitionsModel();
            HttpFileCollectionBase files = request.Files;
            if (files != null && files.Count > 0)
            {
                FileUploadClass fileClass = new FileUploadClass();
                if (files["file"].ContentLength != 0)
                {
                    fileClass = FileHelper.UploadFile(files["file"], ConfigManageClass.LegalCasePath);
                    model.ddpath = fileClass.OriginalPath;
                }
            }

            model.ddname = request["ddname"];
            model.doccode = request["doccode"];
            if (!string.IsNullOrEmpty(request["isunique"]))
                model.isunique = Convert.ToInt32(request["isunique"]);
            if (!string.IsNullOrEmpty(request["seq"]))
                model.seq = Convert.ToInt32(request["seq"]);
            model.ddstate = 0;
            model.createuserid = Convert.ToInt32(request["userid"]);
            model.createtime = DateTime.Now;

            int result = bll.AddDefinition(model);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 文书模板列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Doc_DefinitionsModel>> GetDefinitionsList(int start, int limit)
        {
            Doc_DefinitionsBLL bll = new Doc_DefinitionsBLL();
            return bll.GetDefinitionsList(null, start, limit);
        }

        /// <summary>
        /// 文书模板列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Doc_DefinitionsModel>> GetDefinitionsList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Doc_DefinitionsBLL bll = new Doc_DefinitionsBLL();
            return bll.GetDefinitionsList(filters, start, limit);
        }

        /// <summary>
        /// 环节下的文书模板列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<ClassModel> GetDefinitionsList(string wfdid)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetCaseBookList(wfdid);
        }

        /// <summary>
        /// 根据wfsaid获取文书模版下的附件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Doc_WfsasModel> GetWFSASList(string wfsaid, int ddid, int? phaseid=null,string wfdid = null)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetWFSASList(wfsaid, ddid,phaseid, wfdid);
        }

         /// <summary>
        /// 根据案件流程id获取抽样取证通知书
        /// </summary>
        /// <param name="wfdid"></param>
        /// <returns></returns>
        public List<Doc_WfsasModel> GetCYQZTZSList(string wfsaid, int ddid)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetCYQZTZSList(wfsaid, ddid);
        }

        /// <summary>
        /// 获取责令停止违法行为通知书文书编号
        /// </summary>
        /// <param name="wfsaid"></param>
        /// <param name="ddid"></param>
        /// <returns></returns>
        public string GetZLTZWFXWTZSNumber(string wfsaid, int ddid)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetZLTZWFXWTZSNumber(wfsaid, ddid);
        }

        /// <summary>
        /// 根据caseid获取文书模版下的附件列表
        /// <param name="caseid">案件标识</param>
        /// <param name="tablename">案源:case_casesources,简易案件:case_simplecases,一般案件:case_cases</param>
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Doc_WfsasModel> GetWFSASListAPI(int caseid, string tablename)
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetWFSASListAPI(caseid, tablename);
        }

        /// <summary>
        /// 获取流程阶段
        /// </summary>
        /// <returns></returns>
        public List<PhaseModel> GetPhaseList()
        {
            Doc_WfdddrsBLL bll = new Doc_WfdddrsBLL();
            return bll.GetPhaseList();
        }
    }
}
