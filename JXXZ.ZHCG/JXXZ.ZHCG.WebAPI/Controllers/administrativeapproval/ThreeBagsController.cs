using JXXZ.ZHCG.BLL.administrativeapprovalBLL;
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
    public class ThreeBagsController : ApiController
    {
        ThreeBagsBLL bll = new ThreeBagsBLL();


        #region 信息列表
        /// <summary>
        /// 信息列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<TreeBagsModel>> GetSourcesList(int start, int limit)
        {
            ThreeBagsBLL bll = new ThreeBagsBLL();
            return bll.GetSourcesList(null, start, limit);
        }
        #endregion

        #region 信息列表
        /// <summary>
        /// 信息列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<TreeBagsModel>> GetSourcesList(string filter, int start, int limit)
        {
            ThreeBagsBLL bll = new ThreeBagsBLL();
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetSourcesList(filters, start, limit);
        }
        #endregion

        #region 获取行政许可详情
        /// <summary>
        /// 获取行政许可详情
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        [HttpGet]
        public TreeBagsModel GetThreeBagsInfo(int storeid)
        {
            return bll.GetThreeBagsInfo(storeid);
        }
        #endregion

        #region 添加门前三包信息
        /// <summary>
        /// 添加门前三包信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddThreeBagsInf(TreeBagsModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
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

            if (!string.IsNullOrEmpty(request.Form["userid"]))
                model.createuserid = Convert.ToInt32(request.Form["userid"]);

            int success = bll.AddThreeBagsInf(model, list);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 删除门前三包信息
        /// <summary> 
        /// 删除门前三包信息
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        [HttpPost]
        public int DeleteThreeBagsInf(int storeid)
        {
            return bll.DeleteThreeBagsInf(storeid);
        }
        #endregion

        #region 修改门前三包信息
        /// <summary>
        /// 修改门前三包信息
        /// </summary>
        /// <param name="carid"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditThreeBagsInf(TreeBagsModel model)
        {
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;

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


            int success = bll.EditThreeBagsInf(model, list);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
        #endregion

        #region 手机API

        #region 添加门前三包信息
        /// <summary>
        /// 手机上报门前三包信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public object SmAddThreeBagsInf(TreeBagsModel model)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            HttpRequestBase request = ((HttpContextWrapper)this.Request.Properties["MS_HttpContext"]).Request;
            //文件上传
            List<FileClass> list = new List<FileClass>();
            string OriginPath = ConfigManageClass.ThreeBagsOrignalPath;
            string smallPath = ConfigManageClass.ThreeBagsSmallPath;
            try
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
            catch (Exception e)
            {
                var error = e.Message;
                response.Content = new StringContent("{\"failure\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            int success = bll.AddThreeBagsInf(model, list);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");

                //return new { 
                //    success=true
                //};
            }
            return response;
        }
        #endregion

        #endregion
    }
}