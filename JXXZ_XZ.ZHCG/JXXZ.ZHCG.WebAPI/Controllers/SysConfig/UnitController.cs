using JXXZ.ZHCG.BLL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.WebAPI.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers
{
      [LoggingFilter]
    public class UnitController : ApiController
    {
        private UnitBLL bll = new UnitBLL();

        [HttpGet]
        public List<TreeUnit> GetTreeUnits()
        {
            return bll.GetTreeUnits(null);
        }

        [HttpGet]
        public List<TreeUnit> GetTreeUnits(string filter)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetTreeUnits(filters);
        }

        [HttpGet]
        public List<TreeUnit> GetCurrentTreeUnits(int unitID)
        {
            return bll.GetCurrentTreeUnits(unitID);
        }

        [HttpGet]
        public Paging<List<Unit>> GetUnits(int start, int limit)
        {
            return bll.GetUnits(null, start, limit);
        }

        [HttpGet]
        public Paging<List<Unit>> GetUnits(string filter, int start, int limit)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetUnits(filters, start, limit);
        }

        [HttpGet]
        public List<UnitType> GetUnitTypes()
        {
            return bll.GetUnitTypes();
        }

        [HttpPost]
        public HttpResponseMessage AddUnit(Unit unit)
        {
            bll.AddUnit(unit);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage EditUnit(Unit unit)
        {
            bll.EditUnit(unit);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage DeleteUnit(int id)
        {
            int result = bll.DeleteUnit(id);

            HttpResponseMessage response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(result.ToString())
            };
            return response;
        }

        public List<Unit> GetUnits()
        {
            return bll.GetUnits();
        }

        /// <summary>
        /// 根据部门类型获取部门
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        [HttpGet]
        public List<Unit> GetUnitsSquadron(int unittypeid, int? unittypeid2 = null)
        {
            return bll.GetUnitsSquadron(unittypeid, unittypeid2);
        }

        /// <summary>
        /// 根据部门类型获取班组
        /// </summary>
        /// <param name="unittypeid">单位类型标识</param>
        /// <returns></returns>
        [HttpGet]
        public List<Unit> GetUnitsChild(int parentid)
        {
            return bll.GetUnitsChild(parentid);
        }
          [HttpGet]
        public string GetUnitName(string longUnitid)
        {
            return bll.GetUnitName(longUnitid);
        }

    }
}