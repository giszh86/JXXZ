using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.CitizenServiceDAL
{
   public class SM_SourcesDAL
    {

       /// <summary>
       /// 市民服务事件来源
       /// </summary>
       /// <returns></returns>
       public List<SM_SourcesModel> GetSourcesTypes()
       {
           List<SM_SourcesModel> list = new List<SM_SourcesModel>();

           using (Entities db = new Entities())
           {
               IQueryable<SM_SourcesModel> queryable =
                   db.sm_sources
                   .Select(t => new SM_SourcesModel()
                   {
                       ID = t.sourceid,
                       Name = t.name
                   });

               list = queryable.ToList();
           }

           return list;
       }


    }
}
