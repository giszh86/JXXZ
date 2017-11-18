using JXXZ.ZHCG.BLL.IllegalConstructionBLL;
using JXXZ.ZHCG.BLL.SystemBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using JXXZ.ZHCG.Model.WorkFlowManagerModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.IllegalConstruction
{
    public class IllegallyBuiltController : ApiController
    {
        private WJ_WzjzsBLL bll = new WJ_WzjzsBLL();

        /// <summary>
        /// 添加违建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddWzjzs(WJ_WzjzsModel model)
        {
            int id = bll.AddWzjzs(model);
            model.parentid = id;
            int success = bll.AddWzjzs(model);

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
            WJ_FilesBLL filebll = new WJ_FilesBLL();
            foreach (var item in list)
            {
                WJ_FilesModel wjfilemodel = new WJ_FilesModel();
                wjfilemodel.filetype = item.OriginalType;
                wjfilemodel.filename = item.OriginalName;
                wjfilemodel.filepath = item.OriginalPath;
                wjfilemodel.source = 1;
                wjfilemodel.sourceid = success;
                wjfilemodel.filesize = item.size;
                filebll.AddCqxm(wjfilemodel);

            }
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                #region 添加日志
                SystemLogBLL slbll = new SystemLogBLL();
                slbll.WriteSystemLog("违建管理", "",(int)model.createuserid);
                #endregion

                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 违建列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<WJ_WzjzsModel>> GetwzjzList(int start, int limit)
        {
            return bll.GetwzjzList(null, start, limit);
        }

        /// <summary>
        /// 违建列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<WJ_WzjzsModel>> GetwzjzList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetwzjzList(filters, start, limit);
        }


        /// <summary>
        /// 违建列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<WJ_WzjzsModel>> GetOldWzjzList(int start, int limit, int parentid)
        {
            return bll.GetOldWzjzList(null, start, limit, parentid);
        }

        ///// <summary>
        ///// 违建列表
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet]
        //public Paging<List<WJ_WzjzsModel>> GetOldWzjzList(string filter, int start, int limit, int parentid)
        //{
        //    List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
        //    return bll.GetOldWzjzList(filters, start, limit, parentid);
        //}

        ///  /api/IllegallyBuilt/GetWzjzModel?wjid=20
        /// <summary>
        /// 获取违建详情
        /// </summary>
        /// <param name="wjid"></param>
        /// <returns></returns>
        [HttpGet]
        public WJ_WzjzsModel GetWzjzModel(int wjid)
        {
            return bll.GetWzjzModel(wjid);
        }

        /// <summary>
        /// 修改违建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditCqxm(WJ_WzjzsModel model)
        {
            int success = bll.AddWzjzs(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }



        /// <summary>
        /// 删除违建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage DeleteWzjz(int wjid)
        {
            int success = bll.DeleteWzjz(wjid);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

    }
}