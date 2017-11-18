using JXXZ.ZHCG.BLL.administrativeapprovalBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
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
using System.Threading;
using System.Web;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.administrativeapproval
{
    /// <summary>
    /// 行政许可
    /// </summary>
    public class LicenseController : ApiController
    {
        LicenseBLL bll = new LicenseBLL();

        #region 行政许可待审批列表
        /// <summary>
        /// 行政许可待审批列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetPendingCaseSourcesList(int start, int limit, int userid)
        {
            LicenseBLL bll = new LicenseBLL();
            return bll.GetPendingCaseSourcesList(null, start, limit,userid);
        }
        #endregion

        #region 行政许可待审批列表
        /// <summary>
        /// 行政许可待审批列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetPendingCaseSourcesList(string filter, int start, int limit, int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            LicenseBLL bll = new LicenseBLL();
            return bll.GetPendingCaseSourcesList(filters, start, limit, userid);
        }
        #endregion

        #region 行政许可已审批列表
        /// <summary>
        /// 行政许可已审批列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetFinishCaseSourcesList(int start, int limit, int userid)
        {
            LicenseBLL bll = new LicenseBLL();
            return bll.GetFinishCaseSourcesList(null, start, limit, userid);
        }
        #endregion

        #region 行政许可已审批列表
        /// <summary>
        /// 行政许可已审批列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetFinishCaseSourcesList(string filter, int start, int limit,int userid)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            LicenseBLL bll = new LicenseBLL();
            return bll.GetFinishCaseSourcesList(filters, start, limit, userid);
        }
        #endregion

        #region 行政许可审批全部列表
        /// <summary>
        /// 行政许可审批全部列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetAllCaseSourcesList(int start, int limit)
        {
            LicenseBLL bll = new LicenseBLL();
            return bll.GetAllCaseSourcesList(null, start, limit);
        }
        #endregion

        #region 行政许可审批全部列表
        /// <summary>
        /// 行政许可审批全部列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Pag<LicenseModel> GetAllCaseSourcesList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetAllCaseSourcesList(filters, start, limit);
        }

        #endregion

        #region 获取行政许可详情
        /// <summary>
        /// 获取行政许可详情
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        [HttpGet]
        public LicenseModel GetApprovalInfo(int licensingid)
        {
            return bll.GetApprovalInfo(licensingid);
        }
        #endregion

        #region 提交审批处理意见
        /// <summary>
        /// 提交审批处理意见
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddDealAdvice(LicenseModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            int success = bll.AddDealAdvice(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 添加审批信息
        /// <summary>
        /// 添加审批信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddApproveInf(LicenseModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
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

            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);

            int success = bll.AddApproveInf(model, list);
            if (success > 0)
            {
                #region 添加日志
                SystemLogBLL slbll = new SystemLogBLL();
                slbll.WriteSystemLog("行政许可", "", Convert.ToInt32(request.Form["userid"]));
                #endregion

                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 修改行政许可
        /// <summary>
        /// 修改行政许可
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage ModifyApproveInf(LicenseModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            string[] fileClass = model.uploadpanelValue;
            List<FileUploadClass> list = new List<FileUploadClass>();
            if (fileClass != null && fileClass.Length > 0)
            {
                foreach (var item in fileClass)
                {
                    FileUploadClass file = new FileUploadClass();
                    JObject jo = new JObject();
                    jo = (JObject)JsonConvert.DeserializeObject(item);
                    file.OriginalPath = jo["OriginalPath"] == null ? "" : jo["OriginalPath"].ToString();
                    file.OriginalName = jo["OriginalName"] == null ? "" : jo["OriginalName"].ToString();
                    file.OriginalType = jo["OriginalType"] == null ? "" : jo["OriginalType"].ToString();
                    file.size = jo["size"] == null ? 0 : (double)jo["size"];
                    list.Add(file);
                }
            }
            int success = bll.ModifyApproveInf(model);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 获取审批类型
        /// <summary>
        /// 获取审批类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<LicenseModel> GetApproveType()
        {
            return null;
        }
        #endregion

        #region 获取证件类型
        /// <summary>
        /// 获取证件类型
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<LicenseModel> GetCertType()
        {
            return null;
        }
        #endregion

        #region 手机上报
        /// <summary>
        /// 手机添加信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object SmAddApproveInf(LicenseModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            List<FileClass> list = new List<FileClass>();
            string OriginPath = ConfigManageClass.ApprovalOrignalPath;
            string smallPath = ConfigManageClass.ApprovalSmallPath;
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
            int success = bll.SmAddApproveInf(model, list);
            if (success > 0)
            {
                return new
                {
                    success = true
                };
            }
            else { 
                return new {
                    success=false
                };
            }
        }
        #endregion

        
    }
}