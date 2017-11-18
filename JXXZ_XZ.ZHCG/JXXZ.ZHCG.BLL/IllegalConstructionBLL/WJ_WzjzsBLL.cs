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
   public class WJ_WzjzsBLL
    {
       private WJ_WzjzsDAL dal = new WJ_WzjzsDAL();

       /// <summary>
       /// 违建列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<WJ_WzjzsModel>> GetwzjzList(List<Filter> filters, int start, int limit)
       {
           List<WJ_WzjzsModel> items = dal.GetwzjzList(filters, start, limit).ToList();
           int total = dal.GetwzjzCount(filters);

           Paging<List<WJ_WzjzsModel>> paging = new Paging<List<WJ_WzjzsModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }
        /// <summary>
        /// 添加违建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       public int AddWzjzs(WJ_WzjzsModel model)
       {
           return dal.AddWzjzs(model);
       }

       /// <summary>
       /// 违建历史列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<WJ_WzjzsModel>> GetOldWzjzList(List<Filter> filters, int start, int limit, int parentid)
       {
           List<WJ_WzjzsModel> items = dal.GetOldWzjzList(filters, start, limit, parentid).ToList();
           int total = dal.GetOldWzjzCount(filters, parentid);

           Paging<List<WJ_WzjzsModel>> paging = new Paging<List<WJ_WzjzsModel>>();
           paging.Items = items;
           paging.Total = total;

           return paging;
       }


         /// <summary>
        /// 获取违建详情
        /// </summary>
        /// <param name="wjid"></param>
        /// <returns></returns>
       public WJ_WzjzsModel GetWzjzModel(int wjid)
       {
           return dal.GetWzjzModel(wjid);
       }


       /// <summary>
       /// 删除违章建筑
       /// </summary>
       /// <param name="wjid"></param>
       /// <returns></returns>
       public int DeleteWzjz(int wjid) {
           return dal.DeleteWzjz(wjid);
       }
    }
}
