using JXXZ.ZHCG.DAL.CitizenServiceDAL;
using JXXZ.ZHCG.Model.CitizenServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CitizenServiceBLL
{
   public  class SM_SourcesBLL
    {
       private SM_SourcesDAL dal = new SM_SourcesDAL();

        /// <summary>
       /// 市民服务事件来源
       /// </summary>
       /// <returns></returns>
       public List<SM_SourcesModel> GetSourcesTypes()
       {
           return dal.GetSourcesTypes();
       }
    }
}
