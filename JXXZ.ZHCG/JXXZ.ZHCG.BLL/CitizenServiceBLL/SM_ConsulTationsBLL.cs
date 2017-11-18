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
   public class SM_ConsulTationsBLL
    {
        private SM_ConsulTationsDAL dal = new SM_ConsulTationsDAL();

       /// <summary>
        /// 列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<SM_ConsulTationsModel>> GetConsulTationsList(List<Filter> filters, int start, int limit)
        {

            List<SM_ConsulTationsModel> items = dal.GetConsulTationsList(filters, start, limit).ToList();
            int total = dal.GetConsulTationsCount(filters);

            Paging<List<SM_ConsulTationsModel>> paging = new Paging<List<SM_ConsulTationsModel>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }


        public int AddConsulTations(SM_ConsulTationsModel smmodel)
        {
            return dal.AddConsulTations(smmodel);
        
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        public List<SM_ConsulTationsModel> GetConsulTationsListExcel(List<Filter> filters = null)
        {
            List<SM_ConsulTationsModel> list = dal.GetConsulTationsListExcel(filters);

            return list;
        }
    }
}
