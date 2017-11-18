using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.DAL.LawEnforcementSupervisionDAL;
using JXXZ.ZHCG.Model.LawEnforcementSupervisionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.LawEnforcementSupervisionBLL
{
    public class Zfdx_StocksBLL
    {
        private Zfdx_StocksDAL dal = new Zfdx_StocksDAL();
        //增加
        public int AddZfdxStocks(Zfdx_StocksModel model)
        {
            return dal.AddZfdxStocks(model);
        }
        //更新
        public int EditZfdxStocks(Zfdx_StocksModel model)
        {
            return dal.EditZfdxStocks(model);
        }
    }
}
