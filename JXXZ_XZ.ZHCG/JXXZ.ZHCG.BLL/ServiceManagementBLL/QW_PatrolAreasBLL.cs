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
   public class QW_PatrolAreasBLL
    {
       private QW_PatrolAreasDAL dal = new QW_PatrolAreasDAL();

         /// <summary>
        /// 添加巡查区域
        /// </summary>
        /// <param name="model"></param>
       public void AddPatrolAreas(QW_PatrolAreasModel model)
       {
            dal.AddPatrolAreas(model);
       }
       /// <summary>
       /// 列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<QW_PatrolAreasModel>> GetPatrolAreasList(List<Filter> filters, int start, int limit)
       {

           //List<QW_PatrolAreasModel> items = dal.GetPatrolAreasList(filters, start, limit).ToList();
           //int total = dal.GetPatrolAreasCount(filters);

           //Paging<List<QW_PatrolAreasModel>> paging = new Paging<List<QW_PatrolAreasModel>>();
           //paging.Items = items;
           //paging.Total = total;

           return dal.GetPatrolAreasList(filters, start, limit);
       }
         /// <summary>
        /// 删除巡查区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
       public int DeletePatrolAreas(int patrolid)
       {
           return dal.DeletePatrolAreas(patrolid);
       }

       
       public List<QW_PatrolAreasModel> GetPatrolAreasCom(int sszd, int ssbc)
       {
           return dal.GetPatrolAreasCom(sszd, ssbc);
       }

         /// <summary>
        /// 修改巡查区域
        /// </summary>
        /// <param name="patrolid"></param>
        /// <returns></returns>
       public int EditPatrolAreas(QW_PatrolAreasModel model)
       {
           return dal.EditPatrolAreas(model);
       }
    }
}
