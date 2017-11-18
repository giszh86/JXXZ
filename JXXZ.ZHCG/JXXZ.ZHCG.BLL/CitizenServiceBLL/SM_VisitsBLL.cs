using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CitizenServiceBLL
{
   public class SM_VisitsBLL
    {
       private SM_VisitsDAL dal = new SM_VisitsDAL();

       /// <summary>
       /// 事件列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<SM_VisitsModel>> GetVisitsList(List<Filter> filters, int start, int limit)
       {
           Paging<List<SM_VisitsModel>> list = dal.GetVisitsList(filters, start, limit);

           return list;
       }

       public int AddVisits(SM_VisitsModel smmodel) {

           return dal.AddVisits(smmodel);
       }

       /// <summary>
       /// 列表
       /// </summary>
       /// <returns></returns>
       public List<SM_VisitsModel> GetVisitsListExcel(List<Filter> filters = null)
       {
           List<SM_VisitsModel> list = dal.GetVisitsListExcel(filters);

           return list;
       }

    }
}
