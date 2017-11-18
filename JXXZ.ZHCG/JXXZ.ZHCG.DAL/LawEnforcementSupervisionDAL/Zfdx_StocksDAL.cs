using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL
{
    public class Zfdx_StocksDAL
    {
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddZfdxStocks(Zfdx_StocksModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_stocks newmodel = new zfdx_stocks();
                newmodel.deviceid = model.deviceid;
                newmodel.stockid = model.stockid;
                newmodel.stocknum = model.stocknum;
                newmodel.devicesum = model.devicesum;
                db.zfdx_stocks.Add(newmodel);
                db.SaveChanges();
                return newmodel.deviceid;
            }
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int EditZfdxStocks(Zfdx_StocksModel model)
        {
            using (Entities db = new Entities())
            {
                zfdx_stocks newmodel = db.zfdx_stocks.FirstOrDefault(a => a.deviceid == model.deviceid);
                if (newmodel != null)
                {
                    //newmodel.stockid = model.stockid;
                    newmodel.stocknum = newmodel.stocknum + model.stocknum;
                    newmodel.devicesum = newmodel.devicesum + model.devicesum;
                }
                else
                {
                    AddZfdxStocks(model);
                }
                return db.SaveChanges();
            }
        }

    }
}
