using JXXZ.ZHCG.BLL.LowLyingBLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LowLyingModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LowLying
{
    public class LowLyingController : ApiController
    {
        private LowLyingBLL bll = new LowLyingBLL();

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<LowLyingModel>> GetLowLyinglist(int start, int limit)
        {
            return bll.GetLowLyinglist(null, start, limit);
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<LowLyingModel>> GetLowLyinglist(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetLowLyinglist(filters, start, limit);
        }

        /// <summary>
        /// 根据ID查看详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public LowLyingModel GetLowLyingModel(int id)
        {
            return bll.GetLowLyingModel(id);
        }

        /// <summary>
        /// 历史报警列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<LowLyingOldModel>> GetLowLyingCaveatList(int start, int limit, int id)
        {
            return bll.GetLowLyingCaveatList(id, start, limit);
        }

        /// <summary>
        /// 修改报警临界值
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bjljz"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage EditLowLying(int id, string bjljz)
        {
            int success = bll.EditLowLying(id, bjljz);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
            if (success > 0)
            {
                response.Content = new StringContent("{\"success\":true}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            else if (success == -1)
            {
                response.Content = new StringContent("{\"success\":false}", Encoding.GetEncoding("UTF-8"), "text/html");
            }
            return response;
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<LowLyingModel>> GetApiLowLyinglist(int start, int limit)
        {
            return bll.GetApiLowLyinglist(null, start, limit);
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<LowLyingModel>> GetApiLowLyinglist(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetApiLowLyinglist(filters, start, limit);
        }
    }
}