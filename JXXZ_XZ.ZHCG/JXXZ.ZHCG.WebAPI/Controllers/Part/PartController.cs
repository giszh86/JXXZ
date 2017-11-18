using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using JXXZ.ZHCG.BLL.PartBLL;
using JXXZ.ZHCG.Model.PartModel;
using JXXZ.ZHCG.Model;
using Newtonsoft.Json;
using JXXZ.ZHCG.DAL;

namespace JXXZ.ZHCG.WebAPI.Controllers.Part
{
    public class PartController : ApiController
    {
        //  /api/Part/GetPartList?start=0&limit=10
        /// <summary>
        /// 获取部件列表
        /// </summary>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<partBriefModel>> GetPartList(int start, int limit)
        {
            PartBLL partBll = new PartBLL();
            Paging<List<partBriefModel>> list = partBll.GetPartList(null,start, limit);
            return list;
        }
        /// <summary>
        /// 获取部件列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Paging<List<partBriefModel>> GetPartList(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            PartBLL partBll = new PartBLL();
            Paging<List<partBriefModel>> list = partBll.GetPartList(filters, start, limit);
            return list;
        }

        //  /api/Part/GetPartDetail?id=1
        /// <summary>
        /// 获取部件详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public PartModel GetPartDetail(int id)
        {
            PartBLL partBll = new PartBLL();
            PartModel detail = partBll.GetPartDetail(id);
            return detail;
        }

        //  /api/Part/GetPartDetailCode?objcode=3304110405901634
        /// <summary>
        /// 根据标识码获取详情
        /// </summary>
        /// <param name="objcode"></param>
        /// <returns></returns>
        public bj_part GetPartDetailCode(string objcode)
        {
            PartBLL partBll = new PartBLL();
            return partBll.GetPartDetailCode(objcode);
        }

    }
}