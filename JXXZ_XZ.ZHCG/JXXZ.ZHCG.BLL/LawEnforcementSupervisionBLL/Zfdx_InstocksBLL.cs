using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using JXXZ.ZHCG.DAL.lawenforcementsupervisionDAL;


namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
   public class Zfdx_InstocksBLL
    {
       private Zfdx_InstocksDAL dal = new Zfdx_InstocksDAL();
       /// <summary>
       /// 添加设备入库
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int AddInstocks(Zfdx_InstocksModel model)
       {
           return dal.AddInstocks(model);
       }
       /// <summary>
       /// 设备入库列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Zfdx_InstocksModel>> GetinstockList(List<Filter> filters, int start, int limit,int deviceid)
       {
           List<Zfdx_InstocksModel> items = dal.GetinstockList(filters, start,limit,deviceid);
           int total = dal.GetinstockCount(filters, deviceid);
           Paging<List<Zfdx_InstocksModel>> paging = new Paging<List<Zfdx_InstocksModel>>();
           paging.Items = items;
           paging.Total = total;
           return paging;
       }
    }
}
