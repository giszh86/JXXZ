using JXXZ.ZHCG.Model;
using JXXZ.ZHCG.Model.MonitorModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.DAL.MonitorDAL
{
    public class FI_Camera_UnitsDAL
    {
        public List<FI_CameraUnitsTreeModel> GetTreeMonitor(List<Filter> filters)
        {
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            using (Entities db = new Entities())
            {
                IQueryable<FI_CameraUnitsTreeModel> queryable =
                     from b in db.fi_camera_units
                     where b.parentid == null
                     orderby b.seq descending
                     select new FI_CameraUnitsTreeModel()
                     {

                         text = b.unitname,
                         parentid = b.parentid,
                         id = b.unitid,
                         path = b.path,
                     };

                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    queryable = queryable.Where(t => t.text.Contains(value));
                                }
                                break;
                        };
                    }
                }

                list = queryable.ToList();
            }

            return list;
        }

        //public List<FI_CameraUnitsTreeModel> GetTreeMonitor()
        //{
        //    List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

        //    using (Entities db = new Entities())
        //    {
        //        IQueryable<FI_CameraUnitsTreeModel> queryable =
        //             from b in db.fi_camera_units
        //             where b.parentid==null
        //             orderby b.seq descending
        //             select new FI_CameraUnitsTreeModel()
        //             {

        //                 text = b.unitname,
        //                 parentid = b.parentid,
        //                 id = b.unitid,
        //                 path=b.path,
        //             };
        //        list = queryable.ToList();
        //    }

        //    return list;
        //}


        public List<FI_CameraUnitsTreeModel> GetTreeMonitorChildren(List<Filter> filters)
        {
            List<FI_CameraUnitsTreeModel> list = new List<FI_CameraUnitsTreeModel>();

            using (Entities db = new Entities())
            {
                IQueryable<FI_CameraUnitsTreeModel> queryable =
                     from b in db.fi_camera_units
                     where b.parentid != null
                     orderby b.seq descending
                     select new FI_CameraUnitsTreeModel()
                     {

                         text = b.unitname,
                         parentid = b.parentid,
                         id = b.unitid,
                         path = b.path,
                     };
                list = queryable.ToList();
                if (filters != null && filters.Count > 0)
                {
                    foreach (Filter filter in filters)
                    {
                        string value = filter.value;
                        switch (filter.property)
                        {
                            case "unitname":
                                if (!string.IsNullOrEmpty(value))
                                {
                                    list = GetUnitids(value, queryable);
                                }
                                break;
                        };
                    }
                }
            }
            return list;
        }

        #region  根据筛选条件判断当前节点的父节点是否是根节点
        /// <summary>
        /// 根据筛选条件判断当前节点的父节点是否是根节点
        /// </summary>
        /// <param name="unitname"></param>
        /// <returns></returns>
        public List<FI_CameraUnitsTreeModel> GetUnitids(string unitname, IQueryable<FI_CameraUnitsTreeModel> queryable)
        {
            using (Entities db = new Entities())
            {
                //没想出来更好的方法了，勉强行之
                List<FI_CameraUnitsTreeModel> tmpquery = queryable.Where(t => t.text.Contains(unitname)).ToList();
                StringBuilder str = new StringBuilder();
                foreach (FI_CameraUnitsTreeModel model in tmpquery)
                {
                    //string parentid = db.fi_camera_units.FirstOrDefault(t => t.unitid == model.parentid).parentid;
                    str.Append("'" + model.parentid + "',");
                }
                str.Remove(str.Length - 1, 1);
                string sql = string.Format(@"select a.unitid id,a.unitname text,a.parentid parentid,a.path path
from fi_camera_units a
where a.parentid is not null and a.unitname like '%{0}%'
union 
select b.unitid,b.unitname,b.parentid,b.path
from fi_camera_units b
where b.unitid in({1})",unitname,str.ToString());
                queryable = db.Database.SqlQuery<FI_CameraUnitsTreeModel>(sql).AsQueryable();
                return queryable.ToList();
            }
        }
        #endregion
    }
}
