using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL;
using JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.BLL.WorkFlowManagerBLL;
using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LawEnforcementObject
{
    public class SpecialTaskController : ApiController
    {
        /// <summary>
        /// 添加发起任务
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddSpecialTask(Zxzz_TaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            WorkFlowClass wf = new WorkFlowClass();
            List<FileClass> list = new List<FileClass>();
            zxzz_tasks ztmodel = new zxzz_tasks();

            ztmodel.title = model.title;
            ztmodel.tasktype = model.tasktype;
            ztmodel.level = model.level;
            ztmodel.term = model.term;
            ztmodel.starttime = model.starttime;
            ztmodel.endtime = model.endtime;
            ztmodel.region = model.region;
            ztmodel.taskexplain = model.taskexplain;
            ztmodel.grometry = model.grometry;
            ztmodel.fqr = model.fqr;
            ztmodel.fqtime = model.fqtime;
            ztmodel.leader = model.leader;
            ztmodel.createuserid = model.fqr;
            ztmodel.createtime = DateTime.Now;

            string[] fileClass = model.uploadpanelValue;
            string[] fileClassXDZD = model.xdzdValue;

            foreach (var item in fileClassXDZD)
            {
                model.xdzd += item + ",";
            }
            ztmodel.xdzd = model.xdzd.Substring(0, model.xdzd.Length - 1);

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            #region 专项整治流程
            wf.FunctionName = "zxzz_tasks";
            wf.WFID = "2017041214100001";
            wf.WFDID = "2017041214200001";
            wf.NextWFDID = "2017041214200002";
            wf.NextWFUSERIDS = model.leader.ToString();
            wf.IsSendMsg = "false";
            wf.WFCreateUserID = model.fqr;
            wf.files = list;
            #endregion

            bll.WF_Submit(wf, ztmodel);

            #region 添加日志
            SystemLogBLL slbll = new SystemLogBLL();
            slbll.WriteSystemLog("专项整治", "", (int)model.fqr);
            #endregion

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 专项整治启动
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SpecialTaskFiring(Zxzz_TaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            WorkFlowClass wf = new WorkFlowClass();
            List<FileClass> list = new List<FileClass>();
            Zxzz_SpecialTaskBLL zpbll = new Zxzz_SpecialTaskBLL();

            string[] fileClass = model.uploadpanelValue;

            zxzz_tasks ztmodel = new zxzz_tasks();

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            #region 专项整治流程
            wf.FunctionName = "zxzz_tasks";
            wf.WFID = "2017041214100001";
            wf.WFDID = model.wfdid;
            wf.NextWFDID = model.nextwfdid;
            wf.processmode = model.nextwfdid;
            wf.NextWFUSERIDS = zpbll.GetUseridsByUnitids(model.xdzd);
            wf.WFSAID = model.wfsaid;
            wf.WFSID = model.wfsid;
            wf.DEALCONTENT = model.dealcontent;
            wf.IsSendMsg = "false";
            wf.WFCreateUserID = model.createuserid;
            wf.files = list;
            #endregion

            string wf_data = bll.WF_Submit(wf, ztmodel);
            //初始化WFSU
            zpbll.ReloadWFSU(wf_data.Split(',')[1]);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 专项整治过程上报
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SpecialTaskReply(Zxzz_TaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            Zxzz_SpecialTaskBLL stbll = new Zxzz_SpecialTaskBLL();
            WorkFlowClass wf = new WorkFlowClass();
            List<FileClass> list = new List<FileClass>();
            string[] fileClass = model.uploadpanelValue;

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            #region 专项整治流程
            wf.FunctionName = "zxzz_tasks";
            wf.WFID = "2017041214100001";
            wf.WFDID = model.wfdid;
            wf.NextWFDID = null;
            wf.NextWFUSERIDS = null;
            wf.WFSAID = model.wfsaid;
            wf.WFSID = model.wfsid;
            wf.WFSUID = model.wfsuid;
            wf.DEALCONTENT = model.dealcontent;
            wf.IsSendMsg = "false";
            wf.WFCreateUserID = model.createuserid;
            wf.files = list;
            #endregion

            stbll.WF_Reply(wf);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 专项整治进入总结
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SpecialTaskEnd()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            zxzz_tasks ztmodel = new zxzz_tasks();
            WorkFlowClass wf = new WorkFlowClass();
            Zxzz_SpecialTaskBLL zpbll = new Zxzz_SpecialTaskBLL();

            #region 专项整治流程
            wf.FunctionName = "zxzz_tasks";
            wf.WFID = "2017041214100001";
            wf.WFDID = request["wfdid"];
            wf.NextWFDID = "2017041214200004";
            wf.NextWFUSERIDS = zpbll.AddSummarizeXZXKK();
            wf.WFSAID = request["wfsaid"];
            wf.WFSID = request["wfsid"];
            wf.DEALCONTENT = "";
            wf.IsSendMsg = "false";
            wf.WFCreateUserID = Convert.ToInt32(request["userid"]);
            #endregion

            string wf_data = bll.WF_Submit(wf, ztmodel);

            //结束所有wfsu用户的未处理
            zpbll.OverAllWFSU(wf.WFSAID, wf_data.Split(',')[1], (int)wf.WFCreateUserID);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true,\"wfsaid\":\"" + wf_data.Split(',')[1]+ "\"}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 专项整治总结
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage SpecialTaskSummarize(Zxzz_TaskModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

            WorkFlowManagerBLL bll = new WorkFlowManagerBLL();
            zxzz_tasks ztmodel = new zxzz_tasks();
            WorkFlowClass wf = new WorkFlowClass();
            List<FileClass> list = new List<FileClass>();
            Zxzz_SpecialTaskBLL ztbll = new Zxzz_SpecialTaskBLL();
            string[] fileClass = model.uploadpanelValue;

            ztmodel.summarytime = model.summarytime;
            ztmodel.summaryuserid = model.summaryuserid;
            ztmodel.summary = model.summary;
            ztmodel.results = model.results;
            ztmodel.experiences = model.experiences;

            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass infileClass = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    infileClass.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    infileClass.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    infileClass.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    infileClass.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(infileClass);
                }
            }

            #region 专项整治流程
            wf.FunctionName = "zxzz_tasks";
            wf.WFID = "2017041214100001";
            wf.WFDID = "2017041214200004";
            wf.NextWFDID = "2017041214200005";
            wf.NextWFUSERIDS = ztbll.GetUseridsByUnitids(model.xdzd);
            wf.WFSAID = model.wfsaid;
            wf.WFSID = model.wfsid;
            wf.IsSendMsg = "false";
            wf.WFCreateUserID = model.summaryuserid;
            wf.files = list;
            #endregion

            bll.WF_Submit(wf, ztmodel);
            //结束总结所有wfsu用户的未处理
            ztbll.EndAllWFSU(wf.WFSAID);

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            return response;
        }

        /// <summary>
        /// 待办任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetSpecialTaskList(int start, int limit, int userid)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskList(null, start, limit, userid, 1);
        }

        /// <summary>
        /// 待办任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetSpecialTaskList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskList(filters, start, limit, userid, 1);
        }

        /// <summary>
        /// 已办任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetAlreadySpecialTaskList(int start, int limit, int userid)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskList(null, start, limit, userid, 2);
        }

        /// <summary>
        /// 已办任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetAlreadySpecialTaskList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskList(filters, start, limit, userid, 2);
        }

        /// <summary>
        /// 全部任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetAllSpecialTaskList(int start, int limit)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetAllSpecialTaskList(null, start, limit);
        }

        /// <summary>
        /// 全部任务列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskModel>> GetAllSpecialTaskList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetAllSpecialTaskList(filters, start, limit);
        }

        /// <summary>
        /// 事件详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Zxzz_TaskModel GetSpecialTaskModel(string taskid)
        { 
             Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
             return bll.GetSpecialTaskModel(taskid);
        }

        /// <summary>
        /// 获取专项整治图片
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<FileClass> GetSpecialTaskImages(string taskid, string wfdid)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskImages(taskid, wfdid);
        }

        /// <summary>
        /// 获取专项整治用户上报详情图片
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<FileClass> GetSpecialTaskReportImages(string wfsuid)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskReportImages(wfsuid);
        }

        /// <summary>
        /// 获取专项整治流程信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<Zxzz_TaskWorkFlowModel>> GetSpecialTaskWFInfo(int start, int limit, string taskid, string wfdid)
        {
            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            return bll.GetSpecialTaskWFInfo(start, limit,taskid, wfdid);
        }

        /// <summary>
        /// 统计报表导出
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ExportExcel()
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            string excelname = request["excelname"];
            string exceltitle = request["exceltitle"];
            string exceldata = request["exceldata"];
            string filter = request["filter"];
            int status = string.IsNullOrEmpty(request["status"]) ? 0 : Convert.ToInt32(request["status"]);
            int userid = Convert.ToInt32(request["userid"]);

            List<Filter> filters = null;
            if (filter != "[]")
                filters = JsonConvert.DeserializeObject<List<Filter>>(filter);

            Zxzz_SpecialTaskBLL bll = new Zxzz_SpecialTaskBLL();
            List<Zxzz_TaskModel> list = bll.GetSpecialTaskListExcel(userid,status, filters);

            CommonFunctionBLL<Zxzz_TaskModel> cfBll = new CommonFunctionBLL<Zxzz_TaskModel>(exceldata);
            return cfBll.saveExcel(list, excelname, exceltitle);
        }

    }
}