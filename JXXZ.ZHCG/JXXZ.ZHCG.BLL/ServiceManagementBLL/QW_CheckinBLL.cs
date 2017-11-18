using JXXZ.ZHCG.DAL.ServiceManagementDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.ServiceManagementModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.ServiceManagementBLL
{
    public class QW_CheckinBLL
    {
        private QW_CheckinDAL dal = new QW_CheckinDAL();

        /// <summary>
        /// 签到管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_CheckinModel>> GetCheckinList(List<Filter> filters, int start, int limit) {
            Paging<List<QW_CheckinModel>> paging = dal.GetCheckinList(filters, start, limit);
            return paging;
        }

        
        /// <summary>
        /// 签到管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public List<QW_CheckinModel> GetCheckinExportExcel(List<Filter> filters)
        {
            return dal.GetCheckinExportExcel(filters);
        }
    }
}
