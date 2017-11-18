using JXXZ.ZHCG.DAL.LegalCaseDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.LegalCaseModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JXXZ.ZHCG.WebAPI.Controllers.LegalCase
{
    public class FreeDiscretionController : ApiController
    {
        FreeDiscretionBLL bll = new FreeDiscretionBLL();

        #region 获取自由裁量列表
        [HttpGet]
        public Paging<List<InheritCaseSourceModel>> GetFreeDiscretionList(int start, int limit, string filter)
        {
            List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(filter);
            return bll.GetFreeDiscretionList(filters, start, limit);
        }

        [HttpGet]
        public Paging<List<InheritCaseSourceModel>> GetFreeDiscretionList(int start, int limit)
        {
            return bll.GetFreeDiscretionList(null, start, limit);
        }
        #endregion
    }
}
