using JXXZ.ZHCG.DAL;
using JXXZ.ZHCG.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL
{
   public class UnitTypeBLL
    {
        private UnitTypeDAL dal = new UnitTypeDAL();

        public List<UnitType> GetUnitTypes()
        {
            return dal.GetUnitTypes();
        }

        public Paging<List<UnitType>> GetUnitTypes(int start, int limit)
        {
            List<UnitType> items = dal.GetUnitTypes(start, limit);
            int total = dal.GetUnitTypeCount();

            Paging<List<UnitType>> paging = new Paging<List<UnitType>>();
            paging.Items = items;
            paging.Total = total;

            return paging;
        }

        public void AddUnitType(UnitType unitType)
        {
            dal.AddUnitType(unitType);
        }

        public void EditUnitType(UnitType unitType)
        {
            dal.EditUnitType(unitType);
        }

        public void DeleteUnitType(int id)
        {
            dal.DeleteUnitType(id);
        }
    }
}
