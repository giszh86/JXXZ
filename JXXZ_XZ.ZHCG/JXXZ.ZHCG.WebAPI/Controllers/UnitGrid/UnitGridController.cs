using JXXZ.ZHCG.BLL.UnitGridBLL;
using JXXZ.ZHCG.Model.UnitGridModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.UnitGrid
{
    public class UnitGridController : ApiController
    {
        private UnitGridBLL bll=new UnitGridBLL();
       [HttpGet]
        public List<typeModel> GetTypes()
        {
            return bll.GetTypes();
        }

        [HttpGet]
       public List<UnitGridModel> GetUnitGridModel(int typeid)
       {
           return bll.GetUnitGridModel(typeid);
       }

        [HttpGet]
        public UnitGridModel GetUnitGrid(int id)
        {
            return bll.GetUnitGrid(id);
        }

    }
}