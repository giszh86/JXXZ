using JXXZ.ZHCG.BLL.IllegalConstructionBLL;
using JXXZ.ZHCG.DAL;
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
    public class DemolitionController : ApiController
    {
        private WJ_CqxmsBLL bll = new WJ_CqxmsBLL();

         /// <summary>
        /// 添加拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage AddCqxm(WJ_CqxmsModel model)
        {
            int success = bll.AddCqxm(model);

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
                wjfilemodel.source = 2;
                wjfilemodel.sourceid = success;
                wjfilemodel.filesize = item.size;
                filebll.AddCqxm(wjfilemodel);

            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 拆迁列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<WJ_CqxmsModel>> GetCqxmList(int start, int limit)
        {
            return bll.GetCqxmList(null, start, limit);
        }

        /// <summary>
        /// 拆迁列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<WJ_CqxmsModel>> GetCqxmList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetCqxmList(filters, start, limit);
        }

        //  /api/Demolition/GetCqxmModel?cqid=11
        /// <summary>
        /// 拆迁详情
        /// </summary>
        /// <param name="cqid"></param>
        /// <returns></returns>
        [HttpGet]
        public WJ_CqxmsModel GetCqxmModel(int cqid)
        {
            return bll.GetCqxmModel(cqid);
        }

        /// <summary>
        /// 修改拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage EditCqxm(WJ_CqxmsModel model)
        {
            int success = bll.EditCqxm(model);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }
    }
}