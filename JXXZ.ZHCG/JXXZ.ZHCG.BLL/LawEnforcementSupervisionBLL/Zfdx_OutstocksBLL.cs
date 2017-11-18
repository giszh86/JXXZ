using JXXZ.ZHCG.DAL.lawenforcementsupervisionDAL;
using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.lawenforcementsupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
    public class Zfdx_OutstocksBLL
    {
        private Zfdx_OutstocksDAL dal = new Zfdx_OutstocksDAL();
        /// <summary>
        /// 出库设备
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddOutstocks(Zfdx_OutstocksModel model) {

            return dal.AddOutstocks(model);
        }
        /// <summary>
        /// 出库设备列表
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="start"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public Paging<List<Zfdx_OutstocksModel>> GetOutstocksList(List<Filter>filters,int start,int limit,int deviceid) {

            List<Zfdx_OutstocksModel> items = dal.GetOutstocksList(filters, start, limit,deviceid);
            int total = dal.GetOutstocksCount(filters, deviceid);
            Paging<List<Zfdx_OutstocksModel>> paging = new Paging<List<Zfdx_OutstocksModel>>();
            paging.Items = items;
            paging.Total = total;
            return paging;
        }
    }
}
