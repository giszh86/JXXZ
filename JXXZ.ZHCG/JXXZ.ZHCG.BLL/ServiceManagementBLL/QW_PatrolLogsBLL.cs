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
    public class QW_PatrolLogsBLL
    {
        private QW_PatrolLogsDAL dal = new QW_PatrolLogsDAL();

        /// <summary>
        /// 添加巡查日志管理
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddPatrolLogs(QW_PatrolLogModel model)
        {
            return dal.AddPatrolLogs(model);
        }
        /// <summary>
        /// 巡查日志管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_PatrolLogModel>> GetPatrolLogsList(List<Filter> filters, int start, int limit)
        {
            //List<QW_PatrolLogModel> items = dal.GetPatrolLogsList(filters, start, limit);
            //int total = dal.GetPatrolLogsCount(filters);
            //Paging<List<QW_PatrolLogModel>> paging = new Paging<List<QW_PatrolLogModel>>();
            //paging.Items = items;
            //paging.Total = total;
            return dal.GetPatrolLogsList(filters, start, limit);
        }



        /// <summary>
        /// 巡查日志管理列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<QW_PatrolLogModel>> GetApiPatrolLogsList(List<Filter> filters, int start, int limit, int userid)
        {
            List<QW_PatrolLogModel> items = dal.GetApiPatrolLogsList(filters, start, limit, userid);
            int total = dal.GetApiPatrolLogsCount(filters, userid);
            Paging<List<QW_PatrolLogModel>> paging = new Paging<List<QW_PatrolLogModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }

        /// <summary>
        /// 根据id获取详情
        /// </summary>
        /// <param name="logid"></param>
        /// <returns></returns>
        public QW_PatrolLogModel GetPatrolLogModel(int logid)
        {
            return dal.GetPatrolLogModel(logid);
        }
    }
}
