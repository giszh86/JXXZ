using JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
   public class Zfdx_DevicesBLL
    {
       private Zfdx_DevicesDAL dal=new Zfdx_DevicesDAL();
       /// <summary>
       /// 添加
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int AddStocks(Zfdx_DevicesModel model) {
           return dal.AddStocks(model);
       }
       /// <summary>
       /// 设备列表
       /// </summary>
       /// <param name="filters"></param>
       /// <param name="start"></param>
       /// <param name="limit"></param>
       /// <returns></returns>
       public Paging<List<Zfdx_DevicesModel>> GetStocksList(List<Filter> filters, int start, int limit)
       {
           List<Zfdx_DevicesModel> items = dal.GetStocksList(filters,start,limit);
           int tatal = dal.GetStocksCount(filters);
           Paging<List<Zfdx_DevicesModel>> paging = new Paging<List<Zfdx_DevicesModel>>();
           paging.Items = items;
           paging.Total = tatal;
           return paging;
       }
       /// <summary>
       /// 获取设备详情
       /// </summary>
       /// <param name="dedeviceid"></param>
       /// <returns></returns>
       public Zfdx_DevicesModel GetDevicesModel(int deviceid)
       {
           return dal.GetDevicesModel(deviceid);
       }
       /// <summary>
       /// 修改
       /// </summary>
       /// <param name="model"></param>
       /// <returns></returns>
       public int EditStocks(Zfdx_DevicesModel model)
       {
           return dal.EditStocks(model);
       }

        #region 报表导出
       public List<Zfdx_DevicesModel> GetDevicesListExcel(List<Filter> filters = null)
       {
           return dal.GetDevicesListExcel(filters);
       }
        #endregion
    }
}
