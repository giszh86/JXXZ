using JXXZ.ZHCG.DAL.CaseWorkFlowManagerDAL;
using JXXZ.ZHCG.Model.CaseWorkFlowManagerModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.CaseWorkFlowManagerBLL
{
   public class Case_ZdBLL
    {
       private Case_ZdDAL dal = new Case_ZdDAL();

       /// <summary>
        /// 获取类型
        /// </summary>
        /// <param name="zd_type">字典类型</param>
        /// <param name="zd_id">字典编号</param>
        /// <returns></returns>
       public List<Case_ZdModel> GetZdList(string zd_type)
       {
           return dal.GetZdList(zd_type);
       }

         /// <summary>
        /// 获取子数据
        /// </summary>
        /// <param name="zd_type"></param>
        /// <param name="zd_id"></param>
        /// <returns></returns>
       public List<Case_ZdModel> GetZdListChild(string zd_type, string zd_id) {
           return dal.GetZdListChild(zd_type, zd_id);
       }
    }
}
