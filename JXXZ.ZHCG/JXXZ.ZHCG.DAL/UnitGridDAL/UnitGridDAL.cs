using JXXZ.ZHCG.Model.UnitGridModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.UnitGridDAL
{
    public class UnitGridDAL
    {
        public List<typeModel> GetTypes()
        {
            List<typeModel> list = new List<typeModel>();
            using (Entities db = new Entities())
            {

                IQueryable<typeModel> queryable = from a in db.wg_type
                                                  select new typeModel
                                                  {
                                                      id = a.id,
                                                      name = a.name
                                                  };
                list = queryable.ToList();

            }
            return list;
        }

        public List<UnitGridModel> GetUnitGridModel(int typeid)
        {
            List<UnitGridModel> list = new List<UnitGridModel>();
            using (Entities db = new Entities())
            {
                IQueryable<UnitGridModel> queryable = from a in db.wg_unitgrid
                                                      join b_join in db.wg_type on a.typeid equals b_join.id into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      where a.typeid==typeid
                                                      select new UnitGridModel
                                                  {
                                                      id=a.id,
                                                      typeid=a.typeid,
                                                      typename=b.name,
                                                      grometry=a.grometry,
                                                      remarks1=a.remarks1,
                                                      gridname=a.remarks2,
                                                      colour=a.remarks3
                                                  };
                list = queryable.ToList();
            }
            return list;
        }

        public UnitGridModel GetUnitGrid(int id)
        {
            UnitGridModel model = new UnitGridModel();
            using (Entities db = new Entities())
            {
                IQueryable<UnitGridModel> queryable = from a in db.wg_unitgrid
                                                      join b_join in db.wg_type on a.typeid equals b_join.id into btmp
                                                      from b in btmp.DefaultIfEmpty()
                                                      where a.id == id
                                                      select new UnitGridModel
                                                      {
                                                          id = a.id,
                                                          typeid = a.typeid,
                                                          typename = b.name,
                                                          grometry = a.grometry,
                                                          remarks1 = a.remarks1,
                                                          gridname = a.remarks2,
                                                          colour=a.remarks3
                                                      };
                model = queryable.FirstOrDefault();
            }
            return model;
        }

    }
}
