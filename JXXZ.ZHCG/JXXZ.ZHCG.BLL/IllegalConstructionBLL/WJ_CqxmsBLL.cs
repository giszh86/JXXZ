using JXXZ.ZHCG.DAL.IllegalConstructionDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.IllegalConstructionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.IllegalConstructionBLL
{
   public class WJ_CqxmsBLL
    {
       private WJ_CqxmsDAL dal = new WJ_CqxmsDAL();

        /// <summary>
        /// 添加拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int AddCqxm(WJ_CqxmsModel model)
       {
           return dal.AddCqxm(model);
       }
       /// <summary>
       /// 拆迁列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<WJ_CqxmsModel>> GetCqxmList(List<Filter> filters, int start, int limit)
       {
           List<WJ_CqxmsModel> items = dal.GetCqxmList(filters, start, limit).ToList();
           int total = dal.GetCqxmCount(filters);

           Paging<List<WJ_CqxmsModel>> paging = new Paging<List<WJ_CqxmsModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }
        /// <summary>
        /// 修改拆迁
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int EditCqxm(WJ_CqxmsModel model)
       {
           return dal.EditCqxm(model);
       }

         /// <summary>
        /// 拆迁详情
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
       public WJ_CqxmsModel GetCqxmModel(int cqid)
       {
           return dal.GetCqxmModel(cqid);
       }

    }
}
