using JXXZ.ZHCG.DAL.UnitGridDAL;
using JXXZ.ZHCG.Model.UnitGridModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.BLL.UnitGridBLL
{
   public class UnitGridBLL
    {
       private UnitGridDAL dal=new UnitGridDAL();
       public List<typeModel> GetTypes()
       {
           return dal.GetTypes();
       }

       public List<UnitGridModel> GetUnitGridModel(int typeid)
       {
           return dal.GetUnitGridModel(typeid);
       }

       public UnitGridModel GetUnitGrid(int id)
       {
           return dal.GetUnitGrid(id);
       }

    }
}
