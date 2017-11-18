using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.BLL.AdministrativeapprovalBLL;
using JXXZ.ZHCG.BLL.SMSMessagesBLL;
using JXXZ.ZHCG.BLL.WorkFlowManagerBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.administrativeapprovalModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using JXXZ.ZHCG.Utility;
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

namespace JXXZ.ZHCG.WebAPI.Controllers.administrativeapproval
{
    public class ApprovalController : ApiController
    {
        ApprovalBLL bll = new ApprovalBLL();

        #region 获取行政审批列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetApprovalList(string filter, int start, int limit, int userid, int status, bool isxzk)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetApprovalList(filters, start, limit, userid, status, isxzk);
        }

        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetApprovalList(int start, int limit, int userid, int status, bool isxzk)
        {
            return bll.GetApprovalList(null, start, limit, userid, status, isxzk);
        }
        #endregion

        #region 获取行政审批全部列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(string filter, int start, int limit, int userid, int status)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAllApprovalList(filters, start, limit, userid, status);
        }

        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(int start, int limit, int userid, int status)
        {
            return bll.GetAllApprovalList(null, start, limit, userid, status);
        }
        #endregion

        #region 流程派遣
        /// <summary>
        /// 流程派遣
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage assignTeam(Audit_project_wModel model)
        {
            #region 获取上传附件
            string[] fileClass = model.uploadpanelValue;
            List<FileClass> list = new List<FileClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass file = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }
            #endregion

            int userid = Convert.ToInt32(model.createuserid);
            //获取当前流程wfdid
            approvalDetail result = bll.GetApprovalDetail(model.syncrowguid);
            string[] wfdidlist = { "2017070414250001", "2017070414250002", "2017070414250003", "2017070414250004", "2017070414250005", "2017070414250006" };
            WorkFlowClass wf = new WorkFlowClass();
            wf.FunctionName = "audit_project_w";//行政审批表名
            wf.WFID = "2017070414220001";       //工作流程编号=.=固定
            wf.WFDID = model.wfdid;      //工作详细编号
            if (result != null)
            {
                wf.WFSID = result.wfsid;
                wf.WFSAID = result.wfsaid;
            }
            wf.NextWFDID = model.nextwfdid;  //下一步流程详细编号
            wf.NextWFUSERIDS = model.nextuserid.ToString();   //下一步流程用户id
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = model.createuserid; //当前流程创建人
            wf.DEALCONTENT = model.advice;  //处理意见
            wf.syncrowguid = model.syncrowguid;
            wf.files = list;
            if (wf.WFDID == wfdidlist[0])
            {
                wf.Remark = model.xzxkaddress;
                wf.satisfaction = model.xzxkstarttime;
                wf.processmode = model.xzxkendtime;
            }
            else if (wf.WFDID == wfdidlist[2])
            {
                wf.Remark = model.geography;
            }
            
            WorkFlowManagerBLL wfbll = new WorkFlowManagerBLL();
            string wf_id = wfbll.WF_Submit(wf, model);

            HttpResponseMessage  response = Request.CreateResponse(HttpStatusCode.OK);
            if (wf_id != null&&model.isSendMsg==1)
            {
                #region 发送短信
                if (wf.NextWFUSERIDS != null && model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
                {
                    UserBLL userbll = new UserBLL();
                    string phone = model.phone;
                    //phone="18768196242";
                    string[] numbers = phone.Split(',');
                    string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername+")";
                    SMSMessagesBLL smsbll = new SMSMessagesBLL();
                    smsbll.SendMessage(numbers, msg);
                }
                #endregion

                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 获取流程信息详情
        [HttpGet]
        public approvalDetail GetApprovalDetail(string syncrowguid)
        {
            return bll.GetApprovalDetail(syncrowguid);
        }
        #endregion

        #region 获取附件类型
        [HttpGet]
        public List<FileUploadClass> GetFileUpload(string wfsuid)
        {
            string OriginPath = ConfigManageClass.AdminApprovalOrignalPath;
            string smallPath = ConfigManageClass.AdminApprovalSmallPath;
            return bll.GetFileUpload(wfsuid, OriginPath, smallPath);
        }
        #endregion

        #region 获取行政审批详情
        [HttpGet]
        public Audit_project_wModel ApprovalDetail(string syncrowguid)
        {
            return bll.ApprovalDetail(syncrowguid);
        }
        #endregion

        /*20170901行政审批流程修改*/

        #region 获取意见列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetAdviceList(int start, int limit, string pviguid)
        {
            return bll.GetAdviceList(start, limit, pviguid);
        }
        #endregion

        #region 获取流转日志
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetTransformLogList(int start, int limit, string pviguid)
        {
            return bll.GetTransformLogList(start, limit, pviguid);
        }
        #endregion

        #region 获取办结信息
        [HttpGet]
        public Audit_project_wModel GetBanjieList(string pviguid)
        {
            return bll.GetBanjieList(pviguid);
        }
        #endregion


        #region 获取行政审批列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetToBeApprovalList(string filter, int start, int limit, int userid, int status, bool isxzk)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetToBeApprovalList(filters, start, limit, userid, status, isxzk);
        }

        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetToBeApprovalList(int start, int limit, int userid, int status, bool isxzk)
        {
            return bll.GetToBeApprovalList(null, start, limit, userid, status, isxzk);
        }
        #endregion

        #region 获取行政审批全部列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetTheAllApprovalList(string filter, int start, int limit)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTheAllApprovalList(filters, start, limit);
        }

        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetTheAllApprovalList(int start, int limit)
        {
            return bll.GetTheAllApprovalList(null, start, limit);
        }
        #endregion

        #region 行政科派遣中队内勤
        /// <summary>
        /// 行政科派遣中队内勤
        /// </summary>
        [HttpPost]
        public HttpResponseMessage assignMidTeam(Audit_project_wModel model)
        {
            #region 获取上传附件
            string[] fileClass = model.uploadpanelValue;
            List<FileClass> list = new List<FileClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass file = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }
            #endregion

            model.filelist = list;

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            int success = bll.assignMidTeam(model);

            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
                #region 处理成功后发送短信
                try
                {
                    if (model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
                    {
                        UserBLL userbll = new UserBLL();
                        string phone = model.phone;
                        string[] numbers = phone.Split(',');
                        string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername + ")";
                        SMSMessagesBLL smsbll = new SMSMessagesBLL();
                        smsbll.SendMessage(numbers, msg);
                    }
                }
                catch
                {
                    //短信异常
                }
                #endregion
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 选择确定中队下班组成员
        [HttpGet]
        public List<User> GetUnitsChild(int unitid)
        {
            return bll.GetUnitsChild(unitid);
        }
        #endregion

        #region 中队内勤派遣队员
        [HttpPost]
        public HttpResponseMessage assignTeamber(Audit_project_wModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.assignTeamber(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
                try
                {
                    #region 处理成功后发送短信
                    if (model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
                    {
                        UserBLL userbll = new UserBLL();
                        string phone = model.phone;
                        string[] numbers = phone.Split(',');
                        string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername + ")";
                        SMSMessagesBLL smsbll = new SMSMessagesBLL();
                        smsbll.SendMessage(numbers, msg);
                    }
                }
                catch (Exception e)
                {
                    //短信异常
                }
                    #endregion
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 班组成员处理
        [HttpPost]
        public HttpResponseMessage memberDeal(Audit_project_wModel model)
        {
            #region 获取上传附件
            string[] fileClass = model.uploadpanelValue;
            List<FileClass> list = new List<FileClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileClass file = new FileClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }
            #endregion

            model.filelist = list;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.memberDeal(model);
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
        #endregion

        #region 行政科进行归档
        [HttpPost]
        public HttpResponseMessage xzkOnFile(Audit_project_wModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.xzkOnFile(model);
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
        #endregion

        #region 查看流程审批详情
        [HttpGet]
        public approvalDetail GetFlowDetail(string pviguid,int userid)
        {
            return bll.GetFlowDetail(pviguid,userid);
        }
        #endregion

        #region 获取处理时的流程信息
        [HttpGet]
        public approvalDetail GetOnDealDetail(string pviguid, int userid)
        {
            return bll.GetOnDealDetail(pviguid, userid);
        }
        #endregion

        /*手机端*/

        #region 手机端行政科派遣中队内勤
        [HttpPost]
        public object SmassignMidTeam(Audit_project_wModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            List<FileClass> list = new List<FileClass>();
            string OriginPath = ConfigManageClass.AdminApprovalOrignalPath;
            string smallPath = ConfigManageClass.AdminApprovalSmallPath;
            if (model.base64 != null)
            {
                for (int i = 0; i < model.base64.Length; i++)
                {
                    string imgArray = model.base64[i];
                    string[] spilt = imgArray.Split(',');
                    if (spilt.Length > 0)
                    {
                        byte[] imgByte = Convert.FromBase64String(spilt[1]);
                        FileClass imgFile = FileFactory.FileUpload(imgByte, ".jpg", OriginPath, smallPath, 100, 100);
                        list.Add(imgFile);
                    }
                }
            }
            model.filelist = list;
            int success = bll.assignMidTeam(model);
            if (success > 0)
            {
                return new
                {
                    success = true,
                    msg = "流程处理成功"
                };
                try
                {
                    #region 处理成功后发送短信
                    if (model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
                    {
                        UserBLL userbll = new UserBLL();
                        string phone = model.phone;
                        string[] numbers = phone.Split(',');
                        string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername + ")";
                        SMSMessagesBLL smsbll = new SMSMessagesBLL();
                        smsbll.SendMessage(numbers, msg);
                    }
                    #endregion
                }
                catch (Exception e)
                { 
                    //处理短信发送异常
                }
            }
            else
            {
                return new
                {
                    success = false,
                    msg = "流程派遣失败",
                };
            }
        }
        #endregion

        #region 手机端中队内勤派遣队员
        [HttpPost]
        public object SmassignTeamber(Audit_project_wModel model)
        {
            int success = bll.assignTeamber(model);
            if (success > 0)
            {
                return new
                {
                    success = true,
                    msg = "流程处理成功"
                };
                try
                {
                    #region 处理成功后发送短信
                    if (model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
                    {
                        UserBLL userbll = new UserBLL();
                        string phone = model.phone;
                        string[] numbers = phone.Split(',');
                        string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername + ")";
                        SMSMessagesBLL smsbll = new SMSMessagesBLL();
                        smsbll.SendMessage(numbers, msg);
                    }
                    #endregion
                }
                catch (Exception e)
                { 
                    //处理短信发送异常
                }
            }
            else
            {
                return new
                {
                    success = false,
                    msg = "流程派遣失败",
                };
            }
        }
        #endregion

        #region 手机端班组成员处理
        [HttpPost]
        public object SmmemberDeal(Audit_project_wModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            List<FileClass> list = new List<FileClass>();
            string OriginPath = ConfigManageClass.AdminApprovalOrignalPath;
            string smallPath = ConfigManageClass.AdminApprovalSmallPath;
            if (model.base64 != null)
            {
                for (int i = 0; i < model.base64.Length; i++)
                {
                    string imgArray = model.base64[i];
                    string[] spilt = imgArray.Split(',');
                    if (spilt.Length > 0)
                    {
                        byte[] imgByte = Convert.FromBase64String(spilt[1]);
                        FileClass imgFile = FileFactory.FileUpload(imgByte, ".jpg", OriginPath, smallPath, 100, 100);
                        list.Add(imgFile);
                    }
                }
            }
            model.filelist = list;
            int success = bll.memberDeal(model);
            if (success > 0)
            {
                return new
                {
                    success = true,
                    msg = "流程处理成功"
                };
            }
            else
            {
                return new
                {
                    success = false,
                    msg = "流程派遣失败",
                };
            }
        }
        #endregion

        #region 手机端行政科进行归档
        [HttpPost]
        public object SmxzkOnFile(Audit_project_wModel model)
        {
            int success = bll.xzkOnFile(model);
            if (success > 0)
            {
                return new
                {
                    success = true,
                    msg = "流程处理成功"
                };
            }
            else
            {
                return new
                {
                    success = false,
                    msg = "流程派遣失败",
                };
            }
        }
        #endregion

        #region 旧的流程派遣方式--暂时不用
        /// <summary>
        /// 流程派遣
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public int SmassignTeam(Audit_project_wModel model, List<FileClass> list)
        {
            int userid = Convert.ToInt32(model.createuserid);
            approvalDetail result = bll.GetApprovalDetail(model.syncrowguid);
            string[] wfdidlist = { "2017070414250001", "2017070414250002", "2017070414250003", "2017070414250004", "2017070414250005" };
            WorkFlowClass wf = new WorkFlowClass();
            wf.FunctionName = "audit_project_w";//行政审批表名
            wf.WFID = "2017070414220001";       //工作流程编号
            wf.WFDID = model.wfdid;      //工作详细编号
            if (result != null)
            {
                wf.WFSID = result.wfsid;
                wf.WFSAID = result.wfsaid;
            }
            wf.NextWFDID = model.nextwfdid;  //下一步流程详细编号
            wf.NextWFUSERIDS = model.nextuserid.ToString();   //下一步流程用户id
            wf.IsSendMsg = "false"; //是否发送短信
            wf.WFCreateUserID = model.createuserid; //当前流程创建人
            wf.DEALCONTENT = model.advice;  //处理意见
            wf.syncrowguid = model.syncrowguid;
            wf.Remark = model.geography;
            wf.files = list;
            if (wf.WFDID == wfdidlist[0])
            {
                wf.Remark = model.xzxkaddress;
                wf.satisfaction = model.xzxkstarttime;
                wf.processmode = model.xzxkendtime;
            }
            else if (wf.WFDID == wfdidlist[2])
            {
                wf.Remark = model.geography;
            }
            WorkFlowManagerBLL wfbll = new WorkFlowManagerBLL();
            string wf_id = wfbll.WF_Submit(wf, model);

            #region 发送短信
            int success = wf_id != null ? 1 : 0;
            if (wf.NextWFUSERIDS != null && model.isSendMsg == 1 && model.phone != null && model.phone.Length > 0)
            {
                UserBLL userbll = new UserBLL();
                string phone = model.phone;
                //phone="18768196242";
                string[] numbers = phone.Split(',');
                string msg = "您有一条新的行政审批数据需要处理，审批信息：" + model.projectname + "(" + model.applyername + ")";
                SMSMessagesBLL smsbll = new SMSMessagesBLL();
                smsbll.SendMessage(numbers, msg);
            }
            #endregion
            return success;
        }
        #endregion

        #region 获取当月行政审批全部列表
        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(string filter, int start, int limit)
        {

            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTheAllApprovalList(filters, start, limit);
        }

        [HttpGet]
        public Paging<List<Audit_project_wModel>> GetAllApprovalList(int start, int limit)
        {
            return bll.GetTheAllApprovalList(null, start, limit);
        }
        #endregion
    }
}