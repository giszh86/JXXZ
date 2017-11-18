using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using JXXZ.ZHCG.Model.LegalCaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LegalCaseDAL
{
    /// <summary>
    /// 自由裁量
    /// </summary>
    public class FreeDiscretionBLL
    {
        FreeDiscretionDAL dal = new FreeDiscretionDAL();
        #region 获取自由裁量列表
        public Paging<List<InheritCaseSourceModel>> GetFreeDiscretionList(List<Filter> filters, int start, int limit)
        {
            return dal.GetFreeDiscretionList(filters, start, limit);
        }
        #endregion


        public InheritCaseSourceModel GetFreeDiscretionModel(string powerid)
        {
            return dal.GetFreeDiscretionModel(powerid);
        }
    }
}
